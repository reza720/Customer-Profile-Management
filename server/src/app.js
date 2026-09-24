import express from 'express';
import hpp from 'hpp';
import helmet from 'helmet';
import v1Router from '../src/routes/index.js';
import globalErrorHandler from '../src/middleware/globalErrorHandler.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(helmet());
app.use(hpp());
app.use(express.json());
app.use(cookieParser());

app.use('/api', v1Router);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

app.use(globalErrorHandler);

export default app;
