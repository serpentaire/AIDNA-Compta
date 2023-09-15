// Pour executer les tests : npm run testFront
import "../../jest.config";
import React from "react";
import "@testing-library/jest-dom";
import { render, cleanup } from "@testing-library/react";
import { screen, waitFor } from "@testing-library/dom";
// eslint-disable-next-line import/no-extraneous-dependencies
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import apiConnexion from "../../src/services/apiConnexion";
import GraphComptes from "../../src/components/GraphComptes";

// eslint-disable-next-line no-undef
HTMLCanvasElement.prototype.getContext = jest.fn();
// eslint-disable-next-line no-undef
jest.mock("react-chartjs-2", () => ({
  Line: () => null,
}));

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
const dataGraph = [10, 0, 177, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const enregistrement = [
  {
    id: 1,
    N_cheque: null,
    N_comptes_id: 70,
    banque_id: null,
    date: "2023-01-04T00:00:00.000Z",
    description: "Dons, mécénat",
    enregmt: "recette",
    facture: "assets/null",
    mode_pay_id: 3,
    nom: "Dupond Francis",
    somme: "100",
    validation: "non",
  },
  {
    id: 2,
    N_cheque: null,
    N_comptes_id: 70,
    banque_id: null,
    date: "2023-02-04T00:00:00.000Z",
    description: "Dons, mécénat",
    enregmt: "recette",
    facture: "assets/null",
    mode_pay_id: 3,
    nom: "Dupond Francis",
    somme: "50",
    validation: "non",
  },
  {
    id: 3,
    N_cheque: null,
    N_comptes_id: 620,
    banque_id: null,
    date: "2023-03-04T00:00:00.000Z",
    description: "Dons, mécénat",
    enregmt: "recette",
    facture: "assets/null",
    mode_pay_id: 3,
    nom: "Dupond Francis",
    somme: "30",
    validation: "non",
  },
  {
    id: 4,
    N_cheque: null,
    N_comptes_id: 756,
    banque_id: null,
    date: "2023-04-04T00:00:00.000Z",
    description: "Dons, mécénat",
    enregmt: "dépense",
    facture: "assets/null",
    mode_pay_id: 3,
    nom: "Dupond Francis",
    somme: "20",
    validation: "non",
  },
];
const Ncompte = [
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
    numero: 620,
    designation: "Résultat de l'exercice (excédent)",
    actif: "oui",
  },
  {
    id: 5,
    numero: 756,
    designation: "Cotisation",
    actif: "oui",
  },
];
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
      numero: 620,
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
jest.mock("../../src/services/apiConnexion", () => ({
  // eslint-disable-next-line no-undef, consistent-return
  get: jest.fn((url) => {
    if (url === "/distinctYear") {
      return Promise.resolve({ data: [2022, 2023] });
    }
    if (url === "/enregistrement") {
      return Promise.resolve({ data: enregistrement });
    }
  }),
}));
// eslint-disable-next-line no-undef
beforeEach(() => {
  // Réinitialise le mock avant chaque test
  apiConnexion.get.mockClear();
  React.useState
    // eslint-disable-next-line no-undef
    .mockReturnValueOnce([dataGraph, jest.fn()])
    // eslint-disable-next-line no-undef
    .mockReturnValueOnce([[2022, 2023], jest.fn()])
    // eslint-disable-next-line no-undef
    .mockReturnValueOnce([5, jest.fn()])
    // eslint-disable-next-line no-undef
    .mockReturnValueOnce([new Date().getFullYear().toString(), jest.fn()])
    // eslint-disable-next-line no-undef
    .mockReturnValueOnce([enregistrement, jest.fn()])
    // eslint-disable-next-line no-undef
    .mockReturnValueOnce([Ncompte, jest.fn()]);
});
// eslint-disable-next-line no-undef
afterEach(() => {
  cleanup();
});
// eslint-disable-next-line no-undef
it("affichage de Sélectionnez le numero de comptes", async () => {
  await act(async () => {
    render(<GraphComptes />);
  });

  await act(async () => {
    // eslint-disable-next-line no-undef
    expect(
      screen.getByText("Sélectionnez le numero de comptes")
    ).toBeInTheDocument();
  });
});
// eslint-disable-next-line no-undef
it("affichage de l'année", async () => {
  await act(async () => {
    render(<GraphComptes />);
  });

  await act(async () => {
    // eslint-disable-next-line no-undef
    expect(screen.getByText("2023")).toBeInTheDocument();
  });
});
// eslint-disable-next-line no-undef
it("affichage de Dépenses après sélection", async () => {
  await act(async () => {
    render(<GraphComptes />);
  });
  const selectCompte = screen.getByTestId("selectCompte");

  await waitFor(() => {
    userEvent.selectOptions(selectCompte, "4");
  });
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(
      screen.getByText("620 - Résultat de l'exercice (excédent)")
    ).toBeInTheDocument();
  });
  await waitFor(async () => {
    const graphique = screen.queryByTestId("graphique");
    // Vérifie si le graphique est dans le DOM
    // eslint-disable-next-line no-undef
    expect(graphique).toBeInTheDocument();
  });
});
// eslint-disable-next-line no-undef
it("affichage de recette après sélection", async () => {
  await act(async () => {
    render(<GraphComptes />);
  });
  const selectCompte = screen.getByTestId("selectCompte");

  await waitFor(() => {
    userEvent.selectOptions(selectCompte, "5");
  });
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(screen.getByText("756 - Cotisation")).toBeInTheDocument();
  });

  await waitFor(async () => {
    const graphique = screen.queryByTestId("graphique");
    // Vérifie si le graphique est dans le DOM
    // eslint-disable-next-line no-undef
    expect(graphique).toBeInTheDocument();
  });

  await act(async () => {
    await waitFor(() => {
      // eslint-disable-next-line no-undef
      expect(screen.getByText("Recettes")).toBeInTheDocument();
    });
  });
});
