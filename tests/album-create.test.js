// tests/album-create.js
const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('create album', () => {
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
    await db.query('DELETE FROM Album');
    await db.close();
  });

  describe('/artist/:id/album', () => {
    describe('POST', () => {
      it('creates a new album in the database', async () => {
        const id = artist.id;
        const res = await request(app).post(`/artist/${id}/album`).send({
          name: 'Currents',
          year: '2015',
        });

        expect(res.status).to.equal(201);

        const [[albumEntries]] = await db.query('SELECT * FROM Album');

        expect(albumEntries.name).to.equal('Currents');
        expect(albumEntries.year).to.equal(2015);
      });
    });
  });
});
