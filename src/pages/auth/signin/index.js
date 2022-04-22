import React from "react";
import { Helmet } from "react-helmet-async";

import "./signin.scss";
import { userLogin } from "../../../repositories/user.repository";
import { localLogin } from "../../../services/auth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SignInForm from "./components/signin_form";

import bgImage from "../../../assets/img/bg-login2.jpg";

const Signin = () => {
  const navigate = useNavigate();
  const doSignIn = async (data, setSubmitting) => {
    setSubmitting(true);
    const res = userLogin(data);
    if (res.success) {
      toast.success("Succes! You will be transfered to signed page, wait!");
      setTimeout(() => {
        if (localLogin(res.user, res.accessToken, res.remember)) {
          navigate("/");
          //   window.location.href = "/";
        }
        setSubmitting(false);
      }, 2000);
    } else {
      toast.error(res.message);
    }
  };
  return (
    <>
      <Helmet>
        <title>Signin Page</title>
      </Helmet>
      <div className="container">
        <section className="right-container">
          <div className="spacing">
            <div className="panel">
              <h1>Hello and Welcome!</h1>
              <p>It's a challenge of SICRED</p>
              <i className="icon-dragon" style={{ fontSize: 100 }}></i>
              <p>You will manage dragons when signin with an account!</p>
              <div className="bg-light text-primary p-1 rounded d-none d-md-block">
                <p className="p-0 m-0">
                  Enter your personal details and start journey with us (try):
                </p>
                <p className="m-0">
                  <strong>Email: </strong> testing@gmail.com | <strong>Password: </strong> Testing@2022
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          className="form-container sign-in-container overlay__image"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div
            className="overlay__bg"
            style={{ backgroundColor: "white" }}
          ></div>
          <div className="overlay__content">
            <SignInForm onSubmit={doSignIn} />
          </div>
        </section>
      </div>
      <footer>
        <p>
          Created with <i className="icon-heart"></i>. Created to Sicred Dragons
          Challenge. By:
          <a target="_blank" rel="noreferrer" href="https://rafaelgcs.com">
            _Rafael Guimarães
          </a>
          .
        </p>
      </footer>
    </>
  );
};

export default Signin;
