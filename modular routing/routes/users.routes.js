import express from 'express';
import { getAllUsers, getUserById,updateUser, deleteUser, createUser } from './users.controller.js';
const router = express.Router();


router.get('/', getAllUsers);
router.get('/:id', getUserById)
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;