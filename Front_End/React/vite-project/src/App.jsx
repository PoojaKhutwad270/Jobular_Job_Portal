import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Outlet } from "react-router-dom";
import RegistrationComponent from "./components/RegistrationComponent";
import LoginComponent from "./components/LoginComponent";
import Seeker from "./components/SeekerDashboard";
import SeekerProfile from "./components/SeekerProfile";
import Logout from "./components/logout";
import SeekerNavbarLayout from "./components/SeekerNavbar";
import SeekerEducationSection from "./components/SeekerEducationComponent";
import AllJobs from "./components/AllJobs";
import { Navbar } from "react-bootstrap";




const AppContent = () => {
  const location = useLocation();


// const hideNav = ["/seeker", "/SeekerProfile"].some((path) =>
//   location.pathname.startsWith(path)
// );
 return (<></>
//     <div>
//       {!hideNav && (
//        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#f0f4f8" , padding: "1rem 2rem" }}>
//   <div className="container-fluid d-flex justify-content-between align-items-center">
//     <span className="navbar-brand fw-bold fs-4 text-primary">Jobular</span>
    
//     <div className="navbar-nav fw-semibold d-flex flex-row">
//       <Link
//         className="nav-link text-dark mx-3"
//         to="/register"
//         style={{ fontSize: "20px" }}
//       >
//         Register
//       </Link>
//       <Link
//         className="nav-link text-dark mx-3"
//         to="/login"
//         style={{ fontSize: "20px" }}
//       >
//         Login
//       </Link>
//     </div>
//   </div>
// </nav>

//       )}

//    <Routes>

//   <Route path="/" element={<RegistrationComponent />} />
//   <Route path="/register" element={<RegistrationComponent />} />
//   <Route path="/login" element={<LoginComponent />} />

  
//   <Route path="/seeker" element={<SeekerNavbarLayout />}>
//     <Route index element={<Seeker />} /> 
//     <Route path="profile" element={<SeekerProfile />} /> 
//     <Route path="logout" element={<Logout />} /> 
//     <Route path="jobs" element={< AllJobs />} /> 
//     <Route path="add-education" element={< SeekerEducationSection />}/>
//   </Route>
// </Routes>
//     </div>
  );
};


const App = () => (
 
    // <AppContent />
    <>
    
    <Navbar/>
    <Outlet/>
    </>
)

export default App;




/** 
   <Routes>

  <Route path="/" element={<RegistrationComponent />} />
  <Route path="/register" element={<RegistrationComponent />} />
  <Route path="/login" element={<LoginComponent />} />

  
  <Route path="/seeker" element={<SeekerNavbarLayout />}>
    <Route index element={<Seeker />} /> 
    <Route path="profile" element={<SeekerProfile />} /> 
    <Route path="logout" element={<Logout />} /> 
    <Route path="jobs" element={< AllJobs />} /> 
    <Route path="add-education" element={< SeekerEducationSection />}/>
  </Route>
</Routes>*/