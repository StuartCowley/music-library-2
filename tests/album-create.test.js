// tests/album-create.js
const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('create album', () => {
  //first create a new artist to use in album table
  let artist;
  let db;
  beforeEach(async () => {
    db = await getDb();
    await db.query('INSERT INTO Artist (name, genre) VALUES (?,?)', [
      'Tame Impala',
      'Rock',
    ]);
    [artist] = await db.query(`SELECT * FROM Artist`);
  });

  afterEach(async () => {
    //delete all from album table after testing
    await db.query('DELETE FROM Album');
    await db.close();
  });

  describe('/artist/:id/album', () => {
    describe('POST', () => {
      it('creates a new album in the database', async () => {
        const artistId = artist[0];
        const res = await request(app)
          .post(`/artist/${artistId.id}/album`)
          .send({
            name: 'Currents',
            year: '2015',
          });
        console.log({ artistId });
        expect(res.status).to.equal(201);

        const [[albumEntries]] = await db.query(
          'SELECT * FROM Album where artistId = ?'[artistId]
        );

        expect(albumEntries.name).to.equal('Currents');
        expect(albumEntries.year).to.equal(2015);
      });
    });
  });
});
