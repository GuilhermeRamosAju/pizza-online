import Joi from "joi";

const schema = Joi.object({
  email: Joi.string().min(3).max(100).required(),
  password: Joi.string().min(3).max(20).required(),
});

export default async (req, res, next) => {
  try {
    const validatedBody = await schema.validateAsync(req.body);
    req.validatedBody = validatedBody;
    next();
  } catch (err) {
    console.error("VALIDATION ERROR:", err.message);
    return res.status(400).send(err.message);
  }
};
