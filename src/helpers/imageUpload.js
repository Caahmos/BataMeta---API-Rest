const multer = require('multer');
const path = require('node:path');

const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {

        folder = 'users';

        cb(null, `public/images/${folder}/`);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + String(Math.floor(Math.random() * 1000)) + path.extname(file.originalname));
    }
})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new Error('Por favor, envie apenas jpg ou png'));
        };
        cb(undefined, true);
    }
});

module.exports = { imageUpload };