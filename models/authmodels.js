// const pool = require('../config/db');


// async function getUserByEmail(email) {
//     const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
//     return rows[0];
// }

// module.exports = {
//     getUserByEmail
// }

const db = require('../config/db');

const User = {
    findByUsername: (username, callback) => {
        const query = 'SELECT * FROM users WHERE username = ?';
        db.query(query, [username], callback);
    },
    createUser: (user, callback) => {
        const query = 'INSERT INTO users SET ?';
        db.query(query, user, callback);
    }
};

module.exports = User;