const {Schema, model} = require('mongoose');
const { ObjectId } = require('mongodb');

const cardSchema = new Schema ({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
    },
    link: {
        type: String,
        required: true,
        validate: {
            validator(v) {
                console.log(v)
                const regExpForUelValidate = /^((http|https):\/\/)(www\.)?([\w\W\d]{1,})(\.)([\w\W\d]{1,})$/g
                return regExpForUelValidate.test(v)
            },
            message: "Введите корректную ссылку",
        }
    },
    owner: {
        type: ObjectId,
        required: true,
    },
    likes: {
        type: [ObjectId],
        required: true,
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = model('card', cardSchema);