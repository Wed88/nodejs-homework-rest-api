const express = require('express')
const router = express.Router()
const {signupUser, loginUser, logoutUser} = require('../../controllers/auth')
const { validateRequest } = require('../../middlewares/validateRequest')
const { signupSchema, loginSchema } = require('../../models/user')
const {auth} = require('../../middlewares/auth')

router.post('/users/signup', validateRequest(signupSchema, "Bad Request"), signupUser);
router.post('/users/login', validateRequest(loginSchema, "Bad Request"), loginUser);
router.post('/users/logout', auth, logoutUser);

module.exports = router