import {Router} from "express";
import { register , login ,getUsers, getUser, updateUser, addSkill, removeSkill, banUser , deleteUserr } from '../controllers/User.js';
import {authMiddleware} from '../middleware/auth.js';


const router = Router();

router.route('/register').post(register);
router.route('/login').post(login);

router.route('/').get(getUsers);
router.route('/:userId').get(getUser);
router.route('/').post(updateUser);
router.route('/:userId/skills').post(addSkill);
router.route('/:userId/skills').delete(removeSkill);
router.route('/:userId/ban').patch(banUser);
router.route('/:userId').delete(authMiddleware,deleteUserr);

export default router;