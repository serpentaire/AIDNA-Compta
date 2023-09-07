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
import { loginHandlers } from "../mocks/handlersLogin";
import SupUsers from "../../src/components/users/supUsers";

const server = setupServer(...loginHandlers);

// Test de l'affichage des textes

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
// eslint-disable-next-line no-undef
beforeAll(() => server.listen());
// eslint-disable-next-line no-undef
beforeEach(() => {
  server.resetHandlers();
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
it("SupUsers", async () => {
  render(
    <SupUsers title="Supprimer un utilisateur">
      Supprimer un utilisateur
    </SupUsers>
  );

  const title = screen.getByText("Supprimer un utilisateur");
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(title).toBeTruthy();
  });
});
// eslint-disable-next-line no-undef
it("checks if 'utilisats' is an array", async () => {
  await act(async () => {
    render(<SupUsers />);
  });

  const utilisats = JSON.parse(
    screen.getByTestId("utilisats-table").getAttribute("data-utilisats")
  );

  await act(async () => {
    // Vérifie si 'utilisats' est un tableau
    // eslint-disable-next-line no-undef
    expect(Array.isArray(utilisats)).toBe(true);
  });
});
// eslint-disable-next-line no-undef
it("renders table with column headers", async () => {
  await act(async () => {
    render(<SupUsers />);
  });
  await act(async () => {
    // Vérifie que les entêtes des colonnes existent
    // eslint-disable-next-line no-undef
    expect(screen.getByText("Login")).toBeInTheDocument();
    // eslint-disable-next-line no-undef
    expect(screen.getByText("Nom")).toBeInTheDocument();
    // eslint-disable-next-line no-undef
    expect(screen.getByText("Prénom")).toBeInTheDocument();
    // eslint-disable-next-line no-undef
    expect(screen.getByText("Rôle")).toBeInTheDocument();
  });
});
// eslint-disable-next-line no-undef
it("deletes a user when the delete button is clicked", async () => {
  // Mocke de la fonction toast.success de toastify
  // eslint-disable-next-line no-undef
  const toastSuccessMock = jest.spyOn(toast, "success");
  toastSuccessMock.mockImplementation(() => {});
  await act(async () => {
    render(<SupUsers initialEntries={["/adminUtilisateur"]} />);
  });
  const userId = 1;
  const submitButton = screen.getByTestId(`btn-supUser-${userId}`);

  await act(async () => {
    await server.use(loginHandlers[11]);
  });

  // Simule le clic sur le bouton de validation
  await act(async () => {
    fireEvent.click(submitButton);
  });
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(toastSuccessMock).toHaveBeenCalledWith(
      "L'utilisateur a bien été supprimée.",
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
    render(<SupUsers initialEntries={["/adminUtilisateur"]} />);
  });
  const userId = 1;
  const submitButton = screen.getByTestId(`btn-supUser-${userId}`);

  await act(async () => {
    await server.use(loginHandlers[12]);
  });

  // Simule le clic sur le bouton de validation
  await act(async () => {
    fireEvent.click(submitButton);
  });
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(toastErrorMock).toHaveBeenCalledWith("Une erreur s'est produite", {
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
  // la fonction toast.error a été appelée
  // eslint-disable-next-line no-undef
  expect(toastErrorMock).toHaveBeenCalled();

  // Remise en place la fonction mockée après le test
  toastErrorMock.mockRestore();
});
