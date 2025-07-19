
// /controllers/userController.js
import { asyncHandler } from '../utils/asyncHandler.js';

const users = [
{ id: '1', name: 'Goku' },
{ id: '2', name: 'Vegeta' },
];

export const getUserById = asyncHandler(async (req, res) => {
const { id } = req.params;
const user = users.find(u => u.id === id);

if (!user) {
    res.status(404);
    throw new Error('User not found');
}

res.json(user);
});

export const getUsers = (req, res) => {
    res.json({ message: 'All users' });
};