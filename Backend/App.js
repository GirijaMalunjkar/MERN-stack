const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const ConnectDb = require('./config/db');
const route = require('./route/routes');

const app = express();

dotenv.config();

app.use(cors()); // You can adjust the cors configuration based on your needs
app.use(express.json());

// Testing server
app.get('/', (req, res) => {
    res.send('Zingalbell');
});

app.use('/api', route);

const port = process.env.PORT || 5000;

ConnectDb();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
