import dotenv from 'dotenv'
import type { Knex } from 'knex'

dotenv.config()

// Update with your config settings.
export const sharedConfig: Knex.Config = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'wdib',
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations',
    extension: 'ts'
  }
}

export const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    ...sharedConfig
  },

  staging: {
    ...sharedConfig,
    pool: {
      min: 2,
      max: 10
    }
  },

  production: {
    ...sharedConfig,
    pool: {
      min: 2,
      max: 10
    }
  }

};

export default knexConfig
