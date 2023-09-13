// Pour executer les tests : npm run testFront
import "../../jest.config";
import React from "react";
import "@testing-library/jest-dom";
import { render, cleanup } from "@testing-library/react";
import { screen, waitFor } from "@testing-library/dom";
import { act } from "react-dom/test-utils";
import NumCompte from "../../src/components/NumCompte";
import apiConnexion from "../../src/services/apiConnexion";

const nCompte = [
  {
    id: 1,
    numero: 102,
    designation: "Fonds associatifs",
    actif: "oui",
  },
  {
    id: 2,
    numero: 220,
    designation: "Résultat de l'exercice (excédent)",
    actif: "oui",
  },
  {
    id: 3,
    numero: 320,
    designation: "Résultat de l'exercice (excédent)",
    actif: "oui",
  },
  {
    id: 4,
    numero: 420,
    designation: "Résultat de l'exercice (excédent)",
    actif: "oui",
  },
  {
    id: 5,
    numero: 520,
    designation: "Résultat de l'exercice (excédent)",
    actif: "oui",
  },
  {
    id: 6,
    numero: 620,
    designation: "Résultat de l'exercice (excédent)",
    actif: "oui",
  },
  {
    id: 7,
    numero: 720,
    designation: "Résultat de l'exercice (excédent)",
    actif: "oui",
  },
  {
    id: 8,
    numero: 820,
    designation: "Résultat de l'exercice (excédent)",
    actif: "oui",
  },
];
// eslint-disable-next-line no-undef
jest.mock("../../src/services/apiConnexion", () => ({
  // eslint-disable-next-line no-undef
  get: jest.fn(() => Promise.resolve({ data: nCompte })),
}));

// eslint-disable-next-line no-undef
beforeEach(() => {
  // Réinitialisez le mock avant chaque test
  apiConnexion.get.mockClear();
});
// eslint-disable-next-line no-undef
afterEach(() => {
  cleanup();
});
// Test de l'affichage des textes

// eslint-disable-next-line no-undef
it("NumCompte", async () => {
  render(<NumCompte title="Liste des comptes">Liste des comptes</NumCompte>);
  const title = screen.getByText("Liste des comptes");
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(title).toBeTruthy();
  });
});

// eslint-disable-next-line no-undef
it("récupère les données de compte lors du montage", async () => {
  render(<NumCompte />);
  // Vérifiez que la fonction getNcompte est appelée au montage
  await act(async () => {
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
  // eslint-disable-next-line no-undef
  expect(apiConnexion.get).toHaveBeenCalledWith("/nComptes");
});
// eslint-disable-next-line no-undef
it("NumCompte TableauCompte 1", async () => {
  await waitFor(() => {
    render(<NumCompte nCompte={nCompte} updateChild={nCompte} nb="1" />);
  });

  // Vérifie si l'élément TableauCompte est présent dans le DOM
  await act(async () => {
    // cible l'élément TableauCompte par son data-testid
    const TableauCompteElement = screen.getByTestId("TableauCompte1");
    // eslint-disable-next-line no-undef
    expect(TableauCompteElement).toBeInTheDocument();
  });
});
// eslint-disable-next-line no-undef
it("NumCompte TableauCompte 2", async () => {
  await waitFor(() => {
    render(<NumCompte nCompte={nCompte} updateChild={nCompte} nb="2" />);
  });

  // Vérifie si l'élément TableauCompte est présent dans le DOM
  await act(async () => {
    // cible l'élément TableauCompte par son data-testid
    const TableauCompteElement = screen.getByTestId("TableauCompte2");
    // eslint-disable-next-line no-undef
    expect(TableauCompteElement).toBeInTheDocument();
  });
});
// eslint-disable-next-line no-undef
it("NumCompte TableauCompte 3", async () => {
  await waitFor(async () => {
    render(<NumCompte nCompte={nCompte} updateChild={nCompte} nb="3" />);
    // await screen.findByTestId("TableauCompte3");
  });

  // Vérifie si l'élément TableauCompte est présent dans le DOM
  await waitFor(async () => {
    // cible l'élément TableauCompte par son data-testid
    const TableauCompteElement = screen.getByTestId("TableauCompte3");
    const tableauCompteText = TableauCompteElement.textContent;

    // Vérifie si le texte "Classe 3" est inclus dans le texte de l'élément
    // eslint-disable-next-line no-undef
    expect(tableauCompteText).toContain("Classe 3");
  });
});
// eslint-disable-next-line no-undef
it("NumCompte TableauCompte 4", async () => {
  await waitFor(async () => {
    render(<NumCompte nCompte={nCompte} updateChild={nCompte} nb="4" />);
    // await screen.findByTestId("TableauCompte3");
  });

  // Vérifie si l'élément TableauCompte est présent dans le DOM
  await waitFor(async () => {
    // cible l'élément TableauCompte par son data-testid
    const TableauCompteElement = screen.getByTestId("TableauCompte4");
    const tableauCompteText = TableauCompteElement.textContent;

    // Vérifie si le texte "Classe 3" est inclus dans le texte de l'élément
    // eslint-disable-next-line no-undef
    expect(tableauCompteText).toContain("Classe 4");
  });
});
// eslint-disable-next-line no-undef
it("NumCompte TableauCompte 5", async () => {
  await waitFor(async () => {
    render(<NumCompte nCompte={nCompte} updateChild={nCompte} nb="5" />);
    // await screen.findByTestId("TableauCompte3");
  });

  // Vérifie si l'élément TableauCompte est présent dans le DOM
  await waitFor(async () => {
    // cible l'élément TableauCompte par son data-testid
    const TableauCompteElement = screen.getByTestId("TableauCompte5");
    const tableauCompteText = TableauCompteElement.textContent;

    // Vérifie si le texte "Classe 3" est inclus dans le texte de l'élément
    // eslint-disable-next-line no-undef
    expect(tableauCompteText).toContain("Classe 5");
  });
});
// eslint-disable-next-line no-undef
it("NumCompte TableauCompte 6", async () => {
  await waitFor(async () => {
    render(<NumCompte nCompte={nCompte} updateChild={nCompte} nb="6" />);
    // await screen.findByTestId("TableauCompte3");
  });

  // Vérifie si l'élément TableauCompte est présent dans le DOM
  await waitFor(async () => {
    // cible l'élément TableauCompte par son data-testid
    const TableauCompteElement = screen.getByTestId("TableauCompte6");
    const tableauCompteText = TableauCompteElement.textContent;

    // Vérifie si le texte "Classe 3" est inclus dans le texte de l'élément
    // eslint-disable-next-line no-undef
    expect(tableauCompteText).toContain("Classe 6");
  });
});
// eslint-disable-next-line no-undef
it("NumCompte TableauCompte 7", async () => {
  await waitFor(async () => {
    render(<NumCompte nCompte={nCompte} updateChild={nCompte} nb="7" />);
    // await screen.findByTestId("TableauCompte3");
  });

  // Vérifie si l'élément TableauCompte est présent dans le DOM
  await waitFor(async () => {
    // cible l'élément TableauCompte par son data-testid
    const TableauCompteElement = screen.getByTestId("TableauCompte7");
    const tableauCompteText = TableauCompteElement.textContent;

    // Vérifie si le texte "Classe 3" est inclus dans le texte de l'élément
    // eslint-disable-next-line no-undef
    expect(tableauCompteText).toContain("Classe 7");
  });
});
// eslint-disable-next-line no-undef
it("NumCompte TableauCompte 8", async () => {
  await waitFor(async () => {
    render(<NumCompte nCompte={nCompte} updateChild={nCompte} nb="8" />);
    // await screen.findByTestId("TableauCompte3");
  });

  // Vérifie si l'élément TableauCompte est présent dans le DOM
  await waitFor(async () => {
    // cible l'élément TableauCompte par son data-testid
    const TableauCompteElement = screen.getByTestId("TableauCompte8");
    const tableauCompteText = TableauCompteElement.textContent;

    // Vérifie si le texte "Classe 3" est inclus dans le texte de l'élément
    // eslint-disable-next-line no-undef
    expect(tableauCompteText).toContain("Classe 8");
  });
});
