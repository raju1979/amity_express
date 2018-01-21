const Joi = require('joi');

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        return res.status(403).json(result.error);
      }

      if (!req.value) { req.value = {}; }
      req.value['body'] = result.value;
      next();
    }
  },

  schemas: {
    signupSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      dob: Joi.string().required(),
      gender:Joi.string().required(),
      company:Joi.string().required(),
      city:Joi.string().required(),
      state:Joi.string().required(),
      phone:Joi.string().required(),
      address:Joi.string().required()
    }),
    loginSchema:Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }),
    vehicleSchema: Joi.object().keys({
      modelName:Joi.string().required(),
      modelYear:Joi.number().integer().min(new Date().getFullYear() - 3).max(new Date().getFullYear()),
      modelColor:Joi.string().required()
    })
  }
}
