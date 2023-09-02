import React from "react";
import { Helmet } from "react-helmet";
import Enregistrement from "../../components/Enregistrement";
import SideBarTresorier from "../../components/sidebar/SideBarTresorier";
import logo from "../../assets/logo.png";

function HomeTresorier() {
  return (
    <div className="homeTresorier md:flex ">
      <Helmet>
        <meta charSet="utf-8" />
        <title>AIDNA_COMPTA - Acceuil trésorier</title>
        <meta name="description" content="Page d'accueil du trésorier" />
        <link rel="icon" type="image/png" href={logo} />
      </Helmet>
      <div data-testid="sidebar-tresorier">
        <SideBarTresorier />
      </div>
      <div
        data-testid="Enregistrement"
        className=" border pt-2 pb-2 border-black rounded-3xl shadow-lg mt-3 mx-8 md:w-screen"
      >
        <Enregistrement />
      </div>
    </div>
  );
}

export default HomeTresorier;
