// Pour executer les tests : npm run testFront
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import SideBarMembreBureau from "../../src/components/sidebar/SideBarMembreBureau";

// Test de l'affichage des textes
// eslint-disable-next-line no-undef
it("Espace membre du bureau", () => {
  render(
    <SideBarMembreBureau title="Espace membre du bureau">
      Espace membre du bureau
    </SideBarMembreBureau>
  );
  const title = screen.getByText("Espace membre du bureau");
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});
// eslint-disable-next-line no-undef
it("Compte", () => {
  render(<SideBarMembreBureau title="Compte">Compte</SideBarMembreBureau>);
  const title = screen.getByText("Compte");
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});
// eslint-disable-next-line no-undef
it("Compte journalier", () => {
  render(
    <SideBarMembreBureau title="Compte journalier">
      Compte journalier
    </SideBarMembreBureau>
  );
  const title = screen.getByText("Compte journalier");
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});
// eslint-disable-next-line no-undef
it("caisse", () => {
  render(<SideBarMembreBureau title="caisse">caisse</SideBarMembreBureau>);
  const title = screen.getByText("caisse");
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});
// eslint-disable-next-line no-undef
it("Comptes", () => {
  render(<SideBarMembreBureau title="Comptes">Comptes</SideBarMembreBureau>);
  const title = screen.getByText("Comptes");
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});
// eslint-disable-next-line no-undef
it("Bilan", () => {
  render(<SideBarMembreBureau title="Bilan">Bilan</SideBarMembreBureau>);
  const title = screen.getByText("Bilan");
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});
// eslint-disable-next-line no-undef
it("Projet", () => {
  render(<SideBarMembreBureau title="Projet">Projet</SideBarMembreBureau>);
  const title = screen.getByText("Projet");
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});
// eslint-disable-next-line no-undef
it("Analyse des comptes", () => {
  render(
    <SideBarMembreBureau title="Analyse des comptes">
      Analyse des comptes
    </SideBarMembreBureau>
  );
  const title = screen.getByText("Analyse des comptes");
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});

// tests des click sur les boutons

// eslint-disable-next-line no-undef
it("click on btn Compte journalier", () => {
  render(
    <SideBarMembreBureau title="Compte journalier">
      Compte journalier
    </SideBarMembreBureau>
  );
  const btnIncrement = screen.getByTestId("btn-comptejournalier");
  fireEvent.click(btnIncrement);
  const updatedSelectedMenu = screen.getByTestId("selected-menu");
  // eslint-disable-next-line no-undef
  expect(updatedSelectedMenu.textContent).toBe("1");
});
// eslint-disable-next-line no-undef
it("click on btn caisse", () => {
  render(<SideBarMembreBureau title="caisse">caisse</SideBarMembreBureau>);
  const btnIncrement = screen.getByTestId("btn-caisse");
  fireEvent.click(btnIncrement);
  const updatedSelectedMenu = screen.getByTestId("selected-menu");
  // eslint-disable-next-line no-undef
  expect(updatedSelectedMenu.textContent).toBe("2");
});
// eslint-disable-next-line no-undef
it("click on btn Comptes", () => {
  render(<SideBarMembreBureau title="Comptes">Comptes</SideBarMembreBureau>);
  const btnIncrement = screen.getByTestId("btn-comptes");
  fireEvent.click(btnIncrement);
  const updatedSelectedMenu = screen.getByTestId("selected-menu");
  // eslint-disable-next-line no-undef
  expect(updatedSelectedMenu.textContent).toBe("3");
});
// eslint-disable-next-line no-undef
it("click on btn Bilan", () => {
  render(<SideBarMembreBureau title="Bilan">Bilan</SideBarMembreBureau>);
  const btnIncrement = screen.getByTestId("btn-bilan");
  fireEvent.click(btnIncrement);
  const updatedSelectedMenu = screen.getByTestId("selected-menu");
  // eslint-disable-next-line no-undef
  expect(updatedSelectedMenu.textContent).toBe("4");
});
// eslint-disable-next-line no-undef
it("click on btn Projet", () => {
  render(<SideBarMembreBureau title="Projet">Projet</SideBarMembreBureau>);
  const btnIncrement = screen.getByTestId("btn-projet");
  fireEvent.click(btnIncrement);
  const updatedSelectedMenu = screen.getByTestId("selected-menu");
  // eslint-disable-next-line no-undef
  expect(updatedSelectedMenu.textContent).toBe("5");
});
// eslint-disable-next-line no-undef
it("click on btn Analyse des comptes", () => {
  render(
    <SideBarMembreBureau title="Analyse des comptes">
      Analyse des comptes
    </SideBarMembreBureau>
  );
  const btnIncrement = screen.getByTestId("btn-analyseComptes");
  fireEvent.click(btnIncrement);
  const updatedSelectedMenu = screen.getByTestId("selected-menu");
  // eslint-disable-next-line no-undef
  expect(updatedSelectedMenu.textContent).toBe("6");
});
