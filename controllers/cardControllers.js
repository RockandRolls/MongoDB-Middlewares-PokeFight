// const dbPool = require("../db/pgClient"); if we r connected to a database
let jsonData = require('../data.json');
/**
 * Controller to serve all ducks in the database.
 * @route `/pokemon`
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @response Array of pokemons
 */

const getAllPokemons = (req, res) => { res.json(jsonData)};

/**
 * Controller to serve a single pokemon card based on card id.
 * @route /pokemon/:id
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @response Single pokemon object 
 */


 //   req=request 
const getSinglePokemon = (req, res) => { 
    try {
      const { pokeName } = req.params; 
//    single object in array=pokemon= alll details-name, type, base
      const findPokemon = jsonData.find((pokemon) =>pokeName.toLowerCase()=== pokemon.name.english.toLowerCase());      
//   pokeName is in URL= charmander 
// whatever user types, just make it lowercase //   
      if (!findPokemon) throw new Error('Pokemon not found.');
  
      return res.json(findPokemon);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

const getPokeInfo= (req, res) => { 
    try {
      const { pokeName, info } = req.params;  
      const findPokemon = jsonData.find((pokemon) =>pokeName.toLowerCase()=== pokemon.name.english.toLowerCase());      
      
      if (!findPokemon) throw new Error('Pokemon not found.');    
    
    if(findPokemon.hasOwnProperty(info)){
        return res.json(findPokemon[info])      
    }else {
        return res.status(404).json({ error: 'Info not found' }); 
       }  
      
    //   info= type or base.. info is accessed via bracket notation, placeholder for all keys not a specific key
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

module.exports = {
  getAllPokemons,
  getSinglePokemon,
  getPokeInfo
};
