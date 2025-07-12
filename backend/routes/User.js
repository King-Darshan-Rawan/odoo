import express from 'express';
import { getUsers, getUser, updateUser, addSkill, removeSkill, banUser } from '../controllers/User.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/', updateUser);
router.post('/:userId/skills', addSkill);
router.delete('/:userId/skills', removeSkill);
router.patch('/:userId/ban', banUser);

export default router;