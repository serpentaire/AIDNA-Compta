// Pour executer les tests : npm run testFront.
import "../jest.config";
import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { screen, waitFor } from "@testing-library/dom";
import { BrowserRouter } from "react-router-dom";
import HomeAdmin from "../src/pages/homes/HomeAdmin";

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
it("Espace admin", () => {
  render(
    <BrowserRouter>
      <HomeAdmin />
    </BrowserRouter>
  );
  // cible l'élément Sidebar par son data-testid
  const sidebarElement = screen.getByTestId("sidebar-adherent");

  // Vérifie si l'élément Sidebar est présent dans le DOM
  // eslint-disable-next-line no-undef
  expect(sidebarElement).toBeInTheDocument();
});
// eslint-disable-next-line no-undef
jest.mock("../src/components/NumCompte", () => ({
  __esModule: true,
  default: () => null, // Remplace NumCompte par un composant qui ne fait rien
}));
// eslint-disable-next-line no-undef
it("Espace admin", async () => {
  render(
    <BrowserRouter>
      <HomeAdmin />
    </BrowserRouter>
  );

  // Vérifie si l'élément NumCompte est présent dans le DOM
  await waitFor(() => {
    // cible l'élément Sidebar par son data-testid
    const NumCompteElement = screen.getByTestId("NumCompte");
    // eslint-disable-next-line no-undef
    expect(NumCompteElement).toBeInTheDocument();
  });
});
