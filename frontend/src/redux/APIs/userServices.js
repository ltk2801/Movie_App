import Axios from "./Axios";

// REGISTER NEW USER API CALL

const registerService = async (user) => {
  const { data } = await Axios.post("/users/register", user);
  if (data) {
    localStorage.setItem("userInfo", JSON.stringify(data.data));
  }
  return data.data;
};

// Logout user Function
const logoutService = () => {
  localStorage.removeItem("userInfo");
  return null;
};

// Login user API call
const loginService = async (user) => {
  const { data } = await Axios.post("/users/login", user);
  if (data) {
    localStorage.setItem("userInfo", JSON.stringify(data.data));
  }
  return data.data;
};

export { registerService, logoutService, loginService };
