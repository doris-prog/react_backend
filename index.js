const express = require('express');
const cors = require('cors');

require('dotenv').config();

const pool = require('./database');
const productsRouter = require('./routes/products');
const userRoutes = require('./routes/users');
const cartRoutes = require('./routes/cart');

const app = express();

//Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/products', productsRouter);
app.use('/api/users', userRoutes);
app.use('/api/cartRoutes', cartRoutes);

// Basic route
app.get('/', (req,res)=>{
    res.json({
        message: "Welcome to our e-commerce API"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log('Server is running on port ${PORT}');
});

