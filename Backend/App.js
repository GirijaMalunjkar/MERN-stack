const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const ConnectDb = require('./config/db');
const route = require('./route/routes');

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

// Testing server
app.get('/', (req, res) => {
    res.send('Zingalbell');
});

// Remove '/api' prefix for the routes
app.use(route);

const port = process.env.PORT || 5000;

ConnectDb();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
