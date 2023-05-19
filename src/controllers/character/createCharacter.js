const { Character } = require('../../db');

async function createCharacter(req, res) {
  const { name, age, weight, history, image, movie } = req.body;
  try {
    if (!name || !age || !weight || !history || !image || movie.length === 0) {
      return res.status(400).json({ error: 'Missing Fields' });
    }
    const character = await Character.create({
      name,
      age,
      weight,
      history,
      image,
    });
    await character.addMovies(movie);
    return res.status(200).json({ msg: 'Character Created', character });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createCharacter,
};

/**
 * @swagger
 * /characters:
 *   post:
 *     summary: Create a new character
 *     tags:
 *       - Characters
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
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               weight:
 *                 type: integer
 *               history:
 *                 type: string
 *               image:
 *                 type: string
 *               movie:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - name
 *               - age
 *               - weight
 *               - history
 *               - image
 *               - movie
 *     responses:
 *       200:
 *         description: Character created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 character:
 *                   $ref: '#/components/schemas/Character'
 *       400:
 *         description: Missing fields in the request body
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
