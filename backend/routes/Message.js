import {Router} from "express";
import { createMessage } from '../controllers/Message.js';
import {authMiddleware} from '../middleware/auth.js';



const router = Router();

router.route('/').post(authMiddleware,createMessage);

export default router;