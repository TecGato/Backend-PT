const { Movie } = require('../../db');

async function deleteMovie(req, res) {
  const { id } = req.params;
  try {
    const movie = await Movie.findByPk(id);
    if (!movie) {
      return res.status(400).json({ error: 'Movie not found' });
    }
    await movie.destroy();
    return res.status(200).json({ msg: 'Movie Deleted' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  deleteMovie,
};

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Delete a movie
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
 *         description: The ID of the movie to delete
 *     responses:
 *       200:
 *         description: Movie deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       400:
 *         description: Bad request - Movie not found
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
