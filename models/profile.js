import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
  localized: String,
  quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }],
  language: { type: String, default: "spanish" },
  tone: { type: String, default: "feminine" },
  difficulty: { type: String, default: "low" },
  formality: { type: String, default: "med" },
  drama: { type: String, default: "med" }
}, {
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}