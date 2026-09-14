import { Router } from 'express'
import { signin } from '../controllers/UserController.js'

const router = Router()

router.post('/signin', signin)

export default router
