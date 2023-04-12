const multer = require('multer') 
const path = require('path') 
const crypto = require('crypto')

const imageStorage = multer.diskStorage({
    destination: function(req, res, cb) {

        let folder = ''

        if (req.baseUrl.includes('products')){
            folder = 'products'
        }else if (req.baseUrl.includes('catalog')){
            folder = 'carrosel'
        }
        else if (req.baseUrl.includes('category')){
            folder = 'categories'
        }

        cb(null, `public/images/${folder}`)
    },
    filename: (req, file, cb) => {
        cb(null, crypto.randomBytes(32).toString("hex") + path.extname(file.originalname));
      },
})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)){
            return cb(new Error("Por favor, envie apenas png ou jpg!"));
        }
        cb(undefined, true)
    }    
})

module.exports = { imageUpload }