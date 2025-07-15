import express from 'express';
import { getAllUsers, getUserById,updateUser, deleteUser, createUser, getUserWithFilter } from './users.controller.js';
const router = express.Router();


// router.get('/', getAllUsers);
router.get('/:id', getUserById)
router.get('/', getUserWithFilter);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;