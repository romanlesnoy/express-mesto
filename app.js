const express = require('express');
const path = require('path');
const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');
const app = express();

const { PORT = 3000 } = process.env;

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', usersRouter, cardsRouter);

app.use('*', (req, res) => {
    res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT)