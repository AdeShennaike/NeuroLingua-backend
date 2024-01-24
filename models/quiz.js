import mongoose from 'mongoose'

const Schema = mongoose.Schema


// *************************
// Profile
// *************************
const profileSchema = new Schema({
  localized: String,
  quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }],
  language: String,
  difficulty: String,
  formality: String,
  drama: String
}, {
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

// *************************
// Quiz
// *************************
const quizSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  wronganswer: { type: String, required: true },
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
  Profile,
  Quiz,
  Feedback
}