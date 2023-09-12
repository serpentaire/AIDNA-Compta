// Pour executer les tests : npm run testFront
import "../../jest.config";
import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import { screen, waitFor } from "@testing-library/dom";
import { act } from "react-dom/test-utils";
import apiConnexion from "../../src/services/apiConnexion";
import TableauCompte from "../../src/components/TableauCompte";
// Test de l'affichage des textes
const nCompte = [
  {
    id: 1,
    numero: 602,
    designation: "Fonds associatifs",
    actif: "oui",
  },
  {
    id: 2,
    numero: 620,
    designation: "Résultat de l'exercice (excédent)",
    actif: "non",
  },
];
// eslint-disable-next-line no-undef
jest.mock("../../src/services/apiConnexion", () => ({
  // eslint-disable-next-line no-undef
  put: jest.fn().mockResolvedValue({}), // Mock résolu avec une valeur vide ({})
}));
// eslint-disable-next-line no-undef
it("TableauCompte", async () => {
  render(
    <TableauCompte nCompte={nCompte} nb="6" title="Classe 6">
      Classe 6
    </TableauCompte>
  );

  const title = screen.getByText("Classe 6");
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(title).toBeTruthy();
  });
});
// eslint-disable-next-line no-undef
it("renders table with column headers", async () => {
  await act(async () => {
    render(<TableauCompte nCompte={nCompte} nb="6" />);
  });
  await act(async () => {
    // Vérifie que les entêtes des colonnes existent
    // eslint-disable-next-line no-undef
    expect(screen.getByText("Numéro de compte")).toBeInTheDocument();
    // eslint-disable-next-line no-undef
    expect(screen.getByText("Intitulé du compte")).toBeInTheDocument();
    // eslint-disable-next-line no-undef
    expect(screen.getByText("Actif")).toBeInTheDocument();
  });
});
// eslint-disable-next-line no-undef
it("renders swich activate", async () => {
  // eslint-disable-next-line no-undef
  const updateChildMock = jest.fn();
  const { getByText } = render(
    <TableauCompte nCompte={nCompte} updateChild={updateChildMock} nb={6} />
  );
  fireEvent.click(getByText("oui"));
  await waitFor(() => {
    // eslint-disable-next-line no-undef
    expect(apiConnexion.put).toHaveBeenCalledWith("/compteActive/1", {
      actif: "non",
    });
    // eslint-disable-next-line no-undef
    expect(updateChildMock).toHaveBeenCalled();
  });
});
