const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/token')

const User = require('../models/users/user')
const authController = require('../controllers/auth/auth')

// @route GET api/auth
// @desc Check if user is logged in
// @access Public
router.get('/', verifyToken, async (req, res) => {
	try {
		const user = await User.findById(req.userId).select('-password')
		if (!user)
			return res.status(400).json({ success: false, message: 'User not found' })
		res.json({ success: true, user })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', authController.register)

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post('/login', authController.login)

module.exports = router