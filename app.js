const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');
const auth = require('./middlewares/auth');
const {login,  createProfile} = require('./controllers/users');

const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const { PORT = 3000 } = process.env;

// app.use(cookieParser());
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '60350ae43f936b4411598684',
  };

  next();
});

app.post('/signin', login);
app.post('/signup', createProfile);
app.use(auth);
app.use('/', usersRouter, cardsRouter);


app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT);
