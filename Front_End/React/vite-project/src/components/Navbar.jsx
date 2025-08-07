import { Link } from "react-router-dom";

const Navbar = () => {
    const hideNav = ["/seeker", "/SeekerProfile"].some((path) =>
        location.pathname.startsWith(path)
    );
    return <div>
        
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#f0f4f8", padding: "1rem 2rem" }}>
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    <span className="navbar-brand fw-bold fs-4 text-primary">Jobular</span>

                    <div className="navbar-nav fw-semibold d-flex flex-row">
                        <Link
                            className="nav-link text-dark mx-3"
                            to="/register"
                            style={{ fontSize: "20px" }}
                        >
                            Register
                        </Link>
                        <Link
                            className="nav-link text-dark mx-3"
                            to="/login"
                            style={{ fontSize: "20px" }}
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </nav>

        

        {/* <Routes>
    
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
    </Routes> */}
    </div>
}
export default Navbar