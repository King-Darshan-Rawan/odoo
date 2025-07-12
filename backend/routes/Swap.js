import {Router} from "express";
import { getSwaps, createSwap, updateSwap } from '../controllers/Swap.js';


const router = Router();

router.route('/getrequests').get(getSwaps);
router.route('/createrequest').post(createSwap);
router.route('/updaterequest/:swapId').patch(updateSwap);

export default router;