// src/routes/artist.js
const express = require('express');
const artistController = require('../controllers/artist');

const router = express.Router();

router.post('/', artistController.create);

router.get('/', artistController.read);

router.get('/artist/:id', artistController.readOne);

router.patch('/artist/:id', artistController.update);

router.delete('/artist/:id', artistController.delete);

module.exports = router;
