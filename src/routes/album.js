// src/routes/album.js
const express = require('express');
const albumController = require('../controllers/album');

const albumRouter = express.Router();

albumRouter.post('/artist/:id/album', albumController.create);

albumRouter.get('/album', albumController.read);

albumRouter.get('/album/:id', albumController.readOne);

albumRouter.patch('/album/:id', albumController.update);

module.exports = albumRouter;
