import Axios from "./Axios";

// *********************** PUBLIC API **************************
// Get all categories API
const getCategoriesService = async () => {
  const { data } = await Axios.get("/categories");
  return data.data;
};

// *********************** ADMIN API **************************

// Create new category API
const createCategoryService = async (title, token) => {
  const { data } = await Axios.post("/categories", title, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.data;
};

// Delete category API
const deleteCategoryService = async (id, token) => {
  const { data } = await Axios.delete(`/categories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// Update category API
const updateCategoryService = async (id, title, token) => {
  const { data } = await Axios.put(`/categories/${id}`, title, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.data;
};

export {
  getCategoriesService,
  createCategoryService,
  deleteCategoryService,
  updateCategoryService,
};
