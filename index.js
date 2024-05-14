const express = require("express");
const app = express();
const cors = require('cors');
require('dotenv').config();
const { sequelize } = require('./src/models/');
const AutorizationRouter = require('./src/routes/auth.routes');
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./src/middlewares/error.middleware");
const UserRouter = require("./src/routes/user.routes");
// const swaggerUi = require('swagger-ui-express');
// const swaggerSpec = require('./swagger');

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use(cookieParser());
app.use(express.json()); 
app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send(":D");
});

const connectDb = async () => {
    console.log('Checking db connection...');

    try{
        await sequelize.authenticate();
        console.log('Database connection established.');
    }catch(e){
        console.log('Database connection failed!', e);
        process.exit(1);
    }
}

app.use(express.json()); 

(async () => {
    await connectDb();
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
        console.log('server running on port', port);
    });
})();

app.use('/auth', AutorizationRouter);
app.use('/user', UserRouter);