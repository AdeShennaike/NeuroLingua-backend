import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/
// router.get('/', profilesCtrl.index)

/*---------- Protected Routes ----------*/
// router.use(decodeUserFromToken)
// router.get('/', decodeUserFromToken, profilesCtrl.index)

router.get("/preferences", decodeUserFromToken, profilesCtrl.viewPrefrences)

router.put("/preferences", decodeUserFromToken, profilesCtrl.updatePreferences)

export { router }
