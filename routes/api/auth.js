const express = require('express')
const router = express.Router()
const {signupUser} = require('../../controllers/auth')
// const {validateRequest} = require('../../middlewares/validateRequest')

router.post('/users/signup', signupUser)

module.exports = router