require('dotenv').config(); // Allow the reading of .env

process.env.PORT = 3002;

// Dependencies
const request = require('supertest');
const app = require('../../app');
require('../../routes/functions')();

jest.setTimeout(30000);

describe('Cashback routine', () => {
  test('Get credit',
    async (done) => {
      await withJwtAuthentication(request(app).get(`/cashback/${process.env.TEST_USER_ID}`))
        .then(async resp => {
          expect(resp.status).toBe(200);
          expect(resp.body.credit).not.toBe(null);

          done();
        })
        .catch(error => {
          console.error({
            error
          });
        });
    });
});

afterAll(done => {
  process.env.PORT = 3000;
  app.close(done);
});