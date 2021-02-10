const path = require('path');
const getDataFromFile = require('../helpers/files.js');

const dataPath = path.join(__dirname, '..', 'data', 'users.json')

const getUsers = (req, res) => {
    return getDataFromFile(dataPath, res)
        .then (users => res.status(200).send(users))
        .catch(err => res.status(400).send({ message: `Произошла ошибка сервера ${err}`}))
}

const getProfile = (req, res) => {
    return getDataFromFile(dataPath, res)
        .then (users => users.find(user => user._id === req.params.id))
        .then (user => {
            if(!user) {
                res.status(404).send({ message: "Нет пользователя с таким id"})
            }

            res.status(200).send(user)

        })
        .catch(err => res.status(400).send({ message: `Произошла ошибка ${err}`}))
}

module.exports = {getUsers, getProfile};