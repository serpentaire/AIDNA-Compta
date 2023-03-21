import React from "react";
import SideBarAdmin from "../../components/sidebar/SideBarAdmin";
import NumCompte from "../../components/NumCompte";

function HomeAdmin() {
  return (
    <div className="homeTresorier md:flex ">
      <div>
        <SideBarAdmin />
      </div>
      <div className=" border pt-2 pb-2 border-black rounded-3xl shadow-lg mt-3 mx-8 md:w-screen">
        <NumCompte />
      </div>
    </div>
  );
}

export default HomeAdmin;
