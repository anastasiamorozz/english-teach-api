const fs = require('fs');
const AWS = require('aws-sdk');
require('dotenv').config();
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'eu-north-1'
});

class ImageService{
    uploadFile(filePath, bucketName, newFileNameKey){
        const fileStream = fs.createReadStream(filePath);
        fileStream.on('error', (err)=>{
            console.log('Error with file stream: ', err);
        })

        const params = {
            Bucket:bucketName,
            Key:newFileNameKey,
            Body:fileStream,
        }

        s3.upload(params, (err, data)=>{
            if(err){
                throw new Error('Can`t upload image to S3: ', err)
            }

            if(data){
                return(data.Location)
            }
        })
    }
}

module.exports = new ImageService();