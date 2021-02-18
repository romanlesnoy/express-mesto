const {Schema, model} = require('mongoose');

const userSchema = new Schema ({
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
            validator: function (v) {
                return //.test(v);
            },
            message
        }
    }
})

module.exports = model('user', userSchema);