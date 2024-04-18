'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    photo: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    isActivated: DataTypes.BOOLEAN,
    words: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      references:{
        model: "Words",
        key:"id"
      }
    },
    topics:{
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      references:{
        model: "Topics",
        key:"id"
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    freezeTableName: true,
  });
  return User;
};