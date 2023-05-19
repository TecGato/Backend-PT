const { Genre } = require('../db.js');
const { Movie } = require('../db.js');

async function createGenre(req, res, next) {
  try {
    const { name, image } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Missing Fields' });
    }
    const genre = await Genre.create({
      name,
      image,
    });
    return res.status(200).json({ msg: 'Genre Created', genre });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createGenre,
};
