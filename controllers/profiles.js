import { Profile } from '../models/quiz.js'
import { User } from '../models/user.js'

// function index(req, res) {
//   console.log('req.user', req.user)
//   Profile.find({})
//   .then(profiles => res.json(profiles))
//   .catch(err => {
//     console.log(err)
//     res.status(500).json(err)
//   })
// }

async function viewPrefrences(req, res) {
  try {
    const user = await User.findOne({})

  } catch (error) {

  }

}

async function updatePreferences(req, res) {
  try {
    const user = await User.findOne({})


  } catch (error) {

  }

}

export { viewPrefrences, updatePreferences }