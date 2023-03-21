import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import User from "../context/user";
import logo from "../assets/logo.png";

function Header() {
  const navigate = useNavigate();
  const { logout } = useContext(User.UserContext);
  const getLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div className="header flex text-green">
      <Link to="/">
        <img src={logo} alt="logo" className="w-40 h-16" />
      </Link>
      <h1 className="grow text-center pt-5 md:text-2xl">AIDNA Compta</h1>
      <button className="mr-3" type="button" onClick={() => getLogout()}>
        Déconnexion
      </button>
    </div>
  );
}

export default Header;
