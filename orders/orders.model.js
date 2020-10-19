const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  country: String,
  city: String,
  place: String,
  street: String,
  block: String,
  building: String,
  flat: String,
}, { versionKey: false });

const orderSchema = new mongoose.Schema({
  owner: {type: mongoose.Types.ObjectId},
  products: [{type: mongoose.Types.ObjectId}],
  address: {
    type: addressSchema,
    default: {},
  }
}, { versionKey: false });

class Order {
  constructor () {
    this.order = mongoose.model('Order', orderSchema);
  }

  getOrders = async () => {
    return this.order.aggregate([
      {
        $lookup: {
          from: 'products',
          localField: 'products',
          foreignField: '_id',
          as: 'products'
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'owner',
          foreignField: '_id',
          as: 'owner'
        },
      },
      {
        $project: {products: 1, address: 1, owner: {_id: 1, name: 1, email: 1}}
      }
    ])
  }

  createOrder = async ({productList, ownerId, address}) => {
    const products = productList.map(product => new mongoose.Types.ObjectId(product))
    return this.order.create({
      products,
      address,
      owner: ownerId
    })
  }

}

module.exports = new Order();



