import React from "react";
import Enregistrement from "../../components/Enregistrement";
import SideBarTresorier from "../../components/sidebar/SideBarTresorier";

function HomeTresorier() {
  return (
    <div className="homeTresorier md:flex ">
      <div>
        <SideBarTresorier />
      </div>
      <div className=" border pt-2 pb-2 border-black rounded-3xl shadow-lg mt-3 mx-8 md:w-screen">
        <Enregistrement />
      </div>
    </div>
  );
}

export default HomeTresorier;
