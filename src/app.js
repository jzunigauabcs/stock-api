const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send('<h1>Hola mundo</h1>');
});

module.exports = app;
