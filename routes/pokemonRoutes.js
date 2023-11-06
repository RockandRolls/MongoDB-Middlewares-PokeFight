const express = require("express");
const {
    getAllPokemons,
    getSinglePokemon,
    getPokemonById,
    getPokeInfo,
} = require("../controllers/cardControllers");

const pokemonRouter = express.Router();

pokemonRouter.route("/").get(getAllPokemons);
pokemonRouter.route("/:pokeName").get(getSinglePokemon);
pokemonRouter.route("/withid/:id").get(getPokemonById);
pokemonRouter.route("/:pokeName/:info").get(getPokeInfo);

module.exports = pokemonRouter;
