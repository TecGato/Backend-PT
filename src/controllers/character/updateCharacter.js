const { Character } = require('../../db');

async function updateCharacter(req, res) {
  const { id } = req.params;
  const { movie, ...updates } = req.body;
  try {
    const character = await Character.findByPk(id);
    if (!character) {
      return res.status(400).json({ error: 'Character not found' });
    }
    await character.update({
      ...updates,
    });
    await character.setMovies(movie);
    return res.status(200).json({ msg: 'Character Updated', character });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  updateCharacter,
};

/**
 * @swagger
 * /characters/{id}:
 *   put:
 *     summary: Update a character
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
 *         description: ID of the character to update
 *         schema:
 *           type: string
 *       - in: body
 *         name: character
 *         required: true
 *         description: Updated character object
 *         schema:
 *           $ref: '#/components/schemas/CharacterUpdate'
 *     responses:
 *       200:
 *         description: Character updated successfully
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
 *         description: Character not found or missing fields
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
