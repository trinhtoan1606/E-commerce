import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

// getting the values of local storage
const getDatafromLS = () => {
  const data = localStorage.getItem("USER");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

export const Res = () => {
  const [users, setUsers] = useState(getDatafromLS());

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const regexEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const regexPhone = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;

  // form submit event
  const handleAddBookSubmit = (e) => {
    e.preventDefault();

    if (name === "") {
      alert(" Name field is requred!", {
        position: "top-center",
      });
    } else if (email === "") {
      alert("Email field is requred", {
        position: "top-center",
      });
    } else if (!regexEmail.test(email)) {
      alert("Please enter valid email address", {
        position: "top-center",
      });
    } else if (users.find((item) => item.email === email)) {
      alert("Email da dc su dung", {
        position: "top-center",
      });
      setEmail("");
    } else if (users.find((item) => item.phone === phone)) {
      alert("Phone number da dc su dung", {
        position: "top-center",
      });
      setPhone("");
    } else if (!regexPhone.test(phone)) {
      alert("Phone number field is requred", {
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
      let user = {
        name,
        email,
        phone,
        password,
      };
      setUsers([...users, user]);
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      alert("Sign up succeeded!!");
    }
  };

  // saving data to local storage
  useEffect(() => {
    localStorage.setItem("USER", JSON.stringify(users));
  }, [users]);

  return (
    <>
      <div className="container mt-3">
        <section className="d-flex justify-content-between">
          <div className="left_data mt-3 p-3" style={{ width: "100%" }}>
            <h3 className="text-center col-lg-6 mb-3">Sign Up</h3>
            <Form>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicName">
                <Form.Control
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </Form.Group>

              <Form.Group className="mb-3 col-lg-6" controlId="formBasicPhone">
                <Form.Control
                  type="text"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone"
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
                onClick={handleAddBookSubmit}
                style={{ background: "rgba(0, 0, 0,0.75)" }}
                type="submit"
              >
                SIGN UP
              </Button>
            </Form>
            <p className="mt-3">
              Already Have an Account?{" "}
              <Link to="/Login" style={{ textDecoration: "none" }}>
                Sign in
              </Link>
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default Res;
