// Pour executer les tests : npm run testFront
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import SideBarMembreEquipe from "../../src/components/sidebar/SideBarMembreEquipe";

// Test de l'affichage des textes
// eslint-disable-next-line no-undef
it("Espace membre d'équipe", () => {
  render(
    <SideBarMembreEquipe title="Espace membre d'équipe">
      Espace membre d'équipe
    </SideBarMembreEquipe>
  );
  const title = screen.getByText("Espace membre d'équipe");
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});
// eslint-disable-next-line no-undef
it("Comptes", () => {
  render(<SideBarMembreEquipe title="Comptes">Comptes</SideBarMembreEquipe>);
  const title = screen.getByText("Comptes");
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});
// eslint-disable-next-line no-undef
it("Bilan Annuel", () => {
  render(
    <SideBarMembreEquipe title="Bilan Annuel">Bilan Annuel</SideBarMembreEquipe>
  );
  const title = screen.getByText("Bilan Annuel");
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});
// eslint-disable-next-line no-undef
it("Bilan Projet", () => {
  render(
    <SideBarMembreEquipe title="Bilan Projet">Bilan Projet</SideBarMembreEquipe>
  );
  const title = screen.getByText("Bilan Projet");
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});

// tests des click sur les boutons

// eslint-disable-next-line no-undef
it("click on btn Comptes", () => {
  render(<SideBarMembreEquipe title="Comptes">Comptes</SideBarMembreEquipe>);
  const btnIncrement = screen.getByTestId("btn-comptes");
  fireEvent.click(btnIncrement);
  const updatedSelectedMenu = screen.getByTestId("selected-menu");
  // eslint-disable-next-line no-undef
  expect(updatedSelectedMenu.textContent).toBe("1");
});
// eslint-disable-next-line no-undef
it("click on btn Bilan Annuel", () => {
  render(
    <SideBarMembreEquipe title="Bilan Annuel">Bilan Annuel</SideBarMembreEquipe>
  );
  const btnIncrement = screen.getByTestId("btn-bilanAnnuel");
  fireEvent.click(btnIncrement);
  const updatedSelectedMenu = screen.getByTestId("selected-menu");
  // eslint-disable-next-line no-undef
  expect(updatedSelectedMenu.textContent).toBe("2");
});
// eslint-disable-next-line no-undef
it("click on btn Bilan Projet", () => {
  render(
    <SideBarMembreEquipe title="Bilan Projet">Bilan Projet</SideBarMembreEquipe>
  );
  const btnIncrement = screen.getByTestId("btn-bilanProjet");
  fireEvent.click(btnIncrement);
  const updatedSelectedMenu = screen.getByTestId("selected-menu");
  // eslint-disable-next-line no-undef
  expect(updatedSelectedMenu.textContent).toBe("3");
});
