import React, { useEffect } from "react";
import AOS from "aos";
import Layout from "./layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoriesAction } from "./redux/Actions/categoryAction";
import { getFavoriteMoviesAction } from "./redux/Actions/userActions";
import toast from "react-hot-toast";

function App() {
  AOS.init();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { isError, isSuccess } = useSelector(
    (state) => state.userLikeFavoriteMovie
  );
  const { isError: catError } = useSelector((state) => state.categoryGetAll);
  useEffect(() => {
    dispatch(getAllCategoriesAction());
    if (userInfo) {
      dispatch(getFavoriteMoviesAction());
    }
    if (isError || catError) {
      toast.error("Đã có lỗi xảy ra ! Vui lòng thử lại sau");
      dispatch({ type: "LIKE_MOVIE_RESET" });
    }
    if (isSuccess) {
      dispatch({ type: "LIKE_MOVIE_RESET" });
    }
  }, [dispatch, userInfo, isError, catError, isSuccess]);

  return <Layout />;
}

export default App;
