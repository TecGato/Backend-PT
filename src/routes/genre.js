const { Router } = require('express');
const router = Router();

const { createGenre } = require('../controllers/genre');

router.post('/', createGenre);

module.exports = router;
