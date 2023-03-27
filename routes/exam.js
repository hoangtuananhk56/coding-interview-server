const express = require('express')

const examControllers = require('../controllers/exams/exam')

const router = express.Router()

//router to Exam
router.post('/', examControllers.createExam)
router.get('/exam/:id', examControllers.getExamById)
router.put('/exam/:id', examControllers.updateExam)
router.delete('/exam/:id', examControllers.deleteExam)
router.get('/exams', examControllers.getExams)
router.get('/search/:title', examControllers.searchExams)

module.exports = router