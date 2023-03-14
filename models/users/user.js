const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
    {
        name: { type: String, required: false },
        username: { type: String, required: true },
        password:{type: String, required: true},
        point:{type: String, required: false},
        challenge:{type: String, required: false},
        point:{type: String, required: false},
        phone:{type: String, required: false},
        role: {type: String, required: false}
    },
    { timestamps: true },
)

module.exports = mongoose.model('users', User)