import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useState } from "react";

function LoginPage() {
  const loginURL = "http://localhost:3001/api/users/login";
  const [error, setError] = useState("");

  const { getLoggedIn } = useContext(UserContext);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      await axios
        .post(loginURL, values)
        .catch((error) => setError(error.response.data.error));
      getLoggedIn();
      navigate("/");
    },
  });
  return (
    <div className="loginPage">
      <h3>Login</h3>
      <form onSubmit={formik.handleSubmit} className="loginForm">
        <input
          type="email"
          className="loginInput"
          placeholder="Email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        <input
          type="password"
          className="loginInput"
          placeholder="Password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        <button type="submit" className="gradient-class">
          Connect
        </button>
      </form>
      <Link to="/register" className="signupLink">
        Create account
      </Link>
      <div className="error">{error}</div>
    </div>
  );
}

export default LoginPage;
