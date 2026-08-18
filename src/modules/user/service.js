import User from "./User.js";
import Refresh_Token from "./refreshToken.js";
import crypto from "node:crypto";
import env from "../../config/env.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import throwError from "../../utils/throwError.js";
import { Op } from "sequelize";
import sequelize from "../../config/sequelize.js";
import { transcode } from "node:buffer";


// signup
// input: firstName, lastName
// generate username and check if user exist
// generate random pass and store its Hashed
// Create the user
// return: id, username, random pass

export async function signup({firstName, lastName}) {
    const username = generateUsername(firstName, lastName);
    const isExisting = await User.findOne({
        where: {userName: username}
    });
    if(isExisting) throwError("User already exists", 409);

    const password = generatePassword(7);
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
        firstName,
        lastName,
        userName: username,
        passwordHash
    });

    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.userName,
        password: password
    }
};

// change status
// input: useId
// deactivated user basic data
export async function changeStatus(userId) {
    const user = await User.findByPk(userId);
    if(!user) throwError("User not found", 404);

    await user.update({
        isActive: !user.isActive
    });

    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        isActive: user.isActive
    }
};

// login
// input: userName, password
// if user exit
// if password valid
// if user is active
// Generate access token (jwt)
// Generate refresh token and hash it (crypto)
// Create refresh token table 
// rturn: access token and refresh token
export async function login({userName, password}) {
    const user = await User.findOne({
        where:{
            userName
        }
    });
    if(!user) throwError("User not found", 404);
    if (!user.isActive) throwError("User is deactivated");

    const isPassValid = await bcrypt.compare(password, user.passwordHash);
    if(!isPassValid) throwError("Invalid Password", 400);

    const accessToken = generateAccessToken(user);

    const refreshToken = crypto.randomBytes(16).toString("hex");
    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

    await Refresh_Token.create({
        userId: user.id,
        tokenHash: refreshTokenHash,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        revokedAt: null
    });

    return {
        accessToken,
        refreshToken
    }
};

// refresh access token
// input: refreshToken
// Hash the token 
// If refreshToken table exist and revoked == null
// If the refreshToken is not expired
// If user that owns the refresh table exist
// Generate access token 
// return access token
export async function refreshAccessToken(refreshToken) {
    const tokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");
    const storedRefreshToken = await Refresh_Token.findOne({
        where: {
            tokenHash,
            revokedAt: null
        }
    });
    if(!storedRefreshToken) throwError("Invalid refresh token");
    if(storedRefreshToken.expiresAt < new Date()){
        throwError("Refresh Token has expired", 401);
    }
    const user = await User.findByPk(storedRefreshToken.userId);
    if(!user) throwError("User with this refresh token not found", 404);

    const accessToken = generateAccessToken(user);
    
    return accessToken;
};

// logout
// input: refreshToken 
// Hash the token
// If refreshToken exist and revoked == null
// increament the tokenVersion
// revoke the refreshToken
export async function logout(refreshToken) {
    const tokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");
    const storedRefreshToken = await Refresh_Token.findOne({
        where:{
            tokenHash
        }
    });
    if(!storedRefreshToken) throwError("Invalid refresh token", 401);
    if(storedRefreshToken.revokedAt !== null) throwError("Token already rovoked", 401);

    const user = await User.findByPk(storedRefreshToken.userId);
    if(!user) throwError("User not found", 404);

    await user.increment("tokenVersion");

    await storedRefreshToken.update({
        revokedAt: new Date()
    });
};



// getUser
// input: userId
// If user exist
// return: id, fullName, userName
export async function getUser(userId) {
    const user = await User.findByPk(userId);
    if(!user) throwError("User not found", 404);

    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.userName,
        isActive: user.isActive
    }
};

// getUsers
// input: nothing
// support pagaination and searching by userName, fullname
// return: sorted by firstName(Asc), id,fullname and userName, 
// pagination metadata
export async function getUsers(options = {}) {
    const {
        page = 1,
        limit = 25,
        search
    } = options;

    const currentPage = Number(page);
    const currentLimit = Number(limit);

    const offset = (currentPage - 1) * currentLimit;
    const where = search
        ? {
            [Op.or]: [
                {
                    firstName: {[Op.like]: `%${search}%`}
                },
                {
                    lastName: {[Op.like]: `%${search}%`}
                }
            ]
        }
        : {};

    const users = await User.findAndCountAll({
        where,
        attributes: [
            "id",
            "firstName",
            "lastName",
            "isActive"
        ],
        limit: currentLimit,
        offset,
        order: [["firstName", "ASC"]]
    });

    const totalPages = Math.ceil(users.count / currentLimit);
    return {
        users: users.rows,
        pagination: {
            page: currentPage,
            limit: currentLimit,
            totalItems: users.count,
            totalPages,
            hasNextPage: currentPage < totalPages,
            hasPreviousPage: currentPage > 1
        }
    };
}

// delete
// input: userId
// check if user exists
// destroy all refresh tokens belonging to the user
// destroy the user
// Use transaction to destroy user and refresh token at once
export async function deleteUser(userId) {
    const transaction = await User.sequelize.transaction();
    try {
        const user = await User.findByPk(userId, { transaction });
        if (!user) throwError("User not found", 404);
        await user.destroy({ transaction });
        await Refresh_Token.destroy({
            where: {
                userId
            },
            transaction
        });
        await transaction.commit();
    } catch (err) {
        await transaction.rollback();
        throw err;
    }
}



// ------------ Helpers ---------

// Generate Access Token
// input: user
// asign: userId, tokenVersion, secret from env
// and expiration date
function generateAccessToken(user){
    return jwt.sign(
        {
            userId: user.id,
            tokenVersion: user.tokenVersion
        },
        env.jwt.accessToken,
        {
            expiresIn: 20 * 60 
        }
    );
};

// Generate password
function generatePassword(length = 6){
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

    let password = "";
    for(let i =0; i < length; i++){
        const index = crypto.randomInt(0, chars.length);
        password += chars[index];
    }
    return password;
}

// generate username
function generateUsername(firstName, lastName){
    const cleanFirstName = firstName.trim().replace(" ", "").toLowerCase();
    const clearnLastName = lastName.trim().replace(" ", "").toLowerCase();

    return `_${cleanFirstName}_${clearnLastName}_`;
}
