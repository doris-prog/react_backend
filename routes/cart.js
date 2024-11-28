const express = require('express');
const router = express.Router();
const cartService = require('../services/cartService');
const authenticateToken = require('../middlewares/UserAuth');

router.use(authenticateToken);

router.get('/', async (req, res) => {
    try {
        const cartContents = await cartService.getCartContents(req.user.userId);
        res.json(cartContents);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.put('/', async (req, res) => {
    try {
        const cartItems = req.body.cartItems;
        await cartService.updateCart(req.user.userId, cartItems);
        res.json({ message: 'Cart updated successfully'});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put("/", async function (req, res) {
    res.send("Put Cart Route")    
})

module.exports = router;
