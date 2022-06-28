const express = require('express');
const router = express.Router();
const { signupUser, loginUser, logoutUser, currentUser, updateAvatar, confirm } = require('../../controllers/users');
const { validateRequest } = require('../../middlewares/validateRequest');
const { signupSchema, loginSchema } = require('../../models/user');
const { auth } = require('../../middlewares/auth');
const { upload } = require('../../middlewares/upload');

router.post('/signup', validateRequest(signupSchema, "Bad Request"), signupUser);
router.post('/login', validateRequest(loginSchema, "Bad Request"), loginUser);
router.post('/logout/:id', auth, logoutUser);
router.get('/current', auth, currentUser);
router.patch('/avatars', auth, upload.single('avatar'), updateAvatar);
router.get('verify/:verificationToken', confirm);

module.exports = router

