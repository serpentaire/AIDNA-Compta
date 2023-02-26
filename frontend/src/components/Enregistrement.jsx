import React from "react";

function Enregistrement() {
  return (
    <div className="enregistrement">
      <h1 className="grow text-center font-semibold text-green md:text-2xl">
        Enregistrer une recette
      </h1>
      <div className=" pt-4 text-center">
        <input
          required
          className="focus:bg-orange placeholder:italic placeholder:text-white rounded-full p-2 pl-5 bg-orange text-white w-3/4 md:w-3/4"
          type="date"
        />
      </div>
      <div className=" pt-4 text-center">
        <h2 className="grow text-center font-semibold text-green md:text-2xl>Détail de l'opération">
          Détail de l'opération
        </h2>
        <input
          required
          className="focus:bg-orange placeholder:italic placeholder:text-white rounded-full p-2 pl-5 bg-orange text-white w-3/4 md:w-3/4"
          type="text"
        />
      </div>
      <div className=" pt-4 text-center">
        <h2 className="grow text-center font-semibold text-green md:text-2xl>Détail de l'opération">
          Mode de paiement
        </h2>
        <select className="focus:bg-orange placeholder:italic placeholder:text-white rounded-full p-2 pl-5 bg-orange text-white w-3/4 md:w-3/4">
          <option>---</option>
          <option>Espèce</option>
          <option>Chèque</option>
          <option>Virement</option>
          <option>TIP</option>
        </select>
      </div>
      <div className=" pt-4 text-center">
        <h2 className="grow text-center font-semibold text-green md:text-2xl>Détail de l'opération">
          Numéro de chèque
        </h2>
        <input
          required
          className="focus:bg-orange placeholder:italic placeholder:text-white rounded-full p-2 pl-5 bg-orange text-white w-3/4 md:w-3/4"
          type="text"
        />
      </div>
      <div className=" pt-4 text-center">
        <h2 className="grow text-center font-semibold text-green md:text-2xl>Détail de l'opération">
          Banque
        </h2>
        <select className="focus:bg-orange placeholder:italic placeholder:text-white rounded-full p-2 pl-5 bg-orange text-white w-3/4 md:w-3/4">
          <option>---</option>
          <option>Crédit Agricole</option>
          <option>Crédit Mutuelle</option>
          <option>Caisse d'épargne</option>
          <option>La Poste</option>
        </select>
      </div>
      <div className=" pt-4 text-center">
        <h2 className="grow text-center font-semibold text-green md:text-2xl>Détail de l'opération">
          Numéro de compte
        </h2>
        <select className="focus:bg-orange placeholder:italic placeholder:text-white rounded-full p-2 pl-5 bg-orange text-white w-3/4 md:w-3/4">
          <option>---</option>
          <option>746</option>
          <option>732</option>
          <option>789</option>
          <option>756</option>
        </select>
      </div>
      <div className=" pt-4 text-center">
        <h2 className="grow text-center font-semibold text-green md:text-2xl>Détail de l'opération">
          Nom, Prénom
        </h2>
        <input
          required
          className="focus:bg-orange placeholder:italic placeholder:text-white rounded-full p-2 pl-5 bg-orange text-white w-3/4 md:w-3/4"
          type="text"
        />
      </div>
      <div className=" pt-4 text-center">
        <h2 className="grow text-center font-semibold text-green md:text-2xl>Détail de l'opération">
          Somme en €
        </h2>
        <input
          required
          className="focus:bg-orange placeholder:italic placeholder:text-white rounded-full p-2 pl-5 bg-orange text-white w-3/4 md:w-3/4"
          type="text"
        />
      </div>
      <form encType="multipart/form-data" className=" pt-4 text-center">
        <button
          className="focus:bg-orange placeholder:italic placeholder:text-white rounded-full p-2 pl-5 bg-orange text-white w-1/2 md:w-3/4"
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
    </div>
  );
}

export default Enregistrement;
