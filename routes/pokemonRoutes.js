import express from "express";
import {
    getAllPokemons,
    getSinglePokemon,
    getPokemonById,
    getPokeInfo,
} from "../controllers/cardControllers.cjs";

const pokemonRouter = express.Router();

pokemonRouter.route("/").get(getAllPokemons);
pokemonRouter.route("/:pokeName").get(getSinglePokemon);
pokemonRouter.route("/withid/:id").get(getPokemonById);
pokemonRouter.route("/:pokeName/:info").get(getPokeInfo);

export default pokemonRouter;
