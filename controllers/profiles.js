import { Profile } from '../models/profile.js'
import { User } from '../models/user.js'

async function viewPrefrences(req, res) {
  try {
    const user = await User.findOne({_id: req.user})
    const profile = await Profile.findOne({_id: user.profile})
    console.log("viewPrefrences: ", user )
    console.log("viewPrefrences: ", profile )
    return res.status(200).json(profile)
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error in viewPrefrences' })
  }
}

async function updatePreferences(req, res) {
  try {
    const user = await User.findOne({_id: req.user})
    const profile = await Profile.findOne({_id: user.profile})
    profile.language = profile.language.toLowerCase()
    profile.difficulty = profile.difficulty.toLowerCase()


    if (!user) { throw "no user found" }
    if (!profile) { throw "no profile found for user: ", user}

    if (profile.language === "spanish" || profile.language === "arabic" || 
    profile.language === "korean" || profile.language === "chinese") {
      profile.language = req.body.language
    } else {
      console.log("invalid language selection: ", req.body.language)
    }

    if (profile.difficulty === "easy" || profile.difficulty === "medium" || 
    profile.difficulty === "hard") {
      profile.difficulty = req.body.difficulty
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