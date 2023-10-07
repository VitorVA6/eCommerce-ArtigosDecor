const {S3Client, PutObjectCommand} = require('@aws-sdk/client-s3')
const path = require('path')
const crypto = require('crypto')

function uploadS3files (files) {
    return new Promise( async (resolve, reject) => {
        let images = []
        try{
            for (let i = 0; i < files.length; i++){
                const urlPath = new URL(files[i].image_url).pathname;
                const fileExtension = path.extname(urlPath);
                const filename = crypto.randomBytes(32).toString("hex") + fileExtension

                const client = new S3Client({
                    region: 'us-west-2',
                    credentials: {
                      accessKeyId: process.env.S3_ACCESS_KEY,
                      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
                    },
                });
                const data = await client.send(new PutObjectCommand({
                    Bucket: 'artigos-decor',
                    Body: files[i].buffer,
                    ACL: 'public-read',
                    Key: filename,
                    ContentType: files[i].content_type,
                  }));
                images.push(filename)
            }
            resolve(images)
        }catch(err){
            console.log(err)
            reject(err)
        }
    } )
}

module.exports = uploadS3files