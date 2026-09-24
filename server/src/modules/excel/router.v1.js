import apiKeyRequired from '../../middleware/apiKeyRequired.js';
import express from 'express';
import * as excelController from './controller.js';

const router = express.Router();

router.get('/', apiKeyRequired, excelController.getCustomersForExcel);

export default router;
