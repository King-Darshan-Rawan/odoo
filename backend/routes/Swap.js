import {Router} from "express";
import { getSwaps, createSwap, updateSwap } from '../controllers/Swap.js';


const router = Router();

router.route('/').get(getSwaps);
router.route('/').post(createSwap);
router.route('/:swapId').patch(updateSwap);

export default router;