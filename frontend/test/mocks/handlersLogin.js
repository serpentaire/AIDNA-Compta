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
];
