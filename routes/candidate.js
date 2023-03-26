const express = require('express')

const candidateControllers = require('../controllers/candidates/candidate')

const router = express.Router()

//router to Candidate
router.post('/', candidateControllers.createCandidate)
router.get('/candidate/:id', candidateControllers.getCandidateById)
router.put('/candidate/:id', candidateControllers.updateCandidate)
router.delete('/candidate/:id', candidateControllers.deleteCandidate)
router.get('/candidates', candidateControllers.getCandidates)
router.get('/search/:email', candidateControllers.searchCandidates)

module.exports = router