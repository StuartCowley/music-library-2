// tests/album-update.test.js
const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('update album', () => {
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

  describe('/album/:id', () => {
    describe('PATCH', () => {
      it('updates a single album with the correct id', async () => {
        const album = albums[0];
        const res = await request(app)
          .patch(`/album/${album.id}`)
          .send({ name: 'new name', year: 2000 });

        expect(res.status).to.equal(200);

        const [[newAlbumRecord]] = await db.query(
          'SELECT * FROM Album WHERE id = ?',
          [album.id]
        );

        expect(newAlbumRecord.name).to.equal('new name');
      });

      it('returns a 404 if the artist is not in the database', async () => {
        const res = await request(app)
          .patch('/album/999999')
          .send({ name: 'new name' });

        expect(res.status).to.equal(404);
      });
    });
  });
});
