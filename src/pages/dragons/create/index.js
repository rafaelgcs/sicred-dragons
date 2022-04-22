import React from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createDragon } from "../../../repositories/dragons.repository";
import { getRandomImage } from "../../../utils/functions";

import HeaderWithOverlay from "../../../components/headers/header_with_overlay";

import "./dragons.create.scss";
import DragonCreateEditForm from "../components/forms/dragon_create_edit_form";

const DragonEdit = () => {
  const navigate = useNavigate();

  const submitCreateDragon = async (data, setSubmiting) => {
    const response = await createDragon(data);

    if (response.success) {
      toast.success("Created with success");
      navigate(`/dragon/${response.dragon.id}`);
    } else {
      toast.error(response.message);
    }
    setSubmiting(false);
  };

  return (
    <>
      <Helmet>
        <title>Dragon Create</title>
      </Helmet>
      <div>
        <HeaderWithOverlay title="Dragon Create" image={getRandomImage()} />
        <div>
          <div className="p-1 p-md-2">
            <div className="detail-content p-md-2">
              <DragonCreateEditForm
                onSubmit={(data, setSubmiting) => {
                  submitCreateDragon(data, setSubmiting);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DragonEdit;
