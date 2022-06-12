const express = require('express')
const router = express.Router()
const {signupUser, loginUser} = require('../../controllers/auth')
const { validateRequest } = require('../../middlewares/validateRequest')
const { signupSchema, loginSchema } = require('../../models/user')

router.post('/users/signup', validateRequest(signupSchema, "Bad Request"), signupUser);
router.post('/users/login', validateRequest(loginSchema, "Bad Request"), loginUser);

module.exports = router