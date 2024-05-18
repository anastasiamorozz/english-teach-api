const UserDto = require('../dtos/user.dto')
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

    async getUser(userId){
        const isUserFollower = await User.findOne({
            where:{
                id: userId
            }
        })

        return isUserFollower;
    }

    async getFollowers(userId) {
        const findUserFollowers = await UserFollowers.findAll({
            where: {
                followerId: userId
            }
        });
    
        if (!findUserFollowers || findUserFollowers.length === 0) {
            throw new Error("No Followers");
        }
    
        const promises = findUserFollowers.map(async element => {
            const isUserFollower = await User.findOne({
                where: {
                    id: element.userId
                }
            });
    
            if (isUserFollower) {
                const user = new UserDto(isUserFollower);
                return user;
            }
        });
    
        const followers = await Promise.all(promises);
        return followers.filter(Boolean);
    }
    
    async getSubscriptions(userId) {
        const findUserSubscriptuons = await UserFollowers.findAll({
            where: {
                userId
            }
        });
    
        if (!findUserSubscriptuons || findUserSubscriptuons.length === 0) {
            throw new Error("No Subscriptions");
        }
    
        const promises = findUserSubscriptuons.map(async element => {
            const isUserFollower = await User.findOne({
                where: {
                    id: element.followerId
                }
            });
    
            if (isUserFollower) {
                const user = new UserDto(isUserFollower);
                return user;
            }
        });
    
        const subcs = await Promise.all(promises);
        return subcs.filter(Boolean);
    }

    async changeUserRole(id){
        const user = await User.findOne({
            where:{
                id
            }
        })

        user.isAdmin = !user.isAdmin;
        user.save();
    }
}

module.exports = new UserService()