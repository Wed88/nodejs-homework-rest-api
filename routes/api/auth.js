const express = require('express')
const router = express.Router()
const {signupUser, loginUser} = require('../../controllers/auth')
const { validateRequest } = require('../../middlewares/validateRequest')
const {signupSchema, loginSchema} = require('../../models/user')

router.post('/users/signup', validateRequest(signupSchema), signupUser);
router.post('/users/login', validateRequest(loginSchema), loginUser);

module.exports = router