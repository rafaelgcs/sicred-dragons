import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  deleteDragon,
  getDragonList,
} from "../../../repositories/dragons.repository";
import { logout } from "../../../services/auth";
import { removeDragonDialog } from "../functions/dragons_functions";
import DragonCard from "./components/cards/dragon_card";
import ListSearchForm from "./components/forms/list_search_form";
import DragonListContent from "./components/lists/dragon_list";

import "./dragons.list.scss";

const DragonList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dragons, setDragons] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [toSearchName, setToSearchName] = useState("");

  const dragonWithSearch = dragons.filter(
    (dragon) =>
      dragon.name.toUpperCase().indexOf(searchName.toUpperCase()) != -1
  );

  const dragonListFiltered = dragonWithSearch.sort((a, b) => {
    return (
      (a.name.toUpperCase() > b.name.toUpperCase()) -
      (b.name.toUpperCase() > a.name.toUpperCase())
    );
  });

  const submitSearch = (toSearchName) => {
    setSearchName(toSearchName);
  };

  const removeDragonFunction = async (dragon) => {
    const res = await deleteDragon(dragon.id);

    if (res.success) {
      toast.success(`Dragon "${dragon.name}" deleted with success!`);
      getDragons();
    } else {
      toast.error(`Sorry, but we can't delete dragon "${dragon.name}"`);
    }
  };

  const getDragons = async () => {
    setLoading(true);
    const response = await getDragonList();

    if (response.success) {
      setDragons(response.dragons);
    } else {
      toast.error(response.message);
      setDragons(response.dragons);
    }
    setLoading(false);
  };
  useEffect(() => {
    getDragons();
  }, []);
  return (
    <>
      <Helmet>
        <title>Dragons List</title>
      </Helmet>
      <div>
        <header
          style={{
            backgroundColor: "#fff",
            borderRadius: 30,
            padding: "1rem",
            marginTop: 10,
          }}
        >
          <h2>Dragons List</h2>
          <ListSearchForm
            onSubmit={submitSearch}
            toReset={() => setSearchName("")}
            showReset={searchName != "" && searchName != null}
          />
        </header>
        {loading ? (
          <div className="p-2">
            <div className="loader-content p-4 row justify-content-center text-primary">
              <div className="loading col-auto">
                <i className="icon-lazy-load"></i>
              </div>
            </div>
          </div>
        ) : (
          <DragonListContent>
            <>
              {dragonListFiltered.map((dragon) => {
                return (
                  <React.Fragment key={`dragon__${dragon.id}`}>
                    <DragonCard
                      title={dragon.name}
                      description={dragon.type}
                      dark={false}
                      actions={() => (
                        <div className="multi-button">
                          <button
                            className="icon-eye"
                            onClick={() => navigate(`/dragon/${dragon.id}`)}
                          ></button>
                          <button
                            className="icon-pencil"
                            onClick={() =>
                              navigate(`/dragon/edit/${dragon.id}`)
                            }
                          ></button>
                          <button
                            className="icon-trash"
                            onClick={() => {
                              removeDragonDialog(dragon, removeDragonFunction);
                            }}
                          ></button>
                        </div>
                      )}
                    />
                  </React.Fragment>
                );
              })}
              {dragonListFiltered.length == 0 && !loading && (
                <>
                  <div></div>
                  <div className="text-center text-primary">
                    <p style={{ fontSize: 80 }}>
                      <i className="icon-fire"></i>
                    </p>
                    <h4>
                      {`Sorry, but not found a dragon${
                        searchName != "" &&
                        searchName != null &&
                        ` with "${searchName}"`
                      }`}
                    </h4>
                    <div className="row justify-content-center">
                      <button
                        className="w-auto"
                        onClick={() => setSearchName("")}
                      >
                        Restart List
                      </button>
                    </div>
                  </div>
                </>
              )}
            </>
          </DragonListContent>
        )}
      </div>
    </>
  );
};

export default DragonList;
