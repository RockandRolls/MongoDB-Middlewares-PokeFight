// require('dotenv').config(); u can write it here or in package.json (scripts),
//  to add env file functionality. normally vite does it automatically in frontend
const express = require("express");
const pokemonRouter = require("./routes/pokemonRoutes.js");
const app = express();
// const dbPool = require("./db/pgClient");
const {
    getAllPokemons,
    getSinglePokemon,
    getPokemonById,
    getPokeInfo,
} = require("./controllers/cardControllers");
const cors = require("cors");

const port = process.env.PORT || 7000;
app.use(cors());

// console.log(process.env);
// to see in terminal all the credentials added in env file

// let jsonData = require(‘./data.json’);
app.use(express.json());
// We enable data to be interpreted as JSON
// And we also enable the body to be interpreted as urlencoded content
// This is important for step 6(singleCard) and the view engine, since html forms send data as x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) =>
    res.send(
        '<p>Welcome to the PokeFight API! Go to <a href="/pokemon">/pokemon</a> to see cool things happening</p>'
    )
);

app.use("/pokemon", pokemonRouter);
// app.route("/pokemon").get(getAllPokemons);
// app.route("/pokemon/:pokeName").get(getSinglePokemon);
// app.route("/pokemon/withid/:id").get(getPokemonById);
// app.route("/pokemon/:pokeName/:info").get(getPokeInfo);

app.listen(port, () => console.log(`Welcome ${port}`));
