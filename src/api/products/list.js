import queries from '../../queries';


export default async function (req, res) {
  let products;

  try {
    products = await queries.list('products');
  } catch (error) {
    return res.status(400).send(error);
  }

  return res.send({ products });
}
