// import Home from "./pages/Homes/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeAdherent from "./pages/homes/HomeAdherent";
import Login from "./pages/homes/login/login";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/homeAdherent" element={<HomeAdherent />} />
            {/* <Home /> */}
          </Routes>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
