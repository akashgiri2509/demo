const productModel = require('../models/productmodel');

async function getAllProducts(req, res) {
    try {
        const product = await productModel.getAllProducts();
        res.json(product);
    }
    catch (error) {
        console.error(500).send('Error Fetching Products');
        res.status(500).send('Error Fetching Products');
    }
}

async function getProductsById(req, res) {
    const { id } = req.params;
    try {
        const product = await productModel.getProductsById(id);
        if (!product) {
            return res.status(404).send('Product not Found');
        }
        res.json(product);
    } catch (error) {
        console.error('Error fetching Product:', error);
        res.status(500).send('Error fetching Product');
    }
}

async function createProducts(req, res) {
    const { name, description, price, stock, category_id, image_url } = req.body;
    if (!name || !price || !stock || !image_url || !category_id) {
        return res.status(400).send('Data is required');
    }
    try {
        const newProduct = await productModel.createProducts(name, description, price, stock, category_id, image_url);
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error creating Products', error);
        res.status(500).send('Error creating Products');
    }
}

module.exports = {
    getAllProducts,
    getProductsById,
    createProducts
}