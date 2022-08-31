import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('social_links', (table) => {
    table.uuid('id').primary()
    table.uuid('blockId').references('blocks.id').notNullable()
    table.string('link').notNullable()
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('social_links')
}

