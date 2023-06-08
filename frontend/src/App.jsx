// import Home from "./pages/Homes/Home";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeAdherent from "./pages/homes/HomeAdherent";
import Login from "./pages/homes/login/login";
import HomeTresorier from "./pages/homes/HomeTresorier";
import CompteJournalier from "./pages/homes/CompteJournalier";
import HomeAdmin from "./pages/homes/HomeAdmin";
import AdminUser from "./pages/homes/AdminUtilisateur";
import UpdatePassword from "./pages/homes/login/UpdatePassword";
import PrivateAdmin from "./pages/Layout/PrivateAdmin";
import PrivateTresorier from "./pages/Layout/PrivateTresorier";
import PrivateAdherent from "./pages/Layout/PrivateAdherent";
import RapComptes from "./pages/Rapports/RappComptes";
import "./App.css";

function App() {
  return (
    <div className="App md:h-screen">
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/updatePassword" element={<UpdatePassword />} />
            {/* route adhérent */}
            <Route path="/" element={<PrivateAdherent />}>
              <Route path="/homeAdherent" element={<HomeAdherent />} />
            </Route>
            {/* route trésorier */}
            <Route path="/" element={<PrivateTresorier />}>
              <Route path="/homeTresorier" element={<HomeTresorier />} />
              <Route path="/compteJournalier" element={<CompteJournalier />} />
              <Route path="/rapportComptes" element={<RapComptes />} />
            </Route>
            {/* route admin */}
            <Route path="/" element={<PrivateAdmin />}>
              <Route path="homeAdmin" element={<HomeAdmin />} />
              <Route path="adminUtilisateur" element={<AdminUser />} />
            </Route>
          </Routes>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
