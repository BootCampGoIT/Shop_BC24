const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'Name is required']
  },
  images: [{type: String}],
  category: {
    type: String,
    required: [true, 'Category is required']
  },
  description: String,
  price: {
    type: Number,
    min: 1,
    required: [true, 'Category is required']
  },
  totalQuantity: {type: Number, default: 1, min: 0},
}, { versionKey: false });

class Product {
  constructor () {
    this.product = mongoose.model('Product', productSchema);
  }

  getProducts= async (query={}) => {
    const {page, itemsPerPage} = query;
    if (page && itemsPerPage) {
      return this.product.find(
          {
            name: { $regex: new RegExp(query.search || '', 'gi') },
            category: { $regex: new RegExp(query.category || '', 'gi') },
          }
      ).skip(Number(itemsPerPage)*(Number(page) - 1)).limit(Number(itemsPerPage))
    }
    return this.product.find(
        {
          name: { $regex: new RegExp(query.search || '', 'gi') },
          category: { $regex: new RegExp(query.category || '', 'gi') },
        }
    )
  }

  createProducts = async productData => {
    return this.product.create(productData)
  }

  getCount = async (query = {}) => {
    return this.product.find(
        {
          name: { $regex: new RegExp(query.search || '', 'gi') },
          category: { $regex: new RegExp(query.category || '', 'gi') },
        }
    ).count()
  }

    uploadPhoto = async (productId, images) => {
        return this.product.findByIdAndUpdate(productId, {
            $push: {images: { $each: images }}
        })
    }

    deleteProduct = async (productId) => {
        return this.product.findByIdAndRemove(productId)
    }

    getFavoritesProducts = async (productIds) => {
        return this.product.find({_id: {$in: productIds}})
    }


}

module.exports = new Product();