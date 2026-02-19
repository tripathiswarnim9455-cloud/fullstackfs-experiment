const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
const cardRoutes = require('./routes/cards');
app.use('/cards', cardRoutes);
app.get('/', (req, res) => {
    res.send('Playing Card Collection API is running...');
});
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
