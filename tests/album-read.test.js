// tests/album-read.test.js
const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('read album', () => {
  let db;
  let albums;

  beforeEach(async () => {
    db = await getDb();
    await Promise.all([
      db.query('INSERT INTO Artist (name, genre) VALUES (?, ?)', [
        'Kanye West',
        'Hip-Hop',
      ]),
      db.query('INSERT INTO Artist (name, genre) VALUES (?, ?)', [
        'Kendrick Lamar',
        'Hip-Hop',
      ]),
      db.query('INSERT INTO Artist (name, genre) VALUES (?, ?)', [
        'Amy Winehouse',
        'Jazz',
      ]),
    ]);

    const [[kanyeWest]] = await db.query(
      'SELECT id FROM Artist WHERE name = ?',
      ['Kanye West']
    );
    const [[kendrickLamar]] = await db.query(
      'SELECT id FROM Artist WHERE name = ?',
      ['Kendrick Lamar']
    );
    const [[amyWinehouse]] = await db.query(
      'SELECT id FROM Artist WHERE name = ?',
      ['Amy Winehouse']
    );

    await Promise.all([
      db.query('INSERT INTO Album (name, year, artistID) VALUES (?, ?, ?)', [
        'Graduation',
        2007,
        kanyeWest.id,
      ]),

      db.query('INSERT INTO Album (name, year, artistID) VALUES (?, ?, ?)', [
        'To Pimp A Butterfly',
        2015,
        kendrickLamar.id,
      ]),

      db.query('INSERT INTO Album (name, year, artistID) VALUES (?, ?, ?)', [
        'Back to Black',
        2006,
        amyWinehouse.id,
      ]),
    ]);

    [albums] = await db.query('SELECT * FROM Album');
  });

  afterEach(async () => {
    await db.query('DELETE FROM Album');
    await db.query('DELETE FROM Artist');
    await db.close();
  });

  describe('/album', () => {
    describe('GET', () => {
      it('returns all album records in the database', async () => {
        const res = await request(app).get('/album');

        expect(res.status).to.equal(200);
        expect(res.body.length).to.equal(3);

        res.body.forEach((albumRecord) => {
          const expected = albums.find((a) => a.id === albumRecord.id);

          expect(albumRecord).to.deep.equal(expected);
        });
      });
    });
  });

  describe('/album/:id', () => {
    describe('GET', () => {
      it('returns a single artist with the correct id', async () => {
        const expected = albums[0];
        const res = await request(app).get(`/album/${expected.id}`);

        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(expected);
      });

      it('returns a 404 if the artist is not in the database', async () => {
        const res = await request(app).get('/album/999999');

        expect(res.status).to.equal(404);
      });
    });
  });
});
