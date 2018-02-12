import knex from '../../config/knex';

export default async function create (table, data) {
  const [id] = await knex(table)
    .insert(data)
    .returning('id');

  const created = await knex(table)
    .where({ id })
    .first();

  return created;
}
