// Pour executer les tests : npm run testFront
import "../../jest.config";
import React from "react";
import "@testing-library/jest-dom";
import { render, cleanup } from "@testing-library/react";
import { screen, waitFor } from "@testing-library/dom";
import { act } from "react-dom/test-utils";
import apiConnexion from "../../src/services/apiConnexion";
import TableauJournalier from "../../src/components/TableauJournalier";

const enregistrementMois = [
  {
    id: 1,
    N_cheque: null,
    N_comptes: {
      designation: "Don",
    },
    N_comptes_id: 70,
    banque: null,
    date: "2023-01-04T00:00:00.000Z",
    description: "Dons, mécénat",
    enregmt: "recette",
    facture: "assets/null",
    mode_pay: {
      nom: "Virement",
    },
    mode_pay_id: 3,
    nom: "Dupond Francis",
    somme: "100",
    validation: "non",
  },
  {
    id: 2,
    N_cheque: null,
    N_comptes: {
      designation: "Don",
    },
    N_comptes_id: 70,
    banque: null,
    date: "2023-02-04T00:00:00.000Z",
    description: "Dons, mécénat",
    enregmt: "recette",
    facture: "assets/null",
    mode_pay: {
      nom: "Virement",
    },
    mode_pay_id: 3,
    nom: "Dupond Francis",
    somme: "50",
    validation: "non",
  },
  {
    id: 3,
    N_cheque: null,
    N_comptes: {
      designation: "Don",
    },
    N_comptes_id: 70,
    banque: null,
    date: "2023-03-04T00:00:00.000Z",
    description: "Dons, mécénat",
    enregmt: "dépense",
    facture: "assets/null",
    mode_pay: {
      nom: "Virement",
    },
    mode_pay_id: 3,
    nom: "Dupond Francis",
    somme: "30",
    validation: "non",
  },
  {
    id: 4,
    N_cheque: null,
    N_comptes: {
      designation: "Don",
    },
    N_comptes_id: 70,
    banque: null,
    date: "2023-04-04T00:00:00.000Z",
    description: "Dons, mécénat",
    enregmt: "dépense",
    facture: "assets/null",
    mode_pay: {
      nom: "Virement",
    },
    mode_pay_id: 3,
    nom: "Dupond Francis",
    somme: "20",
    validation: "non",
  },
];
const soldeMensuel = [
  {
    id: 37,
    periode: "2023-01",
    solde: "100",
  },
  {
    id: 30,
    periode: "2023-02",
    solde: "200",
  },
  {
    id: 14,
    periode: "2023-03",
    solde: "300",
  },
  {
    id: 112,
    periode: "2023-04",
    solde: "460",
  },
];
// eslint-disable-next-line no-undef
jest.mock("../../src/services/apiConnexion", () => ({
  // eslint-disable-next-line no-undef, consistent-return
  get: jest.fn((url) => {
    if (url === "/distinctYear") {
      return Promise.resolve({ data: [2022, 2023] });
    }
    if (url === "/compteJournalier?date1=2023&date2=01") {
      return Promise.resolve({ data: enregistrementMois });
    }
    if (url === "/soldeMensuel") {
      return Promise.resolve({ data: soldeMensuel });
    }
  }),
}));
// eslint-disable-next-line no-undef
beforeEach(() => {
  // Réinitialise le mock avant chaque test
  apiConnexion.get.mockClear();
});
// eslint-disable-next-line no-undef
afterEach(() => {
  cleanup();
});

// Test de l'affichage des textes

// eslint-disable-next-line no-undef
it("renders table with column headers", async () => {
  await act(async () => {
    render(<TableauJournalier />);
  });
  await act(async () => {
    // Vérifie que les entêtes des colonnes existent
    // eslint-disable-next-line no-undef
    expect(screen.getByText("Jour")).toBeInTheDocument();
    // eslint-disable-next-line no-undef
    expect(screen.getByText("Détail de l'opération")).toBeInTheDocument();
    // eslint-disable-next-line no-undef
    expect(screen.getByText("Mode de paiement")).toBeInTheDocument();
    // eslint-disable-next-line no-undef
    expect(screen.getByText("Chèque (N°)")).toBeInTheDocument();
    // eslint-disable-next-line no-undef
    expect(screen.getByText("Banque")).toBeInTheDocument();
    // eslint-disable-next-line no-undef
    expect(screen.getByText("Compte")).toBeInTheDocument();
    // eslint-disable-next-line no-undef
    expect(screen.getByText("Nom-prénom")).toBeInTheDocument();
    // eslint-disable-next-line no-undef
    expect(screen.getByText("Recette")).toBeInTheDocument();
    // eslint-disable-next-line no-undef
    expect(screen.getByText("Dépense")).toBeInTheDocument();
    // eslint-disable-next-line no-undef
    expect(screen.getByText("Validé")).toBeInTheDocument();
  });
});
// eslint-disable-next-line no-undef
it("TableauJournalier", async () => {
  render(<TableauJournalier title="Total">Total</TableauJournalier>);
  const title = screen.getByText("Total");
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(title).toBeTruthy();
  });
});
// eslint-disable-next-line no-undef
it("TableauJournalier", async () => {
  render(<TableauJournalier title="Solde">Solde</TableauJournalier>);
  const title = screen.getByText("Solde");
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(title).toBeTruthy();
  });
});

// eslint-disable-next-line no-undef
it("récupère les données de année distinct lors du montage", async () => {
  await waitFor(async () => {
    render(<TableauJournalier />);
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
  await waitFor(async () => {
    // eslint-disable-next-line no-undef
    await expect(apiConnexion.get).toHaveBeenCalledWith("/distinctYear");
  });
});
// eslint-disable-next-line no-undef
it("récupère les données de enregistrement du mois lors du montage", async () => {
  await waitFor(async () => {
    render(<TableauJournalier />);
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
  await waitFor(async () => {
    // eslint-disable-next-line no-undef
    await expect(apiConnexion.get).toHaveBeenCalledWith(
      "/compteJournalier?date1=2023&date2=01"
    );
  });
});
// eslint-disable-next-line no-undef
it("récupère les données de enregistrement du mois lors du montage", async () => {
  // Vérifiez que la fonction getNcompte est appelée au montage
  await waitFor(async () => {
    render(<TableauJournalier />);
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
  await waitFor(async () => {
    // eslint-disable-next-line no-undef
    await expect(apiConnexion.get).toHaveBeenCalledWith("/soldeMensuel");
  });
});
// Fonction de test pour vérifier l'affichage des totaux
// eslint-disable-next-line no-undef
it("affiche les totaux pour les recettes et les dépenses", async () => {
  await waitFor(() => {
    render(<TableauJournalier enregistrementMois={enregistrementMois} />);
  });

  const totalRecettesElement = screen.getByTestId("Totalrecette");
  const totalDepensesElement = screen.getByTestId("Totaldépense");
  const soldeElement = screen.getByTestId("solde");

  // Calcule des totaux attendus en fonction des données de test
  const totalRecettesAttendu = enregistrementMois
    .filter((enreg) => enreg.enregmt === "recette")
    .reduce((acc, currentValue) => {
      return acc + parseFloat(currentValue.somme, 10);
    }, 0);

  const totalDepensesAttendu = enregistrementMois
    .filter((enreg) => enreg.enregmt === "dépense")
    .reduce((acc, currentValue) => {
      return acc + parseFloat(currentValue.somme, 10);
    }, 0);

  const soldeAttendu = totalRecettesAttendu - totalDepensesAttendu;

  await act(() => {
    // eslint-disable-next-line no-undef
    expect(totalRecettesElement).toHaveTextContent(
      `${totalRecettesAttendu.toFixed(2)}€`
    );
    // eslint-disable-next-line no-undef
    expect(totalDepensesElement).toHaveTextContent(
      `${totalDepensesAttendu.toFixed(2)}€`
    );
    // eslint-disable-next-line no-undef
    expect(soldeElement).toHaveTextContent(`${soldeAttendu.toFixed(2)}€`);
  });
});

// eslint-disable-next-line no-undef
it("affichage du bouton du mois de Janvier", async () => {
  await act(async () => {
    render(<TableauJournalier />);
  });

  // Sélection du bouton pour le mois de "Janvier"
  const boutonJanvier = screen.getByText("Janvier");

  await act(() => {
    // eslint-disable-next-line no-undef
    expect(boutonJanvier).toBeInTheDocument();
  });
});
// eslint-disable-next-line no-undef
it("affichage du bouton du mois de Février", async () => {
  await act(async () => {
    render(<TableauJournalier />);
  });

  // Sélection du bouton pour le mois de "Février"
  const boutonFévrier = screen.getByText("Février");

  await act(() => {
    // eslint-disable-next-line no-undef
    expect(boutonFévrier).toBeInTheDocument();
  });
});
// eslint-disable-next-line no-undef
it("affichage du bouton du mois de Mars", async () => {
  await act(async () => {
    render(<TableauJournalier />);
  });

  // Sélection du bouton pour le mois de "Mars"
  const boutonMars = screen.getByText("Mars");

  await act(() => {
    // eslint-disable-next-line no-undef
    expect(boutonMars).toBeInTheDocument();
  });
});
// eslint-disable-next-line no-undef
it("affichage du bouton du mois de Avril", async () => {
  await act(async () => {
    render(<TableauJournalier />);
  });

  // Sélection du bouton pour le mois de "Avril"
  const boutonAvril = screen.getByText("Avril");

  await act(() => {
    // eslint-disable-next-line no-undef
    expect(boutonAvril).toBeInTheDocument();
  });
});
// eslint-disable-next-line no-undef
it("affichage du bouton du mois de Mai", async () => {
  await act(async () => {
    render(<TableauJournalier />);
  });

  // Sélection du bouton pour le mois de "Mai"
  const boutonMai = screen.getByText("Mai");

  await act(() => {
    // eslint-disable-next-line no-undef
    expect(boutonMai).toBeInTheDocument();
  });
});
// eslint-disable-next-line no-undef
it("affichage du bouton du mois de Juin", async () => {
  await act(async () => {
    render(<TableauJournalier />);
  });

  // Sélection du bouton pour le mois de "Juin"
  const boutonJuin = screen.getByText("Juin");

  await act(() => {
    // eslint-disable-next-line no-undef
    expect(boutonJuin).toBeInTheDocument();
  });
});
// eslint-disable-next-line no-undef
it("affichage du bouton du mois de Juillet", async () => {
  await act(async () => {
    render(<TableauJournalier />);
  });

  // Sélection du bouton pour le mois de "Juillet"
  const boutonJuillet = screen.getByText("Juillet");

  await act(() => {
    // eslint-disable-next-line no-undef
    expect(boutonJuillet).toBeInTheDocument();
  });
});
// eslint-disable-next-line no-undef
it("affichage du bouton du mois de Aout", async () => {
  await act(async () => {
    render(<TableauJournalier />);
  });

  // Sélection du bouton pour le mois de "Aout"
  const boutonAout = screen.getByText("Aout");

  await act(() => {
    // eslint-disable-next-line no-undef
    expect(boutonAout).toBeInTheDocument();
  });
});
// eslint-disable-next-line no-undef
it("affichage du bouton du mois de Septembre", async () => {
  await act(async () => {
    render(<TableauJournalier />);
  });

  // Sélection du bouton pour le mois de "Septembre"
  const boutonSeptembre = screen.getByText("Septembre");

  await act(() => {
    // eslint-disable-next-line no-undef
    expect(boutonSeptembre).toBeInTheDocument();
  });
});
// eslint-disable-next-line no-undef
it("affichage du bouton du mois de Octobre", async () => {
  await act(async () => {
    render(<TableauJournalier />);
  });

  // Sélection du bouton pour le mois de "Octobre"
  const boutonOctobre = screen.getByText("Octobre");

  await act(() => {
    // eslint-disable-next-line no-undef
    expect(boutonOctobre).toBeInTheDocument();
  });
});
// eslint-disable-next-line no-undef
it("affichage du bouton du mois de Novembre", async () => {
  await act(async () => {
    render(<TableauJournalier />);
  });

  // Sélection du bouton pour le mois de "Novembre"
  const boutonNovembre = screen.getByText("Novembre");

  await act(() => {
    // eslint-disable-next-line no-undef
    expect(boutonNovembre).toBeInTheDocument();
  });
});
// eslint-disable-next-line no-undef
it("affichage du bouton du mois de Décembre", async () => {
  await act(async () => {
    render(<TableauJournalier />);
  });

  // Sélection du bouton pour le mois de "Décembre"
  const boutonDécembre = screen.getByText("Décembre");

  await act(() => {
    // eslint-disable-next-line no-undef
    expect(boutonDécembre).toBeInTheDocument();
  });
});
