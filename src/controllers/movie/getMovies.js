const { Genre } = require('../../db');
const { Movie } = require('../../db');
const { Op } = require('sequelize');

async function getMovies(req, res) {
  const { name, genre, order } = req.query;
  try {
    if (name) {
      const movies = await Movie.findAll({
        where: { title: { [Op.like]: `%${name}%` } },
      });
      return res.status(200).json(movies);
    } else if (genre) {
      const movies_by_genre = await Genre.findByPk(genre, {
        include: {
          model: Movie,
          attributes: ['title', 'image', 'releaseDate'],
          through: { attributes: [] },
        },
      });
      return res.status(200).json(movies_by_genre?.Movies);
    } else if (order) {
      const movies = await Movie.findAll({
        order: [['releaseDate', order]],
      });
      return res.status(200).json(movies);
    } else {
      const movies = await Movie.findAll({
        attributes: ['title', 'image', 'releaseDate'],
      });
      res.status(200).json(movies);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getMovies,
};

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Get movies
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: header
 *         name: cookie
 *         schema:
 *           type: string
 *         required: true
 *         description: auth token cookie (JWT).
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter movies by name
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter movies by genre
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: Order movies by release date (asc, desc)
 *     responses:
 *       200:
 *         description: Movies retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
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
