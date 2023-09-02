// Pour executer les tests : npm run testFront
import "../jest.config";
import React from "react";
import "@testing-library/jest-dom";
import { toast } from "react-toastify";
// eslint-disable-next-line import/no-extraneous-dependencies
import { setupServer } from "msw/node";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { screen, waitFor } from "@testing-library/dom";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import { MockUserProvider, MockUserContext } from "./mocks/UserContextMock";
import UpdatePassword from "../src/pages/homes/login/UpdatePassword";
import { loginHandlers } from "./mocks/handlersLogin";

const server = setupServer(...loginHandlers);

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
jest.mock("../src/context/user", () => ({
  // Mock du context
  // eslint-disable-next-line no-undef
  ...jest.requireActual("../src/context/user"),
  UserContext: MockUserContext,
}));
// eslint-disable-next-line no-undef
it("UpdatePassword", () => {
  render(
    <MockUserProvider>
      <BrowserRouter>
        <UpdatePassword title="Changer votre mot de passe">
          Changer votre mot de passe
        </UpdatePassword>
      </BrowserRouter>
    </MockUserProvider>
  );
  const title = screen.getByText("Changer votre mot de passe");
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});
// eslint-disable-next-line no-undef
it("Valider", () => {
  render(
    <MockUserProvider>
      <BrowserRouter>
        <UpdatePassword title="Valider">Valider</UpdatePassword>
      </BrowserRouter>
    </MockUserProvider>
  );
  const title = screen.getByText("Valider");
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});
// vérification des routes
// Création d'un mock pour react-toastify
// eslint-disable-next-line no-undef
jest.mock("react-toastify", () => ({
  ToastContainer: ({ children }) => <div>{children}</div>,
  toast: {
    // eslint-disable-next-line no-undef
    success: jest.fn(),
    // eslint-disable-next-line no-undef
    error: jest.fn(),
  },
}));

// eslint-disable-next-line no-undef
beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));

// eslint-disable-next-line no-undef
beforeEach(() => {
  // eslint-disable-next-line no-undef
  jest.useFakeTimers();
  server.resetHandlers();
});

// eslint-disable-next-line no-undef
afterEach(() => {
  // eslint-disable-next-line no-undef
  jest.useRealTimers();
  cleanup();
});

// eslint-disable-next-line no-undef
afterAll(() => server.close());
// eslint-disable-next-line no-undef
jest.mock("../src/pages/Layout/PrivateAdmin", () => ({
  // eslint-disable-next-line no-undef
  ...jest.requireActual("../src/pages/Layout/PrivateAdmin"),
}));

// eslint-disable-next-line no-undef
it("redirection to /homeAdmin after successful login", async () => {
  const user = [
    {
      nom: "LEMOINE",
      prenom: "Gaetan",
      users_log_id: 2,
      Role: {
        nom: "Administrateur",
      },
      Users_log: {
        login: "glemoine@hotmail.fr",
        nb_connexion: 2,
      },
    },
  ];
  await act(async () => {
    render(
      <MockUserProvider value={user}>
        <BrowserRouter initialEntries={["/"]} initialIndex={0}>
          <UpdatePassword />
        </BrowserRouter>
      </MockUserProvider>
    );
  });
  const oldPassword = screen.getByTestId("inputOldPassword");
  const passwordInput = screen.getByTestId("inputPassword");
  const ConfirmPasswordInput = screen.getByTestId("inputConfirmPassword");

  fireEvent.change(oldPassword, {
    target: { value: "123456aqzsA!" },
  });
  fireEvent.change(passwordInput, { target: { value: "123456aqzsA!" } });
  fireEvent.change(ConfirmPasswordInput, { target: { value: "123456aqzsA!" } });

  const submitButton = screen.getByTestId("btn-Valider");

  await act(async () => {
    fireEvent.click(submitButton);
  });

  await act(async () => {
    // doit être suppérieur à 3000
    // eslint-disable-next-line no-undef
    jest.advanceTimersByTime(4000);
  });

  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(window.location.pathname).toBe("/homeAdmin");
  });
});
// eslint-disable-next-line no-undef
it("redirection to /homeTresorier after successful login", async () => {
  const user = [
    {
      nom: "LEMOINE",
      prenom: "Gaetan",
      users_log_id: 2,
      Role: {
        nom: "Trésorier",
      },
      Users_log: {
        login: "glemoine@hotmail.fr",
        nb_connexion: 2,
      },
    },
  ];
  await act(async () => {
    render(
      <MockUserProvider value={user}>
        <BrowserRouter initialEntries={["/"]} initialIndex={0}>
          <UpdatePassword />
        </BrowserRouter>
      </MockUserProvider>
    );
  });
  const oldPassword = screen.getByTestId("inputOldPassword");
  const passwordInput = screen.getByTestId("inputPassword");
  const ConfirmPasswordInput = screen.getByTestId("inputConfirmPassword");

  fireEvent.change(oldPassword, {
    target: { value: "123456aqzsA!" },
  });
  fireEvent.change(passwordInput, { target: { value: "123456aqzsA!" } });
  fireEvent.change(ConfirmPasswordInput, { target: { value: "123456aqzsA!" } });

  const submitButton = screen.getByTestId("btn-Valider");

  await act(async () => {
    fireEvent.click(submitButton);
  });

  await act(async () => {
    // doit être suppérieur à 3000
    // eslint-disable-next-line no-undef
    jest.advanceTimersByTime(4000);
  });

  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(window.location.pathname).toBe("/homeTresorier");
  });
});
// eslint-disable-next-line no-undef
it("redirection to /homeAdherent after successful login", async () => {
  const user = [
    {
      nom: "LEMOINE",
      prenom: "Gaetan",
      users_log_id: 2,
      Role: {
        nom: "Adhèrent",
      },
      Users_log: {
        login: "glemoine@hotmail.fr",
        nb_connexion: 2,
      },
    },
  ];
  await act(async () => {
    render(
      <MockUserProvider value={user}>
        <BrowserRouter initialEntries={["/"]} initialIndex={0}>
          <UpdatePassword />
        </BrowserRouter>
      </MockUserProvider>
    );
  });
  const oldPassword = screen.getByTestId("inputOldPassword");
  const passwordInput = screen.getByTestId("inputPassword");
  const ConfirmPasswordInput = screen.getByTestId("inputConfirmPassword");

  fireEvent.change(oldPassword, {
    target: { value: "123456aqzsA!" },
  });
  fireEvent.change(passwordInput, { target: { value: "123456aqzsA!" } });
  fireEvent.change(ConfirmPasswordInput, { target: { value: "123456aqzsA!" } });

  const submitButton = screen.getByTestId("btn-Valider");

  await act(async () => {
    fireEvent.click(submitButton);
  });

  await act(async () => {
    // doit être suppérieur à 3000
    // eslint-disable-next-line no-undef
    jest.advanceTimersByTime(4000);
  });

  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(window.location.pathname).toBe("/homeAdherent");
  });
});
// eslint-disable-next-line no-undef
it("message d'erreur pour password non identique", async () => {
  const user = [
    {
      nom: "LEMOINE",
      prenom: "Gaetan",
      users_log_id: 2,
      Role: {
        nom: "Adhèrent",
      },
      Users_log: {
        login: "glemoine@hotmail.fr",
        nb_connexion: 2,
      },
    },
  ];
  // Mockez la fonction toast.error de toastify
  // eslint-disable-next-line no-undef
  const toastErrorMock = jest.spyOn(toast, "error");
  toastErrorMock.mockImplementation(() => {});

  await act(async () => {
    render(
      <MockUserProvider value={user}>
        <BrowserRouter initialEntries={["/"]} initialIndex={0}>
          <UpdatePassword />
        </BrowserRouter>
      </MockUserProvider>
    );
  });
  const oldPassword = screen.getByTestId("inputOldPassword");
  const passwordInput = screen.getByTestId("inputPassword");
  const ConfirmPasswordInput = screen.getByTestId("inputConfirmPassword");

  fireEvent.change(oldPassword, {
    target: { value: "123456aqzsA!" },
  });
  fireEvent.change(passwordInput, { target: { value: "123456aqzsaA!" } });
  fireEvent.change(ConfirmPasswordInput, { target: { value: "123456aqzsA!" } });

  const submitButton = screen.getByTestId("btn-Valider");

  await act(async () => {
    fireEvent.click(submitButton);
  });

  await act(async () => {
    // doit être suppérieur à 3000
    // eslint-disable-next-line no-undef
    jest.advanceTimersByTime(4000);
  });

  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(toastErrorMock).toHaveBeenCalledWith(
      "Vos nouveaux mots de passe ne sont pas identiques",
      {
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
        hideProgressBar: false,
        pauseOnHover: true,
        position: "bottom-right",
        progress: undefined,
        theme: "light",
      }
    );
  });

  // la fonction toast.error a été appelée
  // eslint-disable-next-line no-undef
  expect(toastErrorMock).toHaveBeenCalled();

  // Remise en place la fonction mockée après le test
  toastErrorMock.mockRestore();
});
// eslint-disable-next-line no-undef
it("message d'erreur pour password ne répond pas aux critères", async () => {
  const user = [
    {
      nom: "LEMOINE",
      prenom: "Gaetan",
      users_log_id: 2,
      Role: {
        nom: "Adhèrent",
      },
      Users_log: {
        login: "glemoine@hotmail.fr",
        nb_connexion: 2,
      },
    },
  ];
  // Mockez la fonction toast.error de toastify
  // eslint-disable-next-line no-undef
  const toastErrorMock = jest.spyOn(toast, "error");
  toastErrorMock.mockImplementation(() => {});

  await act(async () => {
    render(
      <MockUserProvider value={user}>
        <BrowserRouter initialEntries={["/"]} initialIndex={0}>
          <UpdatePassword />
        </BrowserRouter>
      </MockUserProvider>
    );
  });
  const oldPassword = screen.getByTestId("inputOldPassword");
  const passwordInput = screen.getByTestId("inputPassword");
  const ConfirmPasswordInput = screen.getByTestId("inputConfirmPassword");

  fireEvent.change(oldPassword, {
    target: { value: "123456aqzsA!" },
  });
  fireEvent.change(passwordInput, { target: { value: "123456aqzs!" } });
  fireEvent.change(ConfirmPasswordInput, { target: { value: "123456aqzs!" } });

  const submitButton = screen.getByTestId("btn-Valider");

  await act(async () => {
    fireEvent.click(submitButton);
  });

  await act(async () => {
    // doit être suppérieur à 3000
    // eslint-disable-next-line no-undef
    jest.advanceTimersByTime(4000);
  });

  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(toastErrorMock).toHaveBeenCalledWith(
      "Vos nouveaux mots de passe ne répondent aux critères",
      {
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
        hideProgressBar: false,
        pauseOnHover: true,
        position: "bottom-right",
        progress: undefined,
        theme: "light",
      }
    );
  });

  // la fonction toast.error a été appelée
  // eslint-disable-next-line no-undef
  expect(toastErrorMock).toHaveBeenCalled();

  // Remise en place la fonction mockée après le test
  toastErrorMock.mockRestore();
});
// eslint-disable-next-line no-undef
it("message d'erreur pour ancien password non correcte", async () => {
  const user = [
    {
      nom: "LEMOINE",
      prenom: "Gaetan",
      users_log_id: 2,
      Role: {
        nom: "Adhèrent",
      },
      Users_log: {
        login: "glemoine@hotmail.fr",
        nb_connexion: 2,
      },
    },
  ];
  // Mockez la fonction toast.error de toastify
  // eslint-disable-next-line no-undef
  const toastErrorMock = jest.spyOn(toast, "error");
  toastErrorMock.mockImplementation(() => {});

  await act(async () => {
    render(
      <MockUserProvider value={user}>
        <BrowserRouter initialEntries={["/"]} initialIndex={0}>
          <UpdatePassword />
        </BrowserRouter>
      </MockUserProvider>
    );
  });
  const oldPassword = screen.getByTestId("inputOldPassword");
  const passwordInput = screen.getByTestId("inputPassword");
  const ConfirmPasswordInput = screen.getByTestId("inputConfirmPassword");

  fireEvent.change(oldPassword, {
    target: { value: "123456aqzsaA!" },
  });
  fireEvent.change(passwordInput, { target: { value: "123456aqzsA!" } });
  fireEvent.change(ConfirmPasswordInput, { target: { value: "123456aqzsA!" } });

  const submitButton = screen.getByTestId("btn-Valider");
  await act(async () => {
    await server.use(loginHandlers[8]);
  });
  await act(async () => {
    fireEvent.click(submitButton);
  });

  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(toastErrorMock).toHaveBeenCalledWith(
      "Votre ancien mot de passe n'est pas valide",
      {
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
        hideProgressBar: false,
        pauseOnHover: true,
        position: "bottom-right",
        progress: undefined,
        theme: "light",
      }
    );
  });

  // la fonction toast.error a été appelée
  // eslint-disable-next-line no-undef
  expect(toastErrorMock).toHaveBeenCalled();

  // Remise en place la fonction mockée après le test
  toastErrorMock.mockRestore();
});
