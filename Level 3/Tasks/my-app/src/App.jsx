import React, { useState } from "react";
import { useFormik } from "formik";
import "./App.css";
import "./Popup.css";

const validate = (values) => {
  const errors = {};

  if (!values.firstname) {
    errors.firstname = "*Required";
  } else if (values.firstname.length > 10) {
    errors.firstname = "*Must be 10 characters or less";
  }

  if (!values.lastname) {
    errors.lastname = "*Required";
  } else if (values.lastname.length > 10) {
    errors.lastname = "*Must be 10 characters or less";
  }

  if (!values.email) {
    errors.email = "*Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "*Invalid email address";
  }

  if (!values.password) {
    errors.password = "*Required";
  } else if (values.password.length < 4) {
    errors.password = "*Must be at least 4 characters";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "*Required";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "*Passwords must match";
  }

  return errors;
};

const Popup = ({ onClose }) => {
  return (
    <div className="Popup">
      <h2>Popup Content</h2>
      <h1 className="close" onClick={onClose}>×</h1>
      <br />
      <br />
      <center>
        <span className="tick">&#10003;</span>
      </center>
      <h2 className="text2">You have<br /> successfully signed up</h2>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

const App = () => {
  const [bool, setBool] = useState(false);
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: (values) => {
      setBool(true);
      console.log(values);
    },
  });

  return (
    <div className="main">
      <div className="sign formik">
        <h1>Sign up here</h1>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            placeholder="First name ..."
            name="firstname"
            autoComplete="off"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstname}
          />
          {formik.touched.firstname && formik.errors.firstname ? <span>{formik.errors.firstname}</span> : null}

          <input
            type="text"
            placeholder="Last name ..."
            name="lastname"
            autoComplete="off"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastname}
          />
          {formik.touched.lastname && formik.errors.lastname ? <span>{formik.errors.lastname}</span> : null}

          <input
            type="text"
            placeholder="Email..."
            name="email"
            autoComplete="off"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? <span>{formik.errors.email}</span> : null}

          <input
            type="password"
            placeholder="Password..."
            name="password"
            autoComplete="off"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? <span>{formik.errors.password}</span> : null}

          <input
            type="password"
            placeholder="Confirm Password..."
            name="confirmPassword"
            autoComplete="off"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? <span>{formik.errors.confirmPassword}</span> : null}

          <input type="submit" value="Submit" />
        </form>
      </div>
      <div className="message-box">
        {bool && <Popup onClose={() => setBool(false)} />}
      </div>
    </div>
  );
};

export default App;
