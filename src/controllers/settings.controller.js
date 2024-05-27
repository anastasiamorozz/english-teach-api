const imageService = require("../services/image.service");
const tokenService = require("../services/token.service");
const userService = require("../services/user.service");

class SettingsController{
    async uploadAvatar(req, res, next){
        try{
            const {refreshToken} = req.cookies;
            const user = tokenService.validateRefreshToken(refreshToken);
            if(!user){
                throw new Error('Can`t find user');
            }

            const {filePath} = req.params;
            console.log("filePath", filePath)
            const store = imageService.uploadFile(filePath, process.env.AWS_BUCKED_NAME, "avatar.jpg");
            if(!store){
                next('Can`t upload avatar');
            }

            const saveNewPhoto = await userService.changeAvatar(user.id, store);
            return res.json(saveNewPhoto);
        }catch(e){
            next(e)
        }
    }
}

module.exports = new SettingsController()