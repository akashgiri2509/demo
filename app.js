
require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const productsRoutes = require('./routes/productsRoutes');
const authRoutes = require('./routes/authRoutes');
const authenticateToken = require('./middleware/authmiddleware');


const app = express();
app.use(bodyparser.json());

app.use('/api', roleRoutes);
app.use('/api', userRoutes);
app.use('/api', categoriesRoutes);
app.use('/api', productsRoutes);
app.use('/auth', authRoutes);

app.get('/protected', authenticateToken, (req, res) => {
    res.send('This is a protected route');
});


//Basic routes

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'mysql@123',
//     database: 'ecommerce',
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });

// // Middleware to handle database connection errors
// app.use(async (req, res, next) => {
//     try {
//         req.db = await pool.getConnection();
//         next();
//     } catch (err) {
//         console.error('Error connecting to the database:', err);
//         res.status(500).send('Database connection error');
//     }
// });



// app.use((req, res, next) => {
//     res.on('finish', () => {
//         if (req.db) req.db.release();
//     });
//     next();
// });

// app.get('/', (req, res) => {
//     res.send('Hello world!');
// });

// app.get('/users', async (req, res) => {
//     try {
//         const [results] = await req.db.query('SELECT * FROM users');
//         res.json(results);
//     } catch (err) {
//         console.error('Error fetching users:', err);
//         res.status(500).send('Error fetching users');
//     } finally {
//         req.db.release();
//     }
// });

// app.get('/getuser/:id', async (req, res) => {
//     const { id } = req.params;

//     try {
//         const [results] = await req.db.query('SELECT * FROM users WHERE id = ?', [id]);
//         if (results.length === 0) {
//             return res.status(404).send('User not found');
//         }
//         res.json(results[0]);
//     } catch (err) {
//         console.error('Error fetching user:', err);
//         res.status(500).send('Error fetching user');
//     }
// });

// app.post('/addusers', async (req, res) => {
//     const { username, email, password } = req.body;

//     if (!username || !email || !password) {
//         return res.status(400).send('Username, email, and password are required');
//     }

//     try {
//         const [result] = await req.db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
//         res.status(201).json({ id: result.insertId, username, email, password });
//     } catch (err) {
//         console.error('Error inserting user:', err);
//         res.status(500).send('Error inserting user');
//     }
// });


// app.delete('/users/:id', async (req, res) => {
//     const { id } = req.params;

//     try {
//         const [result] = await req.db.query('DELETE FROM users WHERE id = ?', [id]);
//         if (result.affectedRows === 0) {
//             return res.status(404).send('User not found');
//         }
//         res.status(204).send();
//     } catch (err) {
//         console.error('Error deleting user:', err);
//         res.status(500).send('Error deleting user');
//     }
// });

// app.put('/updateusers/:id', async (req, res) => {
//     const { id } = req.params;
//     const { username, email, password } = req.body;

//     if (!username || !email || !password) {
//         return res.status(400).send('Username, email, and password are required');
//     }

//     try {
//         const [result] = await req.db.query('UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?', [username, email, password, id]);
//         if (result.affectedRows === 0) {
//             return res.status(404).send('User not found');
//         }
//         res.json({ id, username, email, password });
//     } catch (err) {
//         console.error('Error updating user:', err);
//         res.status(500).send('Error updating user');
//     }
// });
const port = 3000;

app.listen(port, () => {
    console.log(`server is running on ${port}`)
});