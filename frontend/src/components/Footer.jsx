import React from "react";
import logo from "../assets/logo.png";

function Footer() {
  return (
    <div className="footer pt-10 front-roboto text-green ">
      <div className="pb-4 flex justify-center">
        <img src={logo} alt="logo" className="w-20 h-7 text-center" />
        <p className="pl-2">Copyright - 2024 - Tous droits réservés</p>
      </div>
    </div>
  );
}

export default Footer;
