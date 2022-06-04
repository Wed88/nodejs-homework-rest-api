const express = require('express')

// const Joi = require("joi")

// const contactSchema = Joi.object({
//   name: Joi.string().min(1).required(),
//   email: Joi.string().email({minDomainSegments:2}).required(),
//   phone: Joi.number().min(10).required(),
//   favorite: Joi.bool(),
// })

const router = express.Router()

// const contacts = require("../../services/contact.service")

const {listContacts, getContactById, addContact, removeContact, updateContact, updateStatusContact} = require('../../controllers/contacts')

router.get('/', listContacts)

router.get('/:id', getContactById)

router.post('/', addContact)

router.delete('/:id', removeContact)

router.put('/:id', updateContact)

router.patch('/:id', updateStatusContact)

module.exports = router
