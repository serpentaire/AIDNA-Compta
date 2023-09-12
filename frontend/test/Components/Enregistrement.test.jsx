// Pour executer les tests : npm run testFront
import "../../jest.config";
import React from "react";
import "@testing-library/jest-dom";
import { toast } from "react-toastify";
// eslint-disable-next-line import/no-extraneous-dependencies
import { setupServer } from "msw/node";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { screen, waitFor } from "@testing-library/dom";
import { act } from "react-dom/test-utils";
import { useLocation } from "react-router-dom";
import { MockUserContext } from "../mocks/UserContextMock";
import Enregistrement from "../../src/components/Enregistrement";
import { loginHandlers } from "../mocks/handlersLogin";

const server = setupServer(...loginHandlers);

// Mock pour useLocation
// eslint-disable-next-line no-undef
jest.mock("react-router-dom", () => ({
  // eslint-disable-next-line no-undef
  useLocation: jest.fn().mockReturnValue({
    pathname: "/homeTresorier",
    search: "",
    hash: "",
    state: { parametre: "recette" },
    key: "v67zr561",
  }),
}));

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
// Mock de la fonction getNcompteData
// eslint-disable-next-line no-undef
jest.mock("../../src/CRUD/getNcompte", () => ({
  __esModule: true,
  // eslint-disable-next-line no-undef
  default: jest.fn().mockResolvedValue([
    {
      id: 1,
      numero: 37,
      designation: "Stocks de marchandises",
      actif: "oui",
    },
    {
      id: 2,
      numero: 53,
      designation: "Caisse",
      actif: "oui",
    },
    {
      id: 3,
      numero: 102,
      designation: "Fonds associatifs",
      actif: "oui",
    },
    {
      id: 4,
      numero: 120,
      designation: "Résultat de l'exercice (excédent)",
      actif: "oui",
    },
    {
      id: 5,
      numero: 756,
      designation: "Cotisation",
      actif: "oui",
    },
  ]),
}));

// eslint-disable-next-line no-undef
beforeAll(async () => {
  server.listen();
});
// eslint-disable-next-line no-undef
beforeEach(async () => {
  // eslint-disable-next-line no-undef
  const enregistrementInitial = {
    N_cheque: 2687854,
    N_compte_id: 1,
    banque_id: 2,
    date: "2023-01-02",
    description: "Vente de bijoux",
    enregmt: "recette",
    facture: "assets/null",
    mode_pay_id: 2,
    nom: "John DOE",
    somme: "125",
    validation: "non",
  };
  React.useState
    // eslint-disable-next-line no-undef
    .mockReturnValueOnce([[], jest.fn()])
    // eslint-disable-next-line no-undef
    .mockReturnValueOnce([[], jest.fn()])
    // eslint-disable-next-line no-undef
    .mockReturnValueOnce([[], jest.fn()])
    // eslint-disable-next-line no-undef
    .mockReturnValueOnce([enregistrementInitial, jest.fn()]);
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
afterAll(() => {
  server.close();
});

// eslint-disable-next-line no-undef
jest.mock("../../src/pages/Layout/PrivateTresorier", () => ({
  // eslint-disable-next-line no-undef
  ...jest.requireActual("../../src/pages/Layout/PrivateTresorier"),
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
jest.mock("../../src/context/user", () => ({
  // Mock du context
  // eslint-disable-next-line no-undef
  ...jest.requireActual("../../src/context/user"),
  UserContext: MockUserContext,
}));

// eslint-disable-next-line no-undef
it("Enregistrement : Enregistrer une recette", async () => {
  render(
    <Enregistrement
      idUpdate=""
      setIdUpdate={() => {}}
      title="Enregistrer une recette"
    >
      Enregistrer une recette
    </Enregistrement>
  );

  const title = screen.getByText("Enregistrer une recette");
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(title).toBeTruthy();
  });
});

// eslint-disable-next-line no-undef
it("Enregistrement : Modifier une recette", async () => {
  render(
    <Enregistrement
      idUpdate="1"
      setIdUpdate={() => {}}
      title="Modifier une recette"
    >
      Modifier une recette
    </Enregistrement>
  );

  const title = screen.getByText("Modifier une recette");
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(title).toBeTruthy();
  });
});

// eslint-disable-next-line no-undef
it("Enregistrement : Date de l'opération*", async () => {
  render(
    <Enregistrement
      idUpdate="1"
      setIdUpdate={() => {}}
      title="Date de l'opération*"
    >
      Date de l'opération*
    </Enregistrement>
  );

  const title = screen.getByText("Date de l'opération*");
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(title).toBeTruthy();
  });
});
// eslint-disable-next-line no-undef
it("Enregistrement : Mode de paiement*", async () => {
  render(
    <Enregistrement
      idUpdate="1"
      setIdUpdate={() => {}}
      title="Mode de paiement*"
    >
      Mode de paiement*
    </Enregistrement>
  );

  const title = screen.getByText("Mode de paiement*");
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(title).toBeTruthy();
  });
});
// eslint-disable-next-line no-undef
it("Enregistrement : Numéro de compte", async () => {
  render(
    <Enregistrement
      idUpdate="1"
      setIdUpdate={() => {}}
      title="Numéro de compte"
    >
      Numéro de compte
    </Enregistrement>
  );

  const title = screen.getByText("Numéro de compte");
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(title).toBeTruthy();
  });
});
// eslint-disable-next-line no-undef
it("Enregistrement : Nom, Prénom*", async () => {
  render(
    <Enregistrement idUpdate="1" setIdUpdate={() => {}} title="Nom, Prénom*">
      Nom, Prénom*
    </Enregistrement>
  );

  const title = screen.getByText("Nom, Prénom*");
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(title).toBeTruthy();
  });
});
// eslint-disable-next-line no-undef
it("Enregistrement : Somme en €*", async () => {
  render(
    <Enregistrement idUpdate="1" setIdUpdate={() => {}} title="Somme en €*">
      Somme en €*
    </Enregistrement>
  );

  const title = screen.getByText("Somme en €*");
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(title).toBeTruthy();
  });
});
// eslint-disable-next-line no-undef
it("Enregistrement : Modifier", async () => {
  render(
    <Enregistrement idUpdate="1" setIdUpdate={() => {}} title="Modifier">
      Modifier
    </Enregistrement>
  );

  const title = screen.getByText("Modifier");
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(title).toBeTruthy();
  });
});
// eslint-disable-next-line no-undef
it("Enregistrement : Supprimer", async () => {
  render(
    <Enregistrement idUpdate="1" setIdUpdate={() => {}} title="Supprimer">
      Supprimer
    </Enregistrement>
  );

  const title = screen.getByText("Supprimer");
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(title).toBeTruthy();
  });
});
// eslint-disable-next-line no-undef
it("Enregistrement : Télécharger la facture", async () => {
  await act(() => {
    useLocation.mockReturnValue({
      pathname: "/homeTresorier",
      search: "",
      hash: "",
      state: { parametre: "dépense" },
      key: "v67zr561",
    });
  });
  render(
    <Enregistrement
      idUpdate="1"
      setIdUpdate={() => {}}
      title="Télécharger la facture"
    >
      Télécharger la facture
    </Enregistrement>
  );

  const title = screen.getByText("Télécharger la facture");
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(title).toBeTruthy();
  });
});

// test sur enregistrement

// eslint-disable-next-line no-undef
it("displays a message for correct update enregistrement", async () => {
  // Mocke de la fonction toast.success de toastify
  // eslint-disable-next-line no-undef
  const toastSuccessMock = jest.spyOn(toast, "success");
  toastSuccessMock.mockImplementation(() => {});

  render(
    <Enregistrement
      initialEntries={["/homeTresorier"]}
      idUpdate="1"
      setIdUpdate={() => {}}
    />
  );

  const submitButton = screen.getByTestId("btn-modifier");
  await act(async () => {
    await server.use(loginHandlers[15]);
  });
  await act(async () => {
    await server.use(loginHandlers[16]);
  });
  await act(async () => {
    await server.use(loginHandlers[17]);
  });

  await act(async () => {
    await server.use(loginHandlers[18]);
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
      "Votre écriture a bien été modifiée.",
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
it("displays a message for not correct update enregistrement", async () => {
  // Mocke de la fonction toast.success de toastify
  // eslint-disable-next-line no-undef
  const toastErrorMock = jest.spyOn(toast, "error");
  toastErrorMock.mockImplementation(() => {});

  render(
    <Enregistrement
      initialEntries={["/homeTresorier"]}
      idUpdate="1"
      setIdUpdate={() => {}}
    />
  );

  const submitButton = screen.getByTestId("btn-modifier");
  await act(async () => {
    await server.use(loginHandlers[15]);
  });
  await act(async () => {
    await server.use(loginHandlers[16]);
  });
  await act(async () => {
    await server.use(loginHandlers[17]);
  });

  await act(async () => {
    await server.use(loginHandlers[19]);
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
      "Votre écriture n'a pas été modifiée.",
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
// eslint-disable-next-line no-undef
it("displays a message for correct add enregistrement", async () => {
  // Mocke de la fonction toast.success de toastify
  // eslint-disable-next-line no-undef
  const toastSuccessMock = jest.spyOn(toast, "success");
  toastSuccessMock.mockImplementation(() => {});

  render(
    <Enregistrement
      initialEntries={["/homeTresorier"]}
      idUpdate=""
      setIdUpdate={() => {}}
    />
  );

  const submitButton = screen.getByTestId("btn-ajouter");
  await act(async () => {
    await server.use(loginHandlers[15]);
  });
  await act(async () => {
    await server.use(loginHandlers[16]);
  });
  await act(async () => {
    await server.use(loginHandlers[17]);
  });

  await act(async () => {
    await server.use(loginHandlers[20]);
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
      "Votre écriture a bien été ajoutée.",
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
it("displays a message for not correct add enregistrement", async () => {
  // Mocke de la fonction toast.success de toastify
  // eslint-disable-next-line no-undef
  const toastErrorMock = jest.spyOn(toast, "error");
  toastErrorMock.mockImplementation(() => {});

  render(
    <Enregistrement
      initialEntries={["/homeTresorier"]}
      idUpdate=""
      setIdUpdate={() => {}}
    />
  );

  const submitButton = screen.getByTestId("btn-ajouter");
  await act(async () => {
    await server.use(loginHandlers[15]);
  });
  await act(async () => {
    await server.use(loginHandlers[16]);
  });
  await act(async () => {
    await server.use(loginHandlers[17]);
  });

  await act(async () => {
    await server.use(loginHandlers[21]);
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
      "Votre écriture n'a pas été ajoutée.",
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
// eslint-disable-next-line no-undef
it("displays a message for correct delete enregistrement", async () => {
  // Mocke de la fonction toast.success de toastify
  // eslint-disable-next-line no-undef
  const toastSuccessMock = jest.spyOn(toast, "success");
  toastSuccessMock.mockImplementation(() => {});

  render(
    <Enregistrement
      initialEntries={["/homeTresorier"]}
      idUpdate="1"
      setIdUpdate={() => {}}
    />
  );

  const submitButton = screen.getByTestId("btn-supprimer");
  await act(async () => {
    await server.use(loginHandlers[15]);
  });
  await act(async () => {
    await server.use(loginHandlers[16]);
  });
  await act(async () => {
    await server.use(loginHandlers[17]);
  });

  await act(async () => {
    await server.use(loginHandlers[22]);
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
      "Votre écriture a bien été supprimée.",
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
it("displays a message for not correct delete enregistrement", async () => {
  // Mocke de la fonction toast.success de toastify
  // eslint-disable-next-line no-undef
  const toastErrorMock = jest.spyOn(toast, "error");
  toastErrorMock.mockImplementation(() => {});

  render(
    <Enregistrement
      initialEntries={["/homeTresorier"]}
      idUpdate="1"
      setIdUpdate={() => {}}
    />
  );

  const submitButton = screen.getByTestId("btn-supprimer");
  await act(async () => {
    await server.use(loginHandlers[15]);
  });
  await act(async () => {
    await server.use(loginHandlers[16]);
  });
  await act(async () => {
    await server.use(loginHandlers[17]);
  });

  await act(async () => {
    await server.use(loginHandlers[23]);
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
      "Votre écriture n'a pas été supprimée.",
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
