'use strict';

const { default: axios } = require("axios");

class DogController {
    constructor(){}

    async getCoolDog(){
        try {
            const response = await axios.get('https://dog.ceo/api/breeds/image/random');
            return response.data.message;
        }catch (error){
            console.log(error);
            throw error;
        }
    }
}

module.exports = {DogController};