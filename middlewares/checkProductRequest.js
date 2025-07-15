export const checkReq = (req, res, next) => {
    if(req.name || req.price) {
        return res.status(400).json({ error: 'Name and price are required' });
    }
    console.log(`Product req received ${req.body}`);
    next();
}