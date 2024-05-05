const authService = require("../services/auth.service");
const {validationResult} = require('express-validator');

class AuthController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next( new Error('Not correct email or password!', errors.array()))
            }
            const {email, password, firstName, lastName, photo} = req.body;
            const userData = await authService.registration(email, password, firstName, lastName, photo);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await authService.getAllUsers();
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }

    async activate(req, res, next){
        try{
            const activationLink = req.params.link;
            await authService.activation(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        }catch(e){
            next(e);
        }
    }
}

module.exports = new AuthController();