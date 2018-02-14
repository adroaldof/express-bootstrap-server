import queries from '../../queries';
import { logger } from '../../helpers';
import { validateId, validateProductUpdate } from './validators';


export default async function create (req, res) {
  const { body, params: { id } } = req;
  let updated;

  const { error: idError, value: { id: validId } } = validateId({ id });

  if (idError) {
    const errorKey = 'update-product-id-validation-error';
    logger({ errorKey, error: idError });

    return res.status(404).send({ errorKey, error: idError });
  }

  const { error, value } = validateProductUpdate(body);

  if (error || !value) {
    const errorKey = 'update-product-validation-error';
    const errors = error.details.map(({ message }) => message);
    logger({ errorKey, errors });

    return res.status(404).send({ errorKey, errors });
  }

  try {
    updated = await queries.update('products', validId, value);
  } catch (error) {
    const errorKey = 'update-product-error';
    const message = error.message.split(' - ').pop();
    logger({ errorKey, message, error });

    return res.status(500).send({ errorKey, message });
  }

  return res.send({ updated });
}
