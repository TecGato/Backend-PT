const { Genre } = require('../../db');
const { Movie } = require('../../db');

async function getMovieById(req, res) {
  const { id } = req.params;
  try {
    const movie = await Movie.findByPk(id, {
      include: {
        model: Genre,
        attributes: ['name', 'image'],
        through: { attributes: [] },
      },
    });
    return res.status(200).json(movie);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getMovieById,
};

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Get a movie by ID
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: header
 *         name: cookie
 *         schema:
 *           type: string
 *         required: true
 *         description: auth token cookie (JWT).
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the movie to retrieve
 *     responses:
 *       200:
 *         description: Movie retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
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
