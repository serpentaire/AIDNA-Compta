import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import User from "../../context/user";

function DashboardTresorier() {
  const { user } = useContext(User.UserContext);
  const { logout } = useContext(User.UserContext);

  if (user[0].Role.nom !== "Trésorier") {
    logout();
    return <Navigate to="/" replace />;
  }
  return (
    <div className="">
      <Outlet />
    </div>
  );
}
export default DashboardTresorier;
