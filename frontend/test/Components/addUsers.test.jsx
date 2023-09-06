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
import { MockUserContext } from "../mocks/UserContextMock";
import AddUsers from "../../src/components/users/addUsers";
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
// Mock pour useLocation
// eslint-disable-next-line no-undef
jest.mock("react-router-dom", () => ({
  // eslint-disable-next-line no-undef
  useLocation: jest.fn().mockReturnValue({
    pathname: "/adminUtilisateur",
    search: "",
    hash: "",
    state: { parametre: "Ajouter" },
    key: "9sio1dxz",
  }),
}));

// Mock de la fonction getRoleData
// eslint-disable-next-line no-undef
jest.mock("../../src/CRUD/getRole", () => ({
  __esModule: true,
  // eslint-disable-next-line no-undef
  default: jest.fn().mockResolvedValue([
    {
      id: 1,
      nom: "Adhèrent",
    },
    {
      id: 2,
      nom: "Membre d'équipe",
    },
    {
      id: 3,
      nom: "Membre du bureau",
    },
    {
      id: 4,
      nom: "Trésorier",
    },
    {
      id: 5,
      nom: "Administrateur",
    },
  ]),
}));
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
  const usersInitial = {
    nom: "LEMOINE",
    prenom: "Gaëtan",
    login: "glemoine@hotmail.fr",
    mot_pass: "123456aqzsA!",
    adresse: "14 route de l'ormeau",
    code_postal: 72540,
    ville: "Vallon sur Gée",
    telephone: 7161074681,
    role_id: 1,
  };

  React.useState
    // eslint-disable-next-line no-undef
    .mockReturnValueOnce([[], jest.fn()])
    // eslint-disable-next-line no-undef
    .mockReturnValueOnce([usersInitial, jest.fn()]);
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
it("addUsers", async () => {
  render(
    <AddUsers title="Ajouter un utilisateur">Ajouter un utilisateur</AddUsers>
  );

  const title = screen.getByText("Ajouter un utilisateur");
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(title).toBeTruthy();
  });
});
// eslint-disable-next-line no-undef
it("addUsers", async () => {
  render(<AddUsers title="Nom :">Nom :</AddUsers>);

  const title = screen.getByText("Nom :");
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(title).toBeTruthy();
  });
});
// eslint-disable-next-line no-undef
it("addUsers", async () => {
  render(<AddUsers title="Prénom :">Prénom :</AddUsers>);

  const title = screen.getByText("Prénom :");
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(title).toBeTruthy();
  });
});
// eslint-disable-next-line no-undef
it("addUsers", async () => {
  render(<AddUsers title="login :">login :</AddUsers>);

  const title = screen.getByText("login :");
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(title).toBeTruthy();
  });
});
// eslint-disable-next-line no-undef
it("addUsers", async () => {
  render(<AddUsers title="Mot de passe :">Mot de passe :</AddUsers>);

  const title = screen.getByText("Mot de passe :");
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(title).toBeTruthy();
  });
});
// eslint-disable-next-line no-undef
it("addUsers", async () => {
  render(<AddUsers title="Adresse :">Adresse :</AddUsers>);

  const title = screen.getByText("Adresse :");
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(title).toBeTruthy();
  });
});
// eslint-disable-next-line no-undef
it("addUsers", async () => {
  render(<AddUsers title="Code postal :">Code postal :</AddUsers>);

  const title = screen.getByText("Code postal :");
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(title).toBeTruthy();
  });
});
// eslint-disable-next-line no-undef
it("addUsers", async () => {
  render(<AddUsers title="Ville :">Ville :</AddUsers>);

  const title = screen.getByText("Ville :");
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(title).toBeTruthy();
  });
});
// eslint-disable-next-line no-undef
it("addUsers", async () => {
  render(<AddUsers title="Téléphone :">Téléphone :</AddUsers>);

  const title = screen.getByText("Téléphone :");
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(title).toBeTruthy();
  });
});
// eslint-disable-next-line no-undef
it("addUsers", async () => {
  render(<AddUsers title="Rôle :">Rôle :</AddUsers>);

  const title = screen.getByText("Rôle :");
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(title).toBeTruthy();
  });
});
// eslint-disable-next-line no-undef
it("addUsers", async () => {
  render(<AddUsers title="Sélectionnez">Sélectionnez</AddUsers>);

  const title = screen.getByText("Sélectionnez");
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(title).toBeTruthy();
  });
});
// eslint-disable-next-line no-undef
it("addUsers", async () => {
  render(<AddUsers title="Enregistrer">Enregistrer</AddUsers>);

  const title = screen.getByText("Enregistrer");
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(title).toBeTruthy();
  });
});

// teste entrée du mot de passe

// eslint-disable-next-line no-undef
it("displays a message for correct password", async () => {
  // Mocke de la fonction toast.success de toastify
  // eslint-disable-next-line no-undef
  const toastSuccessMock = jest.spyOn(toast, "success");
  toastSuccessMock.mockImplementation(() => {});
  await act(async () => {
    render(<AddUsers initialEntries={["/adminUtilisateur"]} />);
  });

  const submitButton = screen.getByTestId("btn-Enregistrer");

  await act(async () => {
    await server.use(loginHandlers[9]);
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
    expect(toastSuccessMock).toHaveBeenCalledWith(
      "L'utilisateur a bien été ajoutée.",
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
  expect(toastSuccessMock).toHaveBeenCalled();
  // Remise en place de la fonction mockée après le test
  toastSuccessMock.mockRestore();
});
// eslint-disable-next-line no-undef
it("displays an error message for incorrect data", async () => {
  const usersInitial = {
    nom: "LEMOINE",
    prenom: "Gaëtan",
    login: "glemoine@hotmail.fr",
    mot_pass: "123456aqzsA",
    adresse: "14 route de l'ormeau",
    code_postal: 72540,
    ville: "Vallon sur Gée",
    telephone: 7161074681,
    role_id: 1,
  };
  React.useState
    // eslint-disable-next-line no-undef
    .mockReturnValueOnce([[], jest.fn()])
    // eslint-disable-next-line no-undef
    .mockReturnValueOnce([usersInitial, jest.fn()]);

  // Mockez la fonction toast.error de toastify
  // eslint-disable-next-line no-undef
  const toastErrorMock = jest.spyOn(toast, "error");
  toastErrorMock.mockImplementation(() => {});
  await act(async () => {
    render(<AddUsers initialEntries={["/adminUtilisateur"]} />);
  });

  const submitButton = screen.getByTestId("btn-Enregistrer");

  await act(async () => {
    await server.use(loginHandlers[10]);
  });

  // Simule le clic sur le bouton de validation
  fireEvent.click(submitButton);

  await act(async () => {
    // doit être suppérieur à 3000
    // eslint-disable-next-line no-undef
    jest.advanceTimersByTime(4000);
  });
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(toastErrorMock).toHaveBeenCalledWith(
      "L'utilisateur n'a pas été ajoutée.",
      {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
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
it("displays an error message for incorrect password", async () => {
  const usersInitial = {
    nom: "LEMOINE",
    prenom: "Gaëtan",
    login: "glemoine@hotmail.fr",
    mot_pass: "123456aqzsA",
    adresse: "14 route de l'ormeau",
    code_postal: 72540,
    ville: "Vallon sur Gée",
    telephone: 7161074681,
    role_id: 1,
  };

  React.useState
    // eslint-disable-next-line no-undef
    .mockReturnValueOnce([[], jest.fn()])
    // eslint-disable-next-line no-undef
    .mockReturnValueOnce([usersInitial, jest.fn()]);

  // Mockez la fonction toast.error de toastify
  // eslint-disable-next-line no-undef
  const toastErrorMock = jest.spyOn(toast, "error");
  toastErrorMock.mockImplementation(() => {});
  await act(async () => {
    render(<AddUsers initialEntries={["/adminUtilisateur"]} />);
  });

  const submitButton = screen.getByTestId("btn-Enregistrer");

  // Simule le clic sur le bouton de validation
  fireEvent.click(submitButton);

  await act(async () => {
    // doit être suppérieur à 3000
    // eslint-disable-next-line no-undef
    jest.advanceTimersByTime(4000);
  });
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(toastErrorMock).toHaveBeenCalledWith(
      "L'email ou le mot de passe n'est pas valide.",
      {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
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
