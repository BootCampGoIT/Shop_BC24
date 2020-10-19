const Order = require('./orders.model');

const getOrdersController = async (req, res) => {
    try {
        let items = await Order.getOrders();
        const products = items.map(item => {
            item.totalPrice = item.products.reduce((a,b) => a.price + b.price);
            item.totalCount = item.products.length;
            return item;
        })
        res.json(products);
    } catch (e) {
        res.status(500).send('Internal server error')
    }
}

const createOrderController = async (req, res) => {
    try {
        const createdOrder = await Order.createOrder({
            productList: req.body.productList,
            address: req.body.address,
            ownerId: req.currentUser._id
        });
        res.json({id: createdOrder._id});
    } catch (e) {
        res.status(500).send('Internal server error')
    }
}

module.exports = {
    getOrdersController,
    createOrderController,
}