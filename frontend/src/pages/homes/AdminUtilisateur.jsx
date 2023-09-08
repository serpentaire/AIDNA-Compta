import React from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import SideBarAdmin from "../../components/sidebar/SideBarAdmin";
import AddUsers from "../../components/users/addUsers";
import UpdateUsers from "../../components/users/updateUsers";
import SupUsers from "../../components/users/supUsers";
import logo from "../../assets/logo.png";

function AdminUtilisateur() {
  const location = useLocation();
  const userType = location.state?.parametre;
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
      <div data-testid="sidebar-admin">
        <SideBarAdmin />
      </div>
      {userType === "Ajouter" && (
        <div
          data-testid="AddUser"
          className=" border pt-2 pb-2 border-black rounded-3xl shadow-lg mt-3 mx-8 md:w-screen"
        >
          <AddUsers />
        </div>
      )}
      {userType === "Modifier" && (
        <div
          data-testid="UpdateUsers"
          className=" border pt-2 pb-2 border-black rounded-3xl shadow-lg mt-3 mx-8 md:w-screen"
        >
          <UpdateUsers />
        </div>
      )}
      {userType === "Supprimer" && (
        <div
          data-testid="SupUsers"
          className=" border pt-2 pb-2 border-black rounded-3xl shadow-lg mt-3 mx-8 md:w-screen"
        >
          <SupUsers />
        </div>
      )}
    </div>
  );
}

export default AdminUtilisateur;
