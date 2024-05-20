const {User, UserTopics, Topic} = require('../models')

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
}
module.exports = new TopicService();