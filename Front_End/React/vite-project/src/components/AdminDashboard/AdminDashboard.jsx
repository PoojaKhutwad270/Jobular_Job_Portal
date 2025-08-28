


import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminPopup from "./AdminPopup";
import AdminNavbar from "./AdminNavbar";
import AdminReportPopup from "./AdminReportPopup";


const AdminDashboard = () => {
  const [loadedInfo, setLoadedInfo] = useState({});

  const [popup, setPopup] = useState(false);

const [reportPopup, setReportPopup] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState([]);
   const [selectedComplaint, setSelectedComplaint] = useState([]);
  useEffect(() => {
    axios
      .get("/dashboard")
      .then((res) => setLoadedInfo(res.data))
      .catch((err) => console.error("err", err));
  }, []);





  return (
    <>
      
      <AdminNavbar/>
      {/*Navbar*/}
      {/* 
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold">Admin Panel</span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#adminNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="adminNavbar">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/admin/allusers">Users</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/admin/alljobs">Jobs</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/admin/allrequests">Requests</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/admin/allreports">Reports</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/admin/adminProfile">Profile</Link></li>
            </ul>
            <button className="btn btn-outline-light">Logout</button>
          </div>
        </div>
      </nav> */}

      
      <div className="container mt-5">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 mb-4">
            <div className="card shadow-sm p-3 border rounded-4" style={{ position: 'sticky', top: '60px' }}>
              <div className="text-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="Admin"
                  className="rounded-circle mb-2"
                  width="80"
                  height="80"
                />
                <h5 className="text-primary fw-bold mb-0">Admin</h5>
                <p className="text-muted small">System Administrator</p>
              </div>
              <hr />
              <nav className="nav flex-column">
                <Link className="nav-link py-1" to="/admin/allusers">Manage Users</Link>
                <a className="nav-link py-1" href="/admin/#recruiterRequest">Review Requests</a>
                <a className="nav-link py-1" href="/admin/#reports">Review Reports</a>
                <Link className="nav-link py-1" to="/admin/adminProfile">Profile Settings</Link>
              </nav>
            </div>
          </div>

          
          {/* Dashboard Content */}
              
                <div className="col-md-9">
            {/* Stats Section */}
            <div className="row g-3 mb-4">
              {[
                { title: "Pending Requests", count: loadedInfo.requestsNum },
                { title: "Pending Reports", count: loadedInfo.reportsNum },
                { title: "Total Users", count: loadedInfo.totalUsers },
                { title: "Job Seekers", count: loadedInfo.jobSeekers },
                { title: "Recruiters", count: loadedInfo.recruiters },
                { title: "Jobs Posted", count: loadedInfo.jobs },
                { title: "Active Jobs", count: loadedInfo.activeJobs },
              ].map((stat, i) => (
                <div key={i} className="col-md-4">
                  <div className="card shadow-sm border-0 rounded-3 bg-light h-100">
                    <div className="card-body">
                      <h6 className="text-muted">{stat.title}</h6>
                      <h4 className="fw-bold text-primary">{stat.count ?? "—"}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recruiter Requests Table */}
            <div className="card shadow-sm border-0 mb-4 rounded-3" >
              <div className="card-header bg-white fw-bold" id="recruiterRequest">Latest Recruiter Requests</div>
              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th>Requested By</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(loadedInfo.requests || []).map((req, i) => (
                      <tr key={i}>
                        <td>{req.cname}</td>
                        <td>{req.uname}</td>
                        <td>{new Date(req.created_at).toLocaleDateString()}</td>
                        <td>
                          {
                        
 
}
 <span className={`badge bg-${
   req.status === 1 ? "success" : req.status === -1 ? "danger" : "warning"
  }`}>
    {req.status === 1
      ? "Approved"
      : req.status === -1
      ? "Rejected"
      : "Pending"}
  </span>
                        
                        </td>
                        <td><button onClick={() => {
                               setSelectedCompany([req]);
                          setPopup(true);
                        }} className="btn btn-sm btn-outline-primary">View</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {(popup) && (
             
              <div>
                <AdminPopup setPopup={setPopup}  company={selectedCompany}/>
              {/* (
              <div
                className="modal fade show d-block"
                tabIndex="-1"
                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content p-3">
                    <div className="modal-header">
                      <h5 className="modal-title">Hello!</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setPopup(false)}
                      ></button>
                    </div>
                    <div className="modal-body">
                      <p>This is a popup inside Navbar.</p>
                    </div>
                    <div className="modal-footer">
                      <button
                        className="btn btn-secondary"
                        onClick={() => setPopup(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              ) */}

            </div>
          )
            }  
            
            {/* Reports Table */}
            <div className="card shadow-sm border-0 rounded-3">
              <div className="card-header bg-white fw-bold " id="reports">Latest Reports</div>
              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th>Reported By</th>
                      <th>Complaint</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(loadedInfo.reports || []).map((rep, i) => (
                      <tr key={i}>
                        { console.log("rep", rep) }
                        <td>{rep.cname}</td>
                        <td>{rep.uname}</td>
                        <td>{rep.description}</td>
                        <td>{new Date(rep.date).toLocaleDateString()}</td>
                        <td>
                          <span className={`badge bg-${
   rep.status === 1 ? "success" : rep.status === -1 ? "danger" : "warning"
  }`}>
    {rep.status === 1
      ? "Reviewed"
      : rep.status === -1
      ? "Rejected"
      : "Pending"}
                          </span>
                          
               
                        </td>
                        <td><button onClick={() => { setReportPopup(true); setSelectedComplaint([rep])} } className="btn btn-sm btn-outline-primary">View</button></td>
                      </tr>
                      
                    ))}
                  </tbody>
                  </table>
              
                {(reportPopup) && (
             
                  <div>
                    <AdminReportPopup setReportPopup={setReportPopup} complaint={selectedComplaint} />
                  </div>)}
                
                
</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;




// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";


// //       [Dashboard] | [Users] | [Jobs] |[Requests]| [Reports] |{" "}
// //       <Link to="/AdminProfile">[Profile]</Link> | [Logout]
// //       <br />
// //       <br />
// //       <br />
// //       {/*No of pending requests*/}
// //       {/*No of pending complaiants*/}
// //       {/* no of users*/}
// //       {/* no of seekers*/}
// //       {/*no of recruiters*/}
// //       {/* Total Jobs Posted*/}
// //       {/* Active Jobs*/}
// //       {/*Total Reports/Flags*/}

// const AdminDashboard = () => {
//   const [loadedInfo, setLoadedInfo] = useState({});
 
//   console.log(loadedInfo);
//   useEffect(()=>{
// axios.get("/dashboard").then(res=>{setLoadedInfo(res.data);
//  console.log(res.data);
// }).catch((err) => { console.error("err", err) });
    
//    // axios.get("request").then(res => { setRequest(res.data) }).catch((err) => { console.log("err", err) });
    
// },[])
//  console.log(loadedInfo.reports);
//   return (
//     <div>
//       {/* Bootstrap Navigation Bar */}
//       <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
//         <div className="container-fluid">
//           <a className="navbar-brand" href="#">
//             Admin Panel
//           </a>
           
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#adminNavbar"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="adminNavbar">
//             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//               <li className="nav-item">
                
//                     <Link className="nav-link active" to="/dashboard">
//                   Dashboard
//                   </Link>
                  
              
//               </li>
//               <li className="nav-item">
                
//                 <Link className="nav-link " to="/admin/allusers">
//                     Users
//                   </Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/jobs">
//                   Jobs
//                   </Link>
  
              
//               </li>
//               <li className="nav-item">
               
//                 <Link className="nav-link" to="/admin/allrequests">
//                   Requests
//                   </Link>
//               </li>
//               <li className="nav-item">
              
//                 <Link className="nav-link" to="/admin/allreports">
//                       Reports
//                   </Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/admin/adminProfile">
//                   Profile
//                 </Link>
//               </li>
//             </ul>
//             <button className="btn btn-outline-light" type="button">
//               Logout
//             </button>
            
//           </div>
//         </div>
//       </nav>

//       {/* Main Dashboard Container */}
//       <div className="container-fluid p-4">
//         {/* Top Bar */}
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <h2 className="mb-0">Admin Dashboard</h2>
//           <div className="dropdown">
//             <button
//               className="btn btn-secondary dropdown-toggle"
//               type="button"
//               data-bs-toggle="dropdown"
//             >
//               Admin
//             </button>
//             <ul className="dropdown-menu dropdown-menu-end">
//               <li>
//                 <a className="dropdown-item" href="#">
//                   Settings
//                 </a>
//               </li>
//               <li>
//                 <a className="dropdown-item" href="#">
//                   Logs
//                 </a>
//               </li>
//               <li>
//                 <hr className="dropdown-divider" />
//               </li>
//               <li>
//                 <a className="dropdown-item" href="#">
//                   Logout
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Dashboard Statistics */}
//         <div className="row mb-4">
//           {[
//             { title: "Pending Requests", count: loadedInfo.requestsNum },
//             { title: "Pending Reports / Flags", count: loadedInfo.reportsNum },
//             { title: "Total Users", count: loadedInfo.totalUsers},
//             { title: "Job Seekers", count: loadedInfo.jobSeekers },
//             { title: "Recruiters", count: loadedInfo.recruiters },
//             { title: "Total Jobs Posted", count: loadedInfo.jobs },
//             { title: "Active Jobs", count: loadedInfo.activeJobs},
//           ].map((stat, idx) => (
//             <div className="col-md-3 mb-3" key={idx}>
//               <div className="card text-white bg-dark h-100">
//                 <div className="card-body">
//                   <h5 className="card-title">{stat.title}</h5>
//                   <p className="card-text display-6">{stat.count}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Recruiter Requests Table */}
//         <div className="card mb-4">
//           <div className="card-header">Latest Recruiter Requests</div>
//           <div className="card-body p-0">
//             <table className="table mb-0">
//               <thead className="table-light">
//                 <tr>
//                   <th>Company</th>
//                   <th>Requested By</th>
//                   <th>Date Posted</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>

//                      <tbody>
//                 {loadedInfo.requests &&
//                   loadedInfo.requests.map((req, i) => (
//                     <tr key={i}>
//                       <td>{req.cname}</td>
//                       <td>{req.uname}</td>
                      
//                       <td>{new Date(req.created_at).toLocaleDateString()}</td>
//                       <td>
//                         <span
//                           className={`badge bg-${
//                             req.status === 1 ? "success" : "warning"
//                           }`}
//                         >
//                           {req.status === 1 ? "Approved" : "Pending"}
//                         </span>
//                       </td>
//                       <td>
//                         <button className="btn btn-sm btn-outline-secondary">
//                           View
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

        
//         {/*Reports*/}
        
      
//  <div className="card mb-4">
//           <div className="card-header">Latest Recruiter Requests</div>
//           <div className="card-body p-0">
//             <table className="table mb-0">
//               <thead className="table-light">
//                 <tr>
//                   <th>Company</th>
//                   <th>Reported By</th>
//                    <th>Complaint</th>
//                   <th>Date Posted</th>
//                   <th>Status</th>
//                 </tr>
                  
//               </thead>
//                      <tbody>
//                 {loadedInfo.reports &&
//                   loadedInfo.reports.map((rep, i) => (
//                     <tr key={i}>
//                       <td>{rep.cname}</td>
//                       <td>{rep.uname}</td>
                     
//                       <td>{new Date(rep.date).toLocaleDateString()}</td>
//                       <td>
//                         <span
//                           className={`badge bg-${
//                             rep.status === 1 ? "success" : "warning"
//                           }`}
//                         >
//                           {rep.status === 1 ? "Approved" : "Pending"}
//                         </span>
//                       </td>
//                       <td>
//                         <button className="btn btn-sm btn-outline-secondary">
//                           View
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;