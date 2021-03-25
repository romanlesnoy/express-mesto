const Card = require('../models/card');
const { customError } = require('../errors/customErrors');
const { errorHandler } = require('../errors/errorHandler');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка сервера ${err}` }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner})
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданны некорректные данные' });
      } else {
        res
          .status(500)
          .send({
            message: `Произошла ошибка сервера ${err}. Не удалось создать карточку`,
          });
      }
    });
};

const deleteCard = (req, res) => {
  const owner = req.user._id;
  Card.findOne({ _id: req.params.cardId })
    .orFail(() =>  customError('Данные не найдены'))
    .then((card) => {
      if (String(card.owner) !== owner) {
        customError('Недостаточно прав!');
      }
      return Card.findByIdAndRemove(card._id)
    })
    .then(() => {
      res.status(200).send({ message: 'Карточка удалена' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданны некорректные данные' });
      } else if (err.statusCode === 404) {
        res.status(err.statusCode).send({ message: `${err.message}` });
      } else {
        res
          .status(500)
          .send({
            message: `Произошла ошибка сервера ${err}. Не удалось удалить карточку`,
          });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      customError('Данные не найдены');
    })
    .then((likedCard) => {
      res.status(200).send(likedCard);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданны некорректные данные' });
      } else if (err.statusCode === 404) {
        console.log(err);
        res.status(err.statusCode).send({ message: `${err.message}` });
      } else {
        res.status(500).send({ message: `Произошла ошибка сервера ${err}` });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      customError('Данные не найдены');
    })
    .then((dislikedCard) => {
      res.status(200).send(dislikedCard);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданны некорректные данные' });
      } else if (err.statusCode === 404) {
        res.status(err.statusCode).send({ message: `${err.message}` });
      } else {
        res.status(500).send({ message: `Произошла ошибка сервера ${err}` });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
