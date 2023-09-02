import React, { useState, useContext } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toastiConfig from "../../../services/toastiConfig";
import apiConnexion from "../../../services/apiConnexion";
import User from "../../../context/user";
import logo from "../../../assets/logo.png";
import { passwordPattern } from "../../../services/regexPattern";

function UpdatePassword() {
  const navigate = useNavigate("");
  const { user } = useContext(User.UserContext);
  const [hidePassword, setHidePassword] = useState(true);
  const [confirm, setConfirm] = useState({
    password: "",
    confirmpassword: "",
    oldpassword: "",
  });
  const handleConfirm = (place, value) => {
    const newConfirm = { ...confirm };
    newConfirm[place] = value;
    setConfirm(newConfirm);
  };
  function showPassword() {
    setHidePassword(!hidePassword);
  }

  const sendForm = (e) => {
    e.preventDefault();
    if (
      // Vérification  du format du mot de passe
      passwordPattern.test(confirm.password) &&
      passwordPattern.test(confirm.confirmpassword)
    ) {
      if (confirm.password === confirm.confirmpassword) {
        apiConnexion
          .put("/firstconnexion", { ...confirm, id: user[0].users_log_id })
          .then(() => {
            toast.success(`Bonjour ${user[0].prenom}.`, toastiConfig);
            if (user[0].Role.nom === "Trésorier") {
              setTimeout(
                () =>
                  navigate(`/homeTresorier`, {
                    state: { parametre: "recette" },
                  }),
                2000
              );
            } else if (user[0].Role.nom === "Administrateur") {
              setTimeout(() => navigate(`/homeAdmin`), 2000);
            } else if (user[0].Role.nom === "Adhèrent") {
              setTimeout(() => navigate(`/homeAdherent`), 2000);
            }
          })
          .catch(() => {
            toast.error(
              `Votre ancien mot de passe n'est pas valide`,
              toastiConfig
            );
          });
      } else {
        toast.error(
          `Vos nouveaux mots de passe ne sont pas identiques`,
          toastiConfig
        );
      }
    } else {
      toast.error(
        `Vos nouveaux mots de passe ne répondent aux critères`,
        toastiConfig
      );
    }
  };

  return (
    <div className="updatePassword flex justify-center pt-5">
      <Helmet>
        <meta charSet="utf-8" />
        <title>AIDNA_Compta - Modifier le mot de passe</title>
        <meta name="description" content="Page pour modifier le mot de passe" />
        <link rel="icon" type="image/png" href={logo} />
      </Helmet>
      <form onSubmit={(e) => sendForm(e)}>
        <div className=" w-80 md:w-96 border pt-2 pb-2 border-black rounded-3xl shadow-lg lg:max-w-lg mt-3">
          <div className="flex flex-col mx-3">
            <img src={logo} alt="logo" className="justify-center h-30" />
            <h2 className="rounded-3xl text-1xl text-center text-green font-semibold p-3">
              Changer votre mot de passe
            </h2>
            <div className="relative w-full px-9 md:px-11">
              <input
                required
                className="placeholder:italic placeholder:text-white rounded-full p-2 pl-5 bg-orange text-white w-full"
                type={hidePassword ? "password" : "text"}
                name="oldpassword"
                id="oldpassword"
                data-testid="inputOldPassword"
                placeholder="Ancien mot de passe..."
                value={confirm.oldpassword}
                onChange={(e) => handleConfirm(e.target.name, e.target.value)}
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
            <div className="relative w-full pt-3 px-9 md:px-11">
              <input
                required
                className="placeholder:italic placeholder:text-white rounded-full p-2 pl-5 bg-orange text-white w-full"
                type={hidePassword ? "password" : "text"}
                name="password"
                id="password"
                data-testid="inputPassword"
                placeholder="Nouveau mot de passe..."
                value={confirm.password}
                onChange={(e) => handleConfirm(e.target.name, e.target.value)}
              />
              <div>
                <button
                  className="absolute w-[20px] h-[20px] top-0 pt-5 right-0 py-2 mr-12"
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
            <div className="relative w-full pt-3 px-9 md:px-11">
              <input
                required
                className="placeholder:italic placeholder:text-white rounded-full p-2 pl-5 bg-orange text-white w-full"
                type={hidePassword ? "password" : "text"}
                name="confirmpassword"
                id="confirmpassword"
                data-testid="inputConfirmPassword"
                placeholder="Confirmer le mot de passe..."
                value={confirm.confirmpassword}
                onChange={(e) => handleConfirm(e.target.name, e.target.value)}
              />
              <div>
                <button
                  className="absolute w-[20px] h-[20px] top-0 pt-5 right-0 py-2 mr-12"
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
                data-testid="btn-Valider"
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

export default UpdatePassword;
