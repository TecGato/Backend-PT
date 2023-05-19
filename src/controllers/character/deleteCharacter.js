const { Character } = require('../../db');

async function deleteCharacter(req, res) {
  const { id } = req.params;
  try {
    const character = await Character.findByPk(id);
    if (!character) {
      return res.status(400).json({ error: 'Character not found' });
    }
    await character.destroy();
    return res.status(200).json({ msg: 'Character Deleted' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  deleteCharacter,
};

/**
 * @swagger
 * /characters/{id}:
 *   delete:
 *     summary: Delete a character
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
 *         description: ID of the character to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Character deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       400:
 *         description: Character not found
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
