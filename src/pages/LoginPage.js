import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const getDatafromLS = () => {
  const data = localStorage.getItem("user_login");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

const Logg = () => {
  const navigate = useNavigate();

  const [inpval, setInpval] = useState(getDatafromLS());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const regexEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const loginUser = (e) => {
    e.preventDefault();

    const getuserArr = localStorage.getItem("USER");

    if (email === "") {
      alert("Email field is requred", {
        position: "top-center",
      });
    } else if (!regexEmail.test(email)) {
      alert("Please enter valid email address", {
        position: "top-center",
      });
    } else if (password === "") {
      alert("Password field is requred", {
        position: "top-center",
      });
    } else if (password.length < 8) {
      alert("Password length greater eight", {
        position: "top-center",
      });
    } else {
      if (getuserArr && getuserArr.length) {
        const userdata = JSON.parse(getuserArr);
        const userlogin = userdata.filter((el, k) => {
          return el.email === email && el.password === password;
        });

        if (userlogin.length === 0) {
          alert("invalid details");
        } else {
          setInpval(userlogin);
          localStorage.setItem("user_login", JSON.stringify(userlogin));
          alert("Login succeeded!!");
          navigate("/Shop");
        }
      }
    }
  };
  useEffect(() => {
    localStorage.setItem("user_login", JSON.stringify(inpval));
  }, [inpval]);

  return (
    <>
      <div className="container mt-3">
        <section className="d-flex justify-content-between">
          <div className="left_data mt-3 p-3" style={{ width: "100%" }}>
            <h3 className="text-center col-lg-6 mb-3">Sign In</h3>
            <Form>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </Form.Group>

              <Form.Group
                className="mb-3 col-lg-6"
                controlId="formBasicPassword"
              >
                <Form.Control
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </Form.Group>
              <Button
                variant="primary"
                className="col-lg-6"
                onClick={loginUser}
                style={{ background: "rgba(0, 0, 0,0.75)" }}
                type="submit"
              >
                SIGN IN
              </Button>
            </Form>
            <p className="mt-3">
              Create an account?{" "}
              <Link to="/Registration" style={{ textDecoration: "none" }}>
                Sign up
              </Link>
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default Logg;
