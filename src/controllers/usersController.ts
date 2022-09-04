import type { RequestHandler } from 'express'
import { User } from '../models/user'
import { loggable } from './logging'

@loggable
export default class UsersController {
  static [method: string]: RequestHandler<User>

  public static index: RequestHandler<User> = async (req, res) => {
    const users = await User.query()

    res.render('users/index', { users })
  }

  public static view: RequestHandler<User> = async (req, res) => {
    if (req.params.id !== req.session.userId) {
      return res.status(401).render('users/index', { users: [], error: 'Not authorized' })
    }
    const user = await User.query().findById(req.params.id)

    res.render('users/view', { user })
  }
}