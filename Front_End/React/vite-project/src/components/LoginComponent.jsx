// // import React, { useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { useNavigate } from "react-router-dom";
// // import {  loginFail } from "../features/userSlice";
// // import axios from "axios";
// // import LoggedInPageComponent from "./LoggedInPageComponent";
// // import { userAction } from "../store/userSlice";
// // import Seeker from "./SeekerDashboard";
// // import Navbar from "./Navbar";

// // const LoginComponent = () => {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   //const user = useSelector((state) => state.user);

// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");

// //   const loggedInUser = useSelector((store) => store.loggedInUser);
// //   console.log(loggedInUser);
// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     console.log(email);
// //     console.log(password);
// //     // let obj = { email: email, pwd: password };
// //     // fetch("http://localhost:8080/user/loginuser", {
// //     //   method: "POST",
// //     //   body: JSON.stringify(obj),
// //     // });

// //     try {
// //       const response = await axios.post(
// //         "http://localhost:8080/user/loginuser",
// //         {
// //           email,
// //           password,
// //         }
// //       );
// //       dispatch(userAction.loggedInUser(response.data));
// //       console.log("login done");
// //       const roleId = response.data.role.rid;


      
// //       if (roleId === 2) {
// //         navigate("/seeker");
// //       } else if (roleId === 1) {
// //         navigate("/admin");
// //       } else {
// //         alert("Invalid user");
// //       }
// //     } catch (error) {
// //       console.log("login not done",error);

// //       dispatch(loginFail("Invalid credentials"));
// //     }
// //   };

// //   return (
// //     <>
// //     <Navbar/>
// //     <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
// //         <div className="card shadow p-4 rounded-4 w-100" style={{ maxWidth: "700px" }}>
         
// //           <form onSubmit={handleLogin}>
// //             <h1 className="text-center mb-4">Please sign in</h1>
// //             <div className="form-floating">
// //               <input
// //                 className="form-control"
// //                 type="text"
// //                 id="email"
// //                 value={email}
// //                 placeholder="Enter email"
// //                 name="email"
// //                 onChange={(e) => setEmail(e.target.value)}
// //               />
// //               <label htmlFor="floatingInput">Email address</label>{" "}
// //             </div>
// //             <div className="form-floating">
// //               {" "}
// //               <input
// //                 type="password"
// //                 className="form-control mt-4"
// //                 name="pwd"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //               />
// //               <label htmlFor="floatingPassword">Password</label>
// //             </div>
// //             <br />
// //             <div className="form-check text-start my-3">
// //               {" "}
// //               <input
// //                 className="form-check-input"
// //                 type="checkbox"
// //                 value="remember-me"
// //                 id="checkDefault"
// //               />
// //               <label className="form-check-label" htmlFor="checkDefault">
// //                 Remember me
// //               </label>
// //             </div>{" "}
// //             <button className="btn rounded-pill px-5 fw-bold  btn-primary me-2" >
// //               Sign in
// //             </button>{" "}
// //           </form>{" "}
     
// //       </div>
// //       </div>
// //       </>
 
// //   );

// //   // return (
// //   //   <div>
// //   //  { user.isLoggedIn ? (
// //   //       <>
// //   //         <h1>Welcome {user.user.uname}</h1>
// //   //         <LoggedInPageComponent />
// //   //       </>
// //   //     ) : (
// //   //       <form className="container mb-4" onSubmit={handleLogin}>
// //   //         <label htmlFor="email" className="form-label">
// //   //           Email
// //   //         </label>
// //   //         <input
// //   //           type="text"
// //   //           className="form-control"
// //   //           id="email"
// //   //           value={email}
// //   //           placeholder="Enter email"
// //   //           name="email"
// //   //           onChange={(e) => setEmail(e.target.value)}
// //   //         ></input>
// //   //         <label htmlFor="pwd" className="form-label">
// //   //           Password
// //   //         </label>
// //   //          <input
// //   //            type="password"
// //   //            name="pwd"
// //   //            value={pwd}
// //   //            onChange={(e) => setPwd(e.target.value)}
// //   //          />
// //   //          <br />
// //   //          <input type="submit" className="btn btn-primary" name="login" />
// //   //          <br />
// //   //          {user.error && <p style={{ color: "red" }}>Error: {user.error}</p>}
// //   //        </form>
// //   //      )}
// //   //    </div>
// //   // );
// // };

// // export default LoginComponent;


// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from 'react-router-dom';
// import {  loginFail } from "../features/userSlice";
// import axios from "axios";
// import LoggedInPageComponent from "./LoggedInPageComponent";
// import { userAction } from "../store/userSlice";
// import Seeker from "./SeekerDashboard";
// import Navbar from "./Navbar";

// const LoginComponent = () => {
//   const dispatch = useDispatch();
//   const navigate=useNavigate();
//   //const user = useSelector((state) => state.user);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMsg,setErrorMsg]= useState("");
  
//   const loggedInUser = useSelector((store) => store.loggedInUser);
//   console.log(loggedInUser);
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     console.log(email);
//     console.log(password);
//     // let obj = { email: email, pwd: password };
//     // fetch("http://localhost:8080/user/loginuser", {
//     //   method: "POST",
//     //   body: JSON.stringify(obj),
//     // });

//     try {
//       const response = await axios.post(
//         "http://localhost:8080/user/loginuser",
//         {
//           email,
//           password,
//         }
//       );
//       dispatch(userAction.loggedInUser(response.data));
//       console.log("login done");
//        const roleId = response.data.role.rid;

//       if (roleId === 1) {
//      navigate("/admin");
//  }
//  else if (roleId === 2) {
//     navigate("/seeker");
//   }
//   else if(roleId===3){
//     navigate("/RecruiterDashboard")
//   }
//   else{
//     alert("Invalid user")
//   }
//     } catch (error) {
//       console.log("login not done",error);
//       setErrorMsg("Invalid username or password");
//       dispatch(loginFail("Invalid credentials"));
//     }
//   };

//   return (
//     <>
//     <Navbar/>
//     <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
//         <div className="card shadow p-4 rounded-4 w-100" style={{ maxWidth: "700px" }}>
         
//           <form onSubmit={handleLogin}>
//             <h1 className="text-center mb-4">Please sign in</h1>
//             <div className="form-floating">
//               <input
//                 className="form-control"
//                 type="text"
//                 id="email"
//                 value={email}
//                 placeholder="Enter email"
//                 name="email"
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//               <label htmlFor="floatingInput">Email address</label>{" "}
//             </div>
//             <div className="form-floating">
//               {" "}
//               <input
//                 type="password"
//                 className="form-control mt-4"
//                 name="pwd"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <label htmlFor="floatingPassword">Password</label>
//             </div>
//             <br />
           
//               {" "}
//              <h6>  {errorMsg}</h6>
              
//             <button className="btn rounded-pill px-5 fw-bold  btn-primary me-2" >
//               Sign in
//             </button>{" "}
//           </form>{""}
     
//       </div>
//       </div>
//       </>
 
//   );

 

// };

// export default LoginComponent;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginFail } from "../features/userSlice";
import axios from "axios";
import Navbar from "./Navbar";
import { userAction } from "../store/userSlice";

const LoginComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const loggedInUser = useSelector((store) => store.loggedInUser);
  console.log(loggedInUser);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateField = (name, value) => {
    let error = "";
    if (name === "email") {
      if (!value.trim()) {
        error = "Email is required";
      } else if (!emailRegex.test(value)) {
        error = "Invalid email format";
      }
    } else if (name === "password") {
      if (!value.trim()) {
        error = "Password is required";
      }
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateAll = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(email)) newErrors.email = "Invalid email format";

    if (!password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
  e.preventDefault();
  setErrorMsg("");

  if (!validateAll()) {
    return; // stop submit if validation fails
  }

  try {
    const response = await axios.post("http://localhost:8080/user/loginuser", {
      email,
      password,
    });
    dispatch(userAction.loggedInUser(response.data));
    console.log("login done");

    const roleId = response.data.role.rid;
    const status = response.data.status;
    const uid = response.data.uid;  // assuming this exists

    if (roleId === 1) {
      navigate("/admin");
    } else if (roleId === 2) {
      navigate("/seeker");
    } else if (roleId === 3) {
      // Only allow login if status is 1
      if (status === 1) {
        // Redirect recruiter to their individual dashboard using uid
        navigate(`/RecruiterDashboard/${uid}`);
      } else if (status === 0) {
        setErrorMsg("Your registration is under process");
      } else if (status === -1) {
        setErrorMsg("Sorry your registration was rejected");
      } else {
        setErrorMsg("Unknown status");
      }
    } else {
      alert("Invalid user");
    }
  } catch (error) {
    console.log("login not done", error);
    setErrorMsg("Invalid username or password");
    dispatch(loginFail("Invalid credentials"));
  }
};

  return (
    <>
      <Navbar />
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="card shadow p-4 rounded-4 w-100" style={{ maxWidth: "700px" }}>
          <form onSubmit={handleLogin} noValidate>
            <h1 className="text-center mb-4">Please sign in</h1>
            <div className="form-floating mb-3">
              <input
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                type="text"
                id="email"
                value={email}
                placeholder="Enter email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                onBlur={(e) => validateField("email", e.target.value)}
                required
              />
              <label htmlFor="email">Email address</label>
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                name="pwd"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={(e) => validateField("password", e.target.value)}
                required
              />
              <label htmlFor="password">Password</label>
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>
            <br />

            <h6 className="text-danger">{errorMsg}</h6>

            <button className="btn rounded-pill px-5 fw-bold btn-primary me-2">Sign in</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginComponent;

