import queries from '../../queries';
import { validateId } from './validators';


export default async function remove (req, res) {
  const { params: { id } } = req;
  let removed;

  const { error, value: { id: validId } } = validateId({ id });

  if (error) {
    return res.status(404).send(error);
  }

  try {
    removed = await queries.remove('products', { id: validId });
  } catch (error) {
    return res.status(404).send({ id: validId, error });
  }

  if (!removed) {
    return res.status(404).send({ notFound: validId });
  }

  return res.status(200).send({ removed: validId });
}
