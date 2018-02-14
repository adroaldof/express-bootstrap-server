import queries from '../../queries';
import { logger } from '../../helpers';
import { validateProductCreate } from './validators';


export default async function create (req, res) {
  const { body } = req;
  let created;

  const { error, value } = validateProductCreate(body);

  if (error) {
    const errors = error.details.map(({ message }) => message);

    return res.status(404).send({ errors });
  }

  try {
    created = await queries.create('products', value);
  } catch (error) {
    const errorKey = 'create-product-error';
    const message = error.message.split(' - ').pop();
    logger({ errorKey, message, error });

    return res.status(500).send({ errorKey, message });
  }

  return res.send({ created });
}
