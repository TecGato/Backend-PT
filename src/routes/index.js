const { Router } = require('express');
const character = require('./character');
const movie = require('./movie');
const genre = require('./genre');
const auth = require('./auth');
const validateJWT = require('../middlewares/validate-jwt');

const router = Router();

router.use('/characters', validateJWT, character);
router.use('/movies', validateJWT, movie);
router.use('/genres', genre);
router.use('/auth', auth);

module.exports = router;
