import React from "react";
import { Formik } from "formik";

const SignInForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ email: "", password: "", rememberme: false }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "This field is required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Please, put a valid email address";
        }

        if (!values.password) {
          errors.password = "This field is required";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values, setSubmitting);
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
        <form onSubmit={handleSubmit}>
          <h1 className="mb-1">Sign in</h1>
          <div className="w-100 bg-light text-dark p-1 rounded d-block d-md-none">
            <p className="p-0 m-0">
              Enter your personal details and start journey with us (try):
            </p>
            <p className="m-0">
              <strong>Email: </strong> testing@gmail.com |{" "}
              <strong>Password: </strong> Testing@2022
            </p>
          </div>
          <div className="fields-container">
            <div className="input-container">
              <input
                className={errors.email && "invalid"}
                type="email"
                autoComplete="username"
                inputMode="email"
                placeholder="Email"
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              <div className="input-error">
                {errors.email && touched.email && errors.email}
              </div>
            </div>
            <div className="input-container">
              <input
                className={errors.password && "invalid"}
                type="password"
                placeholder="Password"
                onChange={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                autoComplete="current-password"
              />
              <div className="input-error">
                {errors.password && touched.password && errors.password}
              </div>
            </div>
            <div className="input-container">
              <input
                id="check"
                type="checkbox"
                className="check"
                onChange={handleChange("rememberme")}
                onBlur={handleBlur("rememberme")}
                value={values.rememberme}
              />
              <label htmlFor="check" className="input-label text-dark">
                <span
                  className={
                    values.rememberme
                      ? "text-dark icon-checkbox-checked"
                      : "text-dark icon-checkbox-unchecked"
                  }
                ></span>{" "}
                Keep me Signed in
              </label>
            </div>
          </div>
          <button
            className="btn btn-light"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="icon-lazy-load pr-1"></span> Sign In
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      )}
    </Formik>
  );
};

export default SignInForm;
