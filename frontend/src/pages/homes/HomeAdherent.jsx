import React, { useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiConnexion from "../../services/apiConnexion";
import toastiConfig from "../../services/toastiConfig";
import SideBarAdherent from "../../components/sidebar/SideBarAdherent";
import User from "../../context/user";

export default function HomeAdherent() {
  const { user } = useContext(User.UserContext);
  const contactType = {
    nom: user[0].nom,
    prenom: user[0].prenom,
    email: user[0].Users_log.login,
    message: "",
  };
  // console.log(user);

  const [contact, setContact] = useState(contactType);
  // console.log(contact);
  const handelContact = (place, value) => {
    const newContact = { ...contact };
    newContact[place] = value;
    setContact(newContact);
  };

  const sendForm = (e) => {
    e.preventDefault();
    apiConnexion
      .post("/contact", contact)
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
    <div className="homeAdherent md:flex ">
      <div>
        <SideBarAdherent />
      </div>
      <div className=" border pt-2 pb-2 border-black rounded-3xl shadow-lg mt-3 mx-8">
        <p className="rounded-3xl text-1xl text-center text-green font-semibold p-5">
          Bonjour l'association AIDNA est heureuse de vous compter parmi ses
          adhérents. En tant qu'adhèrent vous pouvez avoir accès au résultat des
          comptes de l'association. Vous pouvez voir le bilan annuel et le bilan
          par projet. Ceci en cliquant sur les boutons. Pour voir les comptes en
          détails il faut en faire la demande par écrit à la présidente à l'aide
          du formulaire de contact. Une visio ou une rencontre sera organisée
          afin de vous montrer l'état des comptes.
        </p>
        <form onSubmit={(e) => sendForm(e)}>
          <div className=" divEnCustom">
            <h2 className="h2compo grow ">Nom</h2>
            <input
              required
              className="inputCustom md:w-1/4"
              type="text"
              name="nom"
              value={contact.nom}
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
              value={contact.prenom}
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
              value={contact.message}
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
      </div>
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
