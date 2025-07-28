import { useReducer, useRef } from "react";
import { data } from "react-router-dom";

const Login = () => {
  const emailElement = useRef();
  const pwdElement = useRef();
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(emailElement.current.value);
    console.log(pwdElement.current.value);
    let email = emailElement.current.value;
    let password = pwdElement.current.value;
    let obj = {
      email,
      password,
    };

    // let o = JSON.stringify(obj);
    // console.log(o);

    fetch("http://localhost:8080/user/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    }).then((data) => console.log(data));
  };

  return (
    <main className="form-signin w-100 m-auto">
      {" "}
      <form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>{" "}
        <div className="form-floating">
          {" "}
          <input
            type="email"
            ref={emailElement}
            className="form-control mb-2"
            id="floatingInput"
            placeholder="name@example.com"
          />{" "}
          <label htmlFor="floatingInput">Email address</label>{" "}
        </div>
        <div className="form-floating">
          {" "}
          <input
            ref={pwdElement}
            type="password"
            className="form-control mt-4"
            id="floatingPassword"
            placeholder="Password"
          />{" "}
          <label htmlFor="floatingPassword ">Password</label>{" "}
        </div>{" "}
        <div className="form-check text-start my-3">
          {" "}
          <input
            className="form-check-input"
            type="checkbox"
            value="remember-me"
            id="checkDefault"
          />{" "}
          <label className="form-check-label" htmlFor="checkDefault">
            Remember me
          </label>{" "}
        </div>{" "}
       <button type="submit" className="btn rounded-pill px-5 fw-bold" style={{ backgroundColor: "#7795b3ff"}}>
                Register
              </button>
       
      </form>{" "}
    </main>
  );
};
export default Login;
