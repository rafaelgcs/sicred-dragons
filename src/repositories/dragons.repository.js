import { api } from "../services/api";

const getDragonList = async () => {
  const res = await api.get("dragon");
  if (res.status !== 200) {
    return {
      success: false,
      message: "Can't find dragons",
      dragons: [],
    };
  }

  return {
    success: true,
    dragons: res.data,
  };
};

const getDragonDetail = async (id) => {
  try {
    const res = await api.get(`dragon/${id}`);

    if (res.status !== 200) {
      return {
        success: false,
        message: "Can't find the dragon",
        dragon: {},
      };
    }

    return {
      success: true,
      dragon: res.data,
    };
  } catch (error) {
    let err = JSON.parse(JSON.stringify(error));
    let message = "";
    if (err.status === 404) {
      message = "Can't find the dragon";
    } else {
      message =
        "Sorry, we can't connect to server, try again later. If persist, call our support!";
    }
    return {
      success: false,
      message: message,
      dragon: {},
    };
  }
};

const createDragon = async (data) => {
  const res = await api.post(`dragon/`, data);
  console.log(res);
  if (res.status !== 200 && res.status !== 201) {
    return {
      success: false,
      message: "Can't create dragon",
      dragon: {},
    };
  }

  return {
    success: true,
    dragon: res.data,
  };
};

const editDragon = async (id, data) => {
  const res = await api.put(`dragon/${id}`, data);

  if (res.status !== 200 && res.status !== 201) {
    return {
      success: false,
      message: "Can't update dragon",
      dragon: {},
    };
  }

  return {
    success: true,
    dragon: res.data,
  };
};

const deleteDragon = async (id) => {
  const res = await api.delete(`dragon/${id}`);
  console.log(res);
  if (res.status !== 200) {
    return {
      success: false,
      message: "Can't update dragon",
    };
  }

  return {
    success: true,
    dragon: res.data,
  };
};

export {
  getDragonList,
  getDragonDetail,
  createDragon,
  editDragon,
  deleteDragon,
};
