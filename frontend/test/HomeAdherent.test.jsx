// Pour executer les tests : npm run testFront.
import "../jest.config";
import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { BrowserRouter } from "react-router-dom";
import { MockUserProvider, MockUserContext } from "./mocks/UserContextMock";
import HomeAdherent from "../src/pages/homes/HomeAdherent";

// Test de l'affichage des textes

// Mock du composant Helmet
// eslint-disable-next-line no-undef
jest.mock("react-helmet", () => {
  return {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    Helmet: ({ children }) => <>{children}</>, // Composant fictif qui ne fait rien
  };
});
// eslint-disable-next-line no-undef
jest.mock("../src/context/user", () => ({
  // Mock du context
  // eslint-disable-next-line no-undef
  ...jest.requireActual("../src/context/user"),
  UserContext: MockUserContext,
}));
// eslint-disable-next-line no-undef
it("Espace adhèrent", () => {
  const user = [
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
  ];
  render(
    <MockUserProvider value={user}>
      <BrowserRouter>
        <HomeAdherent title="Laissez-nous un message">
          Laissez-nous un message
        </HomeAdherent>
      </BrowserRouter>
    </MockUserProvider>
  );
  const title = screen.getByText("Laissez-nous un message");
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});
// eslint-disable-next-line no-undef
it("Espace adhèrent", () => {
  const user = [
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
  ];
  render(
    <MockUserProvider value={user}>
      <BrowserRouter>
        <HomeAdherent
          title="Bonjour l'association AIDNA est heureuse de vous compter parmi ses
          adhérents. En tant qu'adhèrent vous pouvez avoir accès au résultat des
          comptes de l'association. Vous pouvez voir le bilan annuel et le bilan
          par projet. Ceci en cliquant sur les boutons. Pour voir les comptes en
          détails il faut en faire la demande par écrit à la présidente à l'aide
          du formulaire de contact. Une visio ou une rencontre sera organisée
          afin de vous montrer l'état des comptes."
        >
          Bonjour l'association AIDNA est heureuse de vous compter parmi ses
          adhérents. En tant qu'adhèrent vous pouvez avoir accès au résultat des
          comptes de l'association. Vous pouvez voir le bilan annuel et le bilan
          par projet. Ceci en cliquant sur les boutons. Pour voir les comptes en
          détails il faut en faire la demande par écrit à la présidente à l'aide
          du formulaire de contact. Une visio ou une rencontre sera organisée
          afin de vous montrer l'état des comptes.
        </HomeAdherent>
      </BrowserRouter>
    </MockUserProvider>
  );
  const title = screen.getByText(
    "Bonjour l'association AIDNA est heureuse de vous compter parmi ses adhérents. En tant qu'adhèrent vous pouvez avoir accès au résultat des comptes de l'association. Vous pouvez voir le bilan annuel et le bilan par projet. Ceci en cliquant sur les boutons. Pour voir les comptes en détails il faut en faire la demande par écrit à la présidente à l'aide du formulaire de contact. Une visio ou une rencontre sera organisée afin de vous montrer l'état des comptes."
  );
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});
// eslint-disable-next-line no-undef
it("Espace adhèrent", () => {
  const user = [
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
  ];
  render(
    <MockUserProvider value={user}>
      <BrowserRouter>
        <HomeAdherent />
      </BrowserRouter>
    </MockUserProvider>
  );
  // cible l'élément Sidebar par son data-testid
  const sidebarElement = screen.getByTestId("sidebar-adherent");

  // Vérifie si l'élément Sidebar est présent dans le DOM
  // eslint-disable-next-line no-undef
  expect(sidebarElement).toBeInTheDocument();
});
// eslint-disable-next-line no-undef
it("Espace adhèrent", () => {
  const user = [
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
  ];
  render(
    <MockUserProvider value={user}>
      <BrowserRouter>
        <HomeAdherent />
      </BrowserRouter>
    </MockUserProvider>
  );
  // cible l'élément contact par son data-testid
  const contactElement = screen.getByTestId("contact");

  // Vérifie si l'élément contact est présent dans le DOM
  // eslint-disable-next-line no-undef
  expect(contactElement).toBeInTheDocument();
});
