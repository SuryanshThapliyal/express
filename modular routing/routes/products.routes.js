import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.send('all products');
});

router.get('/:id', (req, res) => {
    res.send(`products id ${req.params.id}`);
});

export default router;