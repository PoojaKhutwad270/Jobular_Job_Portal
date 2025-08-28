import React, { useEffect, useState } from "react"; 
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";
//import { useSelector } from "react-redux";

const phases = [
  "All Applications",
  "Round 1 (Aptitude)",       // renamed Phase 1
  "Round 2 (Coding)",         // renamed Phase 2
  "Round 3 (Technical Interview)",  // renamed Phase 3
  "Round 4 (HR Interview)",         // renamed Phase 4
  "Selected"
];

// Phase → Background color mapping (slightly softened colors)
const phaseColors = {
  0: "#cfe2ff", // light blue
  1: "#d1e7dd", // light green
  2: "#f8d7da", // light red
  4: "#fff3cd", // light orange
  5: "#fff9db"  // light yellow
};

export default function JobApplications() {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [applicants, setApplicants] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [moving, setMoving] = useState(false);
  const navigate = useNavigate();

  const {id} = useParams();
  const fetchApplicants = async () => {
    setLoading(true);
    try {
      const url =
        currentPhase === 0
          ? `https://localhost:7269/api/application/${id}`
          : `https://localhost:7269/api/application/${id}?phase=${currentPhase}`;
      const res = await axios.get(url);
      setApplicants(Array.isArray(res.data) ? res.data : []);
      setSelectedIds([]);
    } catch (err) {
      console.error("Failed to fetch applicants:", err);
      setApplicants([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPhase]);

  const toggleSelect = (id) => {
  
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const moveSelectedToNextPhase = async () => {
    if (selectedIds.length === 0) return;
    const targetPhase =
      currentPhase === 0 ? 1 : currentPhase === 5 ? 5 : Math.min(5, currentPhase + 1);

    setMoving(true);
    try {
      await axios.put(`https://localhost:7269/api/application/${id}/move-to-phase`, {
        appIds: selectedIds,
        newPhase: targetPhase
      });
      await fetchApplicants();
    } catch (err) {
      console.error("Failed to move applicants:", err);
      alert("Failed to move applicants. Check console for details.");
    } finally {
      setMoving(false);
    }
  };

  const handleSeeProfile = (id) => {
    navigate(`/applicant/${id}`);
  };

  // Disable checkbox if any applicant's phase is greater than currentPhase
  const hasApplicantsAhead = applicants.some(app => app.phase > currentPhase);

  return (
    <div className="container mt-4">
      {/* Top Tabs */}
      <ul className="nav nav-tabs mb-4">
        {phases.map((phase, idx) => (
          <li className="nav-item" key={idx}>
            <button
              className={`nav-link ${currentPhase === idx ? "active fw-bold" : "text-muted"}`}
              onClick={() => setCurrentPhase(idx)}
              style={{ cursor: "pointer" }}
            >
              {phase}
            </button>
          </li>

        ))}
      </ul>

      {/* Applicants Table */}
      <div
        className="shadow-sm rounded overflow-auto"
        style={{ maxHeight: "65vh", backgroundColor: "#fff" }}
      >
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status" />
          </div>
        ) : applicants.length === 0 ? (
          <div className="text-center text-secondary py-4 fst-italic">
            No applicants found.
          </div>
        ) : (
          <table className="table table-hover mb-0">
            <thead className="table-light sticky-top" style={{ top: 0 }}>
              <tr>
                <th scope="col">Select</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Qualification</th>
                <th scope="col">Experience (yrs)</th>
                <th scope="col">Phase</th>
                <th scope="col">Profile</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((app) => (
                <tr
                  key={app.appid}
                  style={{ backgroundColor: phaseColors[app.phase] || "#fff", cursor: "pointer" }}
                  onClick={() => handleSeeProfile(app.appid)}
                >
                  <td onClick={e => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(app.appid)}
                      onChange={() => toggleSelect(app.appid)}
                      disabled={hasApplicantsAhead}
                      
                      id={`select-${app.appid}`}
                    />
                  </td>
                  <td>{app.name}</td>
                  <td>{app.email}</td>
                  <td>{app.qualification || "N/A"}</td>
                  <td>{app.experience}</td>
                  <td>{app.phase}</td>
                  <td onClick={e => e.stopPropagation()}>
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => handleSeeProfile(app.appid)}
                    >
                      See Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Action Bar */}
        <div className="d-flex justify-content-between align-items-center px-3 py-2 border-top bg-light sticky-bottom">
          <div>
            <strong>{selectedIds.length}</strong> selected
          </div>
          <div>
            <button
              className="btn btn-primary"
              onClick={moveSelectedToNextPhase}
              disabled={
                selectedIds.length === 0 ||
                moving ||
                currentPhase === 5 ||
                hasApplicantsAhead
              }
            >
              {moving ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                  Moving...
                </>
              ) : currentPhase === 5 ? (
                "Final Phase"
              ) : (
                "Move Selected to Next Phase"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



// import React, { useEffect, useState } from "react"; 
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useNavigate } from "react-router-dom";

// const phases = [
//   "All Applications",
//   "Phase 1",
//   "Phase 2",
//   "Phase 3",
//   "Phase 4",
//   "Selected"
// ];

// // Phase → Background color mapping (slightly softened colors)
// const phaseColors = {
//   0: "#cfe2ff", // light blue
//   1: "#d1e7dd", // light green
//   2: "#f8d7da", // light red
//   4: "#fff3cd", // light orange
//   5: "#fff9db"  // light yellow
// };

// export default function JobApplications() {
//   const [currentPhase, setCurrentPhase] = useState(0);
//   const [applicants, setApplicants] = useState([]);
//   const [selectedIds, setSelectedIds] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [moving, setMoving] = useState(false);
//   const navigate = useNavigate();

//   const fetchApplicants = async () => {
//     setLoading(true);
//     try {
//       const url =
//         currentPhase === 0
//           ? "https://localhost:7269/api/application"
//           : `https://localhost:7269/api/application?phase=${currentPhase}`;
//       const res = await axios.get(url);
//       setApplicants(Array.isArray(res.data) ? res.data : []);
//       setSelectedIds([]);
//     } catch (err) {
//       console.error("Failed to fetch applicants:", err);
//       setApplicants([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchApplicants();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [currentPhase]);

//   const toggleSelect = (id) => {
//     setSelectedIds((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
//     );
//   };

//   const moveSelectedToNextPhase = async () => {
//     if (selectedIds.length === 0) return;
//     const targetPhase =
//       currentPhase === 0 ? 1 : currentPhase === 5 ? 5 : Math.min(5, currentPhase + 1);

//     setMoving(true);
//     try {
//       await axios.put("https://localhost:7269/api/application/move-to-phase", {
//         appIds: selectedIds,
//         newPhase: targetPhase
//       });
//       await fetchApplicants();
//     } catch (err) {
//       console.error("Failed to move applicants:", err);
//       alert("Failed to move applicants. Check console for details.");
//     } finally {
//       setMoving(false);
//     }
//   };

//   const handleSeeProfile = (id) => {
//     navigate(`/applicant/${id}`);
//   };

//   // Disable checkbox if any applicant's phase is greater than currentPhase
//   const hasApplicantsAhead = applicants.some(app => app.phase > currentPhase);

//   return (
//     <div className="container mt-4">
//       {/* Top Tabs */}
//       <ul className="nav nav-tabs mb-4">
//         {phases.map((phase, idx) => (
//           <li className="nav-item" key={idx}>
//             <button
//               className={`nav-link ${currentPhase === idx ? "active fw-bold" : "text-muted"}`}
//               onClick={() => setCurrentPhase(idx)}
//               style={{ cursor: "pointer" }}
//             >
//               {phase}
//             </button>
//           </li>
//         ))}
//       </ul>

//       {/* Applicants Table */}
//       <div
//         className="shadow-sm rounded overflow-auto"
//         style={{ maxHeight: "65vh", backgroundColor: "#fff" }}
//       >
//         {loading ? (
//           <div className="text-center py-5">
//             <div className="spinner-border text-primary" role="status" />
//           </div>
//         ) : applicants.length === 0 ? (
//           <div className="text-center text-secondary py-4 fst-italic">
//             No applicants found.
//           </div>
//         ) : (
//           <table className="table table-hover mb-0">
//             <thead className="table-light sticky-top" style={{ top: 0 }}>
//               <tr>
//                 <th scope="col">Select</th>
//                 <th scope="col">Name</th>
//                 <th scope="col">Email</th>
//                 <th scope="col">Qualification</th>
//                 <th scope="col">Experience (yrs)</th>
//                 <th scope="col">Phase</th>
//                 <th scope="col">Profile</th>
//               </tr>
//             </thead>
//             <tbody>
//               {applicants.map((app) => (
//                 <tr
//                   key={app.appid}
//                   style={{ backgroundColor: phaseColors[app.phase] || "#fff", cursor: "pointer" }}
//                   onClick={() => handleSeeProfile(app.appid)}
//                 >
//                   <td onClick={e => e.stopPropagation()}>
//                     <input
//                       type="checkbox"
//                       checked={selectedIds.includes(app.appid)}
//                       onChange={() => toggleSelect(app.appid)}
//                       disabled={hasApplicantsAhead}
//                       id={`select-${app.appid}`}
//                     />
//                   </td>
//                   <td>{app.name}</td>
//                   <td>{app.email}</td>
//                   <td>{app.qualification || "N/A"}</td>
//                   <td>{app.experience}</td>
//                   <td>{app.phase}</td>
//                   <td onClick={e => e.stopPropagation()}>
//                     <button
//                       className="btn btn-outline-primary btn-sm"
//                       onClick={() => handleSeeProfile(app.appid)}
//                     >
//                       See Profile
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}

//         {/* Action Bar */}
//         <div className="d-flex justify-content-between align-items-center px-3 py-2 border-top bg-light sticky-bottom">
//           <div>
//             <strong>{selectedIds.length}</strong> selected
//           </div>
//           <div>
//             <button
//               className="btn btn-primary"
//               onClick={moveSelectedToNextPhase}
//               disabled={
//                 selectedIds.length === 0 ||
//                 moving ||
//                 currentPhase === 5 ||
//                 hasApplicantsAhead
//               }
//             >
//               {moving ? (
//                 <>
//                   <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
//                   Moving...
//                 </>
//               ) : currentPhase === 5 ? (
//                 "Final Phase"
//               ) : (
//                 "Move Selected to Next Phase"
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import "bootstrap/dist/css/bootstrap.min.css";
// // import { useNavigate } from "react-router-dom";

// // const phases = [
// //   "All Applications",
// //   "Phase 1",
// //   "Phase 2",
// //   "Phase 3",
// //   "Phase 4",
// //   "Selected"
// // ];

// // // Phase → Background color mapping (slightly softened colors)
// // const phaseColors = {
// //   0: "#cfe2ff", // light blue
// //   1: "#d1e7dd", // light green
// //   2: "#f8d7da", // light red
// //   4: "#fff3cd", // light orange
// //   5: "#fff9db"  // light yellow
// // };

// // export default function JobApplications() {
// //   const [currentPhase, setCurrentPhase] = useState(0);
// //   const [applicants, setApplicants] = useState([]);
// //   const [selectedIds, setSelectedIds] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [moving, setMoving] = useState(false);
// //   const navigate = useNavigate();

// //   const fetchApplicants = async () => {
// //     setLoading(true);
// //     try {
// //       const url =
// //         currentPhase === 0
// //           ? "https://localhost:7269/api/application"
// //           : `https://localhost:7269/api/application?phase=${currentPhase}`;
// //       const res = await axios.get(url);
// //       setApplicants(Array.isArray(res.data) ? res.data : []);
// //       setSelectedIds([]);
// //     } catch (err) {
// //       console.error("Failed to fetch applicants:", err);
// //       setApplicants([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchApplicants();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [currentPhase]);

// //   const toggleSelect = (id) => {
// //     setSelectedIds((prev) =>
// //       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
// //     );
// //   };

// //   const moveSelectedToNextPhase = async () => {
// //     if (selectedIds.length === 0) return;
// //     const targetPhase =
// //       currentPhase === 0 ? 1 : currentPhase === 5 ? 5 : Math.min(5, currentPhase + 1);

// //     setMoving(true);
// //     try {
// //       await axios.put("https://localhost:7269/api/application/move-to-phase", {
// //         appIds: selectedIds,
// //         newPhase: targetPhase
// //       });
// //       await fetchApplicants();
// //     } catch (err) {
// //       console.error("Failed to move applicants:", err);
// //       alert("Failed to move applicants. Check console for details.");
// //     } finally {
// //       setMoving(false);
// //     }
// //   };

// //   const handleSeeProfile = (id) => {
// //     navigate(`/applicant/${id}`);
// //   };

// //   return (
// //     <div className="container mt-4">
// //       {/* Top Tabs */}
// //       <ul className="nav nav-tabs mb-4">
// //         {phases.map((phase, idx) => (
// //           <li className="nav-item" key={idx}>
// //             <button
// //               className={`nav-link ${currentPhase === idx ? "active fw-bold" : "text-muted"}`}
// //               onClick={() => setCurrentPhase(idx)}
// //               style={{ cursor: "pointer" }}
// //             >
// //               {phase}
// //             </button>
// //           </li>
// //         ))}
// //       </ul>

// //       {/* Applicants List */}
// //       <div
// //         className="shadow-sm rounded overflow-auto"
// //         style={{ maxHeight: "65vh", backgroundColor: "#fff" }}
// //       >
// //         {loading ? (
// //           <div className="text-center py-5">
// //             <div className="spinner-border text-primary" role="status" />
// //           </div>
// //         ) : applicants.length === 0 ? (
// //           <div className="text-center text-secondary py-4 fst-italic">
// //             No applicants found.
// //           </div>
// //         ) : (
// //           applicants.map((app) => (
// //             <div
// //               key={app.appid}
// //               className="card mb-3 shadow-sm rounded-3"
// //               style={{
// //                 cursor: "pointer",
// //                 backgroundColor: phaseColors[app.phase] || "#ffffff",
// //                 transition: "background-color 0.3s ease"
// //               }}
// //             >
// //               <div className="card-body d-flex align-items-center justify-content-between">
// //                 {/* Left: Info */}
// //                 <div className="d-flex align-items-center" style={{ gap: "16px" }}>
// //                   <img
// //                     src={
// //                       app.photoUrl ||
// //                       `https://ui-avatars.com/api/?name=${encodeURIComponent(
// //                         app.name
// //                       )}&background=0D6EFD&color=fff&rounded=true`
// //                     }
// //                     alt={app.name}
// //                     className="rounded-circle border border-primary"
// //                     width={64}
// //                     height={64}
// //                     style={{ objectFit: "cover" }}
// //                     onClick={(e) => {
// //                       e.stopPropagation();
// //                       handleSeeProfile(app.appid);
// //                     }}
// //                   />
// //                   <div>
// //                     <h5 className="mb-1 text-dark">{app.name}</h5>
// //                     <small className="text-muted d-block mb-1">
// //                       ID: <span className="text-black">{app.appid}</span>
// //                     </small>
// //                     <small className="text-muted d-block mb-1">
// //                       Email: <span className="text-black">{app.email}</span>
// //                     </small>
// //                     <small className="text-muted d-block mb-1">
// //                       Qualification: <span className="text-black">{app.qualification || "N/A"}</span>
// //                     </small>
// //                     <small className="text-muted d-block mb-1">
// //                       Experience: <span className="text-black">{app.experience} years</span>
// //                     </small>
// //                     <small className="text-muted d-block">
// //                       Phase: <span className="fw-semibold">{app.phase}</span>
// //                     </small>
// //                   </div>
// //                 </div>

// //                 {/* Right: Checkbox + Profile Button */}
// //                 <div
// //                   className="d-flex flex-column align-items-end"
// //                   onClick={(e) => e.stopPropagation()}
// //                 >
// //                   <div className="form-check mb-2">
// //                     <input
// //                       type="checkbox"
// //                       className="form-check-input"
// //                       checked={selectedIds.includes(app.appid)}
// //                       onChange={() => toggleSelect(app.appid)}
// //                       id={`select-${app.appid}`}
// //                     />
// //                     <label htmlFor={`select-${app.appid}`} className="form-check-label">
// //                       Select
// //                     </label>
// //                   </div>
// //                   <button
// //                     className="btn btn-outline-primary btn-sm"
// //                     onClick={() => handleSeeProfile(app.appid)}
// //                   >
// //                     See Profile
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           ))
// //         )}

// //         {/* Action Bar */}
// //         <div className="d-flex justify-content-between align-items-center px-3 py-2 border-top bg-light sticky-bottom">
// //           <div>
// //             <strong>{selectedIds.length}</strong> selected
// //           </div>
// //           <div>
// //             <button
// //               className="btn btn-primary"
// //               onClick={moveSelectedToNextPhase}
// //               disabled={selectedIds.length === 0 || moving || currentPhase === 5}
// //             >
// //               {moving
// //                 ? (
// //                   <>
// //                     <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
// //                     Moving...
// //                   </>
// //                 )
// //                 : currentPhase === 5
// //                 ? "Final Phase"
// //                 : "Move Selected to Next Phase"}
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


