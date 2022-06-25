const multer = require('multer');
const { TMP_DIR } = require('../helpers/consts');
const { createError } = require('../helpers/errors');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, TMP_DIR)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function fileFilter(req, file, cb) {
        if (file.mimetype.includes('image')) {
            cb(null, true)
        } else {
            cb(createError(401, 'Not authorized'))
        }
    },
    limits: {
        fieldNameSize:100
    }
});

module.exports = {
    upload
};