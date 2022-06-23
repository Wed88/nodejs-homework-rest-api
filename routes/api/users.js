const express = require('express')
const multer = require('multer')
const router = express.Router()
const {signupUser, loginUser, logoutUser, currentUser} = require('../../controllers/users')
const { validateRequest } = require('../../middlewares/validateRequest')
const { signupSchema, loginSchema } = require('../../models/user')
const {auth} = require('../../middlewares/auth')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../../tmp')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

router.post('/signup', validateRequest(signupSchema, "Bad Request"), signupUser);
router.post('/login', validateRequest(loginSchema, "Bad Request"), loginUser);
router.post('/logout/:id', auth, logoutUser);
router.get('/current', auth, currentUser);
router.patch('/avatars', auth, upload.single('avatar'), (req, res, next) => {
    console.log('file', req.file);
    res.and();
});

module.exports = router