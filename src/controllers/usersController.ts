import type { RequestHandler, Response } from 'express'
import { TypedRequestBody } from '../models/interfaces'
import { User } from '../models/user'

export const userIndex: RequestHandler = async (req: TypedRequestBody<User>, res: Response) => {
  const users = await User.getAll()
  res.render('users/index', { users })
}

export const getUser: RequestHandler = async (req, res) => {
  if (req.params.id !== req.session.userId) {
    return res.status(401).render('users/index', { users: [], error: 'Not authorized' })
  }
  const user = await User.getById(req.params.id)

  res.render('users/view', { user })
}