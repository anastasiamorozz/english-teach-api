const AuthController = require('../controllers/auth.controller');
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');

const Router = require('express').Router;

const AutorizationRouter = new Router();

AutorizationRouter.post('/registration', 
    body("email").isEmail(),
    body("password").isLength({min: 3, max: 32}),
    AuthController.registration);
AutorizationRouter.post('/login', AuthController.login);
AutorizationRouter.post('/logout', AuthController.logout);
AutorizationRouter.get('/activate/:link', AuthController.activate);
AutorizationRouter.get('/refresh', AuthController.refresh);

// AutorizationRouter.get('/users', authMiddleware, AuthController.getUsers);

module.exports = AutorizationRouter;