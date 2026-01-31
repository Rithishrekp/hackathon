import express from 'express';
import { getAllServices, createService, getServiceById } from '../controllers/serviceController.js';

const router = express.Router();

router.get('/', getAllServices);
router.get('/:id', getServiceById);
router.post('/', createService);

export default router;
