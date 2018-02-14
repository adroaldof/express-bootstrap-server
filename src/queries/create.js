import { queryBuilder } from '../../config';


export default async function create (table, data) {
  const [id] = await queryBuilder(table)
    .insert(data)
    .returning('id');

  const created = await queryBuilder(table)
    .where({ id })
    .first();

  return created;
}
