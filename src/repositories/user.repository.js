import { getRandomImage, toCript } from "../utils/functions";

const userLogin = (data = { email: "", password: "", rememberme: false }) => {
  // Default Users:
  /*
    email: testing@gmail.com
    password: Testing@2022
   */

  if (data.email !== "testing@gmail.com" || data.password !== "Testing@2022") {
    return {
      success: false,
      message: "User or password is invalid",
    };
  }

  return {
    success: true,
    accessToken: toCript(data.email),
    remember: data.rememberme,
    user: {
      name: "Testing",
      image: getRandomImage(200, 200),
      email: "testing@gmail.com",
    },
  };
};

export { userLogin };
