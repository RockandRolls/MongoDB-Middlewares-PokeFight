// require('dotenv').config(); u can write it here or in package.json (scripts),
//  to add env file functionality. normally vite does it automatically in frontend
const express = require("express");
const app = express();
const dbPool = require("./db/pgClient");
const { getAllCards, getSingleCard } = require("./controllers/cardControllers");
const cors = require("cors");

const port = process.env.PORT || 7000;
app.use(cors());

console.log(process.env);
// to see in terminal all the credentials added in env file

// let jsonData = require(‘./data.json’)

app.get("/", (req, res) => res.send("Welcome to the PokeFight API"));

app.route("/pokemon").get(getAllCards);
app.route("/pokemon/:id").get(getSingleCard);
// app.route("/pokemon/:id/:info").get(getSingleCard);

app.listen(port, () => console.log("Welcome"));
