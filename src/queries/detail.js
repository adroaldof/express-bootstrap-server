import knex from '../../config/knex';


export default async function detail (table, id) {
  const detailQuery = knex(table)
    .where({ id })
    .first();

  const found = await detailQuery;

  return found;
}

