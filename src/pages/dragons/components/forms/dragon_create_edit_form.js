import React from "react";
import { Formik } from "formik";

const DragonCreateEditForm = ({
  onSubmit,
  initialValues = { name: "", type: "" },
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        const errors = {};
        if (!values.name) {
          errors.name = "This field is required";
        }

        if (!values.type) {
          errors.type = "This field is required";
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
        <form onSubmit={handleSubmit} className="form-dragon-edit">
          <div className="fields-container">
            <div className="input-container">
              <div className="input-label-text">
                <strong>Name: </strong>
              </div>
              <input
                className={errors.name && "invalid"}
                type="text"
                inputMode="name"
                placeholder="Name"
                onChange={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
              />
              <div className="input-error">
                {errors.name && touched.name && errors.name}
              </div>
            </div>
            <div className="input-container">
              <div className="input-label-text">
                <strong>Type: </strong>
              </div>
              <input
                className={errors.type && "invalid"}
                type="text"
                placeholder="Type"
                onChange={handleChange("type")}
                onBlur={handleBlur("type")}
                value={values.type}
              />
              <div className="input-error">
                {errors.type && touched.type && errors.type}
              </div>
            </div>
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="icon-lazy-load pr-1"></span> Sending
              </>
            ) : (
              "Send"
            )}
          </button>
        </form>
      )}
    </Formik>
  );
};

export default DragonCreateEditForm;
