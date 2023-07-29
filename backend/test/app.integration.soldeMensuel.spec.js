// Pour executer les tests : npm test --detectOpenHandles

/* eslint-disable no-undef */
const request = require("supertest");
const app = require("../src/app");

// extrait le test du middleware authentification checkAuth
// jest.mock("../src/middleware/authentification", () =>
//   jest.fn((req, res, next) => next())
// );

describe("Test routes solde mensuel", () => {
  // route lecture de tous solde mensuel
  it("GET /soldeMensuel - OK ", (done) => {
    request(app)
      .get("/soldeMensuel")
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        done();
      })
      .catch(done);
  });
});
