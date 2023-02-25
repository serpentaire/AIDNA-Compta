// import Home from "./pages/Homes/Home";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeAdherent from "./pages/homes/HomeAdherent";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      {/* <Home /> */}
      <HomeAdherent />
      <Footer />
    </div>
  );
}

export default App;
