import knex from 'knex'
import { pp } from '../sugar'
import { knexConfig } from './knexfile'

export const client = knex(knexConfig[process.env.NODE_ENV || 'development'])