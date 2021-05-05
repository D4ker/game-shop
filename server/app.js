const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const https = require('https');
const fs = require('fs');

const httpPort = 8000;

const app = express();

const httpsOptions = {
    key: fs.readFileSync('key.pem'), // путь к ключу
    cert: fs.readFileSync('cert.pem') // путь к сертификату
}

const httpsServer = https.createServer(httpsOptions, app);

app.use(express.json({extended: true}));

app.use(bodyParser.json());

app.use('/api', require('./route'));

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, '../dist')));
}

app.listen(httpPort, () => {
    console.log(`Server has been started port ${httpPort}...`);
});

httpsServer.listen(443, () => {
    console.log('Server has been started port 443');
});
