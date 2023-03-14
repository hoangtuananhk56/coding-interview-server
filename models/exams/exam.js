const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Exam = new Schema(
    {
        title: { type: String, required: true },
        challenge_type: { type: String, required: true },
        type: { type: String, required: true },
        coding: {
            content: String,
            input: String,
            output: String,
            testcase: [{
                input: { type: String, required: false },
                output: { type: String, required: false }
            }]
        },
        checkbox: {
            content: String,
            result: [{
                isCheck: Boolean,
                option: String,
            }]
        },
        radio: {
            content: String,
            result: [{
                isCheck: Boolean,
                option: String,
            }]
        },
        writting: {
            content: String,
            result: String
        }
    },
    { timestamps: true },
)


module.exports = mongoose.model('exams', Exam)