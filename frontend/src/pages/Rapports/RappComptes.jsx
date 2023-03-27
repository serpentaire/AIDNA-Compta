import React from "react";
import SideBarTresorier from "../../components/sidebar/SideBarTresorier";
import GrapComptes from "../../components/GraphComptes";

function RapComptes() {
  return (
    <div className="homeTresorier md:flex ">
      <div>
        <SideBarTresorier />
      </div>
      <div className=" border pt-2 pb-2 border-black rounded-3xl shadow-lg mt-3 mx-8 md:w-screen">
        <GrapComptes />
      </div>
    </div>
  );
}

export default RapComptes;
