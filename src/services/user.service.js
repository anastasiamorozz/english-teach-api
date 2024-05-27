const UserDto = require('../dtos/user.dto')
const {User, UserFollowers, UserWords} = require('../models')
const { Op } = require("sequelize");

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
            return("No Followers");
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

    async getRank(){
        const order = await UserWords.findAll({
            order: [['words', 'DESC']],
            limit: 4
        })

        const promises = order.map(async element =>{
            const isUserMatch = await User.findOne({
                where: {
                    id: element.userId
                }
            })

            if(isUserMatch){
                const user = new UserDto(isUserMatch);
                return user;
            }
        })

        const users = await Promise.all(promises);
        return users.filter(Boolean);
    }

    async userWords(userId){
        const user = await UserWords.findOne({
            where: {
                userId
            }
        })
        return user.words;
    }

    async search(query, page, limit){
        const offset = (page - 1) * limit;
        const [firstNameQuery, lastNameQuery] = query.split(' ');
    
        const whereClause = {
            [Op.or]: [
                { firstName: { [Op.substring]: firstNameQuery } },
                { lastName: { [Op.substring]: firstNameQuery } }
            ]
        };
    
        if (lastNameQuery) {
            whereClause[Op.or].push(
                {
                    [Op.and]: [
                        { firstName: { [Op.substring]: firstNameQuery } },
                        { lastName: { [Op.substring]: lastNameQuery } }
                    ]
                }
            );
        }
    
        const result = await User.findAndCountAll({
            where: whereClause,
            limit,
            offset
        });
    
        if (result.rows.length > 0) {
            const users = result.rows.map(user => new UserDto(user));
            return {
                total: result.count,
                users,
                currentPage: page,
                totalPages: Math.ceil(result.count / limit)
            };
        } else {
            return 'No one exists with this name';
        }
    }

    async changeAvatar(userId, url){
        const user = await User.findOne({
            where: { id: userId }
        })

        if(!user){
            throw new Error('User not found')
        }

        user.photo = url;
        user.save();
    }
}

module.exports = new UserService()