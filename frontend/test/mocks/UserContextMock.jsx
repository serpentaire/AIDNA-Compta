import React, { createContext, useState } from "react";

const MockUserContext = createContext();

function MockUserProvider({ children }) {
  const [user, setUser] = useState(
    sessionStorage.user !== "undefined"
      ? JSON.parse(sessionStorage.getItem("user"))
      : null
  );

  const handleUser = (data) => {
    setUser(data);
  };

  const logout = () => {
    // setUser();
    // sessionStorage.removeItem("user");
  };

  // useEffect(() => {
  //   sessionStorage.setItem("user", JSON.stringify(user));
  // }, [user]);

  return (
    <MockUserContext.Provider
      value={{
        user,
        handleUser,
        logout,
      }}
    >
      {children}
    </MockUserContext.Provider>
  );
}

export { MockUserContext, MockUserProvider };
