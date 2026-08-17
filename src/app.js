import express from "express";
import hpp from "hpp";
import helmet from "helmet";
import router from "../src/routes/index.js";
import globalErrorHandler from "../src/middleware/globalErrorHandler.js";


const app = express();

app.use(helmet());
app.use(hpp());
app.use(express.json());

app.use("/api", router);

app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

app.use(globalErrorHandler);

export default app;