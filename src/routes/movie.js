const { Router } = require('express');
const router = Router();
const { getMovies } = require('../controllers/movie/getMovies');
const { getMovieById } = require('../controllers/movie/getMovieById');
const { createMovie } = require('../controllers/movie/createMovie');
const { updateMovie } = require('../controllers/movie/updateMovie');
const { deleteMovie } = require('../controllers/movie/deleteMovie');

router.get('/', getMovies);
router.get('/:id', getMovieById);
router.post('/', createMovie);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

module.exports = router;
