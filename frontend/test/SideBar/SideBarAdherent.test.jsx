// Pour executer les tests : npm run testFront
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { BrowserRouter } from "react-router-dom";
import SideBarAdherent from "../../src/components/sidebar/SideBarAdherent";

// Test de l'affichage des textes

// eslint-disable-next-line no-undef
it("Espace adhèrent", () => {
  render(
    <BrowserRouter>
      <SideBarAdherent title="Espace adhèrent">Espace adhèrent</SideBarAdherent>
    </BrowserRouter>
  );
  const title = screen.getByText("Espace adhèrent");
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});
// eslint-disable-next-line no-undef
it("Accueil", () => {
  render(
    <BrowserRouter>
      <SideBarAdherent title="Accueil">Accueil</SideBarAdherent>
    </BrowserRouter>
  );
  const title = screen.getByText("Accueil");
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});
// eslint-disable-next-line no-undef
it("Bilan Annuel", () => {
  render(
    <BrowserRouter>
      <SideBarAdherent title="Bilan Annuel">Bilan Annuel</SideBarAdherent>
    </BrowserRouter>
  );
  const title = screen.getByText("Bilan Annuel");
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});
// eslint-disable-next-line no-undef
it("Bilan Projet", () => {
  render(
    <BrowserRouter>
      <SideBarAdherent title="Bilan Projet">Bilan Projet</SideBarAdherent>
    </BrowserRouter>
  );
  const title = screen.getByText("Bilan Projet");
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});

// tests des click sur les boutons

// eslint-disable-next-line no-undef
it("click on btn Bilan Projet", () => {
  render(
    <BrowserRouter>
      <SideBarAdherent title="Bilan Projet">Bilan Projet</SideBarAdherent>
    </BrowserRouter>
  );
  const btnIncrement = screen.getByTestId("btn-bilanProjet");
  fireEvent.click(btnIncrement);
  const updatedSelectedMenu = screen.getByTestId("selected-menu");
  // eslint-disable-next-line no-undef
  expect(updatedSelectedMenu.textContent).toBe("3");
});
// eslint-disable-next-line no-undef
it("click on btn Bilan Annuel", () => {
  render(
    <BrowserRouter>
      <SideBarAdherent title="Bilan Annuel">Bilan Annuel</SideBarAdherent>
    </BrowserRouter>
  );
  const btnIncrement = screen.getByTestId("btn-bilanAnnuel");
  fireEvent.click(btnIncrement);
  const updatedSelectedMenu = screen.getByTestId("selected-menu");
  // eslint-disable-next-line no-undef
  expect(updatedSelectedMenu.textContent).toBe("2");
});
// eslint-disable-next-line no-undef
it("click on btn Bilan Annuel", () => {
  render(
    <BrowserRouter>
      <SideBarAdherent title="Accueil">Accueil</SideBarAdherent>
    </BrowserRouter>
  );
  const btnIncrement = screen.getByTestId("btn-acceuil");
  fireEvent.click(btnIncrement);
  const updatedSelectedMenu = screen.getByTestId("selected-menu");
  // eslint-disable-next-line no-undef
  expect(updatedSelectedMenu.textContent).toBe("1");
});
