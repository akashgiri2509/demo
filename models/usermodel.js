const pool = require('../config/db');

async function getAllUsers() {
    const [rows] = await pool.query('select * from users');
    return rows;
}

async function getUserById(id) {
    const [rows] = await pool.query('select * from users where id =?', [id]);
    return rows[0];
}

async function createUser(username, email, password, full_name, address, city, state, zip_code, country, phone_number) {
    const [result] = await pool.query('Insert into users (username,email,password,full_name,address,city,state,zip_code,country,phone_number) values (?,?,?,?,?,?,?,?,?,?)', [username, email, password, full_name, address, city, state, zip_code, country, phone_number]);
    return { id: result.insertId, username, email, password, full_name, address, city, state, zip_code, country, phone_number }
}

async function updateUser(id, { username, email, password, full_name, address, city, state, zip_code, country, phone_number }) {
    const [result] = await pool.query('update users set username=?,email=?,password=?,full_name=?,address=?,city=?,state=?,zip_code=?,country=?,phone_number=? where id=?', [username, email, password, full_name, address, city, state, zip_code, country, phone_number, id]);
    return result.affectedRows;
}

async function deleteUser(id) {
    const [result] = await pool.query('Delete from users where id=?', [id]);
    return result.affectedRows;
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
