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
// update profile call API
const updateProfileService = async (user, token) => {
  const { data } = await Axios.put("/users/profile", user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (data) {
    localStorage.setItem("userInfo", JSON.stringify(data.data));
  }
  return data.data;
};

// delete profile call API
const deleteProfileService = async (token) => {
  const { data } = await Axios.delete("/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (data) {
    localStorage.removeItem("userInfo");
  }
  return data.data;
};

// change password call API
const changePasswordService = async (passwords, token) => {
  const { data } = await Axios.put("/users/password", passwords, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export {
  registerService,
  logoutService,
  loginService,
  updateProfileService,
  deleteProfileService,
  changePasswordService,
};
