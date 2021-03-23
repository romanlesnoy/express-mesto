const User = require("../models/user");
const { customError } = require("../errors/customErrors");
const { errorHandler } = require("../errors/errorHandler");
const bcrypt = require("bcrypt");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) =>
      res.status(500).send({ message: `Произошла ошибка сервера ${err}` })
    );
};

const getProfile = (req, res) => {
  User.findById({ _id: req.params.id })
    .orFail(() => {
      customError("Данные не найдены");
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "Переданны некорректные данные" });
      } else if (err.statusCode === 404) {
        res.status(err.statusCode).send({ message: `${err.message}` });
      } else {
        res.status(500).send({ message: `Произошла ошибка сервера ${err}` });
      }
    });
};

const createProfile = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  if (password.lenght < 8) {
    customError("Минимальная длина пароля 8 символов");
  }
  if (!email || !password) {
    return res.status(400).send({ message: "Не передан имейл или пароль" });
  }
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      return User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      });
    })
    .then((user) => {
      res.status(200).send(user);
      console.log(user);
    })
    .catch((err) => {
      console.log(err)
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Переданны некорректные данные" });
      } else {
        res.status(500).send({ message: `Произошла ошибка сервера ${err}` });
      }
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { runValidators: true, new: true }
  )
    .then((updateProfileData) => {
      console.log(updateProfileData);
      res.status(200).send(updateProfileData);
    })
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        const errorData = errorHandler(err);
        const { status, message } = errorData;
        console.log(errorData);
        res.status(400).send({ message: "Переданны некорректные данные" });
      } else {
        res.status(500).send({
          message: `Произошла ошибка сервера ${err}. Не удалось обновить данные пользователя`,
        });
      }
    });
};

const updateProfileAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { runValidators: true, new: true }
  )
    .then((updateProfileData) => {
      res.status(200).send(updateProfileData);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Переданны некорректные данные" });
      } else {
        res.status(500).send({
          message: `Произошла ошибка сервера ${err}. Не удалось обновить аватар пользователя`,
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
