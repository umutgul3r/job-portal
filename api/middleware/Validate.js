const httpStatus = require("http-status");

const validate = (schema) => (req, res, next) => {
  const { value, error } = schema.validate(req.body);
  if (error) {
    const errorMessage = error.details.map((i) => i.message).join(",");
    res.status(httpStatus.BAD_REQUEST).json({ error: errorMessage });
    return;
  }
  Object.assign(req, res);
  return next();
};

module.exports = validate;
