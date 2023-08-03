// Pour executer les tests : npm test --detectOpenHandles

/* eslint-disable no-undef */
const request = require("supertest");
const { PrismaClient } = require("@prisma/client");
const app = require("../src/app");

// extrait le test du middleware authentification checkAuth
jest.mock("../src/middleware/authentification", () =>
  jest.fn((req, res, next) => next())
);

describe("Test routes users", () => {
  const prisma = new PrismaClient();
  beforeAll(async () => {
    await prisma.Users.deleteMany({});
    await prisma.Users_log.deleteMany({});
    await prisma.$executeRawUnsafe(
      'TRUNCATE TABLE "Users" RESTART IDENTITY CASCADE'
    );
    await prisma.$executeRawUnsafe(
      'ALTER SEQUENCE "Users_log_id_seq" RESTART WITH 1'
    );
    await prisma.Users_log.create({
      data: {
        login: "test3@hotmail.fr",
        hashedpassword:
          "$argon2id$v=19$m=65536,t=5,p=1$HdgAb9fXefOsvO0vxNcaSw$iZKSv535a6TXOJJVVbD05V6GVfmg1iit8ZK9s3jSih4",
        nb_connexion: 1,
      },
    });
    await prisma.Users_log.create({
      data: {
        login: "test6@hotmail.fr",
        hashedpassword:
          "$argon2id$v=19$m=65536,t=5,p=1$HdgAb9fXefOsvO0vxNcaSw$iZKSv535a6TXOJJVVbD05V6GVfmg1iit8ZK9s3jSih4",
        nb_connexion: 1,
      },
    });
    await prisma.Users.create({
      data: {
        nom: "LEMOINE",
        prenom: "Gaetan",
        adresse: "14 route de l'ormeau",
        code_postal: 72540,
        ville: "Vallon sur gee",
        telephone: 761074681,
        role_id: 1,
        users_log_id: 2,
      },
    });
  });
  // route création d'un users
  it("POST /users - OK (fields provided) ", (done) => {
    request(app)
      .post("/users")
      .send({
        nom: "LEMOINE",
        prenom: "Gaetan",
        login: "test@hotmail.fr",
        mot_pass: "123456aqzsA!",
        adresse: "14 route de l'ormeau",
        code_postal: 72540,
        ville: "Vallon sur gee",
        telephone: 761074681,
        role_id: 1,
        users_log_id: 2,
      })
      .expect(201)
      .expect("Content-Type", /json/)
      .then((response) => {
        const expected = { message: "Nouveau utilisateur créé" };
        expect(response.body).toEqual(expected);
        done();
      })
      .catch(done);
  });
  it("POST /users - NOK (fields missing) ", (done) => {
    request(app)
      .post("/users")
      .send({
        nom: "",
        prenom: "",
        login: "",
        mot_pass: "",
        adresse: "",
        code_postal: 0,
        ville: "",
        telephone: 0,
        role_id: 1,
        users_log_id: 2,
      })
      .expect(400)
      .expect("Content-Type", /json/)
      .then((response) => {
        const expected = { message: "Nouveau utilisateur non créé" };
        expect(response.body).toEqual(expected);
        done();
      })
      .catch(done);
  });
  // début fichier login
  // route création d'un utilisateur
  it("POST /users - OK (fields provided) ", (done) => {
    request(app)
      .post("/users")
      .send({
        nom: "LEMOINE",
        prenom: "Gaetan",
        login: "test2@hotmail.fr",
        mot_pass: "123456aqzsA!",
        adresse: "14 route de l'ormeau",
        code_postal: 72540,
        ville: "Vallon sur gee",
        telephone: 761074681,
        role_id: 1,
        users_log_id: 1,
      })
      .expect(201)
      .expect("Content-Type", /json/)
      .then((response) => {
        const expected = { message: "Nouveau utilisateur créé" };
        expect(response.body).toEqual(expected);
        done();
      })
      .catch(done);
  });
  // route lecture des utilisateurs
  it("GET /users - OK ", (done) => {
    request(app)
      .get("/users")
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        done();
      })
      .catch(done);
  });
  // route modif d'un utilisateur
  it("PUT /users/:id - OK (fields provided) ", (done) => {
    request(app)
      .put("/users/3")
      .send({
        id: 3,
        nom: "LEMOINE",
        prenom: "Gaetan",
        adresse: "14 route ici",
        code_postal: 72540,
        ville: "Vallon sur gee",
        telephone: "761074681",
        role_id: "1",
        users_log_id: 4,
        Users_log: {
          login: "test2@hotmail.fr",
          hashedpassword:
            "$argon2id$v=19$m=65536,t=5,p=1$x9WH9MNrsCAz1Wr8eNaGCw$acYX27A/NHonPBzijSB/RIXSUZWJdFa0NVAFCkSAsVs",
          nb_connexion: 1,
        },
        Role: { nom: "Adhèrent" },
      })
      .then((response) => {
        expect(response.statusCode).toEqual(204);
        done();
      })
      .catch(done);
  });
  it("DELETE /users/:id - OK ", (done) => {
    request(app)
      .delete("/users/1")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((response) => {
        const expected = { message: "Utilisateur supprimé" };
        expect(response.body).toEqual(expected);
        done();
      })
      .catch(done);
  });
  // route modif pour la première connexion
  it("PUT /firstconnexion - OK (fields provided) ", (done) => {
    request(app)
      .put("/firstconnexion")
      .send({
        id: "1",
        password: "123456aqzsA!",
        oldpassword: "123456aqzsA!",
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        done();
      })
      .catch(done);
  });
  // fin fichier login
  // debut fichier forgotPw
  // route mot de passe oublié
  it("POST /forgotPw - OK (fields provided) ", (done) => {
    request(app)
      .post("/forgotPw")
      .send({
        login: "test2@hotmail.fr",
      })
      .expect(201)
      .expect("Content-Type", /json/)
      .then((response) => {
        const expected = { message: "Nouveau mot de passe envoyé" };
        expect(response.body).toEqual(expected);
        done();
      })
      .catch(done);
  });
  // fin fichier forgotPw
});
