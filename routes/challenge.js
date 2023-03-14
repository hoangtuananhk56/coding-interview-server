const express = require('express')

const challengeControllers = require('../controllers/challenges/challenge')

const router = express.Router()

//router to Challenge
router.post('/', challengeControllers.createChallenge)
router.get('/:id', challengeControllers.getChallengeById)
router.put('/:id', challengeControllers.updateChallenge)
router.delete('/:id', challengeControllers.deleteChallenge)
router.get('/challenges', challengeControllers.getChallenges)
router.get('/:name', challengeControllers.searchChallenges)

module.exports = router