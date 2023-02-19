import Joi from "joi";

export const JOI = {
  login: Joi.object({
    tel: Joi.string().max(32).required(),
    password: Joi.string().max(32).required(),
  }),
  register: Joi.object({
    name: Joi.string().max(32).required(),
    email: Joi.string().max(128).required(),
    password: Joi.string().max(32).required(),
    tel: Joi.string().max(32).required(),
  }),
  update: Joi.object({
    name: Joi.string().max(32),
    email: Joi.string().max(128),
    password: Joi.string().max(32),
    tel: Joi.string().max(32),
  }),
  products: Joi.object({
    name: Joi.string().max(32),
    cost: Joi.string().max(32),
    id: Joi.string().max(128),
  }),
  comment: Joi.object({
    text: Joi.string().required(),
  }),
  score: Joi.object({
    score: Joi.number().max(5).min(0).required(),
  }),
  discount: Joi.object({
    discount: Joi.string().max(32).required(),
  }),
  addCategories: Joi.object({
    name: Joi.string().max(32).required(),
  }),
  addSubCategories: Joi.object({
    id: Joi.string().max(128),
    name: Joi.string().max(32).required(),
  }),
};
