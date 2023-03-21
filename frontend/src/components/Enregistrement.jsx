import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import toastiConfig from "../services/toastiConfig";
import apiConnexion from "../services/apiConnexion";

// eslint-disable-next-line react/prop-types
function Enregistrement({ idUpdate, setIdUpdate }) {
  const formulaire = document.getElementById("formulaire");
  const inputRef1 = useRef(null);
  const location = useLocation();
  let enregistrementType = location.state?.parametre;
  const [Ncompte, setNcompte] = useState([]);
  const [banques, setBanques] = useState([]);
  const [modePays, setModePays] = useState([]);
  let enregistrementInitial = {
    date: "",
    description: "",
    nom: "",
    somme: null,
    validation: "non",
    N_cheque: null,
    N_comptes_id: null,
    banque_id: null,
    mode_pay_id: null,
    enregmt: enregistrementType,
    facture: "",
  };
  const [enregistrement, setEnregistrement] = useState(enregistrementInitial);
  const getOneEnrgmt = () => {
    if (idUpdate) {
      apiConnexion
        .get(`/enregistrement/${idUpdate}`)
        .then((oneEnregistrement) => {
          enregistrementInitial = {
            ...oneEnregistrement.data,
            date: oneEnregistrement.data.date.split("T").shift(),
            somme: parseFloat(oneEnregistrement.data.somme, 10).toFixed(2),
            mode_pay_id: oneEnregistrement.data.mode_pay_id.toString(),
          };
          setEnregistrement(enregistrementInitial);
        })
        .catch((error) => console.error(error));
    }
  };

  // eslint-disable-next-line no-unused-expressions
  !enregistrementType ? (enregistrementType = enregistrement.enregmt) : "";

  const handleEnregistrement = (place, value) => {
    const newEnregistrement = { ...enregistrement };
    newEnregistrement[place] = value;
    setEnregistrement(newEnregistrement);
  };

  const getNcompte = () => {
    apiConnexion
      .get(`/nComptes`)
      .then((allCompte) => {
        setNcompte(allCompte.data);
      })
      .catch((error) => console.error(error));
  };
  const getBanque = () => {
    apiConnexion
      .get(`/banque`)
      .then((allBanque) => {
        setBanques(allBanque.data);
      })
      .catch((error) => console.error(error));
  };
  const getModePay = () => {
    apiConnexion
      .get(`/modePaiement`)
      .then((allmodePay) => {
        setModePays(allmodePay.data);
      })
      .catch((error) => console.error(error));
  };

  const handleClick1 = () => {
    inputRef1.current.click();
  };
  const deleteEnregistrement = (id) => {
    apiConnexion
      .delete(`/enregistrement/${id}`)
      .then(() => {
        toast.success(`Votre écriture a bien été supprimée.`, toastiConfig);
        setEnregistrement(enregistrementInitial);
        // eslint-disable-next-line no-param-reassign
        setIdUpdate();
      })
      .catch((err) => {
        toast.error(`Votre écriture n'a pas été supprimée.`, toastiConfig);
        console.warn(err);
      });
  };
  const sendForm = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append(
      "facture",
      inputRef1.current ? inputRef1.current.files[0] : ""
    );
    formData.append("data", JSON.stringify(enregistrement));
    if (idUpdate) {
      apiConnexion
        .put(`/enregistrement/${idUpdate}`, formData)
        .then(() => {
          toast.success(`Votre écriture a bien été modifié.`, toastiConfig);
          setEnregistrement(enregistrementInitial);
          // eslint-disable-next-line no-param-reassign
          setIdUpdate();
        })
        .catch((error) => {
          toast.error(`Votre écriture n'a pas été ajouté.`, toastiConfig);
          console.error(error);
        });
    } else {
      apiConnexion
        .post("/enregistrement", formData)
        .then(() => {
          toast.success(`Votre écriture a bien été ajouté.`, toastiConfig);
          setEnregistrement(enregistrementInitial);
          formulaire.reset();
        })
        .catch((error) => {
          toast.error(`Votre écriture n'a pas été ajouté.`, toastiConfig);
          console.error(error);
        });
    }
  };
  useEffect(() => {
    getNcompte();
    getBanque();
    getModePay();
    getOneEnrgmt();
  }, [idUpdate]);

  useEffect(() => {
    setEnregistrement({
      ...enregistrement,
      enregmt: enregistrementType,
    });
  }, [enregistrementType]);

  return (
    <div className="enregistrement">
      <form
        encType="multipart/form-data"
        onSubmit={(e) => sendForm(e)}
        id="formulaire"
      >
        {idUpdate ? (
          <h1 className="grow text-center font-semibold text-green md:text-2xl">
            Modifier une {enregistrementType}
          </h1>
        ) : (
          <h1 className="grow text-center font-semibold text-green md:text-2xl">
            Enregistrer une {enregistrementType}
          </h1>
        )}
        <div className=" pt-4 text-center md:text-start md:pl-20">
          <h2 className="grow text-center md:text-start font-semibold text-green">
            Date de l'opération*
          </h2>
          <input
            required
            className="border border-orange rounded-full p-2 pl-5 bg-white text-orange w-3/4 md:w-40"
            type="date"
            name="date"
            value={enregistrement.date}
            onChange={(e) =>
              handleEnregistrement(e.target.name, e.target.value)
            }
          />
        </div>
        <div className=" pt-4 text-center md:text-start md:pl-20">
          <h2 className="grow text-center md:text-start font-semibold text-green">
            Détail de l'opération*
          </h2>
          <input
            required
            className="border border-orange rounded-full p-2 pl-5 bg-white text-orange w-3/4 md:w-3/4"
            type="text"
            name="description"
            value={enregistrement.description}
            onChange={(e) =>
              handleEnregistrement(e.target.name, e.target.value)
            }
          />
        </div>
        <div className="md:flex">
          <div className=" pt-4 text-center md:text-start md:pl-20">
            <h2 className="grow text-center md:text-start font-semibold text-green">
              Mode de paiement*
            </h2>
            <select
              className="border border-orange rounded-full p-2 pl-5 text-orange w-3/4 md:w-40"
              name="mode_pay_id"
              type="text"
              value={enregistrement.mode_pay_id}
              onChange={(e) =>
                handleEnregistrement(e.target.name, e.target.value)
              }
            >
              <option value="">Sélectionnez</option>
              {modePays.map((modePay) => (
                <option
                  key={modePay.id}
                  value={modePay.id}
                  selected={modePay.id === enregistrement.mode_pay_id}
                >
                  {modePay.nom}
                </option>
              ))}
            </select>
          </div>
          {enregistrement.mode_pay_id === "2" && (
            <div className=" pt-4 text-center md:text-start md:pl-20">
              <h2 className="grow text-center font-semibold text-green">
                Numéro de chèque
              </h2>
              <input
                className="border border-orange rounded-full p-2 pl-5 bg-white text-orange w-3/4 md:w-full"
                type="text"
                name="N_cheque"
                value={enregistrement.N_cheque}
                onChange={(e) =>
                  handleEnregistrement(e.target.name, e.target.value)
                }
              />
            </div>
          )}
          {enregistrement.mode_pay_id === "2" && (
            <div className=" pt-4 text-center md:text-start md:pl-20">
              <h2 className="grow text-center font-semibold text-green md:text-2xl>Détail de l'opération">
                Banque
              </h2>
              <select
                className="border border-orange rounded-full p-2 pl-5 bg-white text-orange w-3/4 md:w-full"
                name="banque_id"
                type="text"
                onChange={(e) =>
                  handleEnregistrement(e.target.name, e.target.value)
                }
              >
                <option value="">Sélectionnez</option>
                {banques.map((banque) => (
                  <option
                    key={banque.id}
                    value={banque.id}
                    selected={banque.id === enregistrement.banque_id}
                  >
                    {banque.nom}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <div className=" pt-4 text-center md:text-start md:pl-20">
          <h2 className="grow text-center md:text-start font-semibold text-green">
            Numéro de compte
          </h2>
          <select
            className="border border-orange rounded-full p-2 pl-5 bg-white text-orange w-3/4 md:w-1/2"
            name="N_comptes_id"
            type="text"
            value={enregistrement.N_comptes_id}
            onChange={(e) =>
              handleEnregistrement(e.target.name, e.target.value)
            }
          >
            <option value="">Sélectionnez</option>
            {enregistrementType === "recette"
              ? Ncompte.filter((compte) =>
                  compte.numero.toString().startsWith("7")
                ).map((compte) => (
                  <option
                    key={compte.id}
                    value={compte.id}
                    selected={compte.id === enregistrement.N_comptes_id}
                  >
                    {compte.numero} - {compte.designation}
                  </option>
                ))
              : Ncompte.filter((compte) =>
                  compte.numero.toString().startsWith("6")
                ).map((compte) => (
                  <option
                    key={compte.id}
                    value={compte.id}
                    selected={compte.id === enregistrement.N_comptes_id}
                  >
                    {compte.numero} - {compte.designation}
                  </option>
                ))}
          </select>
        </div>
        <div className=" pt-4 text-center md:text-start md:pl-20">
          <h2 className="grow text-center md:text-start font-semibold text-green">
            Nom, Prénom*
          </h2>
          <input
            required
            className="border border-orange rounded-full p-2 pl-5 bg-white text-orange w-3/4 md:w-72"
            type="text"
            name="nom"
            value={enregistrement.nom}
            onChange={(e) =>
              handleEnregistrement(e.target.name, e.target.value)
            }
          />
        </div>
        <div className=" pt-4 text-center md:text-start md:pl-20">
          <h2 className="grow text-center md:text-start font-semibold text-green md:text-2xl>Détail de l'opération">
            Somme en €*
          </h2>
          <input
            required
            className="border border-orange rounded-full p-2 pl-5 bg-white text-orange w-3/4 md:w-40"
            type="text"
            name="somme"
            value={enregistrement.somme}
            onChange={(e) =>
              handleEnregistrement(e.target.name, e.target.value)
            }
          />
        </div>
        {enregistrementType === "dépense" && (
          <div className=" pt-4 text-center md:text-start md:pl-20">
            <button
              className="focus:bg-white focus:text-orange border border-orange rounded-full p-2 pl-5 bg-orange text-white w-1/2 md:w-52"
              type="button"
              onClick={handleClick1}
            >
              Télécharger la facture
            </button>
            <input
              className="hidden"
              type="file"
              ref={inputRef1}
              name="facture"
              style={{ display: "none" }}
              accept=".pdf, .jpg"
            />
          </div>
        )}
        <div className="flex flex-row justify-around items-center my-3 md:justify-end md:pr-20">
          {!idUpdate ? (
            <button
              className="focus:bg-white focus:text-orange m-2 border border-orange rounded-3xl p-2 bg-orange text-white font-bold w-1/2 md:w-40"
              type="submit"
            >
              Enregistrer
            </button>
          ) : (
            <div>
              <button
                className="focus:bg-white focus:text-orange m-2 border border-orange rounded-3xl p-2 bg-orange text-white font-bold w-1/2 md:w-40"
                type="button"
                onClick={() => deleteEnregistrement(idUpdate)}
              >
                Supprimer
              </button>
              <button
                className="focus:bg-white focus:text-orange border border-orange rounded-3xl p-2 bg-orange text-white font-bold w-1/2 md:w-40"
                type="submit"
              >
                Modifier
              </button>
            </div>
          )}
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

export default Enregistrement;
