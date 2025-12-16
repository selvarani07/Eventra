const express = require('express');
const db = require('../database');
const router = express.Router();

// Get all events
router.get('/', (req, res) => {
    db.all("SELECT * FROM events", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Create event
router.post('/', (req, res) => {
    const { title, start_time, end_time, description } = req.body;
    // TODO: Validate dates?
    db.run("INSERT INTO events (title, start_time, end_time, description) VALUES (?, ?, ?, ?)",
        [title, start_time, end_time, description],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, title, start_time, end_time, description });
        }
    );
});

module.exports = router;
