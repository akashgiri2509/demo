const db = require('../config/db');
const User = require('../models/authmodels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const SECRET_KEY = 'your_secret_key';
// const register = async (req, res) => {
//     const { username, password, email } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     db.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
//         [username, hashedPassword, email], (err, result) => {
//             if (err) return res.status(500).json({ error: err });

//             const userId = result.insertId;
//             db.query('INSERT INTO userrole (user_id, role_id) VALUES (?, ?)',
//                 [userId, 1], (err, result) => {  // Assuming '1' is the ID for a default role
//                     if (err) return res.status(500).json({ error: err });
//                     res.status(201).json({ message: 'User registered successfully!' });
//                 });
//         });
// }

// const login = (req, res) => {
//     const { username, password } = req.body;

//     db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
//         if (err) return res.status(500).json({ error: err });

//         if (results.length === 0) return res.status(400).json({ message: 'User not found!' });

//         const user = results[0];

//         const isMatch = await bcrypt.compare(password, user.password);

//         if (!isMatch) return res.status(400).json({ message: 'Invalid credentials!' });

//         const token = jwt.sign({ id: user.id, username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });

//         res.status(200).json({ token });
//     });
// };

// const login = (req, res) => {
//     const { email, password } = req.body;

//     db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
//         if (err) return res.status(500).json({ error: err });

//         if (results.length === 0) return res.status(400).json({ message: 'Invalid email or password' });

//         const user = results[0];

//         const isMatch = await bcrypt.compare(password, user.password);

//         if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

//         const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         res.status(200).json({ token });
//     });
// };
exports.login = (req, res) => {
    const { username, password } = req.body;

    User.findByUsername(username, (err, results) => {
        if (err) throw err;

        if (results.length === 0) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const user = results[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
                const token = jwt.sign(
                    { id: user.id, username: user.username, role: user.role },
                    SECRET_KEY,
                    { expiresIn: '1h' }
                );
                res.json({ message: 'Login successful', token });
            } else {
                res.status(401).json({ message: 'Authentication failed' });
            }
        });
    });
};

