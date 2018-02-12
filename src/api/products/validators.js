import joi from 'joi';


export function validateId (data) {
  const schema = {
    id: joi.number().integer().min(0),
  };

  return joi.validate(data, schema, { stripUnknown: true });
}
