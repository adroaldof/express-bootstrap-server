import joi from 'joi';

const stripUnknown = { stripUnknown: true };

function validate (data, schema, options = {}) {
  return joi.validate(data, schema, options);
}

export function validateId (data) {
  const schema = {
    id: joi.number().integer().min(1),
  };

  return validate(data, schema, stripUnknown);
}


export function validateProduct (data) {
  const schema = {
    barCode: joi.string(),
    description: joi.string(),
    image: joi.string(),
    model: joi.string(),
    name: joi.string().required(),
    price: joi.number().required(),
    tradeMark: joi.string(),
    type: joi.string().valid(['drink', 'food', 'cloths', 'accessories']),
  };

  return validate(data, schema, stripUnknown);
}
