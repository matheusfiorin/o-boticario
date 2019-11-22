
// Dependencies
const request = require('supertest');
const app = require('../app');

jest.setTimeout(30000);

afterAll(done => {
  app.close(done);
});

describe('test about something', () => {
  describe('testing a routine', () => {
    // test('routine 1',
    //   async (done) => {
    //     await request(app).get('/endpoint').set('Authorization', '')
    //       .then(async resp => {
    //         await expect(resp.status).toBe(200);
    //         done();
    //       })
    //       .catch(error => {
    //         console.error({
    //           error
    //         });
    //       });
    //   });
    test('1 + 1 = 2', (done) => {
      expect(1 + 1).toBe(2);
      done();
    });
  });
});