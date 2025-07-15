import express from 'express';
import { addItem, listItems } from './users.controller.js';
import {checkReq} from '../../middlewares/checkProductRequest.js';
const router = express.Router();

router.post('/', checkReq, addItem);

router.get('/', listItems);

export default router;