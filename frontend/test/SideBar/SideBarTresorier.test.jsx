// Pour executer les tests : npm run testFront
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { BrowserRouter } from "react-router-dom";
import SideBarTresorier from "../../src/components/sidebar/SideBarTresorier";

// Test de l'affichage des textes

// eslint-disable-next-line no-undef
it("Espace Présidente, Secrétaire et Trésorier", () => {
  render(
    <BrowserRouter>
      <SideBarTresorier title="Espace Présidente, Secrétaire et Trésorier">
        Espace Présidente, Secrétaire et Trésorier
      </SideBarTresorier>
    </BrowserRouter>
  );
  const title = screen.getByText("Espace Présidente, Secrétaire et Trésorier");
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});
// eslint-disable-next-line no-undef
it("Saisies", () => {
  render(
    <BrowserRouter>
      <SideBarTresorier title="Saisies">Saisies</SideBarTresorier>
    </BrowserRouter>
  );
  const title = screen.getByText("Saisies");
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});
// eslint-disable-next-line no-undef
it("Enregistrer une recette", () => {
  render(
    <BrowserRouter>
      <SideBarTresorier title="Enregistrer une recette">
        Enregistrer une recette
      </SideBarTresorier>
    </BrowserRouter>
  );
  const title = screen.getByText("Enregistrer une recette");
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});
// eslint-disable-next-line no-undef
it("Enregistrer une dépense", () => {
  render(
    <BrowserRouter>
      <SideBarTresorier title="Enregistrer une dépense">
        Enregistrer une dépense
      </SideBarTresorier>
    </BrowserRouter>
  );
  const title = screen.getByText("Enregistrer une dépense");
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});
// eslint-disable-next-line no-undef
it("Compte", () => {
  render(
    <BrowserRouter>
      <SideBarTresorier title="Compte">Compte</SideBarTresorier>
    </BrowserRouter>
  );
  const title = screen.getByText("Compte");
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});
// eslint-disable-next-line no-undef
it("Compte journalier", () => {
  render(
    <BrowserRouter>
      <SideBarTresorier title="Compte journalier">
        Compte journalier
      </SideBarTresorier>
    </BrowserRouter>
  );
  const title = screen.getByText("Compte journalier");
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});
// eslint-disable-next-line no-undef
it("Caisse", () => {
  render(
    <BrowserRouter>
      <SideBarTresorier title="Caisse">Caisse</SideBarTresorier>
    </BrowserRouter>
  );
  const title = screen.getByText("Caisse");
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});
// eslint-disable-next-line no-undef
it("PayPal", () => {
  render(
    <BrowserRouter>
      <SideBarTresorier title="PayPal">PayPal</SideBarTresorier>
    </BrowserRouter>
  );
  const title = screen.getByText("PayPal");
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});
// eslint-disable-next-line no-undef
it("Etat de rapprochement banquaire", () => {
  render(
    <BrowserRouter>
      <SideBarTresorier title="Etat de rapprochement banquaire">
        Etat de rapprochement banquaire
      </SideBarTresorier>
    </BrowserRouter>
  );
  const title = screen.getByText("Etat de rapprochement banquaire");
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});
// eslint-disable-next-line no-undef
it("Stocks", () => {
  render(
    <BrowserRouter>
      <SideBarTresorier title="Stocks">Stocks</SideBarTresorier>
    </BrowserRouter>
  );
  const title = screen.getByText("Stocks");
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});
// eslint-disable-next-line no-undef
it("Rapports", () => {
  render(
    <BrowserRouter>
      <SideBarTresorier title="Rapports">Rapports</SideBarTresorier>
    </BrowserRouter>
  );
  const title = screen.getByText("Rapports");
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});
// eslint-disable-next-line no-undef
it("Comptes", () => {
  render(
    <BrowserRouter>
      <SideBarTresorier title="Comptes">Comptes</SideBarTresorier>
    </BrowserRouter>
  );
  const title = screen.getByText("Comptes");
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});
// eslint-disable-next-line no-undef
it("Bilan", () => {
  render(
    <BrowserRouter>
      <SideBarTresorier title="Bilan">Bilan</SideBarTresorier>
    </BrowserRouter>
  );
  const title = screen.getByText("Bilan");
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});
// eslint-disable-next-line no-undef
it("Projet", () => {
  render(
    <BrowserRouter>
      <SideBarTresorier title="Projet">Projet</SideBarTresorier>
    </BrowserRouter>
  );
  const title = screen.getByText("Projet");
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});
// eslint-disable-next-line no-undef
it("Analyse des comptes", () => {
  render(
    <BrowserRouter>
      <SideBarTresorier title="Analyse des comptes">
        Analyse des comptes
      </SideBarTresorier>
    </BrowserRouter>
  );
  const title = screen.getByText("Analyse des comptes");
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});

// tests des click sur les boutons

// eslint-disable-next-line no-undef
it("click on btn Enregistrer une recette", () => {
  render(
    <BrowserRouter>
      <SideBarTresorier title="Enregistrer une recette">
        Enregistrer une recette
      </SideBarTresorier>
    </BrowserRouter>
  );
  const btnIncrement = screen.getByTestId("btn-enrgRecette");
  fireEvent.click(btnIncrement);
  const updatedSelectedMenu = screen.getByTestId("selected-menu");
  // eslint-disable-next-line no-undef
  expect(updatedSelectedMenu.textContent).toBe("1");
});
// eslint-disable-next-line no-undef
it("click on btn Enregistrer une dépense", () => {
  render(
    <BrowserRouter>
      <SideBarTresorier title="Enregistrer une dépense">
        Enregistrer une dépense
      </SideBarTresorier>
    </BrowserRouter>
  );
  const btnIncrement = screen.getByTestId("btn-enrgDepense");
  fireEvent.click(btnIncrement);
  const updatedSelectedMenu = screen.getByTestId("selected-menu");
  // eslint-disable-next-line no-undef
  expect(updatedSelectedMenu.textContent).toBe("2");
});
// eslint-disable-next-line no-undef
it("click on btn Compte journalier", () => {
  render(
    <BrowserRouter>
      <SideBarTresorier title="Compte journalier">
        Compte journalier
      </SideBarTresorier>
    </BrowserRouter>
  );
  const btnIncrement = screen.getByTestId("btn-compteJournalier");
  fireEvent.click(btnIncrement);
  const updatedSelectedMenu = screen.getByTestId("selected-menu");
  // eslint-disable-next-line no-undef
  expect(updatedSelectedMenu.textContent).toBe("3");
});
// eslint-disable-next-line no-undef
it("click on btn Caisse", () => {
  render(
    <BrowserRouter>
      <SideBarTresorier title="Caisse">Caisse</SideBarTresorier>
    </BrowserRouter>
  );
  const btnIncrement = screen.getByTestId("btn-caisse");
  fireEvent.click(btnIncrement);
  const updatedSelectedMenu = screen.getByTestId("selected-menu");
  // eslint-disable-next-line no-undef
  expect(updatedSelectedMenu.textContent).toBe("4");
});
// eslint-disable-next-line no-undef
it("click on btn PayPal", () => {
  render(
    <BrowserRouter>
      <SideBarTresorier title="PayPal">PayPal</SideBarTresorier>
    </BrowserRouter>
  );
  const btnIncrement = screen.getByTestId("btn-payPal");
  fireEvent.click(btnIncrement);
  const updatedSelectedMenu = screen.getByTestId("selected-menu");
  // eslint-disable-next-line no-undef
  expect(updatedSelectedMenu.textContent).toBe("5");
});
// eslint-disable-next-line no-undef
it("click on btn Etat de rapprochement banquaire", () => {
  render(
    <BrowserRouter>
      <SideBarTresorier title="Etat de rapprochement banquaire">
        Etat de rapprochement banquaire
      </SideBarTresorier>
    </BrowserRouter>
  );
  const btnIncrement = screen.getByTestId("btn-etatBanquaire");
  fireEvent.click(btnIncrement);
  const updatedSelectedMenu = screen.getByTestId("selected-menu");
  // eslint-disable-next-line no-undef
  expect(updatedSelectedMenu.textContent).toBe("6");
});
// eslint-disable-next-line no-undef
it("click on btn Stocks", () => {
  render(
    <BrowserRouter>
      <SideBarTresorier title="Stocks">Stocks</SideBarTresorier>
    </BrowserRouter>
  );
  const btnIncrement = screen.getByTestId("btn-stocks");
  fireEvent.click(btnIncrement);
  const updatedSelectedMenu = screen.getByTestId("selected-menu");
  // eslint-disable-next-line no-undef
  expect(updatedSelectedMenu.textContent).toBe("7");
});
// eslint-disable-next-line no-undef
it("click on btn Comptes", () => {
  render(
    <BrowserRouter>
      <SideBarTresorier title="Comptes">Comptes</SideBarTresorier>
    </BrowserRouter>
  );
  const btnIncrement = screen.getByTestId("btn-comptes");
  fireEvent.click(btnIncrement);
  const updatedSelectedMenu = screen.getByTestId("selected-menu");
  // eslint-disable-next-line no-undef
  expect(updatedSelectedMenu.textContent).toBe("8");
});
// eslint-disable-next-line no-undef
it("click on btn Bilan", () => {
  render(
    <BrowserRouter>
      <SideBarTresorier title="Bilan">Bilan</SideBarTresorier>
    </BrowserRouter>
  );
  const btnIncrement = screen.getByTestId("btn-bilan");
  fireEvent.click(btnIncrement);
  const updatedSelectedMenu = screen.getByTestId("selected-menu");
  // eslint-disable-next-line no-undef
  expect(updatedSelectedMenu.textContent).toBe("9");
});
// eslint-disable-next-line no-undef
it("click on btn Projet", () => {
  render(
    <BrowserRouter>
      <SideBarTresorier title="Projet">Projet</SideBarTresorier>
    </BrowserRouter>
  );
  const btnIncrement = screen.getByTestId("btn-projet");
  fireEvent.click(btnIncrement);
  const updatedSelectedMenu = screen.getByTestId("selected-menu");
  // eslint-disable-next-line no-undef
  expect(updatedSelectedMenu.textContent).toBe("10");
});
// eslint-disable-next-line no-undef
it("click on btn Analyse des comptes", () => {
  render(
    <BrowserRouter>
      <SideBarTresorier title="Analyse des comptes">
        Analyse des comptes
      </SideBarTresorier>
    </BrowserRouter>
  );
  const btnIncrement = screen.getByTestId("btn-analyseComptes");
  fireEvent.click(btnIncrement);
  const updatedSelectedMenu = screen.getByTestId("selected-menu");
  // eslint-disable-next-line no-undef
  expect(updatedSelectedMenu.textContent).toBe("11");
});

// vérification des routes

// eslint-disable-next-line no-undef
jest.mock("../../src/pages/Layout/PrivateTresorier", () => ({
  // eslint-disable-next-line no-undef
  ...jest.requireActual("../../src/pages/Layout/PrivateTresorier"),
  UserContext: {
    Consumer: ({ children }) =>
      children({
        user: [{ Role: { nom: "Trésorier" } }],
        // eslint-disable-next-line no-undef
        logout: jest.fn(),
      }),
  },
}));
// eslint-disable-next-line no-undef
it("clicking on button redirects to //homeTresorier", () => {
  render(
    <BrowserRouter initialEntries={["/"]} initialIndex={0}>
      <SideBarTresorier />
    </BrowserRouter>
  );
  const boutonAjoutUtilisateur = screen.getByTestId("btn-enrgRecette");
  fireEvent.click(boutonAjoutUtilisateur);
  // eslint-disable-next-line no-undef
  expect(window.location.pathname).toBe("/homeTresorier");
});
// eslint-disable-next-line no-undef
it("clicking on button redirects to /homeTresorier", () => {
  render(
    <BrowserRouter initialEntries={["/"]} initialIndex={0}>
      <SideBarTresorier />
    </BrowserRouter>
  );
  const boutonAjoutUtilisateur = screen.getByTestId("btn-enrgDepense");
  fireEvent.click(boutonAjoutUtilisateur);
  // eslint-disable-next-line no-undef
  expect(window.location.pathname).toBe("/homeTresorier");
});
// eslint-disable-next-line no-undef
it("clicking on button redirects to /compteJournalier", () => {
  render(
    <BrowserRouter initialEntries={["/"]} initialIndex={0}>
      <SideBarTresorier />
    </BrowserRouter>
  );
  const boutonAjoutUtilisateur = screen.getByTestId("btn-compteJournalier");
  fireEvent.click(boutonAjoutUtilisateur);
  // eslint-disable-next-line no-undef
  expect(window.location.pathname).toBe("/compteJournalier");
});
// eslint-disable-next-line no-undef
it("clicking on button redirects to /rapportComptes", () => {
  render(
    <BrowserRouter initialEntries={["/"]} initialIndex={0}>
      <SideBarTresorier />
    </BrowserRouter>
  );
  const boutonAjoutUtilisateur = screen.getByTestId("btn-comptes");
  fireEvent.click(boutonAjoutUtilisateur);
  // eslint-disable-next-line no-undef
  expect(window.location.pathname).toBe("/rapportComptes");
});
