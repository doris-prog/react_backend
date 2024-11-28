const express = require('express');
const cors = require('cors');

require('dotenv').config();

const pool = require('./database');
const productsRouter = require('./routes/products');
const userRouter = require('./routes/users');
const cartRouter = require('./routes/cart');
const checkoutRouter = require('./routes/checkout');

const app = express();

//Middleware
app.use(express.json());
app.use(cors());

// Routes
// app.use('/api/products', express.json(), productsRouter);
// app.use('/api/users', express.json(), userRouter);
// app.use('/api/cart', express.json(), cartRouter);
// app.use('/api/checkout', checkoutRouter);

app.use('/api/products', productsRouter);
app.use('/api/users', userRouter);
app.use('/api/cart', cartRouter);

// Basic route
app.get('/', (req,res)=>{
    res.json({
        message: "Welcome to our e-commerce API"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});

