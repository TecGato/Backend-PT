const { Character } = require('../../db');
const { Movie } = require('../../db');

async function getCharacterById(req, res) {
  const { id } = req.params;
  try {
    const character = await Character.findByPk(id, {
      include: {
        model: Movie,
        attributes: ['title'],
        through: { attributes: [] },
      },
    });
    return res.status(200).json(character);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getCharacterById,
};

/**
 * @swagger
 * /characters/{id}:
 *   get:
 *     summary: Get a character by ID
 *     tags:
 *       - Characters
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
 *         description: ID of the character to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Character retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Character'
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
