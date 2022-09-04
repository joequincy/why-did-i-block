import type { RequestHandler } from 'express'
import bcrypt from 'bcrypt'
import { TypedRequestBody } from '../models/interfaces'
import { User } from '../models/user'

type RegisterParams = {
  username: string
  password: string
  cpassword: string
  email: string
}

type LoginParams = Pick<RegisterParams, 'username' | 'password'>

export const loginView: RequestHandler = (req, res) => {
  if (req.session.userId) {
    res.redirect('/?m=' + encodeURIComponent('Already logged in'))
  } else {
    res.render('users/login')
  }
}

export const doLogin: RequestHandler = async (req: TypedRequestBody<LoginParams>, res) => {
  const { username, password } = req.body

  const user = await User.query().where({ username }).first()

  if (!user) {
    return res.status(400).render('users/login', {
      title: 'Log in',
      error: 'Unrecognized user'
    })
  } else if (!user.authenticate(password)) {
    return res.status(400).render('users/login', {
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
}

export const registerView: RequestHandler = (req, res) => {
  res.render('users/register', { title: 'Register' })
}

export const doRegister: RequestHandler = async (req: TypedRequestBody<RegisterParams>, res) => {
  const { username, password, cpassword, email } = req.body

  if (password !== cpassword) {
    return res.status(400).render('users/register', {
      title: 'Register',
      error: 'Passwords did not match',
      username,
      email,
    })
  }

  const hash = bcrypt.hashSync(password, 10)

  try {
    const newUser = await User.query().insert({ username, email, password: hash })

    req.session.userId = newUser.id
    await req.session.save()

    res.status(201).redirect('/')
  } catch (e) {
    let error = 'unknown error'
    if (e instanceof Error) {
      error = `${e.name}\n${e.message}\n${e.stack}`
    }
    return res.status(400).render('users/register', {
      title: 'Register',
      error,
      username,
      email,
    })
  }

}