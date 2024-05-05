const AuthController = require('../controllers/auth.controller');
const {body} = require('express-validator');

const Router = require('express').Router;

const AutorizationRouter = new Router();

AutorizationRouter.post('/registration', 
    body("email").isEmail(),
    body("password").isLength({min: 3, max: 32}),
    AuthController.registration);
AutorizationRouter.post('/login');
AutorizationRouter.post('/logout');
AutorizationRouter.post('/activate/:link', AuthController.activate);
AutorizationRouter.get('/refresh');

AutorizationRouter.get('/users');

module.exports = AutorizationRouter;