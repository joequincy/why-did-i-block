import express from 'express'
import { indexView } from '../controllers/indexController'
import { doLogin, doRegister, loginView, registerView } from '../controllers/loginController'
import { getUser, userIndex } from '../controllers/usersController'

export const router = express.Router()

router.get('/', indexView)
router.get('/login', loginView)
router.post('/login', doLogin)
router.get('/register', registerView)
router.post('/register', doRegister)
router.get('/users', userIndex)
router.get('/users/:id', getUser)