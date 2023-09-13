// Pour executer les tests : npm run testFront
import "../../jest.config";
import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import { screen, waitFor } from "@testing-library/dom";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import { MockUserProvider, MockUserContext } from "../mocks/UserContextMock";
import Header from "../../src/components/Header";

// Test de l'affichage des textes

// eslint-disable-next-line no-undef
jest.mock("../../src/pages/Layout/PrivateAdmin", () => ({
  // eslint-disable-next-line no-undef
  ...jest.requireActual("../../src/pages/Layout/PrivateAdmin"),
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
jest.mock("../../src/context/user", () => ({
  // Mock du context
  // eslint-disable-next-line no-undef
  ...jest.requireActual("../../src/context/user"),
  UserContext: MockUserContext,
}));

// eslint-disable-next-line no-undef
it("Header", async () => {
  render(
    <MockUserProvider>
      <BrowserRouter>
        <Header title="AIDNA_Compta">AIDNA_Compta</Header>
      </BrowserRouter>
    </MockUserProvider>
  );
  const title = screen.getByText("AIDNA_Compta");
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(title).toBeTruthy();
  });
});
// eslint-disable-next-line no-undef
it("Header", async () => {
  await waitFor(() => {
    render(
      <MockUserProvider value={{ user: [{ Role: { nom: "Administrateur" } }] }}>
        <BrowserRouter>
          <Header title="Mot de passe">Mot de passe</Header>
        </BrowserRouter>
      </MockUserProvider>
    );
  });
  const title = screen.getByText("Mot de passe");
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(title).toBeTruthy();
  });
});
// eslint-disable-next-line no-undef
it("Header", async () => {
  await waitFor(() => {
    render(
      <MockUserProvider value={{ user: [{ Role: { nom: "Administrateur" } }] }}>
        <BrowserRouter>
          <Header title="Déconnexion">Déconnexion</Header>
        </BrowserRouter>
      </MockUserProvider>
    );
  });
  const title = screen.getByText("Déconnexion");
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(title).toBeTruthy();
  });
});

// Test des redirections
// eslint-disable-next-line no-undef
it("redirection to / after click on logo", async () => {
  await act(async () => {
    render(
      <MockUserProvider>
        <BrowserRouter initialEntries={["/"]} initialIndex={0}>
          <Header />
        </BrowserRouter>
      </MockUserProvider>
    );
  });

  const submitButton = screen.getByTestId("logo");

  await act(async () => {
    fireEvent.click(submitButton);
  });

  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(window.location.pathname).toBe("/");
  });
});
// eslint-disable-next-line no-undef
it("redirection to /updatePassword after click on button mot de passe", async () => {
  await act(async () => {
    render(
      <MockUserProvider value={{ user: [{ Role: { nom: "Administrateur" } }] }}>
        <BrowserRouter initialEntries={["/"]} initialIndex={0}>
          <Header />
        </BrowserRouter>
      </MockUserProvider>
    );
  });

  const submitButton = screen.getByTestId("btn-motPasse");

  await act(async () => {
    fireEvent.click(submitButton);
  });

  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(window.location.pathname).toBe("/updatePassword");
  });
});
// eslint-disable-next-line no-undef
it("redirection to / after click on logout", async () => {
  await act(async () => {
    render(
      <MockUserProvider value={{ user: [{ Role: { nom: "Administrateur" } }] }}>
        <BrowserRouter initialEntries={["/"]} initialIndex={0}>
          <Header />
        </BrowserRouter>
      </MockUserProvider>
    );
  });

  const submitButton = screen.getByTestId("btn-logout");

  await act(async () => {
    fireEvent.click(submitButton);
  });

  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(window.location.pathname).toBe("/");
  });
});
