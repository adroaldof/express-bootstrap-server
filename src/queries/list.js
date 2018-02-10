import knex from '../../config/knex';


export default async function list (table) {
  try {
    const query = await knex(table);

    return query;
  } catch (error) {
    throw error;
  }
}
