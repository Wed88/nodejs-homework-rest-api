const express = require('express')

const Joi = require("joi")

const contactSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().email({minDomainSegments:2}).required(),
  phone: Joi.number().min(10).required(),
})

const router = express.Router()

const contactsOperations = require("../../models/contacts")

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts()
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts
      }
  })
    
  } catch (error) {
    next(error)    
  }
  
})

router.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await contactsOperations.getContactById(id);
    if(!result){
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result
      }
    })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {error} = contactSchema.validate(req.body);
    if(error){
      error.status = 400;
      error.message = "missing required name field";
      throw error;
    }
    const result = await contactsOperations.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result
      }
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOperations.removeContact(id);
    if(!result){
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
      data: {
        result,
      }
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const {error} = contactSchema.validate(req.body);
    if(error){
      error.status = 400;
      error.message = "missing fields";
      throw error;
    }
    const {id} = req.params;
    const result = await contactsOperations.updateContact(id, req.body);
    if(!result){
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      }
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
