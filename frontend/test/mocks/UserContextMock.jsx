import React, { createContext, useState, useEffect } from "react";

const MockUserContext = createContext();

function MockUserProvider({ children, value }) {
  const [user, setUser] = useState(value || null);
  const handleUser = (data) => {
    setUser(data);
  };

  const logout = () => {
    setUser();
    sessionStorage.removeItem("user");
  };

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]);

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
