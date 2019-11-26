require('dotenv').config(); // Allow the reading of .env

process.env.PORT = 3005;

// Dependencies
const request = require('supertest');
const app = require('../../app');
require('../../routes/functions')();

jest.setTimeout(30000);

describe('Sells routine', () => {
  test('Insert, Update, Get & Delete',
    async (done) => {
      await request(app).post('/sells').send(sellWith10PercentCashback)
        .then(async resp => {
          console.info({
            resp
          });
          expect(resp.status).toBe(201);
          expect(resp.body.id).not.toBe(null);

          const tenPercentCashbackID = resp.body.id;

          const fifteenPercentCashbackID = await request(app).post('/sells').send(sellWith15PercentCashback)
            .then(resp => {
              expect(resp.status).toBe(201);
              expect(resp.body.id).not.toBe(null);

              return resp.body.id;
            });

          const twentyPercentCashbackID = await request(app).post('/sells').send(sellWith20PercentCashback)
            .then(resp => {
              expect(resp.status).toBe(201);
              expect(resp.body.id).not.toBe(null);

              return resp.body.id;
            });

          await request(app).get(`/sells/${tenPercentCashbackID}`)
            .then(resp => {
              expect(resp.status).toBe(200);
              expect(resp.body.cashbackpercentage).toBe(10);
              expect(resp.body.cashbackvalue).toBe(sellWith10PercentCashback.price * 0.1);
            });

          await request(app).get(`/sells/${fifteenPercentCashbackID}`)
            .then(resp => {
              expect(resp.status).toBe(200);
              expect(resp.body.cashbackpercentage).toBe(15);
              expect(resp.body.cashbackvalue).toBe(sellWith15PercentCashback.price * 0.15);
            });

          await request(app).get(`/sells/${twentyPercentCashbackID}`)
            .then(resp => {
              expect(resp.status).toBe(200);
              expect(resp.body.cashbackpercentage).toBe(20);
              expect(resp.body.cashbackvalue).toBe(sellWith20PercentCashback.price * 0.2);
            });

          await request(app).delete(`/sells/${tenPercentCashbackID}`)
            .then(resp => {
              expect(resp.status).toBe(200);
            });

          await request(app).delete(`/sells/${fifteenPercentCashbackID}`)
            .then(resp => {
              expect(resp.status).toBe(200);
            });

          await request(app).delete(`/sells/${twentyPercentCashbackID}`)
            .then(resp => {
              expect(resp.status).toBe(200);
              done();
            });
        })
        .catch(error => {
          console.error({
            error
          });
        });
    });

  const sellWith10PercentCashback = {
    "userid": parseInt(process.env.TEST_USER_ID),
    "sellid": generateRandomNumber(1000).toString(),
    "price": 999,
    "date": new Date().toString()
  }

  const sellWith15PercentCashback = {
    "userid": parseInt(process.env.TEST_USER_ID),
    "sellid": generateRandomNumber(1000).toString(),
    "price": 1499,
    "date": new Date().toString()
  }

  const sellWith20PercentCashback = {
    "userid": parseInt(process.env.TEST_USER_ID),
    "sellid": generateRandomNumber(1000).toString(),
    "price": 1999,
    "date": new Date().toString()
  }
});

afterAll(done => {
  process.env.PORT = 3000;
  app.close(done);
});