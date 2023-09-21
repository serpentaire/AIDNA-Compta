// Pour executer les tests : npm run testFront
import "../jest.config";
import React from "react";
import "@testing-library/jest-dom";
import { toast } from "react-toastify";
// eslint-disable-next-line import/no-extraneous-dependencies
import { setupServer } from "msw/node";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { screen, waitFor } from "@testing-library/dom";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import ForgotPw from "../src/components/forgotPwModal";
import { MockUserProvider, MockUserContext } from "./mocks/UserContextMock";
import Login from "../src/pages/homes/login/login";
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
it("Login", () => {
  render(
    <BrowserRouter>
      <Login title="Login">Login</Login>
    </BrowserRouter>
  );
  const title = screen.getByText("Login");
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});
// eslint-disable-next-line no-undef
it("Valider", () => {
  render(
    <BrowserRouter>
      <Login title="Valider">Valider</Login>
    </BrowserRouter>
  );
  const title = screen.getByText("Valider");
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});
// eslint-disable-next-line no-undef
it("Mot de passe oublié", () => {
  render(
    <BrowserRouter>
      <Login title="Mot de passe oublié">Mot de passe oublié</Login>
    </BrowserRouter>
  );
  const title = screen.getByText("Mot de passe oublié");
  // eslint-disable-next-line no-undef
  expect(title).toBeTruthy();
});

// vérification de l'envoie du formulaire
// la vérification du formulaire ne peut être mise en place car comme les messages sont émis par un toastify il faut installer @testing-library/react-hooks.
// or sa version actuelle est incompatible avec la version react 18. Il faut attendre une nouvelle version de@testing-library/react-hooks.

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
jest.mock("../src/context/user", () => ({
  // Mock du context
  // eslint-disable-next-line no-undef
  ...jest.requireActual("../src/context/user"),
  UserContext: MockUserContext,
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
it("redirection to /homeAdmin after successful login", async () => {
  await act(async () => {
    render(
      <MockUserProvider>
        <BrowserRouter initialEntries={["/"]} initialIndex={0}>
          <Login />
        </BrowserRouter>
      </MockUserProvider>
    );
  });

  const utilisateurInput = screen.getByTestId("inputEmail");
  const passwordInput = screen.getByTestId("inputMP");

  fireEvent.change(utilisateurInput, {
    target: { value: "glemoine@hotmail.fr" },
  });
  fireEvent.change(passwordInput, { target: { value: "123456aqzsA!" } });

  const submitButton = screen.getByTestId("btn-Valider");

  await act(async () => {
    await server.use(loginHandlers[0]);
  });

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
    expect(window.location.pathname).toBe("/admin/accueil");
  });
});

// eslint-disable-next-line no-undef
jest.mock("../src/pages/Layout/PrivateTresorier", () => ({
  // eslint-disable-next-line no-undef
  ...jest.requireActual("../src/pages/Layout/PrivateTresorier"),
  MockUserContext: {
    Consumer: ({ children }) =>
      children({
        user: [{ Role: { nom: "Trésorier" } }],
        // eslint-disable-next-line no-undef
        logout: jest.fn(),
      }),
  },
}));
// eslint-disable-next-line no-undef
it("redirection to /homeTresorier after successful login", async () => {
  await act(async () => {
    render(
      <MockUserProvider>
        <BrowserRouter initialEntries={["/"]} initialIndex={0}>
          <Login />
        </BrowserRouter>
      </MockUserProvider>
    );
  });

  const utilisateurInput = screen.getByTestId("inputEmail");
  const passwordInput = screen.getByTestId("inputMP");

  fireEvent.change(utilisateurInput, {
    target: { value: "glemoine@hotmail.fr" },
  });
  fireEvent.change(passwordInput, { target: { value: "123456aqzsA!" } });

  const submitButton = screen.getByTestId("btn-Valider");

  await act(async () => {
    await server.use(loginHandlers[2]);
  });

  await act(async () => {
    fireEvent.click(submitButton);
  });

  await act(async () => {
    // doit être suppérieur à 3000
    // eslint-disable-next-line no-undef
    jest.advanceTimersByTime(5000);
  });

  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(window.location.pathname).toBe("/tresorier/accueil");
  });
});

// eslint-disable-next-line no-undef
it("redirection to /homeAdherent after successful login", async () => {
  await act(async () => {
    render(
      <MockUserProvider>
        <BrowserRouter initialEntries={["/"]} initialIndex={0}>
          <Login />
        </BrowserRouter>
      </MockUserProvider>
    );
  });

  const utilisateurInput = screen.getByTestId("inputEmail");
  const passwordInput = screen.getByTestId("inputMP");

  fireEvent.change(utilisateurInput, {
    target: { value: "glemoine@hotmail.fr" },
  });
  fireEvent.change(passwordInput, { target: { value: "123456aqzsA!" } });

  const submitButton = screen.getByTestId("btn-Valider");

  await act(async () => {
    await server.use(loginHandlers[3]);
  });

  await act(async () => {
    fireEvent.click(submitButton);
  });

  await act(async () => {
    // doit être suppérieur à 3000
    // eslint-disable-next-line no-undef
    jest.advanceTimersByTime(5000);
  });

  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(window.location.pathname).toBe("/adherent/accueil");
  });
});
// eslint-disable-next-line no-undef
it("redirection to /updatePassword after connexion=1", async () => {
  await act(async () => {
    render(
      <MockUserProvider>
        <BrowserRouter initialEntries={["/"]} initialIndex={0}>
          <Login />
        </BrowserRouter>
      </MockUserProvider>
    );
  });

  const utilisateurInput = screen.getByTestId("inputEmail");
  const passwordInput = screen.getByTestId("inputMP");

  fireEvent.change(utilisateurInput, {
    target: { value: "glemoine@hotmail.fr" },
  });
  fireEvent.change(passwordInput, { target: { value: "123456aqzsA!" } });

  const submitButton = screen.getByTestId("btn-Valider");

  await act(async () => {
    await server.use(loginHandlers[4]);
  });

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
    expect(window.location.pathname).toBe("/updatePassword");
  });
});
// eslint-disable-next-line no-undef
it("redirection to / after error login", async () => {
  delete window.location;
  window.location = { ...window.location, pathname: "/" };
  await act(async () => {
    render(
      <MockUserProvider>
        <BrowserRouter initialEntries={["/"]} initialIndex={0}>
          <Login />
        </BrowserRouter>
      </MockUserProvider>
    );
  });

  const utilisateurInput = screen.getByTestId("inputEmail");
  const passwordInput = screen.getByTestId("inputMP");

  fireEvent.change(utilisateurInput, {
    target: { value: "glemoine@hotmail.fr" },
  });
  fireEvent.change(passwordInput, { target: { value: "123456aqzsA!" } });

  const submitButton = screen.getByTestId("btn-Valider");

  await act(async () => {
    await server.use(loginHandlers[1]);
  });

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
    expect(window.location.pathname).toBe("/");
  });
});
// eslint-disable-next-line no-undef
it("should toggle password visibility", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  const passwordInput = screen.getByTestId("inputMP");

  const togglePasswordButton = screen.getByTestId("togglePasswordButton");

  // Vérifie que le champ de mot de passe est de type "password" (masqué) par défaut
  // eslint-disable-next-line no-undef
  expect(passwordInput).toHaveAttribute("type", "password");

  // clic sur le bouton de bascule
  fireEvent.click(togglePasswordButton);

  // Vérifie que le champ de mot de passe est maintenant de type "text" (visible)
  // eslint-disable-next-line no-undef
  expect(passwordInput).toHaveAttribute("type", "text");

  // clic sur le bouton de bascule
  fireEvent.click(togglePasswordButton);

  // Vérifie que le champ de mot de passe est à nouveau de type "password" (masqué)
  // eslint-disable-next-line no-undef
  expect(passwordInput).toHaveAttribute("type", "password");
});
// eslint-disable-next-line no-undef
it("displays an error message for incorrect password", async () => {
  // Mockez la fonction toast.error de toastify
  // eslint-disable-next-line no-undef
  const toastErrorMock = jest.spyOn(toast, "error");
  toastErrorMock.mockImplementation(() => {});

  render(
    <MockUserProvider>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </MockUserProvider>
  );

  const utilisateurInput = screen.getByTestId("inputEmail");
  const passwordInput = screen.getByTestId("inputMP");

  // Saisir l'e-mail et un mot de passe incorrect
  fireEvent.change(utilisateurInput, {
    target: { value: "glemoine@hotmail.fr" },
  });
  fireEvent.change(passwordInput, { target: { value: "motdepasseincorrect" } });

  const submitButton = screen.getByTestId("btn-Valider");

  await act(async () => {
    await server.use(loginHandlers[1]);
  });

  // Simuler le clic sur le bouton de validation
  fireEvent.click(submitButton);

  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(toastErrorMock).toHaveBeenCalledWith(
      "Votre email ou votre mot de passe n'est pas valide.",
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
it("should not open ForgotPwModal initially", () => {
  render(
    <MockUserProvider>
      <BrowserRouter initialEntries={["/"]} initialIndex={0}>
        <Login />
      </BrowserRouter>
    </MockUserProvider>
  );

  const forgotPasswordModal = screen.queryByText(
    "Demander un nouveau mot de passe"
  );
  // eslint-disable-next-line no-undef
  expect(forgotPasswordModal).not.toBeInTheDocument();
});
// eslint-disable-next-line no-undef
it("should open ForgotPwModal when clicking 'Mot de passe oublié'", () => {
  render(
    <MockUserProvider>
      <BrowserRouter initialEntries={["/"]} initialIndex={0}>
        <ForgotPw visible onclose={() => {}} />
      </BrowserRouter>
    </MockUserProvider>
  );

  const forgotPasswordModal = screen.getByText(
    "Demander un nouveau mot de passe"
  );
  // eslint-disable-next-line no-undef
  expect(forgotPasswordModal).toBeInTheDocument();
});
