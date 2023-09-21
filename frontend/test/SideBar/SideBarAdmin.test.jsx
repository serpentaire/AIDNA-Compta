// Pour executer les tests : npm run testFront
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { BrowserRouter } from "react-router-dom";
import SideBarAdmin from "../../src/components/sidebar/SideBarAdmin";

// Test de l'affichage des textes

// eslint-disable-next-line no-undef
it("Espace Administrateur", () => {
  render(
    <BrowserRouter>
      <SideBarAdmin title="Espace Administrateur">
        Espace Administrateur
      </SideBarAdmin>
    </BrowserRouter>
  );
  const title = screen.getByText("Espace Administrateur");
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});
// eslint-disable-next-line no-undef
it("Comptes", () => {
  render(
    <BrowserRouter>
      <SideBarAdmin title="Comptes">Comptes</SideBarAdmin>
    </BrowserRouter>
  );
  const title = screen.getByText("Comptes");
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});
// eslint-disable-next-line no-undef
it("Archiver un compte", () => {
  render(
    <BrowserRouter>
      <SideBarAdmin title="Archiver un compte">Archiver un compte</SideBarAdmin>
    </BrowserRouter>
  );
  const title = screen.getByText("Archiver un compte");
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});
// eslint-disable-next-line no-undef
it("Ajouter un compte", () => {
  render(
    <BrowserRouter>
      <SideBarAdmin title="Ajouter un compte">Ajouter un compte</SideBarAdmin>
    </BrowserRouter>
  );
  const title = screen.getByText("Ajouter un compte");
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});
// eslint-disable-next-line no-undef
it("Ajouter un utilisateur", () => {
  render(
    <BrowserRouter>
      <SideBarAdmin title="Ajouter un utilisateur">
        Ajouter un utilisateur
      </SideBarAdmin>
    </BrowserRouter>
  );
  const title = screen.getByText("Ajouter un utilisateur");
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});
// eslint-disable-next-line no-undef
it("Supprimer un utilisateur", () => {
  render(
    <BrowserRouter>
      <SideBarAdmin title="Supprimer un utilisateur">
        Supprimer un utilisateur
      </SideBarAdmin>
    </BrowserRouter>
  );
  const title = screen.getByText("Supprimer un utilisateur");
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});
// eslint-disable-next-line no-undef
it("Modifier un utilisateur", () => {
  render(
    <BrowserRouter>
      <SideBarAdmin title="Modifier un utilisateur">
        Modifier un utilisateur
      </SideBarAdmin>
    </BrowserRouter>
  );
  const title = screen.getByText("Modifier un utilisateur");
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});
// eslint-disable-next-line no-undef
it("Administration", () => {
  render(
    <BrowserRouter>
      <SideBarAdmin title="Administration">Administration</SideBarAdmin>
    </BrowserRouter>
  );
  const title = screen.getByText("Administration");
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});
// eslint-disable-next-line no-undef
it("Base de données", () => {
  render(
    <BrowserRouter>
      <SideBarAdmin title="Base de données">Base de données</SideBarAdmin>
    </BrowserRouter>
  );
  const title = screen.getByText("Base de données");
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});

// tests des click sur les boutons

// eslint-disable-next-line no-undef
it("click on btn Archiver un compte", () => {
  render(
    <BrowserRouter>
      <SideBarAdmin title="Archiver un compte">Archiver un compte</SideBarAdmin>
    </BrowserRouter>
  );
  const btnIncrement = screen.getByTestId("btn-archiverCompte");
  fireEvent.click(btnIncrement);
  const updatedSelectedMenu = screen.getByTestId("selected-menu");
  // eslint-disable-next-line no-undef
  expect(updatedSelectedMenu.textContent).toBe("1");
});
// eslint-disable-next-line no-undef
it("click on btn Ajouter un compte", () => {
  render(
    <BrowserRouter>
      <SideBarAdmin title="Ajouter un compte">Ajouter un compte</SideBarAdmin>
    </BrowserRouter>
  );
  const btnIncrement = screen.getByTestId("btn-ajoutCompte");
  fireEvent.click(btnIncrement);
  const updatedSelectedMenu = screen.getByTestId("selected-menu");
  // eslint-disable-next-line no-undef
  expect(updatedSelectedMenu.textContent).toBe("2");
});
// eslint-disable-next-line no-undef
it("click on btn Ajouter un utilisateur", () => {
  render(
    <BrowserRouter>
      <SideBarAdmin title="Ajouter un utilisateur">
        Ajouter un utilisateur
      </SideBarAdmin>
    </BrowserRouter>
  );
  const btnIncrement = screen.getByTestId("btn-ajoutUtilisateur");
  fireEvent.click(btnIncrement);
  const updatedSelectedMenu = screen.getByTestId("selected-menu");
  // eslint-disable-next-line no-undef
  expect(updatedSelectedMenu.textContent).toBe("3");
});
// eslint-disable-next-line no-undef
it("click on btn Supprimer un utilisateur", () => {
  render(
    <BrowserRouter>
      <SideBarAdmin title="Supprimer un utilisateur">
        Supprimer un utilisateur
      </SideBarAdmin>
    </BrowserRouter>
  );
  const btnIncrement = screen.getByTestId("btn-supUtilisateur");
  fireEvent.click(btnIncrement);
  const updatedSelectedMenu = screen.getByTestId("selected-menu");
  // eslint-disable-next-line no-undef
  expect(updatedSelectedMenu.textContent).toBe("4");
});
// eslint-disable-next-line no-undef
it("click on btn Modifier un utilisateur", () => {
  render(
    <BrowserRouter>
      <SideBarAdmin title="Modifier un utilisateur">
        Modifier un utilisateur
      </SideBarAdmin>
    </BrowserRouter>
  );
  const btnIncrement = screen.getByTestId("btn-modifUtilisateur");
  fireEvent.click(btnIncrement);
  const updatedSelectedMenu = screen.getByTestId("selected-menu");
  // eslint-disable-next-line no-undef
  expect(updatedSelectedMenu.textContent).toBe("5");
});
// eslint-disable-next-line no-undef
it("click on btn Base de données", () => {
  render(
    <BrowserRouter>
      <SideBarAdmin title="Base de données">Base de données</SideBarAdmin>
    </BrowserRouter>
  );
  const btnIncrement = screen.getByTestId("btn-bdd");
  fireEvent.click(btnIncrement);
  const updatedSelectedMenu = screen.getByTestId("selected-menu");
  // eslint-disable-next-line no-undef
  expect(updatedSelectedMenu.textContent).toBe("6");
});

// vérification des routes

// eslint-disable-next-line no-undef
jest.mock("../../src/pages/Layout/PrivateAdmin", () => ({
  // eslint-disable-next-line no-undef
  ...jest.requireActual("../../src/pages/Layout/PrivateAdmin"),
  UserContext: {
    Consumer: ({ children }) =>
      children({
        user: [{ Role: { nom: "Administrateur" } }],
        // eslint-disable-next-line no-undef
        logout: jest.fn(),
      }),
  },
}));
// eslint-disable-next-line no-undef
it("clicking on button redirects to /admin/accueil", () => {
  render(
    <BrowserRouter initialEntries={["/"]} initialIndex={0}>
      <SideBarAdmin />
    </BrowserRouter>
  );
  const boutonAjoutUtilisateur = screen.getByTestId("btn-archiverCompte");
  fireEvent.click(boutonAjoutUtilisateur);
  // eslint-disable-next-line no-undef
  expect(window.location.pathname).toBe("/admin/accueil");
});
// eslint-disable-next-line no-undef
it("clicking on button redirects to /utilisateurs", () => {
  render(
    <BrowserRouter initialEntries={["/"]} initialIndex={0}>
      <SideBarAdmin />
    </BrowserRouter>
  );
  const boutonAjoutUtilisateur = screen.getByTestId("btn-ajoutUtilisateur");
  fireEvent.click(boutonAjoutUtilisateur);
  // eslint-disable-next-line no-undef
  expect(window.location.pathname).toBe("/admin/utilisateurs");
});
// eslint-disable-next-line no-undef
it("clicking on button redirects to /utilisateurs", () => {
  render(
    <BrowserRouter initialEntries={["/"]} initialIndex={0}>
      <SideBarAdmin />
    </BrowserRouter>
  );
  const boutonAjoutUtilisateur = screen.getByTestId("btn-supUtilisateur");
  fireEvent.click(boutonAjoutUtilisateur);
  // eslint-disable-next-line no-undef
  expect(window.location.pathname).toBe("/admin/utilisateurs");
});
// eslint-disable-next-line no-undef
it("clicking on button redirects to utilisateurs", () => {
  render(
    <BrowserRouter initialEntries={["/"]} initialIndex={0}>
      <SideBarAdmin />
    </BrowserRouter>
  );
  const boutonAjoutUtilisateur = screen.getByTestId("btn-modifUtilisateur");
  fireEvent.click(boutonAjoutUtilisateur);
  // eslint-disable-next-line no-undef
  expect(window.location.pathname).toBe("/admin/utilisateurs");
});
