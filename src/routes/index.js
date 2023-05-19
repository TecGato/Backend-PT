const { Router } = require('express');
const character = require('./character');
const movie = require('./movie');
const genre = require('./genre');
const auth = require('./auth');

const router = Router();

router.use('/characters', character);
router.use('/movies', movie);
router.use('/genres', genre);
router.use('/auth', auth);

module.exports = router;
