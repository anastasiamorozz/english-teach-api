'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserTopics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserTopics.init({
    userId: {
      type: DataTypes.NUMBER,
      references:{
        model: "Users",
        key: "id"
      }
    },
    topicId: {
      type: DataTypes.NUMBER,
      references:{
        model: "Topics",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'UserTopics',
  });
  return UserTopics;
};