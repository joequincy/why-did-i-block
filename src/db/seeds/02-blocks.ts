import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('blocks').del();

    const bob = await knex('users').where({ username: 'bob' }).first()
    const ted = await knex('users').where({ username: 'ted' }).first()
    const sue = await knex('users').where({ username: 'sue' }).first()
    const lex = await knex('users').where({ username: 'lex' }).first()

    // Inserts seed entries
    await knex('blocks').insert([
        { userId: bob.id, name: 'sue', reasons: 'because there needs to be a seeded row' },
        { userId: ted.id, name: 'bob', reasons: 'because there needs to be a seeded row' },
        { userId: sue.id, name: 'bob', reasons: 'because there needs to be a seeded row' },
        { userId: lex.id, name: 'ted', reasons: 'because there needs to be a seeded row' },
        { userId: lex.id, name: 'sue', reasons: 'because there needs to be a second seeded row' },
    ])
}
