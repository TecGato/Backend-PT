const { Movie } = require('../../db');

async function updateMovie(req, res) {
  const { id } = req.params;
  const { character, genre, ...updates } = req.body;
  try {
    const movie = await Movie.findByPk(id);
    if (!movie) {
      return res.status(400).json({ error: 'Movie not found' });
    }
    await movie.update({
      ...updates,
    });
    await movie.setCharacters(character);
    await movie.setGenres(genre);
    return res.status(200).json({ msg: 'Movie Updated', movie });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  updateMovie,
};

/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Update a movie
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
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID of the movie to update
 *       - in: body
 *         name: body
 *         schema:
 *           $ref: '#/components/schemas/Movie'
 *         required: true
 *         description: Updated movie data
 *     responses:
 *       200:
 *         description: Movie updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 movie:
 *                   $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Movie not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
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
