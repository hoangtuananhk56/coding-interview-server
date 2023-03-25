const Exam = require('../../models/exams/exam')

const createExam = async (req, res) => {
    const { title, challenge_type, type, coding, checkbox, radio, writting } = req.body

    // Simple validation
    try {
        // All good
        const newExam = new Exam({ title, challenge_type, type, coding, checkbox, radio, writting })
        await newExam.save()

        res.json({
            success: true,
            message: 'Exam created successfully',
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}
const updateExam = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Exam.findOne({ _id: req.params.id }, (err, exam) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Exam not found!',
            })
        }
        exam.title = body.name
        exam.challenge_type = body.time
        exam.type = body.email
        exam.coding = body.phone
        exam.checkbox = body.phone
        exam.radio = body.phone
        exam.writting = body.writting
        exam
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: exam._id,
                    message: 'Exam updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Exam not updated!',
                })
            })
    })
}

const deleteExam = async (req, res) => {
    await Exam
        .findByIdAndDelete({ _id: res.params.id }) // conditition
        .then((Exams) => {
            if (!Exams) {
                return res
                    .status(404)
                    .json({ success: false, error: `Exams not found` })
            }
            return res.status(200).json({
                success: true,
                data: Exams
            })
        });
}

const getExamById = async (req, res) => {
    await Exam
        .findById({ _id: res.params.id }) // conditition
        .then((Exams) => {
            if (!Exams) {
                return res
                    .status(404)
                    .json({ success: false, error: `Exams not found` })
            }
            return res.status(200).json({
                success: true,
                data: Exams
            })
        });
}

const getExams = async (req, res) => {
    let perPage = 25;
    let page = req.params.page || 1;
    await Exam
        .find() // conditition
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .then((Exams) => {
            if (!Exams.length) {
                return res
                    .status(404)
                    .json({ success: false, error: `Exams not found` })
            }
            return res.status(200).json({
                success: true,
                data: Exams
            })
        });
}

const searchExams = async (req, res) => {
    let perPage = 25;
    let page = req.params.page || 1;
    await Exam
        .find({ title: res.params.title }) // conditition
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .then((Exams) => {
            if (!Exams.length) {
                return res
                    .status(404)
                    .json({ success: false, error: `Exams not found` })
            }
            return res.status(200).json({
                success: true,
                data: Exams
            })
        });
}

module.exports = {
    createExam,
    updateExam,
    deleteExam,
    getExams,
    getExamById,
    searchExams
}