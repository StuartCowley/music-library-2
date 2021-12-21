// src/controllers/artist.js
const getDb = require('../services/db');

exports.create = async (req, res) => {
  const db = await getDb();
  const { name, genre } = req.body;

  try {
    await db.query('INSERT INTO Artist (name, genre) VALUES (?, ?)', [
      name,
      genre,
    ]);

    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500).json(err);
  }

  db.close();
};

exports.read = async (req, res) => {
  const db = await getDb();

  try {
    const artists = await db.query('SELECT * FROM Artist');

    res.status(200).json(artists[0]);
  } catch (err) {
    res.status(500).json(err);
  }
  db.close();
};

exports.readOne = async (req, res) => {
  const db = await getDb();
  const id = req.params.id;

  try {
    const [[artist]] = await db.query(`SELECT * FROM Artist WHERE id = ?`, [
      id,
    ]);
    if (artist) {
      res.status(200).json(artist);
    } else {
      res.status(404).json({ error: 'The artist could not be found.' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
  db.close();
};
