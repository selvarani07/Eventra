const express = require('express');
const db = require('../database');
const router = express.Router();

// Get all allocations
router.get('/', (req, res) => {
    db.all(`
    SELECT a.id, a.event_id, a.resource_id, e.title as event_title, r.name as resource_name, e.start_time, e.end_time
    FROM allocations a
    JOIN events e ON a.event_id = e.id
    JOIN resources r ON a.resource_id = r.id
  `, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Create allocation with CONFLICT DETECTION
router.post('/', (req, res) => {
    const { event_id, resource_id } = req.body;

    // 1. Get the target event's timing
    db.get("SELECT start_time, end_time FROM events WHERE id = ?", [event_id], (err, targetEvent) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!targetEvent) return res.status(404).json({ error: "Event not found" });

        const newStart = new Date(targetEvent.start_time).getTime();
        const newEnd = new Date(targetEvent.end_time).getTime();

        // 2. Check for conflicts with existing allocations for this resource
        const query = `
      SELECT e.start_time, e.end_time, e.title 
      FROM allocations a 
      JOIN events e ON a.event_id = e.id 
      WHERE a.resource_id = ?
    `;

        db.all(query, [resource_id], (err, existingAllocations) => {
            if (err) return res.status(500).json({ error: err.message });

            const conflict = existingAllocations.find(alloc => {
                const existStart = new Date(alloc.start_time).getTime();
                const existEnd = new Date(alloc.end_time).getTime();

                // Overlap logic: (StartA < EndB) && (EndA > StartB)
                return (newStart < existEnd && newEnd > existStart);
            });

            if (conflict) {
                return res.status(409).json({
                    error: "Resource conflict detected",
                    details: `Resource is already booked for '${conflict.title}' from ${conflict.start_time} to ${conflict.end_time}`
                });
            }

            // 3. No conflict, create allocation
            db.run("INSERT INTO allocations (event_id, resource_id) VALUES (?, ?)", [event_id, resource_id], function (err) {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ id: this.lastID, event_id, resource_id });
            });
        });
    });
});

module.exports = router;
