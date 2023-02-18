import React from "react";
import logo from "@assets/logo.png";

function Header() {
  return (
    <div className="header flex text-green">
      <img src={logo} alt="logo" className="w-40 h-16" />
      <h1 className="grow text-center pt-5 md:text-2xl">AIDNA Compta</h1>
      <button className="mr-3" type="button">
        Déconnexion
      </button>
    </div>
  );
}

export default Header;
