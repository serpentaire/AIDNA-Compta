// Pour executer les tests : npm run testFront.
import "../jest.config";
import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { screen, waitFor } from "@testing-library/dom";
import { BrowserRouter } from "react-router-dom";
import HomeTresorier from "../src/pages/homes/HomeTresorier";

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
it("Espace tresorier", () => {
  render(
    <BrowserRouter>
      <HomeTresorier />
    </BrowserRouter>
  );
  // cible l'élément Sidebar par son data-testid
  const sidebarElement = screen.getByTestId("sidebar-tresorier");

  // Vérifie si l'élément Sidebar est présent dans le DOM
  // eslint-disable-next-line no-undef
  expect(sidebarElement).toBeInTheDocument();
});
// eslint-disable-next-line no-undef
jest.mock("../src/components/Enregistrement", () => ({
  __esModule: true,
  default: () => null,
}));
// eslint-disable-next-line no-undef
it("Espace tresorier", async () => {
  render(
    <BrowserRouter>
      <HomeTresorier />
    </BrowserRouter>
  );

  // Vérifie si l'élément Enregistrement est présent dans le DOM
  await waitFor(() => {
    // cible l'élément Enregistrement par son data-testid
    const EnregistrementElement = screen.getByTestId("Enregistrement");
    // eslint-disable-next-line no-undef
    expect(EnregistrementElement).toBeInTheDocument();
  });
});
