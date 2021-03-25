const jwt = require('jsonwebtoken');
const AuthError = require("../errors/auth-error");

module.exports = (req, res, next) => {
  console.log(req.headers)
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError("Необходима авторизация");
  }

  const token = authorization.replace('Bearer ', '');;
  let payload;

  try {
    payload = jwt.verify(token, "super-strong-secret");
    console.log(token)
  } catch (err) {
    throw new AuthError("Необходима авторизация");
  }

  req.user = payload;
  console.log(payload);

  next();
};