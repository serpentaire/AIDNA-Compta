import React from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import SideBarAdmin from "../../components/sidebar/SideBarAdmin";
import AjoutUtilisateur from "../../components/ajoutUtilisateur";
import ModifUtilisateur from "../../components/modifUtilisateur";
import SupUtilisateur from "../../components/supUtilisateur";
import logo from "../../assets/logo.png";

function AdminUtilisateur() {
  const location = useLocation();
  const userType = location.state?.parametre;
  return (
    <div className="homeTresorier md:flex ">
      <Helmet>
        <meta charSet="utf-8" />
        <title>AIDNA_COMPTA - Administration utilisateur</title>
        <meta
          name="description"
          content="Page d'administration des utilisateurs"
        />
        <link rel="icon" type="image/png" href={logo} />
      </Helmet>
      <div>
        <SideBarAdmin />
      </div>
      {userType === "Ajouter" && (
        <div className=" border pt-2 pb-2 border-black rounded-3xl shadow-lg mt-3 mx-8 md:w-screen">
          <AjoutUtilisateur />
        </div>
      )}
      {userType === "Modifier" && (
        <div className=" border pt-2 pb-2 border-black rounded-3xl shadow-lg mt-3 mx-8 md:w-screen">
          <ModifUtilisateur />
        </div>
      )}
      {userType === "Supprimer" && (
        <div className=" border pt-2 pb-2 border-black rounded-3xl shadow-lg mt-3 mx-8 md:w-screen">
          <SupUtilisateur />
        </div>
      )}
    </div>
  );
}

export default AdminUtilisateur;
