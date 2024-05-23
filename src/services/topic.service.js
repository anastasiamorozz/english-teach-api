const {User, UserTopics, UserWords, Topic} = require('../models')
const { Op } = require('sequelize');

class TopicService{
    async getAllTopics(page, pageSize){
        try {
            const offset = (page - 1) * pageSize;
            
            const topics = await Topic.findAll({
                limit: pageSize,
                offset: offset
            });
            
            const totalTopics = await Topic.count();
            const totalPages = Math.ceil(totalTopics / pageSize);
    
            return {
                data: topics,
                meta: {
                    totalWords: totalTopics,
                    totalPages: totalPages,
                    currentPage: page
                }
            };
        } catch (e) {
            console.log(e);
        }
    }

    async start(userId, topicId){
        const user = await User.findOne({
            where: {id: userId}
        })
        if(!user){
            throw new Error('User not found')
        }

        const topic = await Topic.findOne({
            where: {id: topicId}
        })
        if(!topic){
            throw new Error('Topic not found')
        }

        const userTopic = await UserTopics.create({
            userId: user.id,
            topicId: topic.id
        })
        if(!userTopic){
            throw new Error('UserTopic not found')
        }

        return userTopic;
    }

    async saveUserTopic(userId, topicId){
        try{
            const user = await User.findOne({
                where: {id: userId}
            })
            if(!user){
                throw new Error('User not found')
            }

            const topic = await Topic.findOne({
                where: {id: topicId}
            })
            if(!topic){
                throw new Error('Topic not found')
            }

            await UserTopics.create({userId, topicId});

        }catch(e){
            console.log(e)
        }
    }

    async getUserTopics(userId){
        const user = User.findOne({
            where: {id: userId}
        })
        if(!user){
            throw new Error('User not found')
        }

        const topicsId = await UserTopics.findAll({
            where: {userId}
        })

        const promises = topicsId.map(async element =>{
            const isTopicMatch = await Topic.findOne({
                where:{
                    id: element.topicId
                }
            })

            if(isTopicMatch){
                return (isTopicMatch);
            }
        })

        const topics = await Promise.all(promises); 
        return topics.filter(Boolean);
    }

    async search(title, level, page, limit) {
        const offset = (page - 1) * limit;

        const whereClause = {};
    
        if (title) {
            whereClause.title = {
                [Op.iLike]: `%${title}%` 
            };
        }
    
        if (level) {
            whereClause.level = {
                [Op.iLike]: `%${level}%`
            };
        }
    
        try {
            const result = await Topic.findAndCountAll({
                where: whereClause,
                limit,
                offset
            });
    
            return {
                total: result.count,
                topics: result.rows,
                currentPage: page,
                totalPages: Math.ceil(result.count / limit)
            };
        } catch (error) {
            console.error("Error executing search query: ", error);
            return {
                message: 'An error occurred while searching for topics',
                total: 0,
                topics: [],
                currentPage: page,
                totalPages: 0
            };
        }
    }
}
module.exports = new TopicService();