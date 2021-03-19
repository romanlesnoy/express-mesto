module.exports.customError = (text) => {
  class NotFoundError extends Error {
    constructor(...params) {
      super(...params);
      this.name = 'NotFoundError';
    }
  }
  const err = new NotFoundError(text);
  err.statusCode = 404;
  throw err;
};
