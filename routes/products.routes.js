import express from 'express';
import Product from '../models/product.js';

const router = express.Router();

router.post('/products', async (req, res) => {
    try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
    } catch (err) {
    res.status(400).json({ error: err.message });
    }
});

export default router;
