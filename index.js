const express = require('express');
const cors = require('cors');
const db = require('./database');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const resourceRoutes = require('./routes/resources');
const eventRoutes = require('./routes/events');
const allocationRoutes = require('./routes/allocations');
const reportRoutes = require('./routes/reports');

app.use('/api/auth', authRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/allocations', allocationRoutes);
app.use('/api/reports', reportRoutes);

app.get('/', (req, res) => {
    res.send('Eventra API is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
