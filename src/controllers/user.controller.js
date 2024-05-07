const { sequelize } = require("../models");
const tokenService = require("../services/token.service");

class UserController{
    async getFollowers(req, res, next){
        //find all in UserFollowers with same userId
        //find all users info by id from Users table
        //return if not empty

        try{
            const {refreshToken} = req.cookies;
            const user = tokenService.validateRefreshToken(refreshToken);
            if(!user){
                throw new Error('Can`t find user');
            }

            const [results, metadata] = await sequelize.query(`SELECT UserFollowers WHERE userId = ${user.id}`);
        
            //CONTINUE WHEN FOLLOWERS CONTROLLER WILL BE FINISHED
        }catch(e){
            throw new Error("Server error")
        }
    }

    async getFollowing(res, req, next){

    }

    async getTopics(res, req, next){

    }

    async getRankOfUsers(res, req, next){

    }

    async getWordsLearned(res, req, next){

    }
}

module.exports = new UserController();