const Challenge = require('../../models/challenges/challenge')

const createChallenge = async (req, res) => {
	const { examid, name } = req.body
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

    Challenge.findOne({ _id: req.params.id }, (err, challenge) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Challenge not found!',
            })
        }
        challenge.name = body.name
        challenge.time = body.time
        challenge.examids = body.examids
        challenge
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: challenge._id,
                    message: 'Challenge updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Challenge not updated!',
                })
            })
    })
}

const deleteChallenge = async (req, res) => {
    await Challenge
    .findByIdAndDelete({ _id: req.params.id }) // conditition
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
            data: challenges
        })
    });
}

const getChallengeById = async (req, res) => {
    await Challenge
    .findById({ _id: req.params.id }) // conditition
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
            data: challenges
        })
    });
}

const getChallenges = async (req, res) => {
    let perPage = 25;
    let page = req.params.page || 1;
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
                data: challenges
            })
        });
}

const searchChallenges = async (req, res) => {
    let perPage = 25;
    let page = req.params.page || 1;
    await Challenge
        .find({email: res.params.email}) // conditition
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
                data: challenges
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