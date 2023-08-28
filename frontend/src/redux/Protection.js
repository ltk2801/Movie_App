import { logoutAction } from "./Actions/userActions";

export const ErrorsAction = (error, dispatch, action) => {
  const message =
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  if (message === "Không được cấp quyền, Token đã thất bại") {
    dispatch(logoutAction());
  }
  return dispatch({ type: action, payload: message });
};
