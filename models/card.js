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
            validator: function (v) {
                return /(:?(?:https?:\/\/)?(?:www\.)?)?[-a-z0-9]+\.\w/g.test(v);
            },
            message: 'Не верные данные',
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
        required: true,
        default: Date.new,
    }
})

module.exports = model('card', cardSchema);