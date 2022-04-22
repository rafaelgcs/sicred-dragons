import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteDragon,
  getDragonDetail,
} from "../../../repositories/dragons.repository";
import { getFormatedDate, getRandomImage } from "../../../utils/functions";

import HeaderWithOverlay from "../../../components/headers/header_with_overlay";
import { removeDragonDialog } from "../functions/dragons_functions";

import "./dragons.details.scss";

import babyDragon from "../../../assets/img/icons/dragon_baby.png";

const DragonDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [dragon, setDragon] = useState({});

  const removeDragonFunction = async (d) => {
    const res = await deleteDragon(d.id);

    if (res.success) {
      toast.success(`Dragon "${d.name}" deleted with success!`);
      navigate("/");
    } else {
      toast.error(`Sorry, but we can't delete dragon "${d.name}"`);
    }
  };

  useEffect(() => {
    const getDragon = async (dragon_id) => {
      if (dragon_id) {
        setLoading(true);
        const response = await getDragonDetail(dragon_id);

        if (response.success) {
          setDragon(response.dragon);
        } else {
          toast.error(response.message);
          setNotFound(true);
          setDragon(response.dragon);
        }
        setLoading(false);
      } else {
        setNotFound(true);
      }
    };

    getDragon(id);
  }, []);
  return (
    <>
      <Helmet>
        <title>Dragon Detail</title>
      </Helmet>
      <div>
        <HeaderWithOverlay title="Dragon Details" image={getRandomImage()} />
        <div>
          {loading ? (
            <div className="p-2">
              <div className="detail-content loader-content p-4 row justify-content-center">
                <div className="loading col-auto">
                  <i className="icon-lazy-load" style={{ fontSize: 100 }}></i>
                </div>
              </div>
            </div>
          ) : notFound ? (
            <>
              <div></div>
              <div className="text-center text-primary">
                <p style={{ fontSize: 80 }}>
                  <i className="icon-fire"></i>
                </p>
                <h4>{`Sorry, but we not found the dragon`}</h4>
                <div className="row justify-content-center">
                  <button className="w-auto" onClick={() => navigate(-1)}>
                    Go Back
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="p-2 p-md-2">
              <div className="detail-content p-2 row">
                <div className="col-12 col-md-4 col-lg-3 d-none d-md-block">
                  <img src={babyDragon} className="w-100" alt="Baby dragon" />
                </div>
                <div className="col-12 col-md-8 col-lg-9">
                  <p>
                    <strong>Code: </strong> {dragon.id}
                  </p>
                  <p>
                    <strong>Name: </strong> {dragon.name}
                  </p>
                  <p>
                    <strong>Type: </strong> {dragon.type}
                  </p>
                  <p>
                    <strong>Created At: </strong>{" "}
                    {getFormatedDate(new Date(dragon.createdAt))}
                  </p>
                  <div className="row justify-content-start">
                    <div className="col-6 col-md-auto">
                      <button
                        className="btn btn-light w-100 p-0 btn-details"
                        onClick={() => navigate(`/dragon/edit/${dragon.id}`)}
                      >
                        Edit
                      </button>
                    </div>
                    <div className="col-6 col-md-auto">
                      <button
                        className="btn btn-danger w-100 p-0 btn-details"
                        onClick={() =>
                          removeDragonDialog(dragon, removeDragonFunction)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DragonDetails;
