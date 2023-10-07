const axios = require('axios')

function imageReader(urls){
    return new Promise( async (resolve, reject) => {
        let files = []
        try{
            for (let i = 0; i < urls.length; i++) {
                const response = await axios({
                    url: urls[i],
                    method: 'GET',
                    responseType: 'arraybuffer'
                });
                files.push({
                    image_url: urls[i],
                    buffer: response.data,
                    content_type: response.headers['content-type']
                })
            }
            resolve(files)
        }catch(err){
            console.log(err)
            reject(err)
        }
    } )
}


module.exports = imageReader