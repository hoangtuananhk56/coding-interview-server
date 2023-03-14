const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Candidate = new Schema(
    {
        name: { type: String, required: false },
        email: { type: String, required: true },
        testid:{type: String},
        resolve: {type: String},
        point: {type: Number},
        challenge: {type: String},
        phone: {type: String},
    },
    { timestamps: true },
)

module.exports = mongoose.model('candidates', Candidate)