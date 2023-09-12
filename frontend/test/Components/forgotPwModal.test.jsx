// Pour executer les tests : npm run testFront
import "../../jest.config";
import React from "react";
import "@testing-library/jest-dom";
import { toast } from "react-toastify";
// eslint-disable-next-line import/no-extraneous-dependencies
import { setupServer } from "msw/node";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { screen, waitFor } from "@testing-library/dom";
import { act } from "react-dom/test-utils";
import ForgotPw from "../../src/components/forgotPwModal";
import { loginHandlers } from "../mocks/handlersLogin";

const server = setupServer(...loginHandlers);

// Test de l'affichage des textes
// eslint-disable-next-line no-undef
jest.mock("react", () => {
  // eslint-disable-next-line no-undef
  const originalReact = jest.requireActual("react");
  return {
    ...originalReact,
    // eslint-disable-next-line no-undef
    useState: jest.fn(),
  };
});
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
beforeAll(() => server.listen());

// eslint-disable-next-line no-undef
beforeEach(() => {
  server.resetHandlers();

  React.useState
    // eslint-disable-next-line no-undef
    .mockReturnValueOnce([[], jest.fn()]);
  // eslint-disable-next-line no-undef
  jest.useFakeTimers();
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
it("ForgotPw", async () => {
  render(
    <ForgotPw
      visible="True"
      onclose="False"
      title="Demander un nouveau mot de passe"
    >
      Demander un nouveau mot de passe
    </ForgotPw>
  );

  const title = screen.getByText("Demander un nouveau mot de passe");
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(title).toBeTruthy();
  });
});
// eslint-disable-next-line no-undef
it("ForgotPw", async () => {
  render(
    <ForgotPw visible="True" onclose="False" title="Envoyer la demande">
      Envoyer la demande
    </ForgotPw>
  );

  const title = screen.getByText("Envoyer la demande");
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(title).toBeTruthy();
  });
});

// test demande envoyé
// Créez un mock (fausse fonction) pour la fonction `onclose`
// eslint-disable-next-line no-undef
const mockCloseFunction = jest.fn();

// eslint-disable-next-line no-undef
it("displays a message for correct send ask", async () => {
  // Mocke de la fonction toast.success de toastify
  // eslint-disable-next-line no-undef
  const toastSuccessMock = jest.spyOn(toast, "success");
  toastSuccessMock.mockImplementation(() => {});
  await act(async () => {
    render(<ForgotPw visible onclose={mockCloseFunction} />);
  });

  const submitButton = screen.getByTestId("btn-envoie-demande");

  await act(async () => {
    await server.use(loginHandlers[24]);
  });

  // Simule le clic sur le bouton de validation
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
    expect(toastSuccessMock).toHaveBeenCalledWith("Demande envoyée", {
      autoClose: 5000,
      closeOnClick: true,
      draggable: true,
      hideProgressBar: false,
      pauseOnHover: true,
      position: "bottom-right",
      progress: undefined,
      theme: "light",
    });
  });
  // la fonction toast.success a été appelée
  // eslint-disable-next-line no-undef
  expect(toastSuccessMock).toHaveBeenCalled();
  // Remise en place de la fonction mockée après le test
  toastSuccessMock.mockRestore();
});
// eslint-disable-next-line no-undef
it("displays a message for not correct send ask", async () => {
  // Mocke de la fonction toast.success de toastify
  // eslint-disable-next-line no-undef
  const toastErrorMock = jest.spyOn(toast, "error");
  toastErrorMock.mockImplementation(() => {});
  await act(async () => {
    render(<ForgotPw visible onclose={mockCloseFunction} />);
  });

  const submitButton = screen.getByTestId("btn-envoie-demande");

  await act(async () => {
    await server.use(loginHandlers[25]);
  });

  // Simule le clic sur le bouton de validation
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
      "Vous n'avez pas de compte à cette adresse",
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
  // la fonction toast.success a été appelée
  // eslint-disable-next-line no-undef
  expect(toastErrorMock).toHaveBeenCalled();
  // Remise en place de la fonction mockée après le test
  toastErrorMock.mockRestore();
});
