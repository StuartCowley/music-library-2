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

exports.readOne = async (req, res) => {
  const db = await getDb();
  const id = req.params.id;

  try {
    const [[album]] = await db.query(`SELECT * FROM Album WHERE id = ?`, [id]);

    if (album) {
      res.status(200).json(album);
    } else {
      res.status(404).json({ error: 'The album could not be found.' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
  db.close();
};

exports.update = async (req, res) => {
  const db = await getDb();
  const id = req.params.id;
  const userInput = req.body;

  try {
    const [[album]] = await db.query(`SELECT * FROM Album WHERE id = ?`, [id]);

    if (album) {
      await db.query(`UPDATE Album SET ? WHERE id = ?`, [userInput, id]);
      res.status(200).send('Album Updated');
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.status(500).json(err);
  }
  db.close();
};

exports.delete = async (req, res) => {
  const db = await getDb();
  const id = req.params.id;

  try {
    const [[album]] = await db.query(`SELECT * FROM Album WHERE id = ?`, [id]);

    if (album) {
      await db.query(`DELETE FROM Album WHERE id = ?`, [id]);
      res.status(200).send('Album Deleted');
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.status(500).json(err);
  }
  db.close();
};
