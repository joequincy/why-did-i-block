import express, { RequestHandler } from 'express'
import { indexView } from '../controllers/indexController'
import LoginController from '../controllers/loginController'
import UsersController from '../controllers/usersController'
import BlocksController from '../controllers/blocksController'

export const router = express.Router()

const requiresSession: RequestHandler<any> = (req, res, next) => {
  if (req.session.userId) next()
  else next('route')
}

router.get('/', indexView)

router.get('/login', LoginController.loginView)
router.post('/login', LoginController.doLogin)

router.get('/register', LoginController.registerView)
router.post('/register', LoginController.doRegister)

router.get('/users', UsersController.index)
router.get('/users/:id', requiresSession, UsersController.view)

router.get('/blocks', requiresSession, BlocksController.index)
router.get('/blocks/create', requiresSession, BlocksController.create)
router.post('/blocks/create', requiresSession, BlocksController.doCreate)
router.get('/blocks/:id', BlocksController.view)
router.post('/blocks/:id/update', requiresSession, BlocksController.update)