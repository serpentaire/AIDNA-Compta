import apiConnexion from "../services/apiConnexion";

// eslint-disable-next-line consistent-return
const getUsers = async () => {
  try {
    const allUsers = await apiConnexion.get(`/users`);
    return allUsers.data;
  } catch (error) {
    console.error(error);
  }
};
export default getUsers;
