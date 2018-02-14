import { queryBuilder } from '../../config';


export default async function update (table, id, data) {
  await queryBuilder(table)
    .update(data)
    .where({ id });

  const query = await queryBuilder(table)
    .where({ id })
    .first();

  return query;
}

