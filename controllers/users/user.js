const User = require('../../models/users/user')

const updateUser = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    User.findOne({ _id: req.query.id }.then((user) => {
        if (!user) {
            return res.status(404).json({ success: false, error: `User not found` })
        }
        user.name = body.name
        user.time = body.time
        user.resolve = body.resolve
        user.point = body.point
        user.challenge = body.challenge
        user.phone = body.phone
        user
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: user._id,
                    message: 'User updated!',
                })
            })
    }))
}

const deleteUser = async (req, res) => {
    await User.findOneAndDelete({ _id: req.query.id }.then((user) => {
        if (!user) {
            return res.status(404).json({ success: false, error: `User not found` })
        }
        return res.status(200).json({ success: true, data: user })
    }))
}

const getUserById = async (req, res) => {
    await User.findById({ _id: req.query.id }).then((user) => {
        if( !user) {
            return res.status(404).json({ success: false, error: `Users not found` })
        }
        return res.status(200).json({
            success: true,
            data: user
        })
    })
}

const getUsers = async (req, res) => {
    let perPage = req.query.perPage;
    let page = req.query.page || 1;
    await User
        .find() // conditition
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .then((users) => {
            if (!users.length) {
                return res
                    .status(404)
                    .json({ success: false, error: `Users not found` })
            }
            return res.status(200).json({
                success: true,
                data: users
            })
        });
}

module.exports = {
    updateUser,
    deleteUser,
    getUsers,
    getUserById,
}