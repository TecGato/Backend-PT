const { Genre } = require('../db');
const { Movie } = require('../db');
const { Op } = require('sequelize');

async function getMovies(req, res) {
  const { name, genre, order } = req.query;
  try {
    if (name) {
      const movies = await Movie.findAll({
        where: { title: { [Op.like]: `%${name}%` } },
      });
      return res.status(200).json(movies);
    } else if (genre) {
      const movies_by_genre = await Genre.findByPk(genre, {
        include: {
          model: Movie,
          attributes: ['title', 'image', 'releaseDate'],
          through: { attributes: [] },
        },
      });
      return res.status(200).json(movies_by_genre?.Movies);
    } else if (order) {
      const movies = await Movie.findAll({
        order: [['releaseDate', order]],
      });
      return res.status(200).json(movies);
    } else {
      const movies = await Movie.findAll({
        attributes: ['title', 'image', 'releaseDate'],
      });
      res.status(200).json(movies);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

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
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
};
