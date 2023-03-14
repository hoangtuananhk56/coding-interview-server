const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Challenge = new Schema(
    {
        name: { type: String, required: true },
        examids: [String]
    },
    { timestamps: true },
)

module.exports = mongoose.model('challenges', Challenge)