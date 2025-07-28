import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import RegistrationComponent from "./components/RegistrationComponent";
import LoginComponent from "./components/LoginComponent";
import Seeker from "./components/Seeker";
import SeekerProfile from "./components/SeekerProfile";
import Logout from "./components/logout";

const AppContent = () => {
  const location = useLocation();


const hideNav = ["/seeker", "/SeekerProfile"].some((path) =>
  location.pathname.startsWith(path)
);
 return (
    <div>
      {!hideNav && (
        <nav className="navbar navbar-expand-lg navbar-dark ps-5" style={{ backgroundColor: "#8baed2ff" }}>
          <div className="navbar-nav fw-bold">
            <Link className="nav-link word pe-5" to="/register" style={{ color: "black", fontSize: "23px" }}>
              Register
            </Link>
            <Link className="nav-link" to="/login" style={{ color: "black", fontSize: "23px" }}>
              Login
            </Link>
          </div>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<RegistrationComponent />} />
        <Route path="/register" element={<RegistrationComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/seeker" element={<Seeker />} />
         <Route path="/SeekerProfile" element={<SeekerProfile />} />
          <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
};


const App = () => (
 
    <AppContent />
)

export default App;
