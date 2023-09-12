// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from "msw";

// eslint-disable-next-line import/prefer-default-export
export const loginHandlers = [
  // N°0
  // Scénario pour une connexion réussie en tant que administrateur
  rest.post("/login", (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json([
        {
          nom: "LEMOINE",
          prenom: "Gaetan",
          users_log_id: 2,
          Role: {
            nom: "Administrateur",
          },
          Users_log: {
            login: "glemoine@hotmail.fr",
            nb_connexion: 2,
          },
        },
      ])
    );
  }),
  // N°1
  // Scénario pour une connexion échouée
  rest.post("/login", (req, res, ctx) => {
    return res(
      ctx.status(401), // Unauthorized
      ctx.json({
        message: "Invalid credentials",
      })
    );
  }),
  // N°2
  // Scénario pour une connexion réussie en tant que trésorier
  rest.post("/login", (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json([
        {
          nom: "LEMOINE",
          prenom: "Gaetan",
          users_log_id: 2,
          Role: {
            nom: "Trésorier",
          },
          Users_log: {
            login: "glemoine@hotmail.fr",
            nb_connexion: 2,
          },
        },
      ])
    );
  }),
  // N°3
  // Scénario pour une connexion réussie en tant que adhérent
  rest.post("/login", (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json([
        {
          nom: "LEMOINE",
          prenom: "Gaetan",
          users_log_id: 2,
          Role: {
            nom: "Adhèrent",
          },
          Users_log: {
            login: "glemoine@hotmail.fr",
            nb_connexion: 2,
          },
        },
      ])
    );
  }),
  // N°4
  // Scénario pour la première connexion
  rest.post("/login", (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json([
        {
          nom: "LEMOINE",
          prenom: "Gaetan",
          users_log_id: 2,
          Role: {
            nom: "Adhèrent",
          },
          Users_log: {
            login: "glemoine@hotmail.fr",
            nb_connexion: 1,
          },
        },
      ])
    );
  }),
  // N°5
  // Scénario pour modif du MP réussie en tant que administrateur
  rest.put("/firstconnexion", (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        user: [
          {
            nom: "LEMOINE",
            prenom: "Gaetan",
            users_log_id: 2,
            Role: {
              nom: "Administrateur",
            },
            Users_log: {
              login: "glemoine@hotmail.fr",
              nb_connexion: 2,
            },
          },
        ],
      })
    );
  }),
  // N°6
  // Scénario pour modif du MP réussie en tant que trésorier
  rest.put("/firstconnexion", (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        user: [
          {
            nom: "LEMOINE",
            prenom: "Gaetan",
            users_log_id: 2,
            Role: {
              nom: "Trésorier",
            },
            Users_log: {
              login: "glemoine@hotmail.fr",
              nb_connexion: 2,
            },
          },
        ],
      })
    );
  }),
  // N°7
  // Scénario pour modif du MP réussie en tant que adhèrent
  rest.put("/firstconnexion", (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        user: [
          {
            nom: "LEMOINE",
            prenom: "Gaetan",
            users_log_id: 2,
            Role: {
              nom: "Adhèrent",
            },
            Users_log: {
              login: "glemoine@hotmail.fr",
              nb_connexion: 2,
            },
          },
        ],
      })
    );
  }),
  // N°8
  // Scénario pour ancien mot de passe incorrect
  rest.put("/firstconnexion", (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({
        message: "Invalid credentials",
      })
    );
  }),
  // N°9
  // Scénario pour la création d'un nouvel utilisateur réussie
  rest.post("/users", (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        message: "L'utilisateur a bien été ajoutée.",
      })
    );
  }),
  // N°10
  // Scénario pour la création d'un nouvel utilisateur non réussie
  rest.post("/users", (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({
        message: "L'utilisateur n'a pas été ajoutée..",
      })
    );
  }),
  // N°11
  // Scénario pour la suppression d'un utilisateur réussie
  rest.delete("/users/1", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: "Utilisateur supprimé",
      })
    );
  }),
  // N°12
  // Scénario pour la suppression d'un utilisateur non réussie
  rest.delete("/users/1", (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({
        message: "Utilisateur supprimé",
      })
    );
  }),
  // N°13
  // Scénario pour la modification d'un utilisateur réussie
  rest.put("/users/2", (req, res, ctx) => {
    return res(
      ctx.status(204),
      ctx.json({
        message: "L'utilisateur a bien été modifié.",
      })
    );
  }),
  // N°14
  // Scénario pour la suppression d'un utilisateur non réussie
  rest.put("/users/2", (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({
        message: "Utilisateur supprimé",
      })
    );
  }),
  // N°15
  // récup getBanque
  rest.get("/banque", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          nom: "AXA Banque",
        },
        {
          id: 2,
          nom: "Barclays",
        },
        {
          id: 3,
          nom: "Caisse d'épargne",
        },
        {
          id: 4,
          nom: "Crédit Agricole",
        },
      ])
    );
  }),
  // N°16
  // récup getModePay
  rest.get("/modePaiement", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          nom: "Espèce",
        },
        {
          id: 2,
          nom: "Chèque",
        },
        {
          id: 3,
          nom: "Virement",
        },
        {
          id: 4,
          nom: "TIP",
        },
      ])
    );
  }),
  // N°17
  // récup enregistrement
  rest.get("/enregistrement/1", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        N_cheque: 2687854,
        N_compte_id: 1,
        banque_id: 2,
        date: "2023-01-02T00:00:00.000Z",
        description: "Vente de bijoux",
        enregmt: "recette",
        facture: "assets/null",
        mode_pay_id: 2,
        nom: "John DOE",
        somme: "125",
        validation: "non",
      })
    );
  }),
  // N°18
  // modification correct
  rest.put("/enregistrement/1", (req, res, ctx) => {
    return res(
      ctx.status(204),
      ctx.json({
        message: "Votre écriture a bien été modifiée.",
      })
    );
  }),
  // N°19
  // modification non correct
  rest.put("/enregistrement/1", (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({
        message: "Votre écriture n'a pas été modifiée.",
      })
    );
  }),
  // N°20
  // ajout enregistrement correct
  rest.post("/enregistrement", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: "Votre écriture a bien été ajoutée.",
      })
    );
  }),
  // N°21
  // ajout enregistrement non correct
  rest.post("/enregistrement", (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({
        message: "Votre écriture n'a pas été ajoutée.",
      })
    );
  }),
  // N°22
  // delete enregistrement correct
  rest.delete("/enregistrement/1", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: "Votre écriture a bien été supprimée.",
      })
    );
  }),
  // N°23
  // delete enregistrement non correct
  rest.delete("/enregistrement/1", (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({
        message: "Votre écriture n'a pas été supprimée.",
      })
    );
  }),
  // N°24
  // send ask correct
  rest.post("/forgotPw", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: "Demande envoyée",
      })
    );
  }),
  // N°25
  // send ask not correct
  rest.post("/forgotPw", (req, res, ctx) => {
    return res(
      ctx.status(404),
      ctx.json({
        message: "Vous n'avez pas de compte à cette adresse",
      })
    );
  }),
];
