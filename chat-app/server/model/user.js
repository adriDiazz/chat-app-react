const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        maxlength: 50,
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    isAvatarImage: {
        type: Boolean,
        default: false
    },
    avatarImage: {
        type: String,
        default:""
    }
})
const User = model('User', userSchema);
module.exports = User;