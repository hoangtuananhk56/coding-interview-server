const express = require('express')

const challengeControllers = require('../controllers/challenges/challenge')

const router = express.Router()

//router to Challenge
router.post('/', challengeControllers.createChallenge)
router.get('/challenge/:id', challengeControllers.getChallengeById)
router.put('/challenge/:id', challengeControllers.updateChallenge)
router.delete('/challenge/:id', challengeControllers.deleteChallenge)
router.get('/challenges', challengeControllers.getChallenges)
router.get('/search/:name', challengeControllers.searchChallenges)

module.exports = router