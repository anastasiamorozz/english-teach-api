const tokenService = require("../services/token.service");
const topicService = require("../services/topic.service");
const userService = require("../services/user.service");

class UserController{
    async getUserTopics(req, res, next){
        try{
            const {refreshToken} = req.cookies;
            const user = tokenService.validateRefreshToken(refreshToken);
            if(!user){
                throw new Error('Can`t find user');
            }

            const topics = await topicService.getUserTopics(user.id);
            res.json(topics);
        }catch(e){
            next(e);
        }
    }

    async getRankOfUsers(req, res, next){
        try{
            const rank = await userService.getRank();
            res.json(rank);
        }catch(e){
            next(e);
        }
    }

    async getWordsLearned(req, res, next){
        try{
            const {refreshToken} = req.cookies;
            const user = tokenService.validateRefreshToken(refreshToken);
            if(!user){
                throw new Error('Can`t find user');
            }

            const words = await userService.userWords(user.id);
            res.json(words);
        }catch(e){
            next(e);
        }
    }

    async searchByName(req, res, next){
        try{
            const {query, page, limit} = req.body;
            const result = await userService.search(query, page, limit);
            res.json(result);
        }catch(e){
            next(e)
        }
    }
}

module.exports = new UserController();