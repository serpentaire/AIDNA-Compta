// Modification d'un utilisateur dans la base
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toastiConfig from "../../services/toastiConfig";
import apiConnexion from "../../services/apiConnexion";
import getRole from "../../CRUD/getRole";
import getUsers from "../../CRUD/getUsers";

function UpdateUsers() {
  const formulaire = document.getElementById("formulaire");
  const location = useLocation();
  const actionUtilisateur = location.state?.parametre;
  const [roles, setRoles] = useState([]);
  const [utilisats, setUtilisats] = useState([]);
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
  const handleLogin = (value) => {
    const log = utilisats.find((e) => e.Users_log.login === value);
    const newLog = { ...log };
    setUsers(newLog);
  };
  const handleUsers = (place, value) => {
    const newUsers = { ...users };
    newUsers[place] = value;
    setUsers(newUsers);
  };
  // Récupération de tous les roles
  const getRoleData = async () => {
    const allRole = await getRole();
    setRoles(allRole);
  };
  // Récupération de tous les users
  const getUsersData = async () => {
    const allUsers = await getUsers();
    setUtilisats(allUsers);
  };
  // Modification de l'utilisateur
  const sendForm = (e) => {
    e.preventDefault();
    apiConnexion
      .put(`/users/${users.id}`, users)
      .then(() => {
        toast.success(`L'utilisateur a bien été modifié.`, toastiConfig);
        setUsers(usersInitial);
        formulaire.reset();
      })
      .catch((error) => {
        toast.error(`L'utilisateur n'a pas été modifié.`, toastiConfig);
        console.error(error);
      });
  };
  useEffect(() => {
    getRoleData();
    getUsersData();
  }, [users]);

  return (
    <div className="utilisateur">
      <form onSubmit={(e) => sendForm(e)} id="formulaire">
        <h1 className="h1compo">{actionUtilisateur} un utilisateur</h1>
        <div className="divUtCustom md:flex md:mt-10 pl-2 md:pt-4 text-center md:text-start md:pl-20">
          <h2 className="h2compo md:pr-24 mt-2">login :</h2>
          <select
            className="border border-orange rounded-full p-2 pl-5 text-orange w-3/4 w-3/4 md:w-1/2"
            name="login"
            type="text"
            value={users.login}
            onChange={(e) => handleLogin(e.target.value)}
          >
            <option value="">Sélectionnez</option>
            {utilisats.map((utilisat) => (
              <option key={utilisat.id} value={utilisat.Users_log.login}>
                {utilisat.Users_log.login}
              </option>
            ))}
          </select>
        </div>
        <div className="md:flex pl-2 md:pt-4 text-center md:text-start md:pl-20">
          <h2 className="h2compo md:pr-24 mt-2">Nom :</h2>
          <input
            required
            className="inputCustom"
            type="text"
            name="nom"
            value={users.nom}
            onChange={(e) => handleUsers(e.target.name, e.target.value)}
          />
        </div>
        <div className="divUtCustom">
          <h2 className="h2compo md:pr-20 mt-2">Prénom :</h2>
          <input
            required
            className="inputCustom"
            type="text"
            name="prenom"
            value={users.prenom}
            onChange={(e) => handleUsers(e.target.name, e.target.value)}
          />
        </div>
        <div className="divUtCustom">
          <h2 className="h2compo md:pr-20 mt-2">Adresse :</h2>
          <input
            required
            className="inputCustom"
            type="text"
            name="adresse"
            value={users.adresse}
            onChange={(e) => handleUsers(e.target.name, e.target.value)}
          />
        </div>
        <div className="divUtCustom">
          <h2 className="h2compo md:pr-14 mt-2">Code postal :</h2>
          <input
            required
            className="inputCustom"
            type="text"
            name="code_postal"
            value={users.code_postal}
            onChange={(e) => handleUsers(e.target.name, e.target.value)}
          />
        </div>
        <div className="divUtCustom">
          <h2 className="h2compo md:pr-28 mt-2">Ville :</h2>
          <input
            required
            className="inputCustom"
            type="text"
            name="ville"
            value={users.ville}
            onChange={(e) => handleUsers(e.target.name, e.target.value)}
          />
        </div>
        <div className="divUtCustom">
          <h2 className="text-center md:text-start md:pr-16 mt-2 font-semibold text-green">
            Téléphone :
          </h2>
          <input
            required
            className="inputCustom"
            type="text"
            name="telephone"
            value={users.telephone}
            onChange={(e) => handleUsers(e.target.name, e.target.value)}
          />
        </div>
        <div className="divUtCustom">
          <h2 className="h2compo mt-2 md:pr-28">Rôle :</h2>
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
            className="btnCustom focus:btnCustumFocus m-2 md:w-40"
            type="submit"
          >
            {actionUtilisateur}
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

export default UpdateUsers;
