const { sequelize } = require("../models");
const tokenService = require("../services/token.service");

class UserController{
    async getUserTopics(res, req, next){

    }

    async getRankOfUsers(res, req, next){

    }

    async getWordsLearned(res, req, next){

    }

    async searchByName(req, res, next){
        try{

        }catch(e){
            next(e)
        }
    }
}

module.exports = new UserController();