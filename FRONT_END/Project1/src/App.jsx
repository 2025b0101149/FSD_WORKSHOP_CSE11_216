import "./App.css";
import Home from "./components/Home.jsx";
import AboutUs from "./components/AboutUs.jsx";
import Dashboard from "./components/Dashboard.jsx";

function App() {
  return (
    <main className="app">
      <nav className="navbar">
        <h2>Project1</h2>
        <div>
          <a href="#home">Home</a>
          <a href="#about">About Us</a>
          <a href="#dashboard">Dashboard</a>
        </div>
      </nav>

      <Home />
      <AboutUs />
      <Dashboard />
    </main>
  );
}

export default App;