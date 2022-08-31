import knex from 'knex'
import { knexConfig } from './knexfile'

export const client = knex(knexConfig[process.env.NODE_ENV || 'development'])