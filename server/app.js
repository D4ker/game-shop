const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const db = require('./models');

const { game } = require('./models');

const httpPort = 8000;

const app = express();

app.use(express.json({extended: true}));

app.use(bodyParser.json());

app.use('/api', require('./route'));

app.listen(httpPort, () => {
    console.log(`Server has been started port ${httpPort}...`);
});
