import express from 'express';
import { getSwaps, createSwap, updateSwap } from '../controllers/swapController.js';

const router = express.Router();

router.get('/', getSwaps);
router.post('/', createSwap);
router.patch('/:swapId', updateSwap);

export default router;