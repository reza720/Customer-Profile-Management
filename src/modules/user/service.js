import User from "./User.js";
import Refresh_Token from "./refreshToken.js";


// signup
// input: firstName, lastName
// generate username and check if user exist
// generate random pass and store its Hashed
// Create the user
// return: id, username, random pass

// login
// input: userName, password
// if user exit
// if password valid
// if user active
// Generate access token
// Generate refresh token
// Get expiration date of refresh token 
// Create refresh token table 
// rturn: access token and refresh token


// refresh access token
// input: refreshToken
// Hash the token 
// If refreshToken table exist and revoked == null
// If the refreshToken is not expired
// If user that owns the refresh table exist
// Generate access token 
// return access token


// logout
// input: refreshToken 
// Hash the token
// If refreshToken exist and revoked == null
// increament the tokenVersion
// revoke the refreshToken

// getUser
// input: userId
// If user exist
// return: id, fullName, userName

// getUsers
// input: nothing
// support pagaination and searching by userName, fullname
// return: sorted by firstName(Asc), id,fullname and userName, 
// pagination metadata

// delete
// input: userId
// check if user exists
// destroy all refresh tokens belonging to the user
// destroy the user



// ------------ Helpers ---------

// Generate Access Token
// input: user
// asign: userId, tokenVersion, secret from env
// and expiration date


// Generate Refresh Token
// input: user
// asign: userId, secret created by crypto, expiration



