import express from "express";
import "./db/mongooseClient.js";
import errorHandler from "./middlewares/errorHandler.js";
import pokemonRouter from "./routes/pokemonRoutes.js";
import userRouter from "./routes/userRoutes.js"; //bring back when userRoutes are up to date

import cors from "cors";

const app = express();
const port = process.env.PORT || 7000;
app.use(cors());

app.use(express.json());

app.get("/", (req, res) =>
    res.send(
        '<p>Welcome to the PokeFight API! Go to <a href="/pokemon">/pokemon</a> to see cool things happening</p>'
    )
);

app.use("/pokemon", pokemonRouter);

app.use("/users", userRouter);

app.use(errorHandler);

app.listen(port, () => console.log(`Welcome ${port}`));
