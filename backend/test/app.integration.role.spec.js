// Pour executer les tests : npm test --detectOpenHandles

/* eslint-disable no-undef */
const request = require("supertest");
const app = require("../src/app");

// extrait le test du middleware authentification checkAuth
// jest.mock("../src/middleware/authentification", () =>
//   jest.fn((req, res, next) => next())
// );

describe("Test routes role", () => {
  // route lecture de tous les roles
  it("GET /roles - OK ", (done) => {
    request(app)
      .get("/roles")
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        done();
      })
      .catch(done);
  });
});
