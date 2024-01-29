// import { Feedback, Quiz, Profile } from './models/quiz.js'


// import npm packages
import 'dotenv/config.js'
import express from 'express'
import logger from 'morgan'
import cors from 'cors'

// connect to MongoDB with mongoose
import './config/database.js'

// import routes
import { router as profilesRouter } from './routes/profiles.js'
import { router as authRouter } from './routes/auth.js'
import { router as quizRouter } from './routes/quiz.js'
import { router as newsRouter } from './services/news.js'

// create the express app
const app = express()

// basic middleware
app.use(cors({
  origin: 'http://localhost:3000' // Your frontend's URL
}))
app.use(logger('dev'))
app.use(express.json())

// mount imported routes
app.use('/api', newsRouter)
app.use('/api', profilesRouter)
app.use('/api/auth', authRouter)
app.use('/api/quizzes', quizRouter)

// handle 404 errors
app.use(function (req, res, next) {
  res.status(404).json({ err: 'Not found' })
})

// handle all other errors
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({ err: err.message })
})

export { app }
