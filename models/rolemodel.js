const pool = require('../config/db')

async function getAllRole() {
    const [rows] = await pool.query('select * from role_type');
    return rows;
}

async function getRoleById(id) {
    const [rows] = await pool.query('select * from role_type where roleid=?', [id]);
    return rows[0];
}

async function createRole(rolename) {
    const [result] = await pool.query('insert into role_type (rolename) values (?)', [rolename]);
    return { roleid: result.insertId, rolename }
}

async function updateUser(id, { rolename }) {
    const [result] = await pool.query('update role_type set rolename=? where roleid = ?', [id, rolename]);
    return result.affectedRows;
}

async function deleteRole(id) {
    const [result] = await pool.query('delete from users where id=?', [id]);
    return result.affectedRows;
}

module.exports = {
    getAllRole,
    getRoleById,
    createRole,
    updateUser,
    deleteRole
}