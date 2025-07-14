const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('User home page');
});

router.get('/:id', (req,res)=>{
    res.send(`user id: ${req.params.id}`)
})

export default router;