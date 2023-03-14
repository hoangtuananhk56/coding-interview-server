const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Comment = new Schema(
    {
        name: { type: String, required: false },
        candidate_id: { type: String, required: true },
        content:{type: String},
    },
    { timestamps: true },
)

module.exports = mongoose.model('comments', Comment)