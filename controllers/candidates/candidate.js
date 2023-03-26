const Candidate = require('../../models/candidates/candidate')

const createCandidate = async (req, res) => {
    const { email, phone, name, challenge, testid } = req.body

    // Simple validation
    if (!email)
        return res
            .status(400)
            .json({ success: false, message: 'Missing candidatename and/or password' })

    try {
        // Check for existing candidate
        const candidate = await Candidate.findOne({ email })

        if (candidate)
            return res
                .status(400)
                .json({ success: false, message: 'Candidatename already taken Email' })

        // All good
        const newCandidate = new Candidate({ email, phone, name, challenge, testid })
        await newCandidate.save()

        res.json({
            success: true,
            message: 'Candidate created successfully',
            data: newCandidate,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}
const updateCandidate = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Candidate.findOne({ _id: req.params.id }, (err, candidate) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Candidate not found!',
            })
        }
        candidate.name = body.name
        candidate.time = body.time
        candidate.email = body.email
        candidate.phone = body.phone
        candidate.point = body.phone
        candidate.challenge = body.phone
        candidate
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: candidate._id,
                    message: 'Candidate updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Candidate not updated!',
                })
            })
    })
}

const deleteCandidate = async (req, res) => {
    await Candidate
        .findOneAndDelete({ _id: req.params.id }) // conditition
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .then((candidates) => {
            if (!candidates.length) {
                return res
                    .status(404)
                    .json({ success: false, error: `candidates not found` })
            }
            return res.status(200).json({
                success: true,
                data: candidates
            })
        });
}

const getCandidateById = async (req, res) => {
    await Candidate
        .findById({ _id: req.params.id }) // conditition
        .then((candidates) => {
            if (!candidates) {
                return res
                    .status(404)
                    .json({ success: false, error: `candidates not found` })
            }
            return res.status(200).json({
                success: true,
                data: candidates
            })
        });
}

const getCandidates = async (req, res) => {
    let perPage = req.query.perPage;
    let page = req.query.page || 1;
    let count = await Candidate.countDocuments({})
    await Candidate
        .find() // conditition
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .then((candidates) => {
            if (!candidates.length) {
                return res
                    .status(404)
                    .json({ success: false, error: `candidates not found` })
            }
            return res.status(200).json({
                success: true,
                data: candidates,
                count: count,
                perPage: perPage,
                page: page
            })
        });
}

const searchCandidates = async (req, res) => {
    let perPage = req.query.perPage;
    let page = req.query.page || 1;
    let count = await Candidate.countDocuments({ email: { $regex: req.params.email}})
    await Candidate
        .find({ email: { $regex: req.params.email}}) // conditition
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .then((candidates) => {
            if (!candidates.length) {
                return res
                    .status(404)
                    .json({ success: false, error: `candidates not found` })
            }
            return res.status(200).json({
                success: true,
                data: candidates,
                count: count,
                perPage: perPage,
                page: page
            })
        });
}

module.exports = {
    createCandidate,
    updateCandidate,
    deleteCandidate,
    getCandidates,
    getCandidateById,
    searchCandidates
}