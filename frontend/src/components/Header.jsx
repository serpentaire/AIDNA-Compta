import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import User from "../context/user";
import logo from "../assets/logo.png";
import deconnexion from "../assets/deconnexion.png";
import updateMp from "../assets/modif_mp.png";

function Header() {
  const { user } = useContext(User.UserContext);
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
      <h1 className="grow text-center pt-5 md:text-2xl mr-10 md:mr-0">
        AIDNA_Compta
      </h1>
      <div className="hidden md:block">
        <div className="mr-3 mt-5">
          {user && (
            <Link to="/updatePassword">
              <button className="mr-3" type="button">
                Mot de passe
              </button>
            </Link>
          )}
          <button type="button" onClick={() => getLogout()}>
            Déconnexion
          </button>
        </div>
      </div>
      <div className="md:hidden mt-5 mr-3">
        {user && (
          <Link to="/updatePassword">
            <button type="button">
              <img src={updateMp} alt="logo" className="w-7 h-7 mr-3" />
            </button>
          </Link>
        )}
        <button type="button" onClick={() => getLogout()}>
          <img src={deconnexion} alt="logo" className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
}

export default Header;
