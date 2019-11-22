require('dotenv').config(); // Allow the reading of .env

process.env.PORT = 3000;

// Dependencies
const request = require('supertest');
const app = require('../../app');

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
          expect(resp.status).toBe(201);
          expect(resp.body.id).not.toBe(null);

          const UserID = resp.body.id;

          await request(app).post('/auth/login').send(base_user)
            .then(resp => {
              expect(resp.status).toBe(200);
              expect(resp.body.jwt).not.toBe(null);
              expect(resp.body.user_id).not.toBe(null);
            });

          await request(app).delete(`/auth/${UserID}`)
            .then(resp => {
              expect(resp.status).toBe(200);

              done();
            })
        })
        .catch(error => {
          console.error({
            error
          });
        });
    });

  const base_user = {
    "fullname": "Test",
    "cpf": "919.820.310-00",
    "email": "test@test.com",
    "password": "test_it"
  }
});