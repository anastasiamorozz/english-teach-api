const { Op } = require('sequelize');
const {Word} = require('../models')

class WordService{
    async createWord(word, meaning, fakeMeaning, topic){
        try{
            await Word.create({word, meaning, fakeMeaning, topic});
        }catch(e){
            console.log(e)
        }
    }

    async deleteWord(word){
        try{
            await Word.destroy({
                where: {id: word}
            })
        }catch(e){
            console.log(e)
        }
    }

    async getAllWords(){
        try{
            const words = await Word.findAll();
            return words;
        }catch(e){
            console.log(e)
        }
    }

    async getTopicWords(topic){
        try{
            const words = await Word.findAll({
                where: {topic}
            });
            return words;
        }catch(e){
            console.log(e)
        }
    }

    async searchWord(word){
        try{
            const words = await Word.findAll({
                where: {
                    word:{
                        [Op.like]: `%${word}%`
                    }
                }
            })
            return words;
        }catch(e){
            console.log(e)
        }
    }
}

module.exports = new WordService();