import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  username: String,
  localized: String,
  quizzes: [],
  language: String,
  difficulty: String,
  formality: String,
  drama: String
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }