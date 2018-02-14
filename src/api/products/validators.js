import joi from 'joi';

const stripUnknown = { stripUnknown: true };


function validate (data, schema, options) {
  return joi.validate(data, schema, options);
}

const productGenericSchema = {
  barCode: joi.string(),
  description: joi.string(),
  image: joi.string(),
  model: joi.string(),
  name: joi.string(),
  price: joi.number(),
  tradeMark: joi.string(),
  type: joi.string().valid(['drink', 'food', 'cloths', 'accessories']),
};

export function validateId (data) {
  const schema = {
    id: joi.number().integer().min(1),
  };

  return validate(data, schema, stripUnknown);
}


export function validateProductCreate (data) {
  const schema = {
    ...productGenericSchema,
    name: joi.string().required(),
    price: joi.number().required(),
  };

  return validate(data, schema, stripUnknown);
}


export function validateProductUpdate (data) {
  const schema = joi.object(productGenericSchema).min(1);

  return validate(data, schema, stripUnknown);
}
