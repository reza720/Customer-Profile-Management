import express from 'express';
import * as excelController from './controller.js';

const router = express.Router();

router.get('/', excelController.getCustomersForExcel);

export default router;
