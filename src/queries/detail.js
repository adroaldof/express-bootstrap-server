import { queryBuilder } from '../../config';


export default async function detail (table, id) {
  const detailQuery = queryBuilder(table)
    .where({ id })
    .first();

  const found = await detailQuery;

  return found;
}

