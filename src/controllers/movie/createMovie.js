const { Movie } = require('../../db');

async function createMovie(req, res) {
  const { title, image, releaseDate, rating, genre, character } = req.body;
  try {
    if (!title || !image || !releaseDate || !rating) {
      return res.status(400).json({ error: 'Missing Fields' });
    }
    const movie = await Movie.create({
      title,
      image,
      releaseDate,
      rating,
    });
    if (genre?.length > 0) await movie.addGenres(genre);
    if (character?.length > 0) await movie.addCharacters(character);
    return res.status(200).json({ msg: 'Movie Created', movie });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createMovie,
};

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Create a new movie
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: header
 *         name: cookie
 *         schema:
 *           type: string
 *         required: true
 *         description: auth token cookie (JWT).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: Movie created successfully
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
 *         description: Bad request - Missing fields
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
