// Pour executer les tests : npm test --detectOpenHandles

/* eslint-disable no-undef */
const request = require("supertest");
const app = require("../src/app");

// extrait le test du middleware authentification checkAuth
// jest.mock("../src/middleware/authentification", () =>
//   jest.fn((req, res, next) => next())
// );

describe("Test routes mode de payement", () => {
  // route lecture de tous les mode de payement
  it("GET /modePaiement - OK ", (done) => {
    request(app)
      .get("/modePaiement")
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        done();
      })
      .catch(done);
  });
});
