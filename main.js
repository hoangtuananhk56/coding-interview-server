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

app.post("/compile", (req, res) => {
	//getting the required data from the request
	let code = req.body.code;
	let language = req.body.language;
	let input = req.body.input;

	let data = ({
		"code": code,
		"language": language,
		"input": input
	});
	
	let config = {
		method: 'post',
		url: 'https://api.codex.jaagrav.in',
		headers: {
			'Content-Type': 'application/json'
		},
		data: data
	};
	//calling the code compilation API
	Axios(config)
		.then((response)=>{
			res.send(response.data)
			console.log(response.data)
		}).catch((error)=>{
			console.log(error);
		});
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRouter)
// app.use('/api/user',validateToken, userRouter)
app.use('/api/v1/candidate', candidateRouter)
app.use('/api/v1/comment',validateToken, commentRouter)
app.use('/api/v1/exam',validateToken, examRouter)
app.use('/api/v1/challenge',validateToken, challengeRouter)

app.listen(process.env.PORT, () => {
	console.log(`Server listening on port ${process.env.PORT}`);
});
