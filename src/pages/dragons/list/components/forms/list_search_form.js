import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ListSearchForm = ({ onSubmit, toReset, showReset }) => {
  const navigate = useNavigate();
  const [toSearchName, setToSearchName] = useState("");

  const submitSearch = (e) => {
    e.preventDefault();
    onSubmit(toSearchName);
    setToSearchName("");
  };

  const resetFilters = () => {
    toReset();
  };

  return (
    <form className="ph-1" onSubmit={submitSearch}>
      <div className="row w-100 justify-content-around">
        <div className="input-container pr-1 col-12 col-md-8">
          <input
            type="text"
            placeholder="Search a Dragon"
            value={toSearchName}
            onChange={(ev) => setToSearchName(ev.target.value)}
          />
        </div>
        <div
          className="col-12 col-md-4 row justify-content-between align-items-center"
          style={{
            padding: 6,
          }}
        >
          <button
            className="mr-1 btn btn-icon icon-search col-auto"
            type="submit"
          ></button>
          {showReset && (
            <button
              className="btn btn-icon btn-transparent icon-refresh text-primary col-auto"
              onClick={resetFilters}
            ></button>
          )}
          <button
            className="ph-1 col-auto"
            onClick={() => navigate("/dragon/create")}
          >
            <i className="icon-plus mr-1"></i>
            New Dragon
          </button>
        </div>
      </div>
    </form>
  );
};

export default ListSearchForm;
