import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from 'react-router-dom';
// import Home from "./pages/Home.jsx";


function App() {
  return (
    <div>
      <Header />
      {/* <Home /> */}
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
