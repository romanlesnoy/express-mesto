module.exports.customError = (text) => {
  const err = new Error(text);
  err.statusCode = 404;
  throw err;
};
