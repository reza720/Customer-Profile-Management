import * as userService from "./service.js";

// signup
// req: from body
// res: status, json(sucess, message, returned data)
export async function signup(req, res, next) {
    try{
        const user = await userService.signup(req.body);
        res.status(201).json({
            success: true,
            message: "User signed up",
            user
        });
    }
    catch(err){
        next(err);
    }
};
// chnage status
// req: userId from param
// res: status, json(succes, message, returned data)
export async function changeStatus(req, res, next) {
    try{
        const user = await userService.changeStatus(req.params.id);
        res.status(200).json({
            success: true,
            message: "Status changed",
            user
        });
    }
    catch(err){
        next(err);
    }
};

// login
// req: from body
// res: refreshtoke to Http only cookie
// res: status, json(sucess, message, access token)
export async function login(req, res, next) {
    try{
        const {accessToken, refreshToken} = await userService.login(req.body);
        res.cookie("refreshToken", refreshToken,{
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000
        });
        res.status(200).json({
            success: true,
            message: "User logged in",
            accessToken
        });
    }  
    catch(err){
        next(err);
    }
};


// refresh Access token
// req: from cookies
// status, json(success, message, access token)

// logout: 
// req: from cookies
// res: status, json(success, message)

// getUser
// req: userId from param
// res: status, json(success, message, data)

// getUsers
// req: nothing
// res: status, json(success, message, data)

// deleteUser 
// req: userId from param
// res: status, json(success, message)