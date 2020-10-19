const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../user/user.model');
const Product = require('../products/products.model');


const registrationController = async (req, res) => {
    try {
        const {password} = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        await User.createUserModel({...req.body, password: hashPassword, role: 'USER'});
        res.status(201);
    } catch (e) {
        res.status(500).send(e)
    } finally {
        res.end()
    }
}

const loginController = async (req, res) => {
    try {
        const {email, password} = req.body;
        const currentUser = await User.getUserWithQuery({email});
        if (!currentUser.length) {
            res.status(400).send(`User with email: ${email} not found`)
            return;
        }
        const isEqualPassword = await bcrypt.compare(password, currentUser[0].password);
        if (!isEqualPassword) {
            res.status(400).send('Incorrect password')
            return;
        }
        const favoritesProducts = await Product.getFavoritesProducts(currentUser[0].favorites);
        const accces_token = await jwt.sign(
            {id: currentUser[0]._id},
            process.env.PRIVATE_JWT_KEY,
            {expiresIn: '1d'}
        );
        res.json({
            accces_token: `Bearer ${accces_token}`,
            user: {
                _id: currentUser[0]._id,
                email: currentUser[0].email,
                name: currentUser[0].name,
                surname: currentUser[0].surname,
                phone: currentUser[0].phone,
                address: currentUser[0].address,
                role: currentUser[0].role,
                favorites: favoritesProducts
            }
        })
    } catch (e) {
        res.status(500).send(e)
    } finally {
        res.end()
    }
}

module.exports = {
    registrationController,
    loginController,
}