const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Exam = new Schema(
  {
    title: { type: String, required: true },
    challenge_type: { type: String, required: true },
    type: { type: String, required: true },
    content: { type: String, required: true },
    coding: {
      input: String,
      output: String,
      testcase: [
        {
          input: { type: String, required: false },
          output: { type: String, required: false },
        },
      ],
    },
    checkbox: [
      {
        ischeck: Boolean,
        option: String,
      },
    ],
    radio: [
      {
        ischeck: Boolean,
        option: String,
      },
    ],
    writing: {
      result: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("exams", Exam);
