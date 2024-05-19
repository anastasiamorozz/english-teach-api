const {Topic}=require('../models');
const tokenService = require('../services/token.service');
const topicService = require('../services/topic.service');
const wordService = require('../services/word.service');

class TestController{
    async createTopic(req, res, next){
        try{
            const {title, level} = req.body;
            const topic = await Topic.create({title, level});
            if(!topic){
                return next(new Error ('Something get wrong and topic not created'))
            }
            return res.json(topic);
        }catch(e){
            next(e)
        }
    }

    async deleteTopic(req, res, next){
        try{
            const {id} = req.body;
            const topic = await Topic.destroy({
                where:{
                    id
                }
            });
            if(!topic){
                return next(new Error ('Something get wrong and topic not deleted'))
            }
            return res.json(topic);
        }catch(e){
            next(e)
        }
    }

    async getTopics(req, res, next){
        try{
            const topics = await Topic.findAll();
            res.json(topics);
        }catch(e){
            next(e)
        }
    }

    async startTopic(req, res, next){
        try{
            const {topicId} = req.body;
            if(!topicId){
                throw new Error('Topic id is required')
            }

            const {refreshToken} = req.cookies;
            const user = tokenService.validateRefreshToken(refreshToken);
            if(!user){
                throw new Error('Can`t find user');
            }

            const userTopic = topicService.start(user.id, topicId);
            if(!userTopic){
                throw new Error('Something get wrong and topic not started')
            }

            return res.json(userTopic);
        }catch(e){
            next(e)
        }
    }

    async getResult(req, res, next){
        try{
            const {topicId, correctAnswers, wrongAnswers, } = req.body;
            if(!topicId || !correctAnswers || !wrongAnswers){
                throw new Error('Topic id, correctAnswers and wrongAnswers are required')
            }

            const {refreshToken} = req.cookies;
            const user = tokenService.validateRefreshToken(refreshToken);
            if(!user){
                throw new Error('Can`t find user');
            }

            const words = wordService.saveWordsCount(correctAnswers, user.id);
            // const topic = topicService.saveUserTopic(user.id, topicId);
            if(!words){
                throw new Error('Something get wrong and words not saved')
            }
            // if(!topic){
            //     throw new Error('Something get wrong and topic not started')
            // }
            return res.json(200);
        }catch(e){
            next(e)
        }
    }

    async searchTopic(req, res, next){ //vector search by title and level
        try{

        }catch(e){
            next(e)
        }
    }

    async createWord(req, res, next){
        try{
            const {word, meaning, fakeMeaning, topic} = req.body;
            const topicId = Topic.findOne({
                where: {id: topic}
            })
            if(!topicId){
                throw new Error('Topic not found')
            }
            const newWord = wordService.createWord(word, meaning, fakeMeaning, topic);
            return res.json(newWord);
        }catch(e){
            next(e)
        }
    }

    async getAllWords(req, res, next){
        try{
            const words = await wordService.getAllWords();
            return res.json(words);
        }catch(e){
            next(e)
        }
    }

    async getTopicWords(req, res, next){
        try{
            const {topicId} = req.body;
            const topic = Topic.findOne({
                where: {id: topicId}
            })
            if(!topic){
                throw new Error('Topic not found')
            }
            const words = await wordService.getTopicWords(topicId);
            return res.json(words);
        }catch(e){
            next(e)
        }
    }

    async deleteWord(req, res, next){
        try{
            const {wordId} = req.body;
            const word = await wordService.deleteWord(wordId);
            return res.json(word);
        }catch(e){
            next(e)
        }
    }

    async answering(req, res, next){
        try{
            const {wordId, answer} = req.body;
            const word = await wordService.getAnswer(wordId, answer);
            return res.json(word);
        }catch(e){
            next(e)
        }
    }

    async searchWord(req, res, next){
        try{
            const {word, answer} = req.body;
            const words = await wordService.searchWord(word, answer);
            return res.json(words);
        }catch(e){
            next(e)
        }
    }
}

module.exports = new TestController();