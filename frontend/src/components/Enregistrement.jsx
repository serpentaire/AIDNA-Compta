import React from "react";
import { useLocation } from "react-router-dom";

function Enregistrement() {
  const location = useLocation();
  const enregistrementType = location.state?.parametre;
  return (
    <div className="enregistrement">
      <h1 className="grow text-center font-semibold text-green md:text-2xl">
        Enregistrer une {enregistrementType}
      </h1>
      <div className=" pt-4 text-center md:text-start md:pl-20">
        <h2 className="grow text-center md:text-start font-semibold text-green">
          Date de l'opération*
        </h2>
        <input
          required
          className="border border-orange rounded-full p-2 pl-5 bg-white text-orange w-3/4 md:w-40"
          type="date"
        />
      </div>
      <div className=" pt-4 text-center md:text-start md:pl-20">
        <h2 className="grow text-center md:text-start font-semibold text-green">
          Détail de l'opération*
        </h2>
        <input
          required
          className="border border-orange rounded-full p-2 pl-5 bg-white text-orange w-3/4 md:w-3/4"
          type="text"
        />
      </div>
      <div className="md:flex">
        <div className=" pt-4 text-center md:text-start md:pl-20">
          <h2 className="grow text-center md:text-start font-semibold text-green">
            Mode de paiement*
          </h2>
          <select className="border border-orange rounded-full p-2 pl-5 text-orange w-3/4 md:w-40">
            <option>---</option>
            <option>Espèce</option>
            <option>Chèque</option>
            <option>Virement</option>
            <option>TIP</option>
          </select>
        </div>
        <div className=" pt-4 text-center md:text-start md:pl-20">
          <h2 className="grow text-center font-semibold text-green">
            Numéro de chèque
          </h2>
          <input
            className="border border-orange rounded-full p-2 pl-5 bg-white text-orange w-3/4 md:w-full"
            type="text"
          />
        </div>
        <div className=" pt-4 text-center md:text-start md:pl-20">
          <h2 className="grow text-center font-semibold text-green md:text-2xl>Détail de l'opération">
            Banque
          </h2>
          <select className="border border-orange rounded-full p-2 pl-5 bg-white text-orange w-3/4 md:w-full">
            <option>---</option>
            <option>Crédit Agricole</option>
            <option>Crédit Mutuelle</option>
            <option>Caisse d'épargne</option>
            <option>La Poste</option>
          </select>
        </div>
      </div>
      <div className=" pt-4 text-center md:text-start md:pl-20">
        <h2 className="grow text-center md:text-start font-semibold text-green">
          Numéro de compte
        </h2>
        <select className="border border-orange rounded-full p-2 pl-5 bg-white text-orange w-3/4 md:w-1/2">
          <option>---</option>
          <option>746</option>
          <option>732</option>
          <option>789</option>
          <option>756</option>
        </select>
      </div>
      <div className=" pt-4 text-center md:text-start md:pl-20">
        <h2 className="grow text-center md:text-start font-semibold text-green">
          Nom, Prénom*
        </h2>
        <input
          required
          className="border border-orange rounded-full p-2 pl-5 bg-white text-orange w-3/4 md:w-72"
          type="text"
        />
      </div>
      <div className=" pt-4 text-center md:text-start md:pl-20">
        <h2 className="grow text-center md:text-start font-semibold text-green md:text-2xl>Détail de l'opération">
          Somme en €*
        </h2>
        <input
          required
          className="border border-orange rounded-full p-2 pl-5 bg-white text-orange w-3/4 md:w-40"
          type="text"
        />
      </div>
      {enregistrementType === "dépense" && (
        <form
          encType="multipart/form-data"
          className=" pt-4 text-center md:text-start md:pl-20"
        >
          <button
            className="focus:bg-white focus:text-orange border border-orange rounded-full p-2 pl-5 bg-orange text-white w-1/2 md:w-52"
            type="button"
            // onClick={handleClick1}
          >
            Télécharger la facture
          </button>
          <input
            className="hidden"
            type="file"
            // ref={inputRef1}
            name="facture"
            style={{ display: "none" }}
            accept=".pdf"
            // value={depense.facture}
          />
        </form>
      )}
      <div className="flex flex-row justify-around items-center my-3 md:justify-end md:pr-20">
        <button
          className="focus:bg-white focus:text-orange border border-orange rounded-3xl p-2 bg-orange text-white font-bold w-1/2 md:w-40"
          type="button"
        >
          Enregistrer
        </button>
      </div>
    </div>
  );
}

export default Enregistrement;
