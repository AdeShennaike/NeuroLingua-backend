import { Profile } from '../models/profile.js'
import { User } from '../models/user.js'

async function viewPrefrences(req, res) {
  try {
    const profile = await Profile.findOne({_id: req.user.profile})
    console.log("viewPrefrences: ", req.user )
    console.log("viewPrefrences: ", profile )
    return res.status(200).json(profile)
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error in viewPrefrences' })
  }
}

async function updatePreferences(req, res) {
  try {

    if (!req.user) { throw "no user found" }

    const profile = await Profile.findOne({_id: req.user.profile})
    const language = req.body.language.toLowerCase()
    const difficulty = req.body.difficulty.toLowerCase()

    if (!profile) { throw "no profile found for user: ", req.user}

    if (language === "spanish" || language === "arabic" || language === "korean" || language === "chinese") {
      profile.language = language
    } else {
      console.log("invalid language selection: ", req.body.language)
    }

    console.log("difficulty input: ", req.body.difficulty)

    if (difficulty === "easy" || difficulty === "medium" || difficulty === "hard") {
      profile.difficulty = difficulty
    } else {
      console.log("invalid difficulty selection: ", req.body.difficulty)
    }

    profile.save()

    return res.status(200).json(profile)
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error in viewPrefrences' })
  }

}

export { viewPrefrences, updatePreferences }