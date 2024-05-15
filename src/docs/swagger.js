const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['../routes/user.routes', '../routes/auth.routes']

swaggerAutogen(outputFile, endpointsFiles)