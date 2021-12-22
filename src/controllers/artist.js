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
    res.status(201).send('Created artist');
  } catch (err) {
    res.sendStatus(500).json(err);
  }

  db.close();
};

exports.read = async (_, res) => {
  const db = await getDb();

  try {
    const [artists] = await db.query('SELECT * FROM Artist');

    res.status(200).json(artists);
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

exports.update = async (req, res) => {
  const db = await getDb();
  const id = req.params.id;
  const userInput = req.body;

  try {
    const [[artist]] = await db.query(`SELECT * FROM Artist WHERE id = ?`, [
      id,
    ]);

    if (artist) {
      await db.query(`UPDATE Artist SET ? WHERE id = ?`, [userInput, id]);
      res.sendStatus(200);
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
    const [[artist]] = await db.query(`SELECT * FROM Artist WHERE id = ?`, [
      id,
    ]);

    if (artist) {
      await db.query(`DELETE FROM Artist WHERE id = ?`, [id]);
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.status(500).json(err);
  }
  db.close();
};
