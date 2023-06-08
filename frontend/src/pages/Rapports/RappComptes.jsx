import React from "react";
import SideBarTresorier from "../../components/sidebar/SideBarTresorier";
import GraphComptes from "../../components/GraphComptes";

function RapComptes() {
  return (
    <div className="homeTresorier md:flex md:h-[calc(100vh-148px)]">
      <div>
        <SideBarTresorier />
      </div>
      <div className=" border pt-2 pb-2 border-black rounded-3xl shadow-lg mt-3 mx-8 md:w-screen">
        <GraphComptes />
      </div>
    </div>
  );
}

export default RapComptes;
