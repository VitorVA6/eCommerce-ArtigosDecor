const fs = require('fs')

const removeImages = (req, res, next) => {
    
    if(req.body.uploadedImages?.length > 0){
        req.body.uploadedImages = req.body.uploadedImages.split(',')
    }else{
        req.body.uploadedImages = []
    }
    next()

}

module.exports = removeImages