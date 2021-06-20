const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productsRoute = require('./modules/products/products.route');
const userRoute = require('./modules/user/user.route');
const userInfoRoute = require('./modules/userinfo/userInfo.route');
const categoriesRoute = require('./modules/categories/categories.route');
const app = express();

mongoose
    .connect('mongodb://localhost:27017/eula-shop')
    .then(() => {
        console.log('Connect to database successful');
    })
    .catch((error) => {
        console.log('Cant connect to database');
        console.error(error);
    });

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization',
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/api/products', productsRoute);
app.use('/api/auth', userRoute);
app.use('/api/userinfo', userInfoRoute);
app.use('/api/categories', categoriesRoute);

module.exports = app;
