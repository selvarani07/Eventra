const express = require('express');
const db = require('../database');
const router = express.Router();

// Utilization Report
router.get('/utilization', (req, res) => {
    const { start_date, end_date } = req.query;
    // If no dates provided, default to all time? Or require dates.
    // For simplicity, we'll calculate basic stats.

    // Logic: For each resource, sum duration of events allocated to it within the range.
    const query = `
    SELECT 
      r.id, r.name, r.type,
      e.start_time, e.end_time
    FROM resources r
    LEFT JOIN allocations a ON r.id = a.resource_id
    LEFT JOIN events e ON a.event_id = e.id
  `;

    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });

        // Process in JS to handle date range filtering and summation
        const stats = {};

        rows.forEach(row => {
            if (!stats[row.id]) {
                stats[row.id] = { id: row.id, name: row.name, type: row.type, total_hours: 0, bookings: 0 };
            }

            if (row.start_time && row.end_time) {
                const s = new Date(row.start_time);
                const e = new Date(row.end_time);

                // Filter by query range if provided
                let include = true;
                if (start_date) {
                    if (e < new Date(start_date)) include = false;
                }
                if (end_date) {
                    if (s > new Date(end_date)) include = false;
                }

                if (include) {
                    const durationHours = (e - s) / (1000 * 60 * 60);
                    stats[row.id].total_hours += durationHours;
                    stats[row.id].bookings += 1; // Count valid bookings in range
                }
            }
        });

        res.json(Object.values(stats));
    });
});

module.exports = router;
