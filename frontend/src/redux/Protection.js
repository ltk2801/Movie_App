import { logoutAction } from "./Actions/userActions";

export const ErrorsAction = (error, dispatch, action) => {
  const message =
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  if (message === "Not authorized, no token") {
    dispatch(logoutAction());
  }
  return dispatch({ type: action, payload: message });
};

// API TOKEN PROTECTION

export const tokenProtection = (getState) => {
  const {
    // lấy ra userInfo từ userLogin từ getState lấy ra trạng thái của redux
    userLogin: { userInfo },
  } = getState();
  if (!userInfo?.token) {
    return null;
  } else {
    return userInfo?.token;
  }
};
