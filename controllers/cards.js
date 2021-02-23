const path = require('path');
// const getDataFromFile = require('../helpers/files.js');
const Card = require('../models/card');

// const dataPath = path.join(__dirname, '..', 'data', 'cards.json')

const getCards = (req, res) => {
    return Card.find({})
        .then (cards => res.status(200).send(cards))
        .catch(err => res.status(400).send({ message: `Произошла ошибка ${err}`}))
}

module.exports = getCards;