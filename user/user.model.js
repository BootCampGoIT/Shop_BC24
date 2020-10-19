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

const userSchema = new mongoose.Schema({
  name: {type: String, default: ''},
  surname: {type: String, default: ''},
  phone: {type: String, default: ''},
  email: String,
  password: String,
  favorites: [{type: mongoose.Types.ObjectId}],
  role: {type: String, default: 'USER'},
  address: {
    type: addressSchema,
    default: {
      country: '',
      city: '',
      place: '',
      street: '',
      block: '',
      building: '',
      flat: '',
      zip: '',
    },
  }
}, { versionKey: false });

class User {
  constructor () {
    this.user = mongoose.model('User', userSchema);
  }

  getUsers = async () => {
      return this.user.aggregate([
        {
          $lookup: {
            from: 'products',
            localField: 'favorites',
            foreignField: '_id',
            as: 'favorites'
          }
        }
      ])
  }

  getUserWithQuery = async (query={}) => {
    return this.user.find(query)
  }

  getUserById = async id => {
    return await this.user.findById(id);
  }

  createUserModel = async data => {
    return this.user.create(data);
  }

  deleteUserById = async id => {
    return await this.user.findByIdAndDelete(id);
  }

  updateUser = async (userId, data) => {
    return await this.user.findByIdAndUpdate(userId, data, {new: true});
  }

  addFavouriteProduct = async (userId, productId) => {
    return await this.user.findByIdAndUpdate(
      userId,
      {
        $push: {favorites: new mongoose.Types.ObjectId(productId)}
      },
      {new: true}
    );
  }

  removeFavoriteProduct = async (userId, productId) => {
    return await this.user.findByIdAndUpdate(
        userId,
        {
          $pull: {favorites: new mongoose.Types.ObjectId(productId)}
        },
        {new: true}
    );
  }

}

module.exports = new User();