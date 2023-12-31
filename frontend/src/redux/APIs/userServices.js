import Axios from "./Axios";

// *********************** PUBLIC API **************************
// truyền vào body sẽ là 1 object
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

// *********************** PRIVATE API **************************
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

// get all favorite movies
const getFavoriteMoviesService = async (token) => {
  const { data } = await Axios.get("/users/favorites", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.data;
};

// delete all favorite movies
const deleteFavoriteMoviesService = async (token) => {
  const { data } = await Axios.delete("/users/favorites", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// like movie API call
const likeMovieService = async (movieId, token) => {
  const { data } = await Axios.post("/users/favorites", movieId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.data;
};

// delete like movie API call
const deleteLikeMovieService = async (movieId, token) => {
  const { data } = await Axios.delete(`/users/favorites/${movieId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.data;
};

// *********************** ADMIN API **************************

// admin get all users
const getAllUsersService = async (token) => {
  const { data } = await Axios.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.data;
};

// admin delete user
const deleteUserService = async (id, token) => {
  const { data } = await Axios.delete(`/users/${id}`, {
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
  getFavoriteMoviesService,
  deleteFavoriteMoviesService,
  getAllUsersService,
  deleteUserService,
  likeMovieService,
  deleteLikeMovieService,
};
