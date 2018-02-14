import knex from '../../config/knex';


export default async function update (table, id, data) {
  await knex(table)
    .update(data)
    .where({ id });

  const query = await knex(table)
    .where({ id })
    .first();

  return query;
}

