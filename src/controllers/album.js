// src/controllers/album.js
const getDb = require('../services/db');

exports.create = async (req, res) => {
  const db = await getDb();
  const { name, year } = req.body;
  const artistId = req.params.id;

  try {
    await db.query(
      `INSERT INTO Album (name, year, artistId) VALUES (?, ?, ?)`,
      [name, year, artistId]
    );
    res.status(201).send('Album Created');
  } catch (err) {
    res.status(500).json(err);
  }
  db.close();
};

exports.read = async (_, res) => {
  const db = await getDb();

  try {
    const [albums] = await db.query('SELECT * FROM Album');

    res.status(200).json(albums);
  } catch (err) {
    res.status(500).json(err);
  }
  db.close();
};
