import {Router} from "express";
import { getUsers, getUser, updateUser, addSkill, removeSkill, banUser , deleteUser } from '../controllers/User.js';
import {authMiddleware} from '../middleware/auth.js';


const router = Router();

router.route('/').get(getUsers);
router.route('/:userId').get(getUser);
router.route('/').post(updateUser);
router.route('/:userId/skills').post(addSkill);
router.route('/:userId/skills').delete(removeSkill);
router.route('/:userId/ban').patch(banUser);
router.route('/:userId').delete(authMiddleware,deleteUser);

export default router;