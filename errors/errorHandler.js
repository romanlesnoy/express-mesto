module.exports.errorHandler = (error) => {
  if (error.name === 'NotFoundError') {
    return error.statusCode, error.message
  } else if (error.name === 'CastError' || error.name === 'ValidationError') {
    error.statusCode = '400',
    error.message = 'Переданны некорректные данные'
    return (error,  error.message, error.statusCode)
  } else {
    error.statusCode = 500, error.message = 'Произошла ошибка сервера'
    return error.statusCode, error.message
  }
}
