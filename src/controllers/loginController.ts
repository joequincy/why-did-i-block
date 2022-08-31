import type { RequestHandler } from 'express'
import { client } from '../db/client'
import bcrypt from 'bcrypt'
import { TypedRequestBody } from '../models/interfaces'
import { IKnexUser, User } from '../models/user'

type RegisterParams = {
  username: string
  password: string
  cpassword: string
  email: string
}

type LoginParams = Pick<RegisterParams, 'username' | 'password'>

export const loginView: RequestHandler = (req, res) => {
  res.render('login')
}

export const doLogin: RequestHandler = async (req: TypedRequestBody<LoginParams>, res) => {
  const { username, password } = req.body

  const [user] = await client<IKnexUser>('users').where({ username })

  if (!bcrypt.compareSync(password, user.password || '')) {
    return res.status(400).render('login', {
      title: 'Log in',
      error: 'Incorrect password.',
      username
    })
  }

  req.session.userId = user.id
  req.session.save(err => {
    if (err) {
      res.status(500).redirect('/login')
    }
    res.status(200).redirect('/')
  })

  return User.getByUsername(username)
}

export const registerView: RequestHandler = (req, res) => {
  res.render('register', { title: 'Register' })
}

export const doRegister: RequestHandler = async (req: TypedRequestBody<RegisterParams>, res) => {
  const { username, password, cpassword, email } = req.body

  if (password !== cpassword) {
    return res.status(400).render('register', {
      title: 'Register',
      error: 'Passwords did not match',
      username,
      email,
    })
  }

  const hash = bcrypt.hashSync(password, 10)

  try {
    const newUser = await User.register({ username, email, password: hash })

    req.session.userId = newUser.id
    await req.session.save()

    res.status(201).send(newUser.username)
  } catch (e) {
    let error = 'unknown error'
    if (e instanceof Error) {
      error = `${e.name}\n${e.message}\n${e.stack}`
    }
    return res.status(400).render('register', {
      title: 'Register',
      error,
      username,
      email,
    })
  }

}