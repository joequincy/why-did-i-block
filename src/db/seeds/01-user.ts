import { Knex } from 'knex'
import bcrypt from 'bcrypt'

const password = bcrypt.hashSync('test', 15)

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('blocks').del()
    await knex('users').del()

    // Inserts seed entries
    await knex('users').insert([
        {
            username: 'bob',
            password,
            email: 'bob@example.com'
        },
        {
            username: 'ted',
            password,
            email: 'ted@example.com'
        },
        {
            username: 'sue',
            password,
            email: 'sue@example.com'
        },
        {
            username: 'lex',
            password,
            email: 'lex@example.com'
        }
    ])
}
