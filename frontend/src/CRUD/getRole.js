import apiConnexion from "../services/apiConnexion";

// eslint-disable-next-line consistent-return
const getRole = async () => {
  try {
    const allRoles = await apiConnexion.get(`/roles`);
    return allRoles.data;
  } catch (error) {
    console.error(error);
  }
};
export default getRole;
