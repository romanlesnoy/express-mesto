const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const regExpForUelValidate = /^((http|https):\/\/)(www\.)?([\w\W\d]{1,})(\.)([\w\W\d]{1,})$/g;
        return regExpForUelValidate.test(v);
      },
      message: 'Введите корректную ссылку',
    },
  },
});

module.exports = model('user', userSchema);
