import express, { Express } from 'express'
import dotenv from 'dotenv'
import { router } from './routes'
import session from 'express-session'
import './better-console-dir'
import { sessionStore } from './db/client'

declare module 'express-session' {
  interface SessionData {
    userId: string
  }
}

dotenv.config()

const sess: session.SessionOptions = {
  secret: process.env.SESSION_SECRET!,
  cookie: {
    maxAge: 86400 * 1000,
  },
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
}

const app: Express = express()
const port = process.env.PORT || 3000

app.set('view engine', 'pug')
app.set('views', __dirname + '/views')
app.use(session(sess))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', router)
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})