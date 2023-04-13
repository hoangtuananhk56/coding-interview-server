const Challenge = require('../../models/challenges/challenge')

const createChallenge = async (req, res) => {
	const { examids, name } = req.body
	try {
		// All good
		const newChallenge = new Challenge({ examids, name })
		await newChallenge.save()

		res.json({
			success: true,
			message: 'Challenge created successfully',
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
}
const updateChallenge = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }
    Challenge.findByIdAndUpdate(req.params.id, {
        name : body.name,
        examids : body.examids
    }).then(() => {
        return res.status(200).json({
            success: true,
            message: 'Challenge updated!',
        })
    })
    .catch(error => {
        return res.status(404).json({
            error,
            message: 'Challenge not updated!',
        })
    })
}

const deleteChallenge = async (req, res) => {
    await Challenge
    .findByIdAndDelete({ _id: req.params.id }) // conditition
    .then((challenges) => {
        if (!challenges) {
            return res
                .status(404)
                .json({ success: false, error: `Challenges not found` })
        }
        return res.status(200).json({
            success: true,
            data: challenges
        })
    });
}

const getChallengeById = async (req, res) => {
    await Challenge
    .findById({ _id: req.params.id }) // conditition
    .then((challenges) => {
        if (!challenges) {
            return res
                .status(404)
                .json({ success: false, error: `Challenges not found` })
        }
        return res.status(200).json({
            success: true,
            data: challenges
        })
    });
}

const getChallenges = async (req, res) => {
    let perPage = req.query.perPage;
    let page = req.query.page || 1;
    let count = await Challenge.countDocuments({})
    await Challenge
        .find() // conditition
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .then((challenges) => {
            if (!challenges.length) {
                return res
                    .status(404)
                    .json({ success: false, error: `Challenges not found` })
            }
            return res.status(200).json({
                success: true,
                data: challenges,
                count: count,
                perPage: perPage,
                page: page
            })
        });
}

const searchChallenges = async (req, res) => {
    let perPage = req.query.perPage;
    let page = req.query.page || 1;
    let count = await Challenge.countDocuments({ name: {$regex: req.params.name}})
    await Challenge
        .find({name: {$regex: req.params.name}}) // conditition
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .then((challenges) => {
            if (!challenges.length) {
                return res
                    .status(404)
                    .json({ success: false, error: `Challenges not found` })
            }
            return res.status(200).json({
                success: true,
                data: challenges,
                count: count,
                perPage: perPage,
                page: page
            })
        });
}

module.exports = {
    createChallenge,
    updateChallenge,
    deleteChallenge,
    getChallenges,
    getChallengeById,
    searchChallenges
}