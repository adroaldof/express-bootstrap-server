import knex from '../../config/knex';


export default async function remove (table, where) {
  let affectedRows;

  const query = knex(table)
    .where(where)
    .del();

  try {
    affectedRows = await query;
  } catch (error) {
    throw error;
  }

  return affectedRows;
}

