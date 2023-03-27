const express = require('express')

const commentControllers = require('../controllers/comments/comment')

const router = express.Router()

//router to Comment
router.post('/', commentControllers.createComment)
router.get('/:id', commentControllers.getCommentById)
router.put('/:id', commentControllers.updateComment)
router.delete('/:id', commentControllers.deleteComment)
router.get('/comments/:id', commentControllers.getComments)
router.get('/:email', commentControllers.searchComments)

module.exports = router