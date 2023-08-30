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
  pageNumber
) => {
  const { data } = await Axios.get(
    `/movies?category=${category}&time=${time}&language=${language}&rate=${rate}&year=${year}&search=${search}&pageNumber=${pageNumber}`
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

// *********************** ADMIN API **************************

export { getMoviesService };
