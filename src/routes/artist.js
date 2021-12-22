// src/routes/artist.js
const express = require('express');
const artistController = require('../controllers/artist');

const artistRouter = express.Router();

artistRouter.post('/artist', artistController.create);

artistRouter.get('/artist', artistController.read);

artistRouter.get('/artist/:id', artistController.readOne);

artistRouter.patch('/artist/:id', artistController.update);

artistRouter.delete('/artist/:id', artistController.delete);

module.exports = artistRouter;
