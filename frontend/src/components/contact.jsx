import React, { useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiConnexion from "../services/apiConnexion";
import toastiConfig from "../services/toastiConfig";
import User from "../context/user";

function contact() {
  const { user } = useContext(User.UserContext);
  const contactType = {
    nom: user[0].nom,
    prenom: user[0].prenom,
    email: user[0].Users_log.login,
    message: "",
  };

  const [contacts, setContacts] = useState(contactType);
  const handelContact = (place, value) => {
    const newContact = { ...contacts };
    newContact[place] = value;
    setContacts(newContact);
  };

  const sendForm = (e) => {
    e.preventDefault();
    apiConnexion
      .post("/contact", contacts)
      .then(() => {
        toast.success(
          "Bonjour, votre message a bien été envoyé.",
          toastiConfig
        );
      })
      .catch(() => {
        toast.error("Une erreur est survenue", toastiConfig);
        console.warn();
      });
  };
  return (
    <div className="contact">
      <form onSubmit={(e) => sendForm(e)}>
        <div className=" divEnCustom">
          <h2 className="h2compo grow ">Nom</h2>
          <input
            required
            className="inputCustom md:w-1/4"
            type="text"
            name="nom"
            value={contacts.nom}
            onChange={(e) => handelContact(e.target.name, e.target.value)}
          />
        </div>
        <div className=" divEnCustom">
          <h2 className="h2compo grow">Prénom</h2>
          <input
            required
            className="inputCustom md:w-1/4"
            type="text"
            name="nom"
            value={contacts.prenom}
            onChange={(e) => handelContact(e.target.name, e.target.value)}
          />
        </div>
        <div className=" divEnCustom">
          <h2 className="h2compo grow">Message :</h2>
          <textarea
            required
            className="inputCustom md:w-3/4 rounded-lg"
            type="text"
            name="message"
            placeholder="Message"
            value={contacts.message}
            onChange={(e) => handelContact(e.target.name, e.target.value)}
          />
        </div>
        <div className="flex flex-row justify-around items-center my-3 md:justify-end md:pr-20">
          <button
            className="btnCustom focus:btnCustumFocus justify-center m-2 md:w-40"
            type="submit"
          >
            Envoyer
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

export default contact;
