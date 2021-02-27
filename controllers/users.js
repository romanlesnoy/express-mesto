const path = require("path");
const User = require("../models/user");

const getUsers = (req, res) => {
    User.find({})
        .then((users) => res.status(200).send(users))
        .catch((err) =>
            res.status(500).send({ message: `Произошла ошибка сервера ${err}` })
        );
};

const getProfile = (req, res) => {
    User.findById({ _id: req.params.id })
        .then((user) => {
            if (!user) {
                res.status(404).send({
                    message: "Нет пользователя с таким id",
                });
            }
            res.status(200).send(user);
        })
        .catch((err) => {
            if (err.name === "CastError") {
                res.status(400).send({ message: "Переданны некорректные данные" });
            } else {
                res.status(500).send({ message: `Произошла ошибка сервера ${err}` });
            }
        });
};

const createProfile = (req, res) => {
    const { name, about, avatar } = req.body;
    User.create({ name, about, avatar })
        .then((user) => {
            res.status(200).send(user);
        })
        .catch((err) => {
            if (err.name === "ValidationError") {
                res.status(400).send({ message: "Переданны некорректные данные" });
            } else {
                res.status(500).send({ message: `Произошла ошибка сервера ${err}` });
            }
        });
};

const updateProfile = (req, res) => {
    const { name, about } = req.body;
    User.findByIdAndUpdate(req.user._id, { name, about })
        .then((updateProfileData) => {
            console.log(updateProfileData);
            res.status(200).send(updateProfileData);
        })
        .catch((err) => {
            if (err.name === "ValidationError") {
                res.status(400).send({ message: "Переданны некорректные данные" });
            } else {
                res.status(500).send({
                    message: `Произошла ошибка сервера ${err}. Не удалось обновить данные пользователя`
                });
            }
        });
};

const updateProfileAvatar = (req, res) => {
    const { avatar } = req.body;
    User.findByIdAndUpdate(req.user._id, { avatar })
        .then((updateProfileData) => {
            console.log(updateProfileData);
            res.status(200).send(updateProfileData);
        })
        .catch((err) => {
            if (err.name === "ValidationError") {
                res.status(400).send({ message: "Переданны некорректные данные" });
            } else {
                res.status(500).send({
                    message: `Произошла ошибка сервера ${err}. Не удалось обновить аватар пользователя`
                });
            }
        });
};

module.exports = {
    getUsers,
    getProfile,
    createProfile,
    updateProfile,
    updateProfileAvatar,
};