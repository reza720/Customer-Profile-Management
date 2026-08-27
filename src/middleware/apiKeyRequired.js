import env from "../config/env.js";

function apiKeyRequired(req, res, next) {

    const apiKey = req.get("x-api-key");

    if (!apiKey) {
        return res.status(401).json({
            success: false,
            message: "API key is required"
        });
    }

    if (apiKey !== env.excel.apikey) {
        return res.status(401).json({
            success: false,
            message: "Invalid API key"
        });
    }

    next();
}

export default apiKeyRequired;