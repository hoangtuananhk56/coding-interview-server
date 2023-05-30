const express = require("express");
const cors = require("cors");
const Axios = require("axios");
const db = require('./db')
const validateToken = require('./middleware/token')
const app = express();

const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')
const candidateRouter = require('./routes/candidate')
const commentRouter = require('./routes/comment')
const examRouter = require('./routes/exam')
const challengeRouter = require('./routes/challenge')

app.use(cors());
app.use(express.json());
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// app.use('/api/user',validateToken, userRouter) : check token before call api
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/candidate', candidateRouter)
app.use('/api/v1/comment', commentRouter)
app.use('/api/v1/exam', examRouter)
app.use('/api/v1/challenge', challengeRouter)

app.listen(process.env.PORT, () => {
	console.log(`Server listening on port ${process.env.PORT}`);
});
