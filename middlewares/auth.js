const jwt = require('jsonwebtoken');
const { customError } = require("../errors/customErrors");

module.exports = (req, res, next) => {
  console.log(req.headers)
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    console.log("1")
    res.status(401).send({ message: 'Необходима авторизация' });
    return;
  }

  const token = authorization.replace('Bearer ', '');;
  let payload;

  try {
    payload = jwt.verify(token, "super-strong-secret");
    console.log(token)
  } catch (err) {
    console.log("2")
    res.status(401).send({ message: 'Необходима авторизация' });
  }

  req.user = payload;

  next();
};