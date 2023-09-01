// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from "msw";

// eslint-disable-next-line import/prefer-default-export
export const loginHandlers = [
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
  // Scénario pour une connexion échouée
  rest.post("/login", (req, res, ctx) => {
    return res(
      ctx.status(401), // Unauthorized
      ctx.json({
        message: "Invalid credentials",
      })
    );
  }),
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
];
