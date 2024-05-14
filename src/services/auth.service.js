const {User} = require('../models')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail.service')
const tokenService = require('./token.service')
const UserDto = require('../dtos/user.dto')

class AuthService {
    async registration(userEmail, password, firstName, lastName, photo){
        const candidate = await User.findOne({
            where: {
                email: userEmail
            }
        })
        if(candidate) {
            throw new Error(`User with email ${userEmail} already exists`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()


        const newUser = await User.create({firstName, lastName, photo, email: String(userEmail), password: String(hashPassword), isAdmin: false, isActivated: false,  activationLink})
        await mailService.sendActivationMail(userEmail, `${process.env.API_URL}/auth/activate/${activationLink}`)

        const userDto = new UserDto(newUser); // id, email, isActivated
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async activation(activationLink){
        const user = await User.findOne({
            where: {
                activationLink
            }
        })

        if(!user){
            throw new Error('Incorrect link')
        }

        user.isActivated=true;
        await user.save();
    }

    async login(email, password){
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        if(!user) {
            throw new Error(`User with email ${email} doesn't exists`)
        }

        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw new Error("Wrong password")
        }

        const userDto = new UserDto(user); 
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }
    
    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw new Error('Bad refresh token');
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            return('User is unauthorized');
        }
        const user = await User.findOne({
            where:{
                id: userData.id
            }
        });
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async getAllUsers(){
        const users = await User.findAll();
        return users; 
    }
}

module.exports = new AuthService()