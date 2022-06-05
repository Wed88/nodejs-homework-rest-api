const express = require('express')
const router = express.Router()
const {listContacts, getContactById, addContact, removeContact, updateContact, updateStatusContact} = require('../../controllers/contacts')
const {joiSchema, patchSchema} = require('../../models/contact')
const {validateRequest} = require('../../middlewares/validateRequest')

router.get('/', listContacts)

router.get('/:id', getContactById)

router.post('/',validateRequest(joiSchema,"missing required name field"), addContact)

router.delete('/:id', removeContact)

router.put('/:id',validateRequest(joiSchema,"missing fields"), updateContact)

router.patch('/:id/favorite',validateRequest(patchSchema,"missing field favorite"), updateStatusContact)

module.exports = router
