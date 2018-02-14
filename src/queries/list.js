import { queryBuilder } from '../../config';


export default async function list (table) {
  try {
    const query = await queryBuilder(table);

    return query;
  } catch (error) {
    throw error;
  }
}
