import React from "react";
import "./Login.css";

import Loading from "../Loading/Loading";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import * as AuthAction from "../../Redux/Actions/AuthAction";

import { Formik } from "formik";
import * as yup from "yup";

const formSchema = yup.object({
  email: yup.string().email().requited(),
  password: yup.string().requited().min(6),
});

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const errorMessage = useSelector((state) => state.auth.errorMessage);
  var content;
  if (loading === "loading") {
    content = <Loading />;
  } else {
    content = (
      <div className="login-page">
        {loading === "fail" && <h2>Sign in failed!</h2>}
        {errorMessage && <h3>{errorMessage.message}</h3>}
        <div className="login-contaienr">
          <h1>Let's sign you in.</h1>
          <h4>Welcome back!</h4>
          <h4>You've been missed!</h4>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={formSchema}
            onSubmit={(values) => {
              dispatch(
                AuthAction.loginUser({
                  email: values.email,
                  password: values.password,
                })
              )
                .then(async (result) => {
                  if (result.success) {
                    try {
                      window.localStorage.setItem("token", result.token);
                      navigate.push("/");
                    } catch (err) {
                      console.log(err);
                    }
                  } else {
                    navigate.push("/login");
                    console.log(result.message);
                  }
                })
                .catch((err) => console.log(err));
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form className="login-form" onSubmit={handleSubmit}>
                <input
                  className="form-input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <p className="form-error">
                  {errors.email && touched.email && errors.email}
                </p>

                <input
                  className="form-input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <p className="form-error">
                  {errors.password && touched.password && errors.password}
                </p>
                <button
                  className="form-button"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Sign in
                </button>
              </form>
            )}
          </Formik>
          <p className="navigateRegister">
            Don't have an account?
            <span
              className="navigateRegisterClick"
              onClick={() => {
                window.location.href = "/signup";
              }}
            >
              Sign up here.
            </span>
          </p>
        </div>
      </div>
    );
  }
  return <React.Fragment>{content}</React.Fragment>;
}
