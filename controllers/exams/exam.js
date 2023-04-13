const Exam = require('../../models/exams/exam')

const createExam = async (req, res) => {
    const { title, challenge_type, type,content, coding, checkbox, radio, writting } = req.body

    // Simple validation
    try {
        // All good
        const newExam = new Exam({ title, challenge_type, type, content, coding, checkbox, radio, writting })
        await newExam.save()

        res.json({
            success: true,
            message: 'Exam created successfully',
            data: newExam
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

    Exam.findByIdAndUpdate(req.params.id, {
        title : body.title,
        challenge_type : body.challenge_type,
        type: body.type,
        coding: body.coding,
        checkbox: body.checkbox,
        radio: body.radio,
        writting: body.writting,
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

const deleteExam = async (req, res) => {
    await Exam
        .findByIdAndDelete({ _id: req.params.id }) // conditition
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
        .findById({ _id: req.params.id }) // conditition
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
    console.log(req.query.perPage);
    let perPage = req.query.perPage;
    let page = req.query.page || 1;
    let count = await Exam.countDocuments({})
    await Exam
        .find() // conditition
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .then((exams) => {
            if (!exams.length) {
                return res
                    .status(404)
                    .json({ success: false, error: `Exam not found` })
            }
            return res.status(200).json({
                success: true,
                data: exams,
                count: count,
                perPage: perPage,
                page: page
            })
        });
}

const searchExams = async (req, res) => {
    let perPage = req.query.perPage;
    let page = req.query.page || 1;
    let count = await Exam.countDocuments({ title: {$regex: req.params.title}})
    await Exam
        .find({ title: {$regex: req.params.title} }) // conditition
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
                data: Exams,
                count: count,
                perPage: perPage,
                page: page
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