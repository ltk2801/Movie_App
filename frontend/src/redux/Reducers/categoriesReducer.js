import * as categoriesConstant from "../Constants/categoriesConstant";

//  GET ALL CATEGORIES
export const GetAllCategoriesReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case categoriesConstant.GET_ALL_CATEGORIES_REQUEST:
      return { isLoading: true };
    case categoriesConstant.GET_ALL_CATEGORIES_SUCCESS:
      return {
        isLoading: false,
        categories: action.payload,
      };
    case categoriesConstant.GET_ALL_CATEGORIES_FAIL:
      return { isLoading: false, isError: action.payload };
    case categoriesConstant.GET_ALL_CATEGORIES_RESET:
      return {};
    default:
      return state;
  }
};

//  CREATE  CATEGORY
export const CreateCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case categoriesConstant.CREATE_CATEGORY_REQUEST:
      return { isLoading: true };
    case categoriesConstant.CREATE_CATEGORY_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
      };
    case categoriesConstant.CREATE_CATEGORY_FAIL:
      return { isLoading: false, isError: action.payload };
    case categoriesConstant.CREATE_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

//  UPDATE  CATEGORY
export const UpdateCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case categoriesConstant.UPDATE_CATEGORY_REQUEST:
      return { isLoading: true };
    case categoriesConstant.UPDATE_CATEGORY_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
      };
    case categoriesConstant.UPDATE_CATEGORY_FAIL:
      return { isLoading: false, isError: action.payload };
    case categoriesConstant.UPDATE_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

//  DELETE  CATEGORY
export const DeleteCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case categoriesConstant.DELETE_CATEGORY_REQUEST:
      return { isLoading: true };
    case categoriesConstant.DELETE_CATEGORY_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
      };
    case categoriesConstant.DELETE_CATEGORY_FAIL:
      return { isLoading: false, isError: action.payload };
    case categoriesConstant.DELETE_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};
