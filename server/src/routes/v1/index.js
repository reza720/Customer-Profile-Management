import userRouter from '../../modules/auth/router.v1.js';
import customerRouter from '../../modules/customer/router.v1.js';
import excelRouter from '../../modules/excel/router.v1.js';

import express from 'express';

const router = express.Router();

router.use('/users', userRouter);
router.use('/customers', customerRouter);
router.use('/excel', excelRouter);

export default router;
