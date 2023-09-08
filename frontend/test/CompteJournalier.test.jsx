// Pour executer les tests : npm run testFront.
import "../jest.config";
import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { BrowserRouter } from "react-router-dom";
import { MockUserContext } from "./mocks/UserContextMock";
import CompteJournalier from "../src/pages/homes/CompteJournalier";

// Test de la présence des eléments dans le DOM

// Mock du composant Helmet
// eslint-disable-next-line no-undef
jest.mock("react-helmet", () => {
  return {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    Helmet: ({ children }) => <>{children}</>, // Composant fictif qui ne fait rien
  };
});
// eslint-disable-next-line no-undef
jest.mock("../src/components/TableauJournalier", () => ({
  __esModule: true,
  default: () => null,
}));
// eslint-disable-next-line no-undef
jest.mock("../src/components/sidebar/SideBarTresorier", () => ({
  __esModule: true,
  default: () => null,
}));
// eslint-disable-next-line no-undef
jest.mock("../src/pages/Layout/PrivateTresorier", () => ({
  // eslint-disable-next-line no-undef
  ...jest.requireActual("../src/pages/Layout/PrivateTresorier"),
  MockUserContext: {
    Consumer: ({ children }) =>
      children({
        user: [{ Role: { nom: "Trésorier" } }],
        // eslint-disable-next-line no-undef
        logout: jest.fn(),
      }),
  },
}));

// eslint-disable-next-line no-undef
jest.mock("../src/context/user", () => ({
  // Mock du context
  // eslint-disable-next-line no-undef
  ...jest.requireActual("../src/context/user"),
  UserContext: MockUserContext,
}));
// eslint-disable-next-line no-undef
it("Espace trésorier TableauJournalier", () => {
  render(
    <BrowserRouter>
      <CompteJournalier />
    </BrowserRouter>
  );
  // cible l'élément Sidebar par son data-testid
  const sidebarElement = screen.getByTestId("sideBar-Tresorier");

  // Vérifie si l'élément Sidebar est présent dans le DOM
  // eslint-disable-next-line no-undef
  expect(sidebarElement).toBeInTheDocument();
});
// eslint-disable-next-line no-undef
it("Espace trésorier TableauJournalier", () => {
  render(
    <BrowserRouter>
      <CompteJournalier />
    </BrowserRouter>
  );
  // cible l'élément TableauJournalier par son data-testid
  const TableauJournalierElement = screen.getByTestId("TableauJournalier");

  // Vérifie si l'élément TableauJournalier est présent dans le DOM
  // eslint-disable-next-line no-undef
  expect(TableauJournalierElement).toBeInTheDocument();
});
