// const dbPool = require("../db/pgClient"); if we r connected to a database
const jsonData = require("../data.json");
/**
 * Controller to serve all ducks in the database.
 * @route `/pokemon`
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @response Array of pokemons
 */

const dataWithSprites = jsonData.map((pokemon) => ({
    ...pokemon,
    sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
}));

const getAllPokemons = (req, res) => {
    res.json(dataWithSprites);
};

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
        //    single object in array=pokemon= all details-name, type, base
        const findPokemon = dataWithSprites.find(
            (pokemon) =>
                pokeName.toLowerCase() === pokemon.name.english.toLowerCase()
        );
        //   pokeName is in URL= charmander
        // whatever user types, just make it lowercase //
        if (!findPokemon) throw new Error("Pokemon not found.");

        return res.json(findPokemon);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// for getting enemy pokemon-easier to use id
const getPokemonById = (req, res) => {
    try {
        const { id } = req.params;

        //id from params is string, so can't use strict equality without converting it, should probably be done at some point, but this works for now
        const findPokemon = dataWithSprites.find((pokemon) => id == pokemon.id);

        if (!findPokemon) throw new Error("Pokemon not found.");

        return res.json(findPokemon);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getPokeInfo = (req, res) => {
    try {
        const { pokeName, info } = req.params;
        const findPokemon = dataWithSprites.find(
            (pokemon) =>
                pokeName.toLowerCase() === pokemon.name.english.toLowerCase()
        );

        if (!findPokemon) throw new Error("Pokemon not found.");

        if (findPokemon.hasOwnProperty(info)) {
            return res.json(findPokemon[info]);
        } else {
            return res.status(404).json({ error: "Info not found" });
        }

        //   info= type or base.. info is accessed via bracket notation, placeholder for all keys not a specific key
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllPokemons,
    getSinglePokemon,
    getPokemonById,
    getPokeInfo,
};
