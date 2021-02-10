const path = require('path');
const getDataFromFile = require('../helpers/files.js');

const dataPath = path.join(__dirname, '..', 'data', 'cards.json')

const getCards = (req, res) => {
    return getDataFromFile(dataPath, res)
        .then (cards => res.status(200).send(cards))
        .catch(err => res.status(400).send({ message: `Произошла ошибка ${err}`}))
}

module.exports = getCards;