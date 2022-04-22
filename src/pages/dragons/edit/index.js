import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  editDragon,
  getDragonDetail,
} from "../../../repositories/dragons.repository";
import { getFormatedDate, getRandomImage } from "../../../utils/functions";

import HeaderWithOverlay from "../../../components/headers/header_with_overlay";

import DragonCreateEditForm from "../components/forms/dragon_create_edit_form";
import "./dragons.edit.scss";

import babyDragon from "../../../assets/img/icons/dragon_baby.png";

const DragonEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [dragon, setDragon] = useState({});

  const submitEditDragon = async (data, setSubmiting) => {
    const response = await editDragon(dragon.id, data);

    if (response.success) {
      toast.success("Updated with success");
      navigate(`/dragon/${response.dragon.id}`);
    } else {
      toast.error(response.message);
    }
    setSubmiting(false);
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
        <title>Dragon Edit</title>
      </Helmet>
      <div>
        <HeaderWithOverlay title="Dragon Edit" image={getRandomImage()} />
        <div>
          {loading ? (
            <div className="p-2">
              <div className="detail-content loader-content p-4 row justify-content-center">
                <div className="loading col-auto">
                  <i className="icon-lazy-load"></i>
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
            <div className="p-1 p-md-2">
              <div className="detail-content p-1 p-md-2">
                <div className="row">
                  <div className="col-12 col-md-3 col-lg-2 d-none d-md-block">
                    <img src={babyDragon} className="w-100" alt="Baby dragon" />
                  </div>
                  <div className="col-12 col-md-9 col-lg-10">
                    <p>
                      <strong>Code: </strong> {dragon.id}
                    </p>
                    <p>
                      <strong>Created At: </strong>{" "}
                      {getFormatedDate(new Date(dragon.createdAt))}
                    </p>
                    <button
                      className="btn btn-light mb-1 w-auto"
                      onClick={() => navigate(`/dragon/${dragon.id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>

                <DragonCreateEditForm
                  onSubmit={(data, setSubmiting) => {
                    submitEditDragon(data, setSubmiting);
                  }}
                  initialValues={{ name: dragon.name, type: dragon.type }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DragonEdit;
