const express = require('express');
const router = express.Router();
const cartService = require('../services/cartService');
const UserAuth = require('../middlewares/UserAuth');

router.use(UserAuth);

router.get('/', [UserAuth], async (req, res) => {
    try {
        const CartContents = await cartService.getCartContents(req.user.userId);
        res.send(CartContents);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.put('/', [UserAuth], async (req, res) => {
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
