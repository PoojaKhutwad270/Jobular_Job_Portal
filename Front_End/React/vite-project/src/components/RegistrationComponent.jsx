import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import RecruiterForm from "./RecruiterForm";

const RegistrationComponent = () => {
  const [formData, setFormData] = useState({
    uname: "",
    email: "",
    phone_no: "",
    address: "",
    password: "",
    role: { rid: "" },
    city: { cityid: "" },
  });
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobnoError, setMobnoError] = useState("");
  const [cities, setCities] = useState([]);
  const [dynamicForm, setDynamicForm] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/city/all")
      .then((response) => {
        setCities(response.data);
      })
      .catch((error) => {
        console.error("error fetching cities:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "rid") {
      setFormData({
        ...formData,
        role: { ...formData.role, rid: value },
      });
      if (value == 3) {
        console.log("rid:" + value);
        setDynamicForm(true);
      }
    } else if (name === "cityid") {
      setFormData({
        ...formData,
        city: { ...formData.city, cityid: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    const email = formData.email;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const password = formData.password;
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const mobno = formData.phone_no;
    const mobnoRegex = /^\d{10}$/;

    if (!emailRegex.test(email)) {
      setEmailError("Invalid Email");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character."
      );
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!mobnoRegex.test(mobno)) {
      setMobnoError("Phone number should be 10 digits long");
      isValid = false;
    } else {
      setMobnoError("");
    }

    if (!isValid) return;

    console.log("Form Data Sent:", formData);
    try {
      await axios.post("http://localhost:8080/user/save", formData);

      alert("Registration successful!");
      setFormData({
        uname: "",
        email: "",
        phone_no: "",
        address: "",
        password: "",
        role: { rid: "" },
        city: { cityid: "" },
      });
    } catch (error) {
      console.error(error);
      alert("Registration failed.");
    }

    /*  {dynamicForm == true ? 
    /  

    }*/
  };

  return (
    <>
      {/* Form Container */}
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <div
          className="card shadow p-4 rounded-4 w-100"
          style={{ maxWidth: "900px" }}
        >
          <h2 className="text-center mb-4">Register</h2>
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-6">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control rounded-3"
                name="uname"
                value={formData.uname}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className={`form-control rounded-3 ${
                  emailError ? "is-invalid" : ""
                }`}
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {emailError && (
                <div className="invalid-feedback">{emailError}</div>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className={`form-control rounded-3 ${
                  passwordError ? "is-invalid" : ""
                }`}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {passwordError && (
                <div className="invalid-feedback">{passwordError}</div>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label">Phone Number</label>
              <input
                type="number"
                className={`form-control rounded-3 ${
                  mobnoError ? "is-invalid" : ""
                }`}
                name="phone_no"
                value={formData.phone_no}
                onChange={handleChange}
                required
              />
              {mobnoError && (
                <div className="invalid-feedback">{mobnoError}</div>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label">Role</label>
              <select
                className="form-select rounded-3"
                name="rid"
                value={formData.role.rid}
                onChange={handleChange}
                required
              >
                <option value="">Select Role</option>
                <option value="2">Job Seeker</option>
                <option value="3">Recruiter</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">City</label>
              <select
                className="form-select rounded-3"
                name="cityid"
                value={formData.city.cityid}
                onChange={handleChange}
                required
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city.cityid} value={city.cityid}>
                    {city.cityname}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-control rounded-3"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            {dynamicForm == true ? <RecruiterForm /> : null}
            <div className="col-12 form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="checkTerms"
                required
              />
              <label className="form-check-label ms-2" htmlFor="checkTerms">
                I agree to the terms and conditions
              </label>
            </div>

            <div className="col-12 text-center">
              <button
                type="submit"
                className="btn rounded-pill px-5 fw-bold"
                style={{ backgroundColor: "#8baed2ff" }}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegistrationComponent;
