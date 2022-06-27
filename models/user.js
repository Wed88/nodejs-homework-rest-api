const { Schema, model } = require('mongoose');
const Joi = require("joi");
const gravatar = require('gravatar');

const schema = new Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
    default: function () { 
      return gravatar.url(this.email, {}, true)
    },    
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
}, {timestamps: true});

const signupSchema = Joi.object({
    password: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    subscription: Joi.string(),
});
  
const loginSchema = Joi.object({
    password: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
});

const User = model('user', schema);

module.exports = {
  User,
  signupSchema,
  loginSchema
}