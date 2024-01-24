import mongoose from 'mongoose'

const Schema = mongoose.Schema

// *************************
// Quiz
// *************************
const quizSchema = new Schema({
  prompt: { type: String, required: true },
  answer: { type: String, required: true },
  wrongAnswers: { type: [String], required: true },
  language: { type: String, required: true },
  difficulty: { type: String, required: true },
  formality: { type: String, required: true },
  drama: { type: String, required: true }
}, {
  timestamps: true,
})

const Quiz = mongoose.model('Quiz', quizSchema)

// *************************
// Feedback
// *************************
const feedbackSchema = new Schema({
  quiz: { type: String, required: true },
  message: { type: String, required: true },
  good: { Boolean },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true,
})

const Feedback = mongoose.model('Feedback', feedbackSchema)

export {
  Quiz,
  Feedback
}