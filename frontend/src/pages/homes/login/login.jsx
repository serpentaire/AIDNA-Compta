import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toastiConfig from "../../../services/toastiConfig";
import apiConnexion from "../../../services/apiConnexion";
import User from "../../../Context/user";
import logo from "../../../assets/logo.png";

function Login() {
  const navigate = useNavigate("");
  const [hidePassword, setHidePassword] = useState(true);
  const userContext = useContext(User.UserContext);
  function showPassword() {
    setHidePassword(!hidePassword);
  }

  const [connexion, setConnexion] = useState({
    utilisateur: "",
    password: "",
  });

  const sendForm = (e) => {
    e.preventDefault();
    apiConnexion
      .post("/login", connexion)
      .then((data) => {
        userContext.handleUser(data.data);
        if (data.data[0].Role.nom === "Trésorier") {
          setTimeout(
            () =>
              navigate(`/homeTresorier`, {
                state: { parametre: "recette" },
              }),
            2000
          );
        }
        toast.success(`Bonjour ${data.data[0].prenom}.`, toastiConfig);
      })
      .catch(() => {
        toast.error(
          `Votre email ou votre mot de passe n'est pas valide.`,
          toastiConfig
        );
      });
  };

  const handleConnexion = (place, value) => {
    const newConnexion = { ...connexion };
    newConnexion[place] = value;
    setConnexion(newConnexion);
  };

  return (
    <div className="login flex justify-center pt-5">
      <form onSubmit={(e) => sendForm(e)}>
        <div className=" w-80 md:w-96 border pt-2 pb-2 border-black rounded-3xl shadow-lg lg:max-w-lg mt-3">
          <div className="flex flex-col mx-3">
            <img src={logo} alt="logo" className="justify-center h-30" />
            <h2 className="rounded-3xl text-1xl text-center text-green font-semibold p-3">
              Login
            </h2>
            <div className="flex flex-row justify-around items-center my-3">
              <input
                required
                className="focus:bg-orange placeholder:italic placeholder:text-white rounded-full p-2 pl-5 bg-orange text-white w-3/4 md:w-3/4"
                type="text"
                id="utilisateur"
                name="utilisateur"
                placeholder="Email..."
                value={connexion.utilisateur}
                onChange={(e) => handleConnexion(e.target.name, e.target.value)}
              />
            </div>
            <div className="relative w-full px-9 md:px-11">
              <input
                required
                className="placeholder:italic placeholder:text-white rounded-full p-2 pl-5 bg-orange text-white w-full"
                type={hidePassword ? "password" : "text"}
                name="password"
                id="password"
                placeholder="Mot de passe..."
                value={connexion.password}
                onChange={(e) => handleConnexion(e.target.name, e.target.value)}
              />
              <div>
                <button
                  className="absolute w-[20px] h-[20px] top-0 right-0 py-2 mr-12"
                  onClick={showPassword}
                  type="button"
                >
                  {hidePassword ? (
                    <img
                      src="https://www.svgrepo.com/show/384356/close-cross-eye-hidden-vision.svg"
                      alt="eyeCross"
                    />
                  ) : (
                    <img
                      src="https://www.svgrepo.com/show/384342/eye-look-show-view-visible-visiblity.svg"
                      alt="eyeOpen"
                    />
                  )}
                </button>
              </div>
            </div>
            <div className="flex flex-row justify-around items-center my-3">
              <button
                type="submit"
                className="rounded-full p-2 bg-orange text-white font-bold w-1/2"
              >
                Valider
              </button>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Login;
