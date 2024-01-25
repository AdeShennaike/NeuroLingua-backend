import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
  localized: { type: String, default: "english" },
  quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }],
  language: { type: String, default: "spanish" },
  tone: { type: String, default: "feminine" },
  difficulty: { type: String, default: "low" },
  formality: { type: String, default: "med" },
  drama: { type: String, default: "med" }
}, {
  timestamps: true,
})

profileSchema.pre('save', function(next) {
  if (this.quizzes) {
    this.quizzes = Array.from(new Set(this.quizzes.map(id => id.toString())))
  }
  next()
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}

