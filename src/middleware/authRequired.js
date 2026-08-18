import jwt from "jsonwebtoken";
import env from "../config/env.js";
import User from "../modules/user/User.js";
import throwError from "../utils/throwError.js";

async function authRequired(req, res, next){
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            throwError("Access Token required", 401);
        }

        const token = authHeader.split(" ")[1];
        const payload = jwt.verify(token, env.jwt.accessToken);

        const user = await User.findByPk(payload.userId);
        if(!user || user.tokenVersion !== payload.tokenVersion){
            throwError("Invalid access token", 401);
        }

        req.user = payload;

        next();
    }
    catch(err){
        next(err);
    }
}

export default authRequired;
