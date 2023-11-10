import express from "express";
import cors from "cors";
import "./db/mongooseClient.js";
import pokemonRouter from "./routes/pokemonRoutes.js";
import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
const port = process.env.PORT || 7000;
app.use(cors({ exposedHeaders: "Authorization" }));

app.use(express.json());

app.get("/", (req, res) =>
    res.send(
        '<p>Welcome to the PokeFight API! Go to <a href="/pokemon">/pokemon</a> to see cool things happening</p>'
    )
);

app.use("/pokemon", pokemonRouter);

app.use("/users", userRouter);

app.use("/auth", authRouter);

app.use(errorHandler);

app.listen(port, () => console.log(`Welcome ${port}`));
