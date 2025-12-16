const express = require('express');
const db = require('../database');
const router = express.Router();

// Get all resources
router.get('/', (req, res) => {
    db.all("SELECT * FROM resources", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Create resource
router.post('/', (req, res) => {
    const { name, type } = req.body;
    db.run("INSERT INTO resources (name, type) VALUES (?, ?)", [name, type], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, name, type });
    });
});

// Delete resource
router.delete('/:id', (req, res) => {
    db.run("DELETE FROM resources WHERE id = ?", req.params.id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Deleted", changes: this.changes });
    });
});

module.exports = router;
