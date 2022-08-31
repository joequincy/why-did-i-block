import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('blocks', (table) => {
    table.uuid('id').primary()
    table.uuid('userId').references('users.id').notNullable()
    table.string('name').notNullable().comment('Name of blocked user/person')
    table.string('reasons').notNullable().comment('Text describing why this person was blocked')
    table.timestamps()
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('blocks')
}

