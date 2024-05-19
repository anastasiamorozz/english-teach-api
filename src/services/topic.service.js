const {User, UserTopics, Topic} = require('../models')

class TopicService{
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