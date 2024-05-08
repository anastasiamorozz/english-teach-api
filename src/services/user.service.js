const {User, UserFollowers} = require('../models')

class UserService{
    async follow(userId, followId){
        const user = await User.findOne({
            where:{
                id: userId
            }
        })
        
        const followUser = await User.findOne({
            where:{
                id: followId
            }
        })

        if(!user || !followUser){
            throw new Error('Can`t find users')
        }

        const subscribe = UserFollowers.create({userId: user.id, followerId: followUser.id})

        return subscribe;
    }

    async unfollow(userId, followId){
        const user = await User.findOne({
            where:{
                id: userId
            }
        })
        
        const followUser = await User.findOne({
            where:{
                id: followId
            }
        })

        if(!user || !followUser){
            throw new Error('Can`t find users')
        }

        const unsubscribe = UserFollowers.destroy({
            where:{
                userId: user.id, 
                followerId: followUser.id
            }
        })

        return unsubscribe;
    }
}

module.exports = new UserService()