const Joi = require('joi');

const createPostValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string()
      .min(3)
      .max(255)
      .trim()
      .required(),
    body: Joi.string()
      .min(3)
      .max(1024)
      .trim()
      .required(),
  });

  return schema.validateAsync(data);
};

module.exports = { createPostValidation };