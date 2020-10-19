const Product = require('./products.model');

const categories = [
    { name: 'Холодильники', value: 'refrigerators' },
    { name: 'Стиральные машины', value: 'washing_machines' },
    { name: 'Посудомоечные машины', value: 'dishwashers' },
    { name: 'Кухонные плиты', value: 'сookers' },
    { name: 'Морозильные камеры', value: 'freezers' },
    { name: 'Сушильные машины', value: 'drying_machines' },
    { name: 'Встраиваемые духовые шкафы', value: 'built_in_ovens' },
    { name: 'Встраиваемые варочные поверхности', value: 'built_in_hobs' },
    { name: 'Кухонные вытяжки', value: 'cooker_hoods' },
    { name: 'Измельчители пищевых отходов', value: 'food_waste_disposers' },
    { name: 'Аксессуары к вбт', value: 'Accessories_for_vbt' },
    { name: 'Кофемашины', value: 'coffee_machines' },
    { name: 'Мультиварки', value: 'multicooker' },
    { name: 'Печи СВЧ', value: 'microwave_ovens' },
    { name: 'Блендеры', value: 'blenders' },
    { name: 'Грили', value: 'grills' },
    { name: 'Аксессуары для кухонной техники', value: 'accessories_for_kitchen_appliances' },
    { name: 'Прочая мелкая техника', value: 'other_small_equipment' },
    { name: 'Пылесосы', value: 'vacuum_cleaners' },
    { name: 'Роботы-пылесосы', value: 'robot_vacuum_cleaners' },
    { name: 'Утюги', value: 'irons' },
    { name: 'Швейная техника и аксессуары', value: 'sewing_equipment_and_accessories' },
    { name: 'Пароочистители', value: 'steam_cleaners' },
    { name: 'Аксессуары к товарам по уходу за домом и одеждой', value: 'accessories_for_home_care_and_clothing_products' },
    { name: 'Распродажа', value: 'sale'},
    { name: 'Новые поступления', value: 'new' }
]

const getProductsController = async (req, res) => {
    try {
        const products = await Product.getProducts(req.query);
        res.json(products);
    } catch (e) {
        res.status(500).send('Internal server error')
    }
}

const createProductController = async (req, res) => {
    try {
        const createdProduct = await Product.createProducts(req.body);
        res.json(createdProduct);
    } catch (e) {
        res.status(500).send('Internal server error')
    }
}

const uploadPhotoController = async (req, res) => {
    try {
        const {productId, images} = req.body;
        await Product.uploadPhoto(productId, images);
        res.end();
    } catch (e) {
        res.status(500).send('Internal server error')
    }
}

const deleteProductController = async (req, res) => {
    try {
        const {productId} = req.params;
        await Product.deleteProduct(productId);
        res.end();
    } catch (e) {
        res.status(500).send('Internal server error')
    }
}

const getCategoryController = async (req, res) => {
    try {
        res.json({
            categories,
            countOfProducts: await Product.getCount(req.query),
        });
    } catch (e) {
        res.status(500).send('Internal server error')
    }
}

module.exports = {
    getProductsController,
    createProductController,
    getCategoryController,
    uploadPhotoController,
    deleteProductController,
}