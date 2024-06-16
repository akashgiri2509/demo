const pool = require('../config/db');

async function getAllCategories() {
    const [rows] = await pool.query('select * from categories');
    return rows;
}

async function getCategoriesById(id) {
    const [rows] = await pool.query('select * from categories where id=?', [id]);
    return rows[0];
}

async function createCategories(name, description) {
    const [result] = await pool.query('insert into categories (name,description) values (?,?)', [name, description]);
    return { id: result.insertId, name, description }
}

async function updateCategories(id, { name, description }) {
    const [result] = await pool.query('update categories set name=?,description=? where id=?', [name, description, id]);
    return result.affectedRows;
}

async function deleteCategories(id) {
    const [result] = await pool.query('delete from categories where id=?', [id]);
    return result.affectedRows;
}

module.exports = {
    getAllCategories,
    getCategoriesById,
    createCategories,
    updateCategories,
    deleteCategories
}