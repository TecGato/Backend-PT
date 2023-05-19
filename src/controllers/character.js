const { Character } = require('../db');
const { Movie } = require('../db');
const { Op } = require('sequelize');

async function getCharacters(req, res) {
  const { name, age, movies } = req.query;
  try {
    if (name) {
      const characters = await Character.findAll({
        where: { name: { [Op.like]: `%${name}%` } },
      });
      return res.status(200).json(characters);
    } else if (age) {
      const characters = await Character.findAll({
        attributes: ['name', 'image'],
        where: { age: age },
      });
      return res.status(200).json(characters);
    } else if (movies) {
      const movie = await Movie.findByPk(movies, {
        include: {
          model: Character,
          attributes: ['name', 'image'],
          through: { attributes: [] },
        },
      });
      return res.status(200).json(movie?.Characters);
    } else {
      const characters = await Character.findAll({
        attributes: ['name', 'image'],
      });
      res.status(200).json(characters);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

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
  getCharacters,
  getCharacterById,
  createCharacter,
  updateCharacter,
  deleteCharacter,
};
