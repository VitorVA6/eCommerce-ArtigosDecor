const {S3Client, PutObjectCommand} = require('@aws-sdk/client-s3')
const fs = require('fs')

function uploadS3 (files) {
    return new Promise( async (resolve, reject) => {
        let images = []
        try{
            for (let i = 0; i < files.length; i++){
                const client = new S3Client({
                    region: 'us-west-2',
                    credentials: {
                      accessKeyId: process.env.S3_ACCESS_KEY,
                      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
                    },
                });
                const data = await client.send(new PutObjectCommand({
                    Bucket: 'artigos-decor',
                    Body: fs.readFileSync(files[i].path),
                    ACL: 'public-read',
                    Key: files[i].filename,
                    ContentType: files[i].mimetype,
                  }));
                images.push(files[i].filename)
            }
            resolve(images)
        }catch(err){
            console.log(err)
            reject(err)
        }
    } )
}

module.exports = uploadS3