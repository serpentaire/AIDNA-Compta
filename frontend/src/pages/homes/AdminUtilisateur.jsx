import React from "react";
import { Helmet } from "react-helmet";
import SideBarAdmin from "../../components/sidebar/SideBarAdmin";
import Utilisateur from "../../components/Utilisateur";
import logo from "../../assets/logo.png";

function AdminUtilisateur() {
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
      <div className=" border pt-2 pb-2 border-black rounded-3xl shadow-lg mt-3 mx-8 md:w-screen">
        <Utilisateur />
      </div>
    </div>
  );
}

export default AdminUtilisateur;
