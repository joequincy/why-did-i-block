import session from 'express-session'
import knex, { Knex } from 'knex'

export class Client {
  static savedConfig: Knex.Config

  static get config() {
    if (!Client.savedConfig) {
      const environment = process.env.NODE_ENV || 'development'
      Client.savedConfig = require('./knexfile')[environment]
    }

    return Client.savedConfig
  }

  static get client() {
    return knex(Client.config)
  }
}

export const sessionStore = new (require('connect-pg-simple')(session))({
  conObject: Client.config.connection
})