import knex, { Knex } from 'knex'

const getConfig = (): Knex.Config => {
  const environment = process.env.NODE_ENV || 'development'
  return require('./knexfile')[environment]
}

export const client = knex(getConfig())