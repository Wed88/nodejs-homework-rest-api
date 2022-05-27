const express = require('express')

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
    res.status(500).json({
      status:"error",
      code: 500,
      massege: "Server error",
    })
    
  }
  
})

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
