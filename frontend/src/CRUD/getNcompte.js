import apiConnexion from "../services/apiConnexion";

// eslint-disable-next-line consistent-return
const getNcompte = async () => {
  try {
    const allCompte = await apiConnexion.get(`/allCompteActif`);
    return allCompte.data;
  } catch (error) {
    console.error(error);
  }
};

export default getNcompte;
