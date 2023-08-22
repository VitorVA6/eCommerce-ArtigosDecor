const {S3Client, DeleteObjectsCommand} = require('@aws-sdk/client-s3')
const fs = require('fs')

function removeS3 (files) {
    return new Promise( async (resolve, reject) => {
        try{
            const client = new S3Client({
                region: 'us-west-2',
                credentials: {
                    accessKeyId: process.env.S3_ACCESS_KEY,
                    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
                },
            });
            const { Deleted } = await client.send(
                new DeleteObjectsCommand({
                    Bucket: 'artigos-decor',
                    Delete: {
                        Objects: files,
                    },
                    Quiet: false
                })
            );
            resolve(Deleted)
        }catch(err){
            console.log(err)
            reject(err)
        }
    } )
}

module.exports = removeS3