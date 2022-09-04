import express, { RequestHandler } from 'express'
import { indexView } from '../controllers/indexController'
import { doLogin, doRegister, loginView, registerView } from '../controllers/loginController'
import { getUser, userIndex } from '../controllers/usersController'
import BlocksController from '../controllers/blocksController'

export const router = express.Router()

const requiresSession: RequestHandler<any> = (req, res, next) => {
  if (req.session.userId) next()
  else next('route')
}

router.get('/', indexView)

router.get('/login', loginView)
router.post('/login', doLogin)

router.get('/register', registerView)
router.post('/register', doRegister)

router.get('/users', userIndex)
router.get('/users/:id', requiresSession, getUser)

router.get('/blocks', requiresSession, BlocksController.index)
router.get('/blocks/create', requiresSession, BlocksController.create)
router.post('/blocks/create', BlocksController.doCreate)
router.get('/blocks/:id', BlocksController.view)
router.post('/blocks/:id/update', requiresSession, BlocksController.update)