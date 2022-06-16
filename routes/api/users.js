const express = require('express')
const router = express.Router()
const {signupUser, loginUser, logoutUser} = require('../../controllers/users')
const { validateRequest } = require('../../middlewares/validateRequest')
const { signupSchema, loginSchema } = require('../../models/user')
const {auth} = require('../../middlewares/auth')

router.post('/signup', validateRequest(signupSchema, "Bad Request"), signupUser);
router.post('/login', validateRequest(loginSchema, "Bad Request"), loginUser);
router.post('/logout', auth, logoutUser);

module.exports = router