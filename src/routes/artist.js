// src/routes/artist.js
const express = require('express');
const artistController = require('../controllers/artist');

const artistRouter = express.Router();

artistRouter.post('/', artistController.create);

artistRouter.get('/', artistController.read);

artistRouter.get('/:id', artistController.readOne);

artistRouter.patch('/:id', artistController.update);

artistRouter.delete('/:id', artistController.delete);

module.exports = artistRouter;
