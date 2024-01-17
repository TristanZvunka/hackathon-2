const Joi = require("joi");

const getDataSchema = () => {
  return Joi.object({
    id: Joi.number().presence("optional"),
    mot: Joi.string().max(255).presence("required"),
    count: Joi.number().presence("optional"),
  });
};

const validateData = (req, res, next) => {
  const schema = getDataSchema();

  const { error } = schema.validate(
    {
      ...req.body,
    },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

module.exports = validateData;
