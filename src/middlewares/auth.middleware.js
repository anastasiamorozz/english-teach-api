const tokenService = require("../services/token.service");

module.exports = function (req, res, next){
    try{
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader) {
            return next(new Error('Unauthorized error'));
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if(!accessToken){
            return next(new Error("Invalid token"));
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if(!userData){
            return next(new Error("User not found!"));
        }

        req.user = userData;
        next();
    }catch(e){
        return next(new Error('Unauthorized error'))
    }
}