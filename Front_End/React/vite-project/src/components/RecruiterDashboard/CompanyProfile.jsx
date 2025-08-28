

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// //import { useSelector } from "react-redux";


// const CompanyProfile = () => {
//     const [company, setCompany] = useState(null);
//     const [isOwner, setIsOwner] = useState(false);
//     const [editMode, setEditMode] = useState(false);
//     const [formData, setFormData] = useState({
//         cid: "",
//         cname: "",
//         email: "",
//         phone: "",
//         address: "",
//         location: "",
      
        

//     });

//     //const loggedInUser = useSelector((store) => store.loggedInUser);
//     useEffect(() => {
//         fetch(`https://localhost:7269/api/Company/GetCompanyById/$`)
//             .then((data) => data.json())
//             .then((res) => {
//                 setCompany(res);
//                 console.log(res);
//                 setFormData({
//                     cid: res.cid || "",
//                     cname: res.cname || "",
//                     email: res.company_email || "",
//                     phone: res.company_phoneno || "",
//                     address: res.caddress || "",
//                     location: res.location || "",
           
          
    
//                 });
//                 setIsOwner(true);
//             });
//     }, []);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleEditToggle = () => setEditMode((prev) => !prev);

//     const handleSave = async () => {
       
//         try {
//             console.log("formdata", formData.cid);
           
//           await axios.put(
//             `https://localhost:7269/api/Company/UpdateCompany/6`,
//             formData
//           );
//           alert("Profile updated successfully!");
//           setCompany({ ...company, ...formData });
//           setEditMode(false);
//         } catch (error) {
//           alert("Failed to update profile.", error);
//         }
        

//         if (!company && !isOwner)
//             return (
//                 <div className="container mt-5">
//                     <h4 className="text-danger text-center">
//                         Company profile not found or unauthorized.
//                     </h4>
//                 </div>
//             );
//     }
//             return (
//                 <div className="container my-5" style={{ maxWidth: "720px" }}>
//                     <h2 className="mb-4 text-center fw-bold text-primary">Company Profile</h2>

//                     <div className="card shadow-sm border-0 rounded-4">
//                         <div className="card-body p-4">
//                             {/* Profile Header */}
//                             <div className="d-flex align-items-center mb-4">
//                                 <div
//                                     className="bg-primary rounded-circle text-white d-flex justify-content-center align-items-center"
//                                     style={{ width: 80, height: 80, fontSize: "2.5rem", fontWeight: "700" }}
//                                 >
//                                     {formData.cname ? formData.cname.charAt(0).toUpperCase() : "C"}
//                                 </div>
//                                 <h3 className="ms-3 mb-0 fw-bold">{formData.cname || "Company Name"}</h3>
//                             </div>

//                             {/* Info Sections */}
//                             <div className="row g-4">
//                                 {/* Left Side: Contact Info */}
//                                 <div className="col-12">
//                                     <h5 className="mb-3 border-bottom pb-2 text-secondary fw-semibold">
//                                         Contact Information
//                                     </h5>

//                                     {/* Email */}
//                                     <div className="mb-3">
//                                         <label className="form-label fw-semibold text-muted">Email</label>
//                                         <input
//                                             type="email"
//                                             className={`form-control form-control-lg ${editMode ? "" : "border-0 bg-light"
//                                                 }`}
//                                             name="email"
//                                             value={formData.email}
//                                             onChange={handleChange}
//                                             readOnly={!editMode}
//                                         />
//                                     </div>

//                                     {/* Phone */}
//                                     <div className="mb-3">
//                                         <label className="form-label fw-semibold text-muted">Phone</label>
//                                         <input
//                                             type="tel"
//                                             className={`form-control form-control-lg ${editMode ? "" : "border-0 bg-light"
//                                                 }`}
//                                             name="phone"
//                                             value={formData.phone}
//                                             onChange={handleChange}
//                                             readOnly={!editMode}
//                                         />
//                                     </div>

//                                     {/* Address */}
//                                     <div className="mb-3">
//                                         <label className="form-label fw-semibold text-muted">Address</label>
//                                         <textarea
//                                             className={`form-control form-control-lg ${editMode ? "" : "border-0 bg-light"
//                                                 }`}
//                                             name="address"
//                                             rows="3"
//                                             value={formData.address}
//                                             onChange={handleChange}
//                                             readOnly={!editMode}
//                                             style={{ resize: "none" }}
//                                         ></textarea>
//                                     </div>

//                                     {/* Location */}
//                                     <div className="mb-3">
//                                         <label className="form-label fw-semibold text-muted">Location</label>
//                                         <input
//                                             type="text"
//                                             className={`form-control form-control-lg ${editMode ? "" : "border-0 bg-light"
//                                                 }`}
//                                             name="location"
//                                             value={formData.location}
//                                             onChange={handleChange}
//                                             readOnly={!editMode}
//                                         />
//                                     </div>
                          
//                                     {/* <div className="mb-3">
//                 <label className="form-label fw-semibold text-muted">City</label>
//                 <input
//                   type="text"
//                   className={`form-control form-control-lg ${
//                     editMode ? "" : "border-0 bg-light"
//                   }`}
//                   name="city"
//                   value={formData.cityname}
//                   onChange={handleChange}
//                   readOnly={!editMode}
//                 />
//               </div>               */}
//                                 </div>
//                             </div>

//                             {/* Action Buttons */}
//                             {isOwner && (
//                                 <div className="mt-4 d-flex justify-content-end gap-2">
//                                     {editMode ? (
//                                         <>
//                                             <button className="btn btn-success px-4" onClick={handleSave}>
//                                                 Save
//                                             </button>
//                                             <button
//                                                 className="btn btn-outline-secondary px-4"
//                                                 onClick={() => {
//                                                     setEditMode(false);
//                                                     setFormData({
//                                                         cid: company.cid || "",
//                                                         cname: company.cname || "",
//                                                         email: company.company_email || "",
//                                                         phone: company.company_phoneno || "",
//                                                         address: company.caddress || "",
//                                                         location: company.location || "",
//                                                     });
//                                                 }}
//                                             >
//                                                 Cancel
//                                             </button>
//                                         </>
//                                     ) : (
//                                         <button className="btn btn-primary px-4" onClick={handleEditToggle}>
//                                             Edit Profile
//                                         </button>
//                                     )}
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             );
//         }


// export default CompanyProfile;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
//import axios from "axios";

const CompanyProfile = () => {
  const [company, setCompany] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    cid: "",
    cname: "",
    email: "",
    phone: "",
    address: "",
    location: "",
  });
const loggedInUser = useSelector((store) => store.loggedInUser);
  useEffect(() => {
    fetch(`https://localhost:7269/api/Company/GetCompanyById/${loggedInUser.uid}`)
      .then((data) => data.json())
      .then((res) => {
        setCompany(res);
          console.log("Fetched company:", res);
          
        setFormData({
          cid: res.cid || "",
          cname: res.cname || "",
          email: res.company_email || "",
          phone: res.company_phoneno || "",
          address: res.caddress || "",
          location: res.location || "",
        });
        setIsOwner(true);
      })
      .catch((err) => {
        console.error("Failed to fetch company:", err);
        setIsOwner(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

   useEffect(() => {
 
//   try {
//     const response =  fetch('http://localhost:7269/api/Company/UpdateCompany/6', {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formData),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const updatedCompany = response.json();

//     alert('Profile updated successfully!');
//     setCompany(updatedCompany);
//     setEditMode(false);

//   } catch (error) {
//     alert('Failed to update profile: ' + error.message);
//   }


}, []);
 
  const handleEditToggle = () => setEditMode((prev) => !prev);

   const handleSave = async () => {
  try {
    console.log("Sending formData:", formData);

    const response = await fetch('http://localhost:7269/api/Company/UpdateCompany/${loggedInUser.uid}', {
      method: 'PATCH', // or 'PUT' if your backend expects PUT
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const updatedCompany = await response.json();

    alert('Profile updated successfully!');
    // update the company state properly by merging previous data with updated data
    setCompany((prev) => ({ ...prev, ...updatedCompany }));
    setFormData((prev) => ({ ...prev, ...updatedCompany }));
    setEditMode(false);

  } catch (error) {
    alert('Failed to update profile: ' + error.message);
    console.error(error);
  }
};

  
  if (!company && !isOwner)
    return (
      <div className="container mt-5">
        <h4 className="text-danger text-center">
          Company profile not found or unauthorized.
        </h4>
      </div>
    );

  return (
    <div className="container my-5" style={{ maxWidth: "720px" }}>
      <h2 className="mb-4 text-center fw-bold text-primary">Company Profile</h2>

      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-body p-4">
          {/* Profile Header */}
          <div className="d-flex align-items-center mb-4">
            <div
              className="bg-primary rounded-circle text-white d-flex justify-content-center align-items-center"
              style={{ width: 80, height: 80, fontSize: "2.5rem", fontWeight: "700" }}
            >
              {formData.cname ? formData.cname.charAt(0).toUpperCase() : "C"}
            </div>
            <h3 className="ms-3 mb-0 fw-bold">{formData.cname || "Company Name"}</h3>
          </div>

          {/* Info Sections */}
          <div className="row g-4">
            {/* Left Side: Contact Info */}
            <div className="col-12">
              <h5 className="mb-3 border-bottom pb-2 text-secondary fw-semibold">
                Contact Information
              </h5>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label fw-semibold text-muted">Email</label>
                <input
                  type="email"
                  className={`form-control form-control-lg ${editMode ? "" : "border-0 bg-light"}`}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  readOnly={!editMode}
                />
              </div>

              {/* Phone */}
              <div className="mb-3">
                <label className="form-label fw-semibold text-muted">Phone</label>
                <input
                  type="tel"
                  className={`form-control form-control-lg ${editMode ? "" : "border-0 bg-light"}`}
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  readOnly={!editMode}
                />
              </div>

              {/* Address */}
              <div className="mb-3">
                <label className="form-label fw-semibold text-muted">Address</label>
                <textarea
                  className={`form-control form-control-lg ${editMode ? "" : "border-0 bg-light"}`}
                  name="address"
                  rows="3"
                  value={formData.address}
                  onChange={handleChange}
                  readOnly={!editMode}
                  style={{ resize: "none" }}
                ></textarea>
              </div>

              {/* Location */}
              <div className="mb-3">
                <label className="form-label fw-semibold text-muted">Location</label>
                <input
                  type="text"
                  className={`form-control form-control-lg ${editMode ? "" : "border-0 bg-light"}`}
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  readOnly={!editMode}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {isOwner && (
            <div className="mt-4 d-flex justify-content-end gap-2">
              {editMode ? (
                <>
                  <button className="btn btn-success px-4" onClick={handleSave}>
                    Save
                  </button>
                  <button
                    className="btn btn-outline-secondary px-4"
                    onClick={() => {
                      setEditMode(false);
                      setFormData({
                        cid: company.cid || "",
                        cname: company.cname || "",
                        email: company.company_email || "",
                        phone: company.company_phoneno || "",
                        address: company.caddress || "",
                        location: company.location || "",
                      });
                    }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button className="btn btn-primary px-4" onClick={handleEditToggle}>
                  Edit Profile
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>)
};

export default CompanyProfile;
