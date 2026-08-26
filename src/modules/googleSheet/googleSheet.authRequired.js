import env from "../../config/env.js";

function authRequired(req, res, next){
    const apiKey = req.get("X-API-Key");

    if(!apiKey){
        res.status(401).json({
            success: false,
            message: "API key is required"
        });
    }

    if(apiKey !== env.googleSheet.apikey){
        res.status(401).json({
            success: false,
            message: "Invalid API key"
        });
    }

    next();
}

export default authRequired;