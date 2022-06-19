const {Schema, model} = require('mongoose');
const Joi = require("joi");

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
      },
    email: {
        type: String,
      },
    phone: {
        type: String,
      },
    favorite: {
        type: Boolean,
        default: false,
      },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      },
},{versionKey: false, timestamps: true});

const joiSchema = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().email({minDomainSegments:2}).required(),
    phone: Joi.number().min(10).required(),
    favorite: Joi.bool(),
  });

  const patchSchema = Joi.object({
    favorite: Joi.bool().required(),
  })

const Contact = model('contact', contactSchema);

module.exports = {
    Contact,
    joiSchema,
    patchSchema,
}