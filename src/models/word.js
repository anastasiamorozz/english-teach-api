'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Word extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  Word.init({
    id: DataTypes.NUMBER,
    word: DataTypes.STRING,       
    meaning: DataTypes.STRING,
    fakeMeaning: DataTypes.ARRAY(DataTypes.STRING),
    topic: {
      type: DataTypes.NUMBER,
      references:{
        model: 'Topics',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Word',
  });
  return Word;
};