import type { RequestHandler } from 'express'
import bcrypt from 'bcrypt'
import { User } from '../models/user'
import { loggable } from './logging'

@loggable
export default class LoginController {
  static [method: string]: RequestHandler<User>

  public static loginView: RequestHandler<User> = (req, res) => {
    if (req.session.userId) {
      res.redirect('/?m=' + encodeURIComponent('Already logged in'))
    } else {
      res.render('users/login')
    }
  }

  public static doLogin: RequestHandler<User> = async (req, res) => {
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

  public static registerView: RequestHandler<User> = (req, res) => {
    res.render('users/register', { title: 'Register' })
  }

  public static doRegister: RequestHandler<User> = async (req, res) => {
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
}