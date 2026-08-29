function globalErrorHandler(err, req, res, next){
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Server Error",
        errors: err.errors || []
    });
}

export default globalErrorHandler;