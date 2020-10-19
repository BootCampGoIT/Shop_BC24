require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const PORT = process.env.PORT || 3000;
const {authRouter} = require('./auth/auth.router');
const {userRoter} = require('./user/user.router');
const {productRouter} = require('./products/products.router');
const {orderRouter} = require('./orders/orders.router');

const createServer = async () => {

    try {
        const app = express();
       
        await mongoose.connect(process.env.MONGODB_URI, {useUnifiedTopology: true});
    
        console.log('Mongo has been connected')

        app.all('*', function(req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', '*');
            res.setHeader('Access-Control-Allow-Methods', '*')
            next();
       });

        app.use('/', express.static('public'))

        app.use(express.json())

        app.use('/auth', authRouter);
        app.use('/users', userRoter);
        app.use('/products', productRouter);
        app.use('/orders', orderRouter);

        app.listen(PORT, () => console.log(`Hi ${process.env.AUTHOR_NAME}, server listening on port: `+ PORT));

    } catch (e) {
        console.error(e)
    }

}

createServer();




