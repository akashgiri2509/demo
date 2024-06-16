const pool = require('../config/db');

async function getAllProducts() {
    const [rows] = await pool.query('select * from products');
    return rows;
}

async function getProductsById(id) {
    const [rows] = await pool.query('select * from products where id =?', [id]);
    return rows;
}

async function createProducts(name, description, price, stock, category_id, image_url) {
    const [result] = await pool.query('Insert into products (name, description, price, stock, category_id, image_url) values (?,?,?,?,?,?)', [name, description, price, stock, category_id, image_url]);
    return { id: result.insertId, name, description, price, stock, category_id, image_url }
}


module.exports = {
    getAllProducts,
    getProductsById,
    createProducts
}