import express from 'express';
import { addItem, listItems } from './users.controller.js';
const router = express.Router();

router.post('/', addItem);

router.get('/', listItems);

export default router;