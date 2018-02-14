import { queryBuilder } from '../../config';


export default async function remove (table, where) {
  let affectedRows;

  const query = queryBuilder(table)
    .where(where)
    .del();

  try {
    affectedRows = await query;
  } catch (error) {
    throw error;
  }

  return affectedRows;
}

