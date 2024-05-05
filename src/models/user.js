'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static async findByEmail(email) {
      return User.findOne({ where: { email } });
    }
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    photo: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    isActivated: DataTypes.BOOLEAN,
    activationLink: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};