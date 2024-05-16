const tokenService = require("../services/token.service");
const {User} = require('../models')

module.exports = async function(req, res, next) {
    try {
        const {refreshToken} = req.cookies;
        const user = tokenService.validateRefreshToken(refreshToken);

        const userData = await User.findOne({
            where:{
                id: user.id
            }
        })
        
        if (!userData.isAdmin) {
            return next(new Error("User is not an admin"));
        }

        req.user = user;
        next();
    } catch (e) {
        return next(new Error('Unauthorized error'));
    }
}
