const tokenService = require("../services/token.service");
const userService = require("../services/user.service");

class FollowController{
    async follow(req, res, next){
        try{
            const {refreshToken} = req.cookies;
            const user = tokenService.validateRefreshToken(refreshToken);
            if(!user){
                throw new Error('Can`t find user');
            }

            const {followerId} = req.body;
            if(!followerId){
                throw new Error('Bad request param')
            }

            const followAction = userService.follow(user.id, followerId);
            return res.json(followAction);
        }catch(e){
            // throw new Error("Something get wrong with following")
            next(e)
        }
    }

    async unfollow(req, res, next){
        try{
            const {refreshToken} = req.cookies;
            const user = tokenService.validateRefreshToken(refreshToken);
            if(!user){
                throw new Error('Can`t find user');
            }

            const {followerId} = req.body;
            if(!followerId){
                throw new Error('Bad request param')
            }

            const unfollowAction = userService.unfollow(user.id, followerId)
            return res.json(unfollowAction);
        }catch(e){
            next(e)
        }
    }

    async getFollowers(req, res, next){
        try{

        }catch(e){
            throw new Error
        }
    }

    async getSubscriptions(req, res, next){
        try{

        }catch(e){
            throw new Error
        }
    }
}

module.exports = new FollowController();