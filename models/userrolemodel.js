const pool = require('../config/db');

async function assignRoleToUser(userId, roleId) {
    const [result] = await pool.query('INSERT INTO userroles (user_id, role_id) VALUES (?, ?)', [userId, roleId]);
    return result.affectedRows;
}

async function getRolesByUserId(userId) {
    const [rows] = await pool.query('SELECT r.* FROM role_type r INNER JOIN userroles ur ON r.id = ur.role_id WHERE ur.user_id = ?', [userId]);
    return rows;
}

async function removeRoleFromUser(userId, roleId) {
    const [result] = await pool.query('DELETE FROM user_roles WHERE user_id = ? AND role_id = ?', [userId, roleId]);
    return result.affectedRows;
}

module.exports = {
    assignRoleToUser,
    getRolesByUserId,
    removeRoleFromUser
};
