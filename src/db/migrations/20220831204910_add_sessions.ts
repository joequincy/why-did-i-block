import { readFileSync } from "fs";
import { Knex } from "knex";
import path from "path";


export async function up(knex: Knex): Promise<void> {
  await knex.raw(
    readFileSync(
      path.join(__dirname, '../../../node_modules/connect-pg-simple/table.sql'),
      { encoding: 'utf-8' },
    )
  )
}


export async function down(knex: Knex): Promise<void> {
  await knex.raw('drop table session cascade')
}

