import * as categoriesConstant from "../Constants/categoriesConstant";
import * as categoriesAPIs from "../APIs/categoriesServices";
// import toast from "react-hot-toast";
import { ErrorsAction, tokenProtection } from "../Protection";
import toast from "react-hot-toast";

// Get Categories action
const getAllCategoriesAction = () => async (dispatch) => {
  try {
    dispatch({ type: categoriesConstant.GET_ALL_CATEGORIES_REQUEST });
    const data = await categoriesAPIs.getCategoriesService();
    dispatch({
      type: categoriesConstant.GET_ALL_CATEGORIES_SUCCESS,
      payload: data,
    });
    dispatch({ type: categoriesConstant.UPDATE_CATEGORY_RESET });
  } catch (error) {
    ErrorsAction(error, dispatch, categoriesConstant.GET_ALL_CATEGORIES_FAIL);
  }
};
// Create Category action
const CreateCategoryAction = (title) => async (dispatch, getState) => {
  try {
    dispatch({ type: categoriesConstant.CREATE_CATEGORY_REQUEST });
    await categoriesAPIs.createCategoryService(
      title,
      tokenProtection(getState)
    );
    dispatch({ type: categoriesConstant.CREATE_CATEGORY_SUCCESS });
    toast.success("Tạo thể loại thành công");
  } catch (error) {
    ErrorsAction(error, dispatch, categoriesConstant.CREATE_CATEGORY_FAIL);
  }
};
// Update Category action
const UpdateCategoryAction = (id, title) => async (dispatch, getState) => {
  try {
    dispatch({ type: categoriesConstant.UPDATE_CATEGORY_REQUEST });
    await categoriesAPIs.updateCategoryService(
      id,
      title,
      tokenProtection(getState)
    );
    dispatch({ type: categoriesConstant.UPDATE_CATEGORY_SUCCESS });
    toast.success("Cập nhật thể loại thành công");
    dispatch(getAllCategoriesAction());
  } catch (error) {
    ErrorsAction(error, dispatch, categoriesConstant.UPDATE_CATEGORY_FAIL);
  }
};
// Delete Category action
const DeleteCategoryAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: categoriesConstant.DELETE_CATEGORY_REQUEST });
    await categoriesAPIs.deleteCategoryService(id, tokenProtection(getState));
    dispatch({ type: categoriesConstant.DELETE_CATEGORY_SUCCESS });
    toast.success("Xóa thể loại thành công");
    dispatch(getAllCategoriesAction());
  } catch (error) {
    ErrorsAction(error, dispatch, categoriesConstant.DELETE_CATEGORY_FAIL);
  }
};

export {
  getAllCategoriesAction,
  CreateCategoryAction,
  UpdateCategoryAction,
  DeleteCategoryAction,
};
