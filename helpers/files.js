const fsPromises = require('fs').promises;

const getDataFromFile = (pathToFile, res) => {
    return fsPromises.readFile(pathToFile, {encoding: 'utf-8'})
        .then(data => JSON.parse(data))
        .catch(err => res.status(500).send({ message: `Произошла ошибка сервера: ${err}`}))
}

module.exports = getDataFromFile;