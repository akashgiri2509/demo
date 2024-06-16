const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
// const authController = require('../controllers/authController');
// const { authenticateToken } = require('../middleware/authmiddleware');
const JWT_SECRET = process.env.JWT_SECRET;

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query('INSERT INTO users (username, password,email) VALUES (?,?,?)', [username, hashedPassword, email], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: 'server error'
            });
        }
        const newUser = {
            id: results.insertId,
            username: username
        }
        res.status(201).json({ message: 'User registered', user: newUser });

    });
});

// router.post('/login', authController.login);

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
        if (results.length === 0 || !(await bcrypt.compare(password, results[0].password))) {
            return res.status(401).send({
                message: 'Incorrect username or password',
            });
        }

        const user = { id: results[0].id, username: results[0].username };
        // const accessToken = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', user });
    });
});


module.exports = router;