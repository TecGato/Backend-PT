const { Character } = require('../../db');
const { Movie } = require('../../db');
const { Op } = require('sequelize');

async function getCharacters(req, res) {
  const { name, age, movies } = req.query;
  try {
    if (name) {
      const characters = await Character.findAll({
        where: { name: { [Op.like]: `%${name}%` } },
      });
      return res.status(200).json(characters);
    } else if (age) {
      const characters = await Character.findAll({
        attributes: ['name', 'image'],
        where: { age: age },
      });
      return res.status(200).json(characters);
    } else if (movies) {
      const movie = await Movie.findByPk(movies, {
        include: {
          model: Character,
          attributes: ['name', 'image'],
          through: { attributes: [] },
        },
      });
      return res.status(200).json(movie?.Characters);
    } else {
      const characters = await Character.findAll({
        attributes: ['name', 'image'],
      });
      res.status(200).json(characters);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getCharacters,
};

/**
 * @swagger
 * /characters:
 *   get:
 *     summary: Get characters
 *     tags:
 *       - Characters
 *     parameters:
 *       - in: header
 *         name: cookie
 *         schema:
 *           type: string
 *         required: true
 *         description: auth token cookie (JWT).
 *       - in: query
 *         name: name
 *         required: false
 *         description: Filter characters by name (partial match)
 *         schema:
 *           type: string
 *       - in: query
 *         name: age
 *         required: false
 *         description: Filter characters by age
 *         schema:
 *           type: integer
 *       - in: query
 *         name: movies
 *         required: false
 *         description: Filter characters by movie ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Characters retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Character'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
