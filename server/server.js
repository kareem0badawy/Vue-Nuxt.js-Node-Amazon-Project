const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const User = require('./models/user');

dotenv.config();

const app = express(); 

mongoose.connect(
process.env.DATABASE,
{ useNewUrlParser: true, useUnifiedTopology: true},
 (err) => {
    if (err) {
        console.log(err);
    }else {
        console.log("Connected to the database ");
    }
});

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


// Require Apis
const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/category');
const ownerRoutes = require('./routes/owner');
const userRoute = require('./routes/auth');
const reviewRoute = require('./routes/review');
const addressRoute = require('./routes/address');
const paymentRoute = require('./routes/payment');  
const orderRoute = require('./routes/order');  
const searchRoute = require('./routes/search');  

app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api', ownerRoutes);
app.use('/api', userRoute);
app.use('/api', reviewRoute);
app.use('/api', addressRoute);
app.use('/api', paymentRoute);
app.use('/api', orderRoute);
app.use('/api', searchRoute);

app.listen(3000, err => {
    if (err) {
        console.log(err);
    }else {
        console.log("Listen on Port", 3000);
    }
});