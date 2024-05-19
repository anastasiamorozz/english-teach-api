const { Op } = require('sequelize');
const {UserWords, Word} = require('../models')

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

    async saveWordsCount(newWords, userId){
        try{
            const user = await UserWords.findOne({
                where: {id: userId}
            })

            if(!user){
                await UserWords.create({
                    userId,
                    words: newWords.length,
                })
            }
            else{
                user.words += newWords.length;
                await user.save();
            }
        }catch(e){
            console.log(e)
        }
    }

    async getAnswer(wordId, answer){
        try{
            const word = await Word.findOne({
                where: {id: wordId}
            })
            if(!word){
                throw new Error("Can`t find word")
            }

            if(word.meaning == answer){
                return true;
            }
            else{ 
                return false;
            }
        }catch(e){
            console.log(e)
        }
    }
}

module.exports = new WordService();