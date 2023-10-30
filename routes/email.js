const express = require("express");

const emailControllers = require("../controllers/emails/email");

const router = express.Router();

//router to Exam
router.post("/", emailControllers.sendEmail);

module.exports = router;
