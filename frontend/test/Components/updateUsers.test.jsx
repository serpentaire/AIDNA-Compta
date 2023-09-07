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
import UpdateUsers from "../../src/components/users/updateUsers";
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
    state: { parametre: "Modifier" },
    key: "4r4j8jjg",
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
// Mock de la fonction getUsersData
// eslint-disable-next-line no-undef
jest.mock("../../src/CRUD/getUsers", () => ({
  __esModule: true,
  // eslint-disable-next-line no-undef
  default: jest.fn().mockResolvedValue([
    {
      id: 1,
      nom: "Administrateur",
      prenom: "Admin",
      role_id: 5,
      telephonne: 111111111,
      users_log_id: 1,
      ville: "inconnu",
      Role: {
        nom: "Administrateur",
      },
      Users_log: {
        hashedpassword:
          "$argon2id$v=19$m=65536,t=5,p=1$t04sUVaFrjaIz2A8E4P9ug$cWeBxA0u9HILFsSoSA99SQ2VwMZtzX9K8eBh3EYiIIo",
        login: "Admin@hotmail.fr",
      },
    },
    {
      id: 2,
      nom: "LEMOINE",
      prenom: "Gaetan",
      role_id: 4,
      telephonne: 761074681,
      users_log_id: 2,
      ville: "Vallon sur gee",
      Role: {
        nom: "Trésorier",
      },
      Users_log: {
        hashedpassword:
          "$argon2id$v=19$m=65536,t=5,p=1$t04sUVaFrjaIz2A8E4P9ug$cWeBxA0u9HILFsSoSA99SQ2VwMZtzX9K8eBh3EYiIIo",
        login: "glemoine@hotmail.fr",
      },
    },
    {
      id: 3,
      nom: "LEMOINE",
      prenom: "Vincent",
      role_id: 1,
      telephonne: 555658545,
      users_log_id: 3,
      ville: "ville",
      Role: {
        nom: "Adhèrent",
      },
      Users_log: {
        hashedpassword:
          "$argon2id$v=19$m=65536,t=5,p=1$Qcp339fjZLXBH9XlqeNg0Q$WkPLIk+mSEr6rHusn71HyC7mtxrxXu9sJcZH32qFdYg",
        login: "vlemoine@hotmail.fr",
      },
    },
    {
      id: 4,
      nom: "FOURNIER",
      prenom: "Isabelle",
      role_id: 1,
      telephonne: 611553652,
      users_log_id: 7,
      ville: "Vallon sur Gée",
      Role: {
        nom: "Adhèrent",
      },
      Users_log: {
        hashedpassword:
          "$argon2id$v=19$m=65536,t=5,p=1$BwzG6SHwixdI9ov2/ZU2zQ$uiN1pOsI1nuCNC/lSiDh4722AEP5baQmEK3MxIyA80s",
        login: "ifournier@hotmail.fr",
      },
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
    id: 2,
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
it("UpdateUsers", async () => {
  render(
    <UpdateUsers title="Modifier un utilisateur">
      Modifier un utilisateur
    </UpdateUsers>
  );

  const title = screen.getByText("Modifier un utilisateur");
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(title).toBeTruthy();
  });
});
// eslint-disable-next-line no-undef
it("UpdateUsers", async () => {
  render(<UpdateUsers title="login :">login :</UpdateUsers>);

  const title = screen.getByText("login :");
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(title).toBeTruthy();
  });
});
// eslint-disable-next-line no-undef
it("UpdateUsers", async () => {
  render(<UpdateUsers title="Nom :">Nom :</UpdateUsers>);

  const title = screen.getByText("Nom :");
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(title).toBeTruthy();
  });
});
// eslint-disable-next-line no-undef
it("UpdateUsers", async () => {
  render(<UpdateUsers title="Prénom :">Prénom :</UpdateUsers>);

  const title = screen.getByText("Prénom :");
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(title).toBeTruthy();
  });
});
// eslint-disable-next-line no-undef
it("UpdateUsers", async () => {
  render(<UpdateUsers title="Adresse :">Adresse :</UpdateUsers>);

  const title = screen.getByText("Adresse :");
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(title).toBeTruthy();
  });
});
// eslint-disable-next-line no-undef
it("UpdateUsers", async () => {
  render(<UpdateUsers title="Code postal :">Code postal :</UpdateUsers>);

  const title = screen.getByText("Code postal :");
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(title).toBeTruthy();
  });
});
// eslint-disable-next-line no-undef
it("UpdateUsers", async () => {
  render(<UpdateUsers title="Ville :">Ville :</UpdateUsers>);

  const title = screen.getByText("Ville :");
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(title).toBeTruthy();
  });
});
// eslint-disable-next-line no-undef
it("UpdateUsers", async () => {
  render(<UpdateUsers title="Téléphone :">Téléphone :</UpdateUsers>);

  const title = screen.getByText("Téléphone :");
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(title).toBeTruthy();
  });
});
// eslint-disable-next-line no-undef
it("UpdateUsers", async () => {
  render(<UpdateUsers title="Rôle :">Rôle :</UpdateUsers>);

  const title = screen.getByText("Rôle :");
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(title).toBeTruthy();
  });
});
// eslint-disable-next-line no-undef
it("UpdateUsers", async () => {
  render(<UpdateUsers title="Sélectionnez">Sélectionnez</UpdateUsers>);

  const title = screen.getByTestId("selectRole");
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(title).toBeTruthy();
  });
});
// eslint-disable-next-line no-undef
it("UpdateUsers", async () => {
  render(<UpdateUsers title="Sélectionnez">Sélectionnez</UpdateUsers>);

  const title = screen.getByTestId("selectUser");
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(title).toBeTruthy();
  });
});

// Test du succes ou non de la modification
// eslint-disable-next-line no-undef
it("update a user when the button is clicked", async () => {
  // Mocke de la fonction toast.success de toastify
  // eslint-disable-next-line no-undef
  const toastSuccessMock = jest.spyOn(toast, "success");
  toastSuccessMock.mockImplementation(() => {});
  await act(async () => {
    render(<UpdateUsers initialEntries={["/adminUtilisateur"]} />);
  });

  const submitButton = screen.getByTestId(`btn-modifier`);

  await act(async () => {
    await server.use(loginHandlers[13]);
  });

  // Simule le clic sur le bouton de validation
  await act(async () => {
    fireEvent.click(submitButton);
  });
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(toastSuccessMock).toHaveBeenCalledWith(
      "L'utilisateur a bien été modifié.",
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
it(" error deletes a user when the delete button is clicked", async () => {
  // Mockez la fonction toast.error de toastify
  // eslint-disable-next-line no-undef
  const toastErrorMock = jest.spyOn(toast, "error");
  toastErrorMock.mockImplementation(() => {});
  await act(async () => {
    render(<UpdateUsers initialEntries={["/adminUtilisateur"]} />);
  });

  const submitButton = screen.getByTestId(`btn-modifier`);

  await act(async () => {
    await server.use(loginHandlers[14]);
  });

  // Simule le clic sur le bouton de validation
  await act(async () => {
    fireEvent.click(submitButton);
  });
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(toastErrorMock).toHaveBeenCalledWith(
      "L'utilisateur n'a pas été modifié.",
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
