const path = require("path");
const Card = require("../models/card");

const getCards = (req, res) => {
    Card.find({})
        .then((cards) => res.status(200).send(cards))
        .catch((err) =>
            res.status(500).send({ message: `Произошла ошибка сервера ${err}` })
        );
};

const createCard = (req, res) => {
    const { name, link } = req.body;
    console.log(name, link, req.user._id);
    Card.create({ name, link, owner: req.user._id })
        .then((card) => {
            res.status(200).send(card);
        })
        .catch((err) => {
            if (err.name === "ValidationError") {
                res.status(400).send({ message: "Переданны некорректные данные" });
            } else {
                res.status(500).send({ message: `Произошла ошибка сервера ${err}. Не удалось создать карточку` });
            }
        });
};

const deleteCard = (req, res) => {
    Card.deleteOne({ _id: req.params.cardId })
        .then((card) => {
            console.log(card);
            res.status(200).send({ message: "Карточка удалена" });
        })
        .catch((err) => {
            if (err.name === "CastError") {
                res.status(404).send({ message: "Карточка не найдена" });
            } else {
                res.status(500).send({ message: `Произошла ошибка сервера ${err}. Не удалось удалить карточку` });
            }
        }
        );
};

const likeCard = (req, res) => {
    Card.findByIdAndUpdate(
        req.params.cardId,
        { $addToSet: { likes: req.user._id } },
        { new: true }
    )
        .then((likedCard) => {
            console.log(likedCard);
            res.status(200).send(likedCard);
        })
        .catch((err) => {
            if (err.name === "CastError") {
                res.status(400).send({ message: "Переданны некорректные данные" });
            } else {
                res.status(500).send({ message: `Произошла ошибка сервера ${err}` });
            }
        }
        );
};

const dislikeCard = (req, res) => {
    Card.findByIdAndUpdate(
        req.params.cardId,
        { $pull: { likes: req.user._id } },
        { new: true }
    )
        .then((dislikedCard) => {
            console.log(dislikedCard);
            res.status(200).send(dislikedCard);
        })
        .catch((err) => {
            if (err.name === "CastError") {
                res.status(400).send({ message: "Переданны некорректные данные" });
            } else {
                res.status(500).send({ message: `Произошла ошибка сервера ${err}` });
            }
        });
};

module.exports = { getCards, createCard, deleteCard, likeCard, dislikeCard };
