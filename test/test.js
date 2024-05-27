const imageService = require("../src/services/image.service");

const bucketName='english-teach-storage';
const newFileNameKey='file.jfif';
const filePath='./1.jfif';

const result = imageService.uploadFile(filePath, bucketName, newFileNameKey);
console.log(result);