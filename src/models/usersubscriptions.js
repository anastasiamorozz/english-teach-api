'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserSubscriptions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserSubscriptions.init({
    userId: {
      type: DataTypes.NUMBER,
      references:{
        model: "Users",
        key: "id"
      }
    },
    subscribedToUserId: {
      type: DataTypes.NUMBER,
      references:{
        model: "Users",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'UserSubscriptions',
  });
  return UserSubscriptions;
};