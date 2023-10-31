// const dbPool = require("../db/pgClient");

// /**
//  * Controller to serve all ducks in the database.
//  * @route `/pokemon`
//  * @param {*} req - Express request object
//  * @param {*} res - Express response object
//  * @response Array of pokemons
//  */

// const getAllCards = async (req, res) => {
//   try {
//     const { rows } = await dbPool.query(
//       `SELECT card_id, name, type, base FROM array;`
//     );

//     return res.json(rows);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error: error.message });
//   }
// };


// /**
//  * Controller to serve a single pokemon card based on card id.
//  * @route /pokemon/:id
//  * @param {*} req - Express request object
//  * @param {*} res - Express response object
//  * @response Single pokemon object 
//  */

// const getSingleCard = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!+id) return res.status(400).json({ error: "Id must be a number" });

//     const {
//       rows: [oneCard],
//     } = await dbPool.query(
//       `SELECT id, name, type, base FROM array WHERE card_id=$1`,
//       [id]
//     );

//     if (!oneCard)
//       return res.status(404).json({ error: "Pokemon could not be found" });

//     res.json(oneCard);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error: error.message });
//   }
// };

// module.exports = {
//   getAllCards,
//   getSingleCard,
// };
