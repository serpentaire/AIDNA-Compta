import React from "react";
import { Helmet } from "react-helmet";
import SideBarAdherent from "../../components/sidebar/SideBarAdherent";
import logo from "../../assets/logo.png";

function BilanAnnuel() {
  return (
    <div className="bilanAnnuel md:flex">
      <Helmet>
        <meta charSet="utf-8" />
        <title>AIDNA_COMPTA - Acceuil adhérent</title>
        <meta name="description" content="Page d'accueil adhérent" />
        <link rel="icon" type="image/png" href={logo} />
      </Helmet>
      <div data-testid="sidebar-adherent">
        <SideBarAdherent />
      </div>
      <h1>BilanAnnuel</h1>
    </div>
  );
}

export default BilanAnnuel;
