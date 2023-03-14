const express = require('express')

const candidateControllers = require('../controllers/candidates/candidate')

const router = express.Router()

//router to Candidate
router.post('/', candidateControllers.createCandidate)
router.get('/:id', candidateControllers.getCandidateById)
router.put('/:id', candidateControllers.updateCandidate)
router.delete('/:id', candidateControllers.deleteCandidate)
router.get('/candidates', candidateControllers.getCandidates)
router.get('/:email', candidateControllers.searchCandidates)

module.exports = router