import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getUser, logout } from "../services/auth";

import "./sidebar.layout.scss";

const SidebarLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState({});

  const hasBack = window.location.pathname != "/";

  const logoutOfUser = () => {
    if (logout()) {
      navigate("/auth/signin");
    }
  };

  const goToPreviousPage = () => {
    navigate(-1);
  };

  const closeSideBar = () => {
    setSidebarOpen(false);
  };

  useEffect(() => {
    setUser(getUser());
  }, []);
  return (
    <>
      <nav className="main-top-navbar">
        <div className="row align-items-center">
          {hasBack && (
            <button
              className="btn btn-icon btn-transparent icon-arrow-left2 text-primary col-auto"
              onClick={() => goToPreviousPage()}
            ></button>
          )}
          <h4 className="m-0 col-auto">Dragon Challenge</h4>
        </div>
        <button
          className="btn btn-icon btn-transparent icon-navicon text-primary"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        ></button>
      </nav>
      <div className={sidebarOpen ? "main-sidebar active" : "main-sidebar"}>
        <div className="sidebar-header">
          <h4>Dragon Challenge</h4>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="btn btn-icon btn-transparent text-primary icon-close"
          ></button>
        </div>
        <div className="container">
          <div className="sidebar-user-card">
            <div className="appresentation text-center">
              <img className="avatar avatar-normal" src={user.image} />
            </div>
            <div
              className="informations w-100 pl-1"
            >
              <p>
                <strong>{user.name}</strong>
              </p>
              <p>{user.email}</p>
            </div>
          </div>
          <div className="sidebar-link__list">
            <p className="m-0 p-1">Dragons</p>
            <article
              className="leaderboard__profile"
              onClick={() => {
                closeSideBar();
                navigate("/");
              }}
            >
              <span className="leaderboard__picture icon-list"></span>
              <span className="leaderboard__name">List</span>
              <span className="leaderboard__value icon-arrow-right2"></span>
            </article>
            <article
              className="leaderboard__profile"
              onClick={() => {
                closeSideBar();
                navigate("/dragon/create");
              }}
            >
              <span className="leaderboard__picture icon-pencil2"></span>
              <span className="leaderboard__name">Create</span>
              <span className="leaderboard__value icon-arrow-right2"></span>
            </article>
          </div>
          <div className="sidebar-link__list">
            <p className="m-0 p-1">Personal</p>
            <article
              className="leaderboard__profile"
              onClick={() => logoutOfUser()}
            >
              <span className="leaderboard__picture icon-exit"></span>
              <span className="leaderboard__name">Sign Out</span>
              <span className="leaderboard__value icon-arrow-right2"></span>
            </article>
          </div>
        </div>
      </div>
      <div className="main-content">{children || <Outlet />}</div>
    </>
  );
};

SidebarLayout.propTypes = {
  children: PropTypes.node,
};

export default SidebarLayout;
