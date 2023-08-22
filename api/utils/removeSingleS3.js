const {S3Client, DeleteObjectCommand} = require('@aws-sdk/client-s3')

function removeSingleS3 (file) {
    return new Promise( async (resolve, reject) => {
        try{
            const client = new S3Client({
                region: 'us-west-2',
                credentials: {
                    accessKeyId: process.env.S3_ACCESS_KEY,
                    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
                },
            });
            await client.send(
                new DeleteObjectCommand({
                    Bucket: 'artigos-decor',
                    Key: file
                })
            );
            resolve()
        }catch(err){
            console.log(err)
            reject(err)
        }
    } )
}

module.exports = removeSingleS3