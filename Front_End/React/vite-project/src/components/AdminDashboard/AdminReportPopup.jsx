
import React, { useState, useEffect } from 'react';
import companylogo from "../../assets/companylogo.png";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminReportPopup = ({ setReportPopup, complaint }) => {
  const navigate = useNavigate();
  const [block, setBlock] = useState(false);
  const [complaintCounts, setComplaintCounts] = useState({});

  // Fetch total complaints for each company
  useEffect(() => {
    complaint.forEach((com) => {
      axios
        .get(`http://localhost:9000/totalreport/${com.cid}`)
        .then((res) => {
          setComplaintCounts((prev) => ({
            ...prev,
            [com.cid]: res.data.total || 0,
          }));
        })
        .catch((err) => console.log(err));
    });
  }, [complaint]);

  const handleBlock = (cid) => {
    axios
      .patch(`http://localhost:9000/block/${cid}`)
      .then(() => {
        setBlock(true);
        alert("Company suspended successfully");
      })
      .catch((err) => console.log("error", err));
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-3">
          <div className="modal-header">
            <h5 className="modal-title text-primary">Reported Company Details</h5>
            <button type="button" className="btn-close" onClick={() => setReportPopup(false)}></button>
          </div>

          <div className="modal-body">
            {complaint.map((com, i) => (
              <div key={i} className="mb-4 border-bottom pb-3">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <img
                    src={companylogo}
                    alt="Company"
                    height="50"
                    width="50"
                    className="rounded-circle border"
                    style={{ objectFit: "cover" }}
                  />
                  <div>
                    <h6 className="mb-0 fw-bold">{com.cname}</h6>
                    <small className="text-muted">{com.location}</small>
                  </div>
                </div>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Address</label>
                    <div className="form-control bg-light">{com.caddress}</div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Licence</label>
                    <div className="form-control bg-light">{com.licence}</div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Reported By (User)</label>
                   
                   <div className="small">
 
  <span className='form-control bg-light'
    style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
    onClick={() => navigate(`/admin/user/${com.uid}`)}
  >
    {com.uname}
  </span>
</div>
                   
                            
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Reporter PAN</label>
                    <div className="form-control bg-light">{com.pancard}</div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Contact No</label>
                    <div className="form-control bg-light">{com.company_phoneno}</div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Total Complaints</label>
                    <div className="form-control bg-light">
                      {complaintCounts[com.cid] ?? "Loading..."}
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  {!block ? (
                    <button className="btn btn-danger me-2" onClick={() => handleBlock(com.cid)}>
                      Suspend Company
                    </button>
                  ) : (
                    <button className="btn btn-secondary me-2" disabled>
                      Suspended
                    </button>
                  )}
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/recruiter/profile/${com.cid}`)}
                  >
                    View Company Profile
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={() => setReportPopup(false)}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReportPopup;
