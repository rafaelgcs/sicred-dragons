// import logo from "./logo.svg";
// // import './App.css';
import React from "react";
import { useRoutes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/default/scroll_to_top";
import routes from "./router";
import "./assets/scss/_global.scss";
import "animate.css";

const App = () => {
  const content = useRoutes(routes);
  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <ScrollToTop>{content}</ScrollToTop>
    </>
  );
};

export default App;
