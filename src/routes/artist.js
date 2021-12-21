// src/routes/artist.js
const express = require('express');
const artistController = require('../controllers/artist');

const router = express.Router();

router.post('/', artistController.create);

router.get('/', artistController.read);

router.get('/:id', artistController.readOne);

router.patch('/:id', artistController.update);

router.delete('/:id', artistController.delete);

module.exports = router;
