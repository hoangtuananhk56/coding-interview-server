const express = require('express')

const examControllers = require('../controllers/exams/exam')

const router = express.Router()

//router to Exam
router.post('/', examControllers.createExam)
router.get('/:id', examControllers.getExamById)
router.put('/:id', examControllers.updateExam)
router.delete('/:id', examControllers.deleteExam)
router.get('/candidates', examControllers.getExams)
router.get('/:email', examControllers.searchExams)

module.exports = router