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
            const {refreshToken} = req.cookies;
            const user = tokenService.validateRefreshToken(refreshToken);
            if(!user){
                throw new Error('Can`t find user');
            }

            const followers = await userService.getFollowers(user.id);
            return res.json(followers);
        }catch(e){
            next(e);
        }
    }

    async getSubscriptions(req, res, next){
        try{
            const {refreshToken} = req.cookies;
            const user = tokenService.validateRefreshToken(refreshToken);
            if(!user){
                throw new Error('Can`t find user');
            }

            const subscriptions = await userService.getSubscriptions(user.id);
            return res.json(subscriptions);
        }catch(e){
            next(e);
        }
    }
}

module.exports = new FollowController();