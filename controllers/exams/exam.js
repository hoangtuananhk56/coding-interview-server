const Exam = require("../../models/exams/exam");
const Axios = require("axios");

const createExam = async (req, res) => {
  const {
    title,
    challenge_type,
    type,
    content,
    coding,
    checkbox,
    radio,
    writing,
  } = req.body;

  // Simple validation
  try {
    // All good
    const newExam = new Exam({
      title,
      challenge_type,
      type,
      content,
      coding,
      checkbox,
      radio,
      writing,
    });
    await newExam.save();

    res.json({
      success: true,
      message: "Exam created successfully",
      data: newExam,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
const updateExam = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  Exam.findByIdAndUpdate(req.params.id, {
    title: body.title,
    challenge_type: body.challenge_type,
    type: body.type,
    content: body.content,
    coding: body.coding,
    checkbox: body.checkbox,
    radio: body.radio,
    writing: body.writing,
  })
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "Challenge updated!",
      });
    })
    .catch((error) => {
      return res.status(404).json({
        error,
        message: "Challenge not updated!",
      });
    });
};

const deleteExam = async (req, res) => {
  await Exam.findByIdAndDelete({ _id: req.params.id }) // conditition
    .then((Exams) => {
      if (!Exams) {
        return res
          .status(404)
          .json({ success: false, error: `Exams not found` });
      }
      return res.status(200).json({
        success: true,
        data: Exams,
      });
    });
};

const getExamById = async (req, res) => {
  await Exam.findById({ _id: req.params.id }) // conditition
    .then((Exams) => {
      if (!Exams) {
        return res
          .status(404)
          .json({ success: false, error: `Exams not found` });
      }
      return res.status(200).json({
        success: true,
        data: Exams,
      });
    });
};

const getExams = async (req, res) => {
  let perPage = req.query.perPage;
  let page = req.query.page || 1;
  let challengeType = req.query.challengeType || "sql";
  let count = await Exam.countDocuments({ challenge_type: challengeType });
  await Exam.find({ challenge_type: challengeType }) // conditition
    .skip(perPage * page - perPage)
    .limit(perPage)
    .sort({ updatedAt: -1 })
    .then((exams) => {
      if (!exams.length) {
        return res
          .status(404)
          .json({ success: false, error: `Exam not found` });
      }
      return res.status(200).json({
        success: true,
        data: exams,
        count: count,
        perPage: perPage,
        page: page,
      });
    });
};

const searchExams = async (req, res) => {
  let perPage = req.query.perPage;
  let page = req.query.page || 1;
  let challenge_type = req.query.type || "SQL";
  let count = await Exam.countDocuments({
    title: { $regex: req.params.title },
    challenge_type: challenge_type,
  });
  await Exam.find({
    title: { $regex: req.params.title },
    challenge_type: challenge_type,
  }) // conditition
    .skip(perPage * page - perPage)
    .limit(perPage)
    .sort({ updatedAt: -1 })
    .then((Exams) => {
      if (!Exams.length) {
        return res
          .status(404)
          .json({ success: false, error: `Exams not found` });
      }
      return res.status(200).json({
        success: true,
        data: Exams,
        count: count,
        perPage: perPage,
        page: page,
      });
    });
};

const searchListExams = async (req, res) => {
  let perPage = req.query.perPage;
  let page = req.query.page || 1;
  let count = await Exam.countDocuments({
    title: { $regex: req.params.title },
  });
  await Exam.find({
    title: { $regex: req.params.title },
  }) // conditition
    .skip(perPage * page - perPage)
    .limit(perPage)
    .sort({ updatedAt: -1 })
    .then((Exams) => {
      if (!Exams.length) {
        return res
          .status(404)
          .json({ success: false, error: `Exams not found` });
      }
      return res.status(200).json({
        success: true,
        data: Exams,
        count: count,
        perPage: perPage,
        page: page,
      });
    });
};

const runCode = async (req, res) => {
  let code = req.body.code;
  let language = req.body.language;
  let input = req.body.input;

  let data = {
    code: code,
    language: language,
    input: input,
  };

  let config = {
    method: "post",
    url: "https://api.codex.jaagrav.in",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  //calling the code compilation API
  await Axios(config)
    .then((response) => {
      //Check response with result of exam
      res.send(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
module.exports = {
  createExam,
  updateExam,
  deleteExam,
  getExams,
  getExamById,
  searchExams,
  runCode,
  searchListExams,
};
