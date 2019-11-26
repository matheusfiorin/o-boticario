require('dotenv').config(); // Allow the reading of .env

process.env.PORT = 3004;

// Dependencies
const request = require('supertest');
const app = require('../app');

jest.setTimeout(30000);

afterAll(done => {
  process.env.PORT = 3000;
  app.close(done);
});

describe('Auth routine', () => {
  test('Register, Login & Delete',
    async (done) => {
      await request(app).post('/auth/register').send(base_user)
        .then(async resp => {
          console.info({
            resp
          });
          expect(resp.status).toBe(201);
          expect(resp.body.id).not.toBe(null);

          const UserID = resp.body.id;
          base_sell.userid = UserID;
          updated_sell.userid = UserID;

          await request(app).post('/auth/login').send(base_user)
            .then(resp => {
              expect(resp.status).toBe(200);
              expect(resp.body.jwt).not.toBe(null);
              expect(resp.body.user_id).not.toBe(null);
            });

          expect(resp.status).toBe(201);
          expect(resp.body.id).not.toBe(null);

          const SellID = await request(app).post('/sells').send(base_sell)
            .then(async resp => {
              expect(resp.status).toBe(201);
              expect(resp.body.id).not.toBe(null);

              return resp.body.id;
            });

          await request(app).get("/sells").set('user-id', UserID)
            .then(resp => {
              expect(resp.status).toBe(200);
              expect(resp.body.length).not.toBe(0);
            });

          await request(app).get(`/sells/${SellID}`)
            .then(resp => {
              expect(resp.status).toBe(200);
              expect(resp.body.id).toBe(SellID);
              expect(resp.body.userid).toBe(base_sell.userid);
              expect(resp.body.sellid).toBe(base_sell.sellid);
              expect(resp.body.price).toBe(base_sell.price);
              expect(new Date(resp.body.date)).toStrictEqual(new Date(base_sell.date));
            });

          await request(app).put(`/sells/${SellID}`).send(updated_sell)
            .then(resp => {
              expect(resp.status).toBe(200);
              expect(resp.body.id).toBe(SellID);
            });

          await request(app).get("/sells").set('user-id', UserID)
            .then(resp => {
              expect(resp.status).toBe(200);
              expect(resp.body.length).not.toBe(0);
            });

          await request(app).get(`/sells/${SellID}`)
            .then(resp => {
              expect(resp.status).toBe(200);
              expect(resp.body.id).toBe(SellID);
              expect(resp.body.userid).toBe(updated_sell.userid);
              expect(resp.body.sellid).toBe(updated_sell.sellid);
              expect(resp.body.price).toBe(updated_sell.price);
              expect(new Date(resp.body.date)).toStrictEqual(new Date(updated_sell.date));
            });

          await request(app).delete(`/sells/${SellID}`)
            .then(resp => {
              expect(resp.status).toBe(200);
            });

          await request(app).get(`/sells/${SellID}`)
            .then(resp => {
              expect(resp.status).toBe(404);
              expect(resp.body.name).toBe("Não encontrado");
            });

          await request(app).get(`/cashback/${process.env.TEST_USER_ID}`)
            .then(async resp => {
              expect(resp.status).toBe(200);
              expect(resp.body.credit).not.toBe(null);
            });

          await request(app).delete(`/auth/${UserID}`)
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

  const base_user = {
    "fullname": "Test",
    "cpf": "765.597.190-06",
    "email": "test@test.com",
    "password": "test_it"
  }

  var base_sell = {
    "userid": null,
    "sellid": generateRandomNumber(1000).toString(),
    "price": generateRandomNumber(100),
    "date": new Date().toString()
  }

  var updated_sell = {
    "userid": null,
    "sellid": generateRandomNumber(1000).toString(),
    "price": generateRandomNumber(100),
    "date": new Date().toString()
  }
});