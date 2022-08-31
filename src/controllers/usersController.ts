import type { RequestHandler, Response } from 'express'
import { client } from '../db/client'
import { TypedRequestBody } from '../models/interfaces'
import { User } from '../models/user'
import { pp } from '../sugar'



export const userIndex: RequestHandler = async (req: TypedRequestBody<User>, res: Response) => {
  const users = User.fromQuery(await client('users').select('*'))
  pp(users)
  res.render('user-index', { users })
}

export const getUser: RequestHandler = async (req, res) => {
  if (req.params.id !== req.session.userId) {
    return res.status(401).render('user-index', { users: [], error: 'Not authorized' })
  }
  const user = User.fromQuery(await client('users').where({ ...req.params }).select('*').first())

  res.render('user-index', { users: [user] })
}