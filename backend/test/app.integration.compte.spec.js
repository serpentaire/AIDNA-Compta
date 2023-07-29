// Pour executer les tests : npm test --detectOpenHandles

/* eslint-disable no-undef */
const request = require("supertest");
const { PrismaClient } = require("@prisma/client");
const app = require("../src/app");

// extrait le test du middleware authentification checkAuth
jest.mock("../src/middleware/authentification", () =>
  jest.fn((req, res, next) => next())
);

describe("Test routes enregistrement", () => {
  const prisma = new PrismaClient();
  beforeAll(async () => {
    await prisma.compte.deleteMany({});
    await prisma.N_comptes.deleteMany({});
    await prisma.$executeRawUnsafe(
      'TRUNCATE TABLE "compte" RESTART IDENTITY CASCADE'
    );
    await prisma.$executeRawUnsafe(
      'ALTER SEQUENCE "N_comptes_id_seq" RESTART WITH 1'
    );
    await prisma.N_comptes.create({
      data: { numero: 606, designation: "test compte", actif: "oui" },
    });
    await prisma.N_comptes.create({
      data: { numero: 611, designation: "test compte", actif: "oui" },
    });
    await prisma.N_comptes.create({
      data: { numero: 711, designation: "test compte", actif: "oui" },
    });
    await prisma.compte.create({
      data: {
        date: new Date(),
        description: "description bla bla pour test",
        nom: "LEMOINE",
        somme: 152,
        validation: "non",
        N_cheque: 252455,
        N_comptes_id: 2,
        banque_id: 1,
        mode_pay_id: 1,
        enregmt: "recette",
        facture: "assets/null",
      },
    });
  });
  // route ajout d'un enregistrement
  it("POST /enregistrement - OK (fields provided) ", (done) => {
    request(app)
      .post("/enregistrement")
      .field("facture", "")
      .field(
        "data",
        JSON.stringify({
          date: "2023-07-05",
          description: "description bla bla pour test",
          nom: "LEMOINE",
          somme: 152,
          validation: "non",
          N_cheque: 252455,
          N_comptes_id: 2,
          banque_id: 1,
          mode_pay_id: 1,
          enregmt: "recette",
          facture: "",
        })
      )
      .expect(201)
      .expect("Content-Type", /json/)
      .then((response) => {
        const expected = { message: "Nouvelle recette ou depense enregistrée" };
        expect(response.body).toEqual(expected);
        done();
      })
      .catch(done);
  });

  // route modif d'un enregistrement
  it("PUT /enregistrement/:id - OK (fields provided) ", (done) => {
    request(app)
      .put("/enregistrement/1")
      .field("facture", "")
      .field(
        "data",
        JSON.stringify({
          date: "2023-07-05",
          description: "descrition bla bla pour test",
          nom: "LEMOINE",
          somme: 130,
          validation: "non",
          N_cheque: 252455,
          N_comptes_id: 2,
          banque_id: 1,
          mode_pay_id: 1,
          enregmt: "recette",
          facture: "",
        })
      )
      .then((response) => {
        expect(response.statusCode).toEqual(204);
        done();
      })
      .catch(done);
  });
  // route modif de la validation d'un enregistrement
  it("PUT /enregistrementValidation/:id - OK (fields provided) ", (done) => {
    request(app)
      .put("/enregistrement/1")
      .field("facture", "")
      .field(
        "data",
        JSON.stringify({
          date: "2023-07-05",
          description: "descrition bla bla pour test",
          nom: "LEMOINE",
          somme: 130,
          validation: "oui",
          N_cheque: 252455,
          N_comptes_id: 2,
          banque_id: 1,
          mode_pay_id: 1,
          enregmt: "recette",
          facture: "",
        })
      )
      .then((response) => {
        expect(response.statusCode).toEqual(204);
        done();
      })
      .catch(done);
  });
  // route lecture de tous les enregistrements
  it("GET /enregistrement - OK ", (done) => {
    request(app)
      .get("/enregistrement")
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        done();
      })
      .catch(done);
  });

  // route lecture un enregistrement
  it("GET /enregistrement/:id - OK ", (done) => {
    request(app)
      .get("/enregistrement/1")
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        done();
      })
      .catch(done);
  });

  // route enregistrement d'un mois
  it("GET /compteJournalier - OK ", (done) => {
    request(app)
      .get("/compteJournalier?date1=2023&date2=07")
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toBeDefined();
        done();
      })
      .catch(done);
  });
  // route enregistrement d'un mois qui est vide
  it("GET /compteJournalier - NOK ", (done) => {
    request(app)
      .get("/compteJournalier?date1=2020&date2=01")
      .then((response) => {
        expect(response.body).toHaveLength(0);
        done();
      })
      .catch(done);
  });
  // route ajout d'un enregistrement non validé par JOI
  it("POST /enregistrement - NOK (not validate) ", (done) => {
    request(app)
      .post("/enregistrement")
      .field("facture", "")
      .field(
        "data",
        JSON.stringify({
          date: "2023-07-05",
          description: "description bla bla pour test",
          nom: "LEMOINE",
          somme: 152,
          validation: "non",
          N_cheque: 252455,
          N_comptes_id: 1,
          banque_id: 1,
          mode_pay_id: 1,
          enregmt: 250, // doit être un string
          facture: "",
        })
      )
      .then((response) => {
        expect(response.statusCode).toEqual(422);
        done();
      })
      .catch(done);
  });

  // route lecture enregistrement d'un ID non présent
  it("GET /enregistrement/:id - NOK ", (done) => {
    request(app)
      .get("/enregistrement/20")
      .then((response) => {
        expect(response.statusCode).toEqual(404);
        done();
      })
      .catch(done);
  });

  // route lecture année distinct
  it("GET /distinctYear - OK ", (done) => {
    request(app)
      .get("/distinctYear")
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toBeDefined();
        done();
      })
      .catch(done);
  });
  // route supprimé un enregistrement
  it("DELETE /enregistrement/:id - OK ", (done) => {
    request(app)
      .delete("/enregistrement/2")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((response) => {
        const expected = { message: "Compte supprimé" };
        expect(response.body).toEqual(expected);
        done();
      })
      .catch(done);
  });
  // fichier ncompte :
  // route ajout d'un compte
  it("POST /nComptes - OK (fields provided) ", (done) => {
    request(app)
      .post("/nComptes")
      .send({
        numero: 707,
        designation: "test compte",
        actif: "oui",
      })
      .expect(201)
      .expect("Content-Type", /json/)
      .then((response) => {
        const expected = { message: "Nouveau compte créé" };
        expect(response.body).toEqual(expected);
        done();
      })
      .catch(done);
  });

  // route modif d'un compte - pas finis - on doit pouvoir modifier l'intitulé mais pas le numéro
  it("PUT /nComptes/:id - OK (fields provided) ", (done) => {
    request(app)
      .put("/nComptes/1")
      .send({
        numero: 708,
        designation: "test du compte", // ajout de -du-
        actif: "oui",
      })
      .then((response) => {
        expect(response.statusCode).toEqual(204);
        done();
      })
      .catch(done);
  });

  // route lecture de tous les comptes
  it("GET /nComptes - OK ", (done) => {
    request(app)
      .get("/nComptes")
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        done();
      })
      .catch(done);
  });

  // route lecture d'un compte
  it("GET /nComptes/:id - OK ", (done) => {
    request(app)
      .get("/nComptes/1")
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        done();
      })
      .catch(done);
  });

  // route tous les comptes actifs
  it("GET /allCompteActif - OK ", (done) => {
    request(app)
      .get("/allCompteActif")
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        done();
      })
      .catch(done);
  });
  // route modif compte actif
  it("PUT /compteActive/:id - OK ", (done) => {
    request(app)
      .put("/compteActive/1")
      .send({
        actif: "non",
      })
      .then((response) => {
        expect(response.statusCode).toEqual(204);
        expect(response.body).toBeDefined();
        done();
      })
      .catch(done);
  });
  // route modif compte actif non présent
  it("GET /compteActive/:id - NOK ", (done) => {
    request(app)
      .get("/compteActive/2")
      .then((response) => {
        expect(response.body).toEqual({});
        done();
      })
      .catch(done);
  });

  // route ajout d'un compte non validé par JOI - pas finie
  it("POST /nComptes - NOK (not validate) ", (done) => {
    request(app)
      .post("/nComptes")
      .send({
        numero: 707,
        designation: "", // il n'y a pas de désignation
        actif: "non",
      })
      .then((response) => {
        expect(response.statusCode).toEqual(422);
        done();
      })
      .catch(done);
  });

  // route lecture d'un compte d'un ID non présent
  it("GET /nComptes/:id - NOK ", (done) => {
    request(app)
      .get("/nComptes/20")
      .then((response) => {
        expect(response.statusCode).toEqual(404);
        done();
      })
      .catch(done);
  });

  // route supprimé un compte
  it("DELETE /nComptes/:id - OK ", (done) => {
    request(app)
      .delete("/nComptes/1")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((response) => {
        const expected = { message: "Compte supprimé" };
        expect(response.body).toEqual(expected);
        done();
      })
      .catch(done);
  });
});
