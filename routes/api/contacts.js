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
    next(error)    
  }
  
})

router.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await contactsOperations.getContactById(id);
    if(!result){
      res.status(404).json({
        status:"error",
        code: 404,
        massege: "Not found",
      });
      return;
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
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
