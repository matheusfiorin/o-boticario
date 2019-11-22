require('dotenv').config(); // Allow the reading of .env

process.env.PORT = 3001;

// Dependencies
const request = require('supertest');
const app = require('../../app');
require('../../routes/functions')();

jest.setTimeout(30000);

describe('Sells routine', () => {
  test('Insert, Update, Get & Delete',
    async (done) => {
      await withJwtAuthentication(request(app).post('/sells').send(base_sell))
        .then(async resp => {
          expect(resp.status).toBe(201);
          expect(resp.body.id).not.toBe(null);

          const SellID = resp.body.id;

          await withJwtAuthentication(request(app).get("/sells"))
            .then(resp => {
              expect(resp.status).toBe(200);
              expect(resp.body.length).not.toBe(0);
            });

          await withJwtAuthentication(request(app).get(`/sells/${SellID}`))
            .then(resp => {
              expect(resp.status).toBe(200);
              expect(resp.body.id).toBe(SellID);
              expect(resp.body.userid).toBe(base_sell.userid);
              expect(resp.body.sellid).toBe(base_sell.sellid);
              expect(resp.body.price).toBe(base_sell.price);
              expect(new Date(resp.body.date)).toStrictEqual(new Date(base_sell.date));
            });

          await withJwtAuthentication(request(app).put(`/sells/${SellID}`).send(updated_sell))
            .then(resp => {
              expect(resp.status).toBe(200);
              expect(resp.body.id).toBe(SellID);
            });

          await withJwtAuthentication(request(app).get("/sells"))
            .then(resp => {
              expect(resp.status).toBe(200);
              expect(resp.body.length).not.toBe(0);
            });

          await withJwtAuthentication(request(app).get(`/sells/${SellID}`))
            .then(resp => {
              expect(resp.status).toBe(200);
              expect(resp.body.id).toBe(SellID);
              expect(resp.body.userid).toBe(updated_sell.userid);
              expect(resp.body.sellid).toBe(updated_sell.sellid);
              expect(resp.body.price).toBe(updated_sell.price);
              expect(new Date(resp.body.date)).toStrictEqual(new Date(updated_sell.date));
            });

          await withJwtAuthentication(request(app).delete(`/sells/${SellID}`))
            .then(resp => {
              expect(resp.status).toBe(200);
            });

          await withJwtAuthentication(request(app).get(`/sells/${SellID}`))
            .then(resp => {
              expect(resp.status).toBe(404);
              expect(resp.body.name).toBe("Not found");

              done();
            });
        })
        .catch(error => {
          console.error({
            error
          });
        });
    });

  const base_sell = {
    "userid": parseInt(process.env.TEST_USER_ID),
    "sellid": generateRandomNumber(1000).toString(),
    "price": generateRandomNumber(100),
    "date": new Date().toString()
  }

  const updated_sell = {
    "userid": parseInt(process.env.TEST_ANOTHER_USER_ID),
    "sellid": generateRandomNumber(1000).toString(),
    "price": generateRandomNumber(100),
    "date": new Date().toString()
  }
});

afterAll(done => {
  process.env.PORT = 3000;
  app.close(done);
});