// const Jimp = require('jimp');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;
const { AVATARS, PUBLIC_DIR } = require('../helpers/consts'); 

const uploadImage =  async (id, file) => {
    const avatarURL = path.join(AVATARS, `${id}${file.originalname}`)

    try {
        await sharp(file.path)
            .resize({ width: 250 })
            .toFile(path.join(PUBLIC_DIR, avatarURL));
        return avatarURL;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        await fs.unlink(file.path);
    }
};

module.exports = {
    uploadImage
}