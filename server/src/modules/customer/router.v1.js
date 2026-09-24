import * as customerController from './controller.js';
import express from 'express';
import upload from '../../config/multer.js';

const router = express.Router();

router.post('/register', customerController.register);
router.post(
  '/:id/photo',
  upload.single('photo'),
  customerController.uploadPhoto,
);

router.patch('/:id', customerController.update);
router.delete('/:id', customerController.deleteCustomer);

router.get('/:id', customerController.getCustomer);
router.get('/', customerController.getCustomers);

export default router;
