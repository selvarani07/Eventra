const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database');
const router = express.Router();

const SECRET = process.env.JWT_SECRET || 'secret';

// Register
router.post('/register', (req, res) => {
    const { username, password, role } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Missing fields' });

    const hashedPassword = bcrypt.hashSync(password, 8);

    db.run(`INSERT INTO users (username, password, role) VALUES (?, ?, ?)`,
        [username, hashedPassword, role || 'user'],
        function (err) {
            if (err) return res.status(500).json({ error: 'User already exists or database error' });
            const token = jwt.sign({ id: this.lastID, role: role || 'user' }, SECRET, { expiresIn: '24h' });
            res.json({ token, user: { id: this.lastID, username, role: role || 'user' } });
        }
    );
});

// Login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
        if (err || !user) return res.status(404).json({ error: 'User not found' });

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) return res.status(401).json({ token: null, error: 'Invalid Password' });

        const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: '24h' });
        res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
    });
});

module.exports = router;
