import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toastiConfig from "../services/toastiConfig";
import apiConnexion from "../services/apiConnexion";

function Utilisateur() {
  const formulaire = document.getElementById("formulaire");
  const location = useLocation();
  const actionUtilisateur = location.state?.parametre;
  const [roles, setRoles] = useState([]);
  const usersInitial = {
    nom: "",
    prenom: "",
    login: "",
    mot_pass: "",
    adresse: "",
    code_postal: null,
    ville: "",
    telephone: null,
    role_id: null,
  };
  const [users, setUsers] = useState(usersInitial);
  const handleUsers = (place, value) => {
    const newUsers = { ...users };
    newUsers[place] = value;
    setUsers(newUsers);
  };
  const getRole = () => {
    apiConnexion
      .get(`/roles`)
      .then((allroles) => {
        setRoles(allroles.data);
      })
      .catch((error) => console.error(error));
  };
  const sendForm = (e) => {
    e.preventDefault();
    apiConnexion
      .post("/users", users)
      .then(() => {
        toast.success(`L'utilisateur a bien été ajoutée.`, toastiConfig);
        setUsers(usersInitial);
        formulaire.reset();
      })
      .catch((error) => {
        toast.error(`L'utilisateur n'a pas été ajoutée.`, toastiConfig);
        console.error(error);
      });
  };
  useEffect(() => {
    getRole();
  }, []);

  return (
    <div className="utilisateur">
      <form onSubmit={(e) => sendForm(e)} id="formulaire">
        <h1 className="grow text-center font-semibold text-green md:text-2xl">
          {actionUtilisateur} un utilisateur
        </h1>
        <div className="md:flex md:mt-10 pl-2 md:pt-4 text-center md:text-start md:pl-20">
          <h2 className="text-center md:text-start md:pr-24 mt-2 font-semibold text-green">
            Nom :
          </h2>
          <input
            required
            className="border border-orange rounded-full p-2 pl-5 bg-white text-orange w-3/4 md:w-1/2"
            type="text"
            name="nom"
            value={users.nom}
            onChange={(e) => handleUsers(e.target.name, e.target.value)}
          />
        </div>
        <div className="md:flex md:pt-4 text-center pl-2 md:text-start md:pl-20">
          <h2 className="text-center md:text-start md:pr-20 mt-2 font-semibold text-green">
            Prénom :
          </h2>
          <input
            required
            className="border border-orange rounded-full p-2 pl-5 bg-white text-orange w-3/4 md:w-1/2"
            type="text"
            name="prenom"
            value={users.prenom}
            onChange={(e) => handleUsers(e.target.name, e.target.value)}
          />
        </div>
        <div className="md:flex md:pt-4 text-center md:text-start pl-2 md:pl-20">
          <h2 className="text-center md:text-start md:pr-24 mt-2 font-semibold text-green">
            login :
          </h2>
          <input
            required
            className="border border-orange rounded-full p-2 pl-5 bg-white text-orange w-3/4 md:w-1/2"
            type="text"
            name="login"
            value={users.login}
            onChange={(e) => handleUsers(e.target.name, e.target.value)}
          />
        </div>
        <div className="md:flex md:pt-4 text-center md:text-start pl-2 md:pl-20">
          <h2 className="text-center md:text-start md:pr-10 mt-2 font-semibold text-green">
            Mot de passe :
          </h2>
          <input
            required
            className="border border-orange rounded-full p-2 pl-5 bg-white text-orange w-3/4 md:w-1/2"
            type="text"
            name="mot_pass"
            value={users.mot_pass}
            onChange={(e) => handleUsers(e.target.name, e.target.value)}
          />
        </div>
        <div className="md:flex md:pt-4 text-center md:text-start pl-2 md:pl-20">
          <h2 className="text-center md:text-start md:pr-20 mt-2 font-semibold text-green">
            Adresse :
          </h2>
          <input
            required
            className="border border-orange rounded-full p-2 pl-5 bg-white text-orange w-3/4 md:w-1/2"
            type="text"
            name="adresse"
            value={users.adresse}
            onChange={(e) => handleUsers(e.target.name, e.target.value)}
          />
        </div>
        <div className="md:flex md:pt-4 text-center md:text-start pl-2 md:pl-20">
          <h2 className="text-center md:text-start md:pr-14 mt-2 font-semibold text-green">
            Code postal :
          </h2>
          <input
            required
            className="border border-orange rounded-full p-2 pl-5 bg-white text-orange w-3/4 md:w-1/2"
            type="text"
            name="code_postal"
            value={users.code_postal}
            onChange={(e) => handleUsers(e.target.name, e.target.value)}
          />
        </div>
        <div className="md:flex md:pt-4 text-center md:text-start pl-2 md:pl-20">
          <h2 className="text-center md:text-start md:pr-28 mt-2 font-semibold text-green">
            Ville :
          </h2>
          <input
            required
            className="border border-orange rounded-full p-2 pl-5 bg-white text-orange w-3/4 md:w-1/2"
            type="text"
            name="ville"
            value={users.ville}
            onChange={(e) => handleUsers(e.target.name, e.target.value)}
          />
        </div>
        <div className="md:flex md:pt-4 text-center md:text-start pl-2 md:pl-20">
          <h2 className="text-center md:text-start md:pr-16 mt-2 font-semibold text-green">
            Téléphone :
          </h2>
          <input
            required
            className="border border-orange rounded-full p-2 pl-5 bg-white text-orange w-3/4 md:w-1/2"
            type="text"
            name="telephone"
            value={users.telephone}
            onChange={(e) => handleUsers(e.target.name, e.target.value)}
          />
        </div>
        <div className="md:flex md:pt-4 text-center md:text-start pl-2 md:pl-20">
          <h2 className="text-center md:text-start mt-2 md:pr-28 font-semibold text-green">
            Rôle :
          </h2>
          <select
            className="border border-orange rounded-full p-2 pl-5 text-orange w-3/4 w-3/4 md:w-1/2"
            name="role_id"
            type="text"
            value={users.role_id}
            onChange={(e) => handleUsers(e.target.name, e.target.value)}
          >
            <option value="">Sélectionnez</option>
            {roles.map((role) => (
              <option
                key={role.id}
                value={role.id}
                selected={role.id === users.role_id}
              >
                {role.nom}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-row justify-around md:mt-10 items-center my-3 md:justify-end md:pr-20">
          <button
            className="focus:bg-white focus:text-orange m-2 border border-orange rounded-3xl p-2 bg-orange text-white font-bold w-1/2 md:w-40"
            type="submit"
          >
            Enregistrer
          </button>
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

export default Utilisateur;
