// src/routes/album.js
const express = require('express');
const albumController = require('../controllers/album');

const albumRouter = express.Router();

albumRouter.post('/:id/album', albumController.create);

module.exports = albumRouter;
