import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import AdminReportPopup from "./AdminReportPopup";

const AdminAllReports = () => {
  const [loadData, setLoadData] = useState([]);
  const [reportPopup, setReportPopup] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9000/admin/allreports")
      .then((res) => setLoadData(res.data))
      .catch((error) => console.error(error));
  }, []);

//    const suspendCompany = async (cid) => {
//     try {
//       await axios.patch(`http://localhost:9000/admin/suspend/${cid}`);
//       alert("Company suspended!");
//       setLoadData((prev) =>
//         prev.map((item) =>
//           item.cid === cid ? { ...item, status: -1 } : item
//         )
//       );
//     } catch (err) {
//       console.error(err);
//       alert("Failed to suspend company");
//     }
//   };

  return (
    <>
      <AdminNavbar />
      <div className="container">
        <h3>All Reports</h3>

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
              {loadData.map((rep, i) => (
                <tr key={i}>
                  <td>{rep.cname}</td>
                  <td>{rep.uname}</td>
                  <td>{rep.description}</td>
                  <td>{new Date(rep.date).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`badge bg-${
                        rep.status === 1
                          ? "success"
                          : rep.status === -1
                          ? "danger"
                          : "warning"
                      }`}
                    >
                      {rep.status === 1
                        ? "Reviewed"
                        : rep.status === -1
                        ? "Rejected/Suspended"
                        : "Pending"}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setSelectedComplaint([rep]);
                        setReportPopup(true);
                      }}
                      className="btn btn-sm btn-outline-primary me-2"
                    >
                      View
                    </button>
                 
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {reportPopup && (
          <AdminReportPopup
            setReportPopup={setReportPopup}
                      complaint={selectedComplaint}
                     
          />
        )}
      </div>
    </>
  );
};

export default AdminAllReports;
