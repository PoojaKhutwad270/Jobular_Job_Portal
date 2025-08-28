import React, { useState } from 'react';
import companylogo from "../../assets/companylogo.png";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminPopup = ({ setPopup, company}) => {
  console.log(company);
  const navigate = useNavigate();
  const [approval, setApproval] = useState(false);
  const [reject, setReject] = useState(false);
  return (
    <div>
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-3">
            <div className="modal-header">
              <h5 className="modal-title text-primary">Company Details</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setPopup(false)}
              ></button>
            </div>

            <div className="modal-body">
              <div className="row g-3">
                {company.map((com, i) => (
                  <div key={i}>
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={companylogo}
                        alt="Job"
                        height="50"
                        width="50"
                        className="rounded-circle border"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Company Name</label>
                      <div className="form-control bg-light">{com.cname}</div>
                      {com.cname}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Address</label>
                      <div className="form-control bg-light">{com.caddress}</div>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Licence</label>
                      <div className="form-control bg-light">{com.licence}</div>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">PAN ID</label>
                      <div className="form-control bg-light">{com.pancard}</div>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Phone no</label>
                      <div className="form-control bg-light">{com.company_phoneno}</div>
                    </div>

                    <div className="col-md-12">
                      <label className="form-label fw-semibold">Email</label>
                      <div className="form-control bg-light">{com.company_email}</div>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Location</label>
                      <div className="form-control bg-light">{com.location}</div>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Date</label>
                      <div className="form-control bg-light">{com.created_at}</div>
                    </div>

                    <div className="modal-footer">
                      {!approval ? (
                      
                        <button
                          className="btn btn-secondary"
                          onClick={() => {
                            axios
                              .patch(`http://localhost:9000/approve/${com.cid}`)
                              .then((res) => {
                                console.log(res);
                                setApproval(true);
                           
                                alert("approved");
                              })
                              .catch((err) => {
                                console.log("error", err);
                              });
                          }}
                        >
                          Approve
                        </button>
                      ) : (
                        <button className="btn btn-secondary" disabled>
                          Approved
                        </button>
                      )}


                     
                      {!reject ? (
                      
                        <button
                          className="btn btn-secondary"
                          onClick={() => {
                            axios
                              .patch(`http://localhost:9000/reject/${com.cid}`)
                              .then((res) => {
                                console.log(res);
                                setReject(true);
                           
                                alert("rejected");
                              })
                              .catch((err) => {
                                console.log("error", err);
                              });
                          }}
                        >
                          Reject
                        </button>
                      ) : (
                        <button className="btn btn-secondary" >
                          Rejected
                        </button>
                      )}

                      <button
                        className="btn btn-secondary"
                        onClick={() => {
                          setPopup(false);
                          navigate("/recruiter/profile");
                        }}
                      >

                        
                        Check Company Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
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
    </div>
  );
};

export default AdminPopup;



// import React, { useState } from 'react'
// import companylogo from "../../assets/companylogo.png"
// import axios from 'axios';
// const AdminPopup = ({ setPopup, company }) => {
//   console.log(company);

//   const [approval, setApproval] = useState(false);
  
 

//   return (
//       <div>
          
//             <div>
//               (
//               <div
//                 className="modal fade show d-block"
//                 tabIndex="-1"
//                 style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
//               >
//                 <div className="modal-dialog modal-dialog-centered">
//                   <div className="modal-content p-3">
//                     <div className="modal-header">
//                        <h5 className="modal-title text-primary">Company Details</h5>
//                       <button
//                         type="button"
//                         className="btn-close"
//                         onClick={() => setPopup(false)}
//                       ></button> 
//                     </div>
                     
           
         

//                           <div className="modal-body">
                              
//                               <div className="row g-3">
                                  

//  {company.map((com,i) =>
//                   (
//    <>
//       <div className="d-flex align-items-center gap-3  ">
//         <img
//                   src={companylogo} 
                  
//           alt="Job"
//           height="50"
//           width="50"
//           className="rounded-circle border"
//           style={{ objectFit: 'cover' }}
//                     /></div> 
                  
                 
                   
//                     <div key={i}>
//                       <div className="col-md-6">
                                      
//                       <label className="form-label fw-semibold">Company Name</label>
//                       <div className="form-control bg-light">{com.cname}</div>
//                     </div>
//                       <div className="col-md-6">
//                         <label className="form-label fw-semibold">Address</label>
//                         <div className="form-control bg-light">{com.caddress}</div>
//                       </div>
//                       <div className="col-md-6">
//                         <label className="form-label fw-semibold">Licence</label>
//                         <div className="form-control bg-light">{com.licence}</div>
//                       </div>

//                       <div className="col-md-6">
//                         <label className="form-label fw-semibold">PAN ID</label>
//                         <div className="form-control bg-light">{com.pancard}</div>
//                       </div>
//                       <div className="col-md-6">
//                         <label className="form-label fw-semibold">Phone no</label>
//                         <div className="form-control bg-light">{com.company_phoneno}</div>
//                       </div>

//                       <div className="col-md-12">
//                         <label className="form-label fw-semibold">Email</label>
//                         <div className="form-control bg-light">{com.company_email}</div>
//                       </div>

//                       <div className="col-md-6">
//                         <label className="form-label fw-semibold">Location</label>
//                         <div className="form-control bg-light">{com.location}</div>
//                       </div>
//                       <div className="col-md-6">
//                         <label className="form-label fw-semibold">Date</label>
//                         <div className="form-control bg-light">{com.created_at}</div>
//                       </div>
                                
                   
//                     </div>
                  
          

//                           <div className="modal-footer">
                            
//                   {(!approval) ?
//                     (<button
//          className="btn btn-secondary"
//          onClick={() => {
//            axios.patch(`/approve/${com.cid}`).then((res) => {
//              console.log(res);
//              setApproval(true);
//              alert("approved");
//            }).catch((err) => { console.log("error", err) })
//          }}
//                     >
//                       Approve
//                     </button>) : (<button
//                       className="btn btn-secondary"
                     
//                     >
//                       Approved
//                     </button>)}
//                                <button
//                         className="btn btn-secondary"
//                         onClick={() => setPopup(false)}
//                       >
//                        Check Company Profile
//                   </button></div>
//                   </>
//                     )
                  
//                       <button
//                         className="btn btn-secondary"
//                         onClick={() => setPopup(false)}
//                       >
//                         Close
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               )

//             </div>
          
// </div>
// </div>

//     </div>
//   )
// }

// export default AdminPopup;