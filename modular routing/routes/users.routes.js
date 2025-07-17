import express from 'express';
import { getUsers, getUserById,updateUser, deleteUser, createUser, getUserWithFilter } from './users.controller.js';
const router = express.Router();


// router.get('/', getAllUsers);
router.get('/:id', getUserById)
// router.get('/', getUserWithFilter);
router.get('/', getUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;