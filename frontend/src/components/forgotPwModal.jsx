import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import apiConnexion from "../services/apiConnexion";
import logo from "../assets/logo.png";
import "react-toastify/dist/ReactToastify.css";
import toastiConfig from "../services/toastiConfig";

function ForgotPw({ visible, onclose }) {
  const [login, setLogin] = useState();
  const handleLogin = (value) => {
    setLogin(value);
  };

  const sendForm = (e) => {
    e.preventDefault();
    apiConnexion
      .post("/forgotPw", login)
      .then(() => {
        toast.success(`Demande envoyée`, toastiConfig);
        setTimeout(() => onclose(), 4000);
      })
      .catch(() => {
        toast.error(`Vous n'avez pas de compte à cette adresse`, toastiConfig);
        setTimeout(() => onclose(), 4000);
      });
  };

  if (!visible) {
    return null;
  }
  return (
    <div className="fixed z-40 inset-0 bg-black bg-opacity-30 items-center backdrop-blur-sm shadow-md flex justify-center pt-5">
      <form onSubmit={(e) => sendForm(e)}>
        <div className="bg-white w-80 md:w-96 border pt-2 pb-2 border-black rounded-3xl shadow-lg lg:max-w-lg mt-3">
          <div className="flex flex-col mx-3">
            <img src={logo} alt="logo" className="justify-center h-30" />
            <h2 className="rounded-3xl text-1xl text-center text-green font-semibold p-3">
              Demander un nouveau mot de passe
            </h2>
            <div className="flex flex-row justify-around items-center my-3">
              <input
                required
                className="focus:bg-orange placeholder:italic placeholder:text-white rounded-full p-2 pl-5 bg-orange text-white w-3/4 md:w-3/4"
                type="text"
                id="utilisateur"
                placeholder="Email..."
                value={login}
                onChange={(e) => handleLogin(e.target.value)}
              />
            </div>
            <div className="flex flex-row justify-around items-center my-3">
              <button
                type="submit"
                onClick={(e) => sendForm(e)}
                className="rounded-full p-2 bg-orange text-white font-bold w-1/2"
              >
                Envoyer la demande
              </button>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
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

export default ForgotPw;
