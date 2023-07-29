// Pour executer les tests : npm test --detectOpenHandles

/* eslint-disable no-undef */
const request = require("supertest");
const app = require("../src/app");

// extrait le test du middleware authentification checkAuth
jest.mock("../src/middleware/authentification", () =>
  jest.fn((req, res, next) => next())
);

describe("Test route contact", () => {
  // route lecture de tous les roles
  it("POST /contact - OK (fields provided) ", (done) => {
    request(app)
      .post("/contact")
      .send({
        nom: "LEMOINE",
        prenom: "Gaetan",
        email: "test@hotmail.fr",
        message: "message de test contact",
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .then((response) => {
        const expected = { message: "Email envoyé" };
        expect(response.body).toEqual(expected);
        done();
      })
      .catch(done);
  });
});
