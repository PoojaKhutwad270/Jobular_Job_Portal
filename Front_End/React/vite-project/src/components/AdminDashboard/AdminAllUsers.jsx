import React, { useEffect, useState } from "react";
import axios from "axios";

import AdminUserCard from "./AdminUserCard";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AdminNavbar from "./AdminNavbar";

const AdminAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:9000/admin/allusers")
      .then(res => {
        console.log(res.data);
        setUsers(res.data[0] || []);
       setRoles(res.data[1] || []); 
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
    
      <AdminNavbar/>
      <div className="container  ">
        <div className="d-flex justify-content-end">
        <div className="dropdown m-2">
    <button
      className="btn btn-secondary dropdown-toggle"
      type="button"
      data-bs-toggle="dropdown"
    >
      Filter
    </button>
    <ul className="dropdown-menu dropdown-menu-end">
     {roles.map((role, index) => (
  <li key={index}>
    <a className="dropdown-item" href="#">
      {role.rname}
    </a>
  </li>
))}
    </ul>
  </div>
   </div>
        <div className="row justify-content-center">
          
         
            <h3 className=" mt-2 bold text-2 text-black">Users</h3>

              {loading ? (
                <p className="text-muted">Loading...</p>
              ) : users.length === 0 ? (
                <p>No users found.</p>
              ) :(
                  
                  <>
                
                    
                <div className="table-responsive">
                  <table className="table table-hover table-bordered align-middle">
                   
                    <tbody>
                      {users.map((user) => (
                       
                         
                        <AdminUserCard name={user.uname} email={user.email} role={user.rname} location={user.cityname} />
                        
                      ))}
                            
                    </tbody>
                  </table>
                </div>
             </> )}
            </div>
          </div>
        
      
    </>
  );
};

export default AdminAllUsers;
