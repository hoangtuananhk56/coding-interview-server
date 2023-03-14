const express = require('express')

const userControllers = require('../controllers/users/user')

const router = express.Router()

//router to User
router.get('/user/:id', userControllers.getUserById)
router.put('/user/:id', userControllers.updateUser)
router.delete('/user/:id', userControllers.deleteUser)
router.get('/users', userControllers.getUsers)

module.exports = router