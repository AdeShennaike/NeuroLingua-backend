import { Profile } from '../models/profile.js'

function index(req, res) {
  console.log('req.user', req.user)
  Profile.find({})
  .then(profiles => res.json(profiles))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

export { index }