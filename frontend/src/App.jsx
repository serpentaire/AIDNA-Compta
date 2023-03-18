// import Home from "./pages/Homes/Home";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeAdherent from "./pages/homes/HomeAdherent";
import Login from "./pages/homes/login/login";
import HomeTresorier from "./pages/homes/HomeTresorier";
import CompteJournalier from "./pages/homes/CompteJournalier";
import "./App.css";

function App() {
  return (
    <div className="App md:h-auto">
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/homeAdherent" element={<HomeAdherent />} />
            <Route path="/homeTresorier" element={<HomeTresorier />} />
            <Route path="/compteJournalier" element={<CompteJournalier />} />
            {/* <Home /> */}
          </Routes>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
