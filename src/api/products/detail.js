import queries from '../../queries';
import { logger } from '../../helpers';
import { validateId } from './validators';


export default async function detail (req, res) {
  const { params: { id } } = req;
  let product;

  const { error, value: { id: validId } } = validateId({ id });

  if (error) {
    const errorKey = 'detail-product-validation-error';
    logger({ errorKey, error });

    return res.status(404).send({ errorKey, error });
  }

  try {
    product = await queries.detail('products', validId);
  } catch (error) {
    const errorKey = 'detail-product-error';
    const message = error.message.split(' - ').pop();
    logger({ errorKey, message, error });

    return res.status(500).send({ errorKey, message });
  }

  if (!product) {
    const errorKey = 'not-found';
    return res.status(404).send({ id, errorKey, product: {} });
  }

  return res.send({ product });
}
