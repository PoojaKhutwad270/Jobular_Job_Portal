import React from "react";

const RecruiterForm = ({formDataRec,setFormDataRec}) => {


  const handleChange = (e) => {
    const { name, value, files } = e.target;

    const newValue = files ? files[0] : value;

   setFormDataRec((prev) => ({
      ...prev,
      [name]: newValue,
    }));

  };

  return (
    <div className="mt-4">
      <h5 className="text-primary mb-3">Company Registration</h5>
      <div className="row g-3">

        <div className="col-md-6">
          <label className="form-label">Company Name</label>
          <input
            type="text"
            name="cname"
            className="form-control rounded-3"
            value={formDataRec.cname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Company Address</label>
          <input
            type="text"
            name="caddress"
            className="form-control rounded-3"
            value={formDataRec.caddress}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">License Number</label>
          <input
            type="text"
            name="licence"
            className="form-control rounded-3"
            value={formDataRec.licence}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">PAN Card</label>
          <input
            type="text"
            name="pancard"
            className="form-control rounded-3"
            value={formDataRec.pancard}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Company Phone Number</label>
          <input
            type="text"
            name="company_phoneno"
            className="form-control rounded-3"
            value={formDataRec.company_phoneno}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Company Email</label>
          <input
            type="email"
            name="company_email"
            className="form-control rounded-3"
            value={formDataRec.company_email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Location</label>
          <input
            type="text"
            name="location"
            className="form-control rounded-3"
            value={formDataRec.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Upload Company Documents</label>
          <input
            type="file"
            name="documents"
            className="form-control rounded-3"
            onChange={handleChange}
            required
          />
        </div>

      </div>
    </div>
  );
};

export default RecruiterForm;
