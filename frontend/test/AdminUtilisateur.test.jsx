// Pour executer les tests : npm run testFront.
import "../jest.config";
import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { screen, waitFor } from "@testing-library/dom";
import { act } from "react-dom/test-utils";
import { BrowserRouter, useLocation } from "react-router-dom";
import { MockUserContext } from "./mocks/UserContextMock";
import AdminUtilisateur from "../src/pages/homes/AdminUtilisateur";

// Test de la présence des eléments dans le DOM

// eslint-disable-next-line no-undef
jest.mock("react-router-dom", () => ({
  // eslint-disable-next-line no-undef
  ...jest.requireActual("react-router-dom"),
  // eslint-disable-next-line no-undef
  useLocation: jest.fn().mockReturnValue({
    pathname: "/adminUtilisateur",
    search: "",
    hash: "",
    state: { parametre: "Ajouter" },
    key: "9sio1dxz",
  }),
}));

// eslint-disable-next-line no-undef
jest.mock("../src/components/users/addUsers", () => ({
  __esModule: true,
  default: () => null,
}));
// eslint-disable-next-line no-undef
jest.mock("../src/components/users/updateUsers", () => ({
  __esModule: true,
  default: () => null,
}));
// eslint-disable-next-line no-undef
jest.mock("../src/components/users/supUsers", () => ({
  __esModule: true,
  default: () => null,
}));
// Mock du composant Helmet
// eslint-disable-next-line no-undef
jest.mock("react-helmet", () => {
  return {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    Helmet: ({ children }) => <>{children}</>, // Composant fictif qui ne fait rien
  };
});

// eslint-disable-next-line no-undef
jest.mock("../src/pages/Layout/PrivateAdmin", () => ({
  // eslint-disable-next-line no-undef
  ...jest.requireActual("../src/pages/Layout/PrivateAdmin"),
  MockUserContext: {
    Consumer: ({ children }) =>
      children({
        user: [{ Role: { nom: "Administrateur" } }],
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
it("Espace admin sideBar", () => {
  render(
    <BrowserRouter>
      <AdminUtilisateur />
    </BrowserRouter>
  );
  // cible l'élément Sidebar par son data-testid
  const sidebarElement = screen.getByTestId("sidebar-admin");

  // Vérifie si l'élément Sidebar est présent dans le DOM
  // eslint-disable-next-line no-undef
  expect(sidebarElement).toBeInTheDocument();
});

// eslint-disable-next-line no-undef
it("Espace admin AddUser", async () => {
  await act(() => {
    useLocation.mockReturnValue({
      pathname: "/adminUtilisateur",
      search: "",
      hash: "",
      state: { parametre: "Ajouter" },
      key: "di4j6vby",
    });
  });

  await act(() => {
    render(
      <BrowserRouter>
        <AdminUtilisateur />
      </BrowserRouter>
    );
  });
  await waitFor(() => {
    // cible l'élément Sidebar par son data-testid
    const addUsersElement = screen.getByTestId("AddUser");

    // Vérifie si l'élément Sidebar est présent dans le DOM
    // eslint-disable-next-line no-undef
    expect(addUsersElement).toBeInTheDocument();
  });
});
// eslint-disable-next-line no-undef
it("Espace admin UpdateUsers", async () => {
  await act(() => {
    useLocation.mockReturnValue({
      pathname: "/adminUtilisateur",
      search: "",
      hash: "",
      state: { parametre: "Modifier" },
      key: "di4j6vby",
    });
  });

  await act(() => {
    render(
      <BrowserRouter>
        <AdminUtilisateur />
      </BrowserRouter>
    );
  });
  await waitFor(() => {
    // cible l'élément Sidebar par son data-testid
    const UpdateUsersElement = screen.getByTestId("UpdateUsers");

    // Vérifie si l'élément Sidebar est présent dans le DOM
    // eslint-disable-next-line no-undef
    expect(UpdateUsersElement).toBeInTheDocument();
  });
});
// eslint-disable-next-line no-undef
it("Espace admin SupUsers", async () => {
  await act(() => {
    useLocation.mockReturnValue({
      pathname: "/adminUtilisateur",
      search: "",
      hash: "",
      state: { parametre: "Supprimer" },
      key: "di4j6vby",
    });
  });

  await act(() => {
    render(
      <BrowserRouter>
        <AdminUtilisateur />
      </BrowserRouter>
    );
  });
  await waitFor(() => {
    // cible l'élément Sidebar par son data-testid
    const SupUsersElement = screen.getByTestId("SupUsers");

    // Vérifie si l'élément Sidebar est présent dans le DOM
    // eslint-disable-next-line no-undef
    expect(SupUsersElement).toBeInTheDocument();
  });
});
