import express from 'express';
import { getAllServices, createService, getServiceById, getCategorizedServices } from '../controllers/serviceController.js';

const router = express.Router();

router.get('/', getAllServices);
router.get('/categorized', getCategorizedServices);
router.get('/:id', getServiceById);
router.post('/', createService);

export default router;
