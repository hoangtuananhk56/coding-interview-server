const Comment = require('../../models/comments/comment')

const createComment = async (req, res) => {
	const { candidate_id, content, name } = req.body
	try {
		// All good
		const newComment = new Comment({ candidate_id, content, name })
		await newComment.save()

		res.json({
			success: true,
			message: 'Comment created successfully',
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
}
const updateComment = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Comment.findOne({ _id: req.params.id }, (err, comment) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Comment not found!',
            })
        }
        comment.name = body.name
        comment.time = body.time
        comment.content = body.content
        comment
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: comment._id,
                    message: 'Comment updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Comment not updated!',
                })
            })
    })
}

const deleteComment = async (req, res) => {
    await Comment.findOneAndDelete({ _id: req.params.id }, (err, comment) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!comment) {
            return res
                .status(404)
                .json({ success: false, error: `Comment not found` })
        }

        return res.status(200).json({ success: true, data: comment })
    }).catch(err => console.log(err))
}

const getCommentById = async (req, res) => {
    await Comment.findOne({ _id: req.params.id }, (err, comment) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!comment) {
            return res
                .status(404)
                .json({ success: false, error: `Comment not found` })
        }
        return res.status(200).json({ success: true, data: comment })
    }).catch(err => console.log(err))
}

const getComments = async (req, res) => {
    await Comment.find({}, (err, comments) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!comments.length) {
            return res
                .status(404)
                .json({ success: false, error: `Comment not found` })
        }
        return res.status(200).json({ success: true, data: comments })
    }).catch(err => console.log(err))
}

const searchComments = async (req, res) => {
    await Comment.find({email: res.params.email}, (err, comments) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!comments.length) {
            return res
                .status(404)
                .json({ success: false, error: `Comment not found` })
        }
        return res.status(200).json({ success: true, data: comments })
    }).catch(err => console.log(err))
}

module.exports = {
    createComment,
    updateComment,
    deleteComment,
    getComments,
    getCommentById,
    searchComments
}