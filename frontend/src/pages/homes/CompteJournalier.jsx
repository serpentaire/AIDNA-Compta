import React from "react";
import SideBarTresorier from "../../components/sidebar/SideBarTresorier";
import TableauJournalier from "../../components/TableauJournalier";

function CompteJournalier() {
  return (
    <div className="homeTresorier md:flex ">
      <div>
        <SideBarTresorier />
      </div>
      <div className=" border pt-2 pb-2 border-black rounded-3xl shadow-lg mt-3 mx-8 md:w-screen">
        <TableauJournalier />
      </div>
    </div>
  );
}

export default CompteJournalier;
