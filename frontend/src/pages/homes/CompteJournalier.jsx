import React from "react";
import { Helmet } from "react-helmet";
import SideBarTresorier from "../../components/sidebar/SideBarTresorier";
import TableauJournalier from "../../components/TableauJournalier";
import logo from "../../assets/logo.png";

function CompteJournalier() {
  return (
    <div className="homeTresorier md:flex">
      <Helmet>
        <meta charSet="utf-8" />
        <title>AIDNA_COMPTA - Compte journalier</title>
        <meta name="description" content="Page des comptes journaliers" />
        <link rel="icon" type="image/png" href={logo} />
      </Helmet>
      <div>
        <SideBarTresorier />
      </div>
      <div className=" border pt-2 pb-2 border-black rounded-3xl shadow-lg mt-3 mx-8">
        <TableauJournalier />
      </div>
    </div>
  );
}

export default CompteJournalier;
