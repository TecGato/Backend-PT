const { Router } = require('express');
const router = Router();
const { getCharacters } = require('../controllers/character/getCharacters');
const {
  getCharacterById,
} = require('../controllers/character/getCharacterById');
const { createCharacter } = require('../controllers/character/createCharacter');
const { updateCharacter } = require('../controllers/character/updateCharacter');
const { deleteCharacter } = require('../controllers/character/deleteCharacter');

router.get('/', getCharacters);
router.get('/:id', getCharacterById);
router.post('/', createCharacter);
router.put('/:id', updateCharacter);
router.delete('/:id', deleteCharacter);

module.exports = router;
