const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {PORT} = require('./config/config');
const connect = require('./db');

const app = express();

connect(); // connecting to the mongoose db

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Redirecting requests to router
app.use('/api/v1', require('./routes'));

app.listen(process.env.PORT, () => {
    console.log(`Server running on ${PORT}`);
});