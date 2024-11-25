const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            salutation,
            marketingPreferences,
            country
        } = req.body;

        const userId = await userService.registerUser({
            name,
            email,
            password,
            salutation,
            marketingPreferences,
            country
        });
        res.status(201).json({
            message: "User registered successfully", userId
        });
    } catch (error) {
        res.status(400).json({ message: error.mesage });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.loginUser(email, password);
        const token = jwt.sign({
            userId: user.id
        }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.json({
            message: "Login successful", token
        });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
});

module.exports = router;