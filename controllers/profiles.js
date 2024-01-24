import { Profile } from '../models/quiz.js'
import { User } from '../models/user.js'

async function viewPrefrences(req, res) {
  try {
    const user = await User.findOne({})
    const profile = await Profile.findOne({_id: user.profile})
    return res.status(200).json(profile)
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error in viewPrefrences' })
  }
}

async function updatePreferences(req, res) {
  try {
    const user = await User.findOne({})
    const profile = await Profile.findOne({_id: user.profile})

    // TODO: write updates to profile

    return res.status(200).json(profile)
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error in viewPrefrences' })
  }

}

export { viewPrefrences, updatePreferences }