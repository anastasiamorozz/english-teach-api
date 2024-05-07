'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserWords extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserWords.init({
    userId:{
      type: DataTypes.NUMBER,
      references:{
        model: "Users",
        key: "id"
      }
    },
    wordId: {
      type: DataTypes.NUMBER,
      references:{
        model: "Words",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'UserWords',
  });
  return UserWords;
};