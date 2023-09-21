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
            <Route path="/adherent/" element={<PrivateAdherent />}>
              <Route path="accueil" element={<HomeAdherent />} />
            </Route>
            {/* route trésorier */}
            <Route path="/tresorier/" element={<PrivateTresorier />}>
              <Route path="accueil" element={<HomeTresorier />} />
              <Route path="compte" element={<CompteJournalier />} />
              <Route path="rapport" element={<RapComptes />} />
            </Route>
            {/* route admin */}
            <Route path="/admin/" element={<PrivateAdmin />}>
              <Route path="accueil" element={<HomeAdmin />} />
              <Route path="utilisateurs" element={<AdminUser />} />
            </Route>
          </Routes>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
