import Axios from "./Axios";

// *********************** PUBLIC API **************************
// Get all movies API
const getMoviesService = async (
  category,
  time,
  language,
  rate,
  year,
  search,
  pageNumber,
  limit,
  sort
) => {
  const { data } = await Axios.get(
    `/movies?category=${category}&time=${time}&language=${language}&rate=${rate}&year=${year}&search=${search}&pageNumber=${pageNumber}&limit=${limit}&sort=${sort}`
  );
  return data;
};

// get random movies API
export const getRandomMoviesService = async () => {
  const { data } = await Axios.get(`/movies/random/all`);
  return data.data;
};

// get movie by id API
export const getMovieByIdService = async (id) => {
  const { data } = await Axios.get(`/movies/${id}`);
  return data.data;
};

// get top rated movie  API
export const getTopRatedMovieService = async () => {
  const { data } = await Axios.get(`/movies/rated/top`);
  return data.data;
};

// *********************** PUBLIC API **************************
// review movie API
export const reviewMovieService = async (token, id, review) => {
  const { data } = await Axios.post(`/movies/${id}/reviews`, review, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// *********************** ADMIN API **************************
export const deleteMovieService = async (token, id) => {
  const { data } = await Axios.delete(`/movies/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const createMovieService = async (token, movie) => {
  const { data } = await Axios.post(`/movies`, movie, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.data;
};

export const updateMovieService = async (token, id, movie) => {
  const { data } = await Axios.put(`/movies/${id}`, movie, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export { getMoviesService };
