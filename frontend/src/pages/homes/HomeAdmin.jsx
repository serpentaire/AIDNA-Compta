import React from "react";
import { Helmet } from "react-helmet";
import SideBarAdmin from "../../components/sidebar/SideBarAdmin";
import NumCompte from "../../components/NumCompte";
import logo from "../../assets/logo.png";

function HomeAdmin() {
  return (
    <div className="homeTresorier md:flex ">
      <Helmet>
        <meta charSet="utf-8" />
        <title>AIDNA_COMPTA - Acceuil administrateur</title>
        <meta name="description" content="Page d'accueil de l'administrateur" />
        <link rel="icon" type="image/png" href={logo} />
      </Helmet>
      <div data-testid="sidebar-admin">
        <SideBarAdmin />
      </div>
      <div
        data-testid="NumCompte"
        className=" border pt-2 pb-2 border-black rounded-3xl shadow-lg mt-3 mx-8 md:w-screen"
      >
        <NumCompte />
      </div>
    </div>
  );
}

export default HomeAdmin;
