const bcrypt = require('bcrypt');
const User = require('./user.model');

const getUsersController = async (req, res) => {
    try {
        const users = await User.getUsers(req.query);
        res.json(users);
    } catch (e) {
        res.status(500).send('Internal server error')
    }
}

const getUserByIdController = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.getUserById(id)
        res.json(user);
    } catch (e) {
        res.status(500).send('Internal server error')
    }
}

const getCurrentUserController = async (req, res) => {
    const {_id} = req.currentUser;
    const user = await User.getUserById(_id)
    res.json(user);
}

const addFavoriteProductController = async (req, res) => {
    const {productId} = req.params;
    await User.addFavouriteProduct(req.currentUser._id, productId)
    res.end()
}

const removeFavoriteProduct = async (req, res) => {
    const {productId} = req.params;
    await User.removeFavoriteProduct(req.currentUser._id, productId)
    res.end()
}

const changePassword = async (req, res) => {
    const {password, confirmPassword} = req.body;
    if (password !== confirmPassword) {
        return res.status(400).send('Passwords not equal')
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await User.updateUser(req.currentUser._id, {password: hashPassword})
    res.end()
}

const createUserController = async (req, res) => {
    try {
        const user = await User.getUserWithQuery({email: req.body.email});
        if (user.length) {
            res.status(400).send('User with email '+ req.body.email + ' already exists');
            return;
        }
        const {password} = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const createdUser = await User.createUserModel({...req.body, password: hashPassword, role: 'USER'});
        res.json(createdUser)
    } catch (e) {
        res.status(500).send(e);
    }
    finally {
        res.end();
    }
}

const updateUserController = async (req, res) => {
    try {
        const {_id: id} = req.currentUser;
        const updatedUser = await User.updateUser(id, req.body);
        res.json(updatedUser)
    } catch (e) {
        res.status(500).send(e)
    } finally {
        res.end()
    }
}

const updateUserAddressController = async (req, res) => {
    try {
        const {_id: id} = req.currentUser;
        const updatedUser = await User.updateUser(id, {address: req.body});
        res.json(updatedUser)
    } catch (e) {
        res.status(500).send(e)
    } finally {
        res.end()
    }
}

const deleteUserController = async (req, res) => {
    const {id} = req.params;
    await User.deleteUserById(id);
    res.json({deletedUser: +id})
    res.end()
}

module.exports = {
    getUsersController,
    getUserByIdController,
    getCurrentUserController,
    addFavoriteProductController,
    createUserController,
    updateUserController,
    deleteUserController,
    removeFavoriteProduct,
    changePassword,
    updateUserAddressController,
}