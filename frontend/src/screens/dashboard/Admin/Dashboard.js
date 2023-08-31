import React, { useEffect } from "react";
import { FaRegListAlt, FaUser } from "react-icons/fa";
import { HiViewGrid } from "react-icons/hi";
import SideBar from "../SideBar";
import Table from "../../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getAllUsersAction } from "../../../redux/Actions/userActions";
import { Empty } from "../../../components/Notifications/Empty";
import Loader from "../../../components/Notifications/Loader";
import {
  deleteMovieAction,
  getAllMoviesAction,
} from "../../../redux/Actions/movieAction";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";

const Dashboard = () => {
  const dispatch = useDispatch();
  // all category
  const {
    isLoading: catLoading,
    isError: catError,
    categories,
  } = useSelector((state) => state.categoryGetAll);

  // all user
  const {
    isLoading: userLoading,
    isError: userError,
    users,
  } = useSelector((state) => state.adminGetAllUsers);

  // all movies
  const { isLoading, isError, movies, totalMovies, pages, page } = useSelector(
    (state) => state.getAllMovie
  );
  // delete movie
  const { isLoading: deleteLoading, isError: deleteError } = useSelector(
    (state) => state.adminDeleteMovie
  );

  const deleteMovieHandler = (id) => {
    window.confirm("Bạn thật sự muốn xóa bộ phim này?") &&
      dispatch(deleteMovieAction(id));
  };

  // useEffect
  useEffect(() => {
    //get all users
    dispatch(getAllUsersAction());
    // get all movies
    dispatch(getAllMoviesAction({ sort: true, limit: 5 }));
    // errors
    if (isError || userError || catError || deleteError) {
      toast.error(isError || userError || catError || deleteError);
    }
  }, [dispatch, isError, userError, catError, deleteError]);

  // dashboard datas
  const DashboardData = [
    {
      bg: "bg-orange-600",
      icon: FaRegListAlt,
      title: "Số lượng bộ phim",
      total: isLoading ? "Đang load..." : totalMovies || 0,
    },
    {
      bg: "bg-blue-700",
      icon: HiViewGrid,
      title: "Số lượng thể loại",
      total: catLoading ? "Đang load..." : categories?.length || 0,
    },
    {
      bg: "bg-green-600",
      icon: FaUser,
      title: "Số lượng người dùng",
      total: userLoading ? "Đang load..." : users?.length || 0,
    },
  ];

  // pagination next and pev pages
  const nextPage = () => {
    dispatch(
      getAllMoviesAction({
        sort: true,
        pageNumber: page + 1,
        limit: 5,
      })
    );
  };

  const prevPage = () => {
    dispatch(
      getAllMoviesAction({
        sort: true,
        pageNumber: page - 1,
        limit: 5,
      })
    );
  };
  const sameClass =
    "text-white p-2 rounded font-semibold border-2 border-subMain hover:bg-subMain";
  return (
    <SideBar>
      <h2 className="text-xl font-bold">Dashboard</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {DashboardData.map((data, index) => (
          <div
            key={index}
            className="p-4 rounded bg-main border-border grid grid-cols-4 gap-2 "
          >
            <div
              className={`col-span-1 rounded-full h-12 w-12 flex-colo ${data.bg}`}
            >
              <data.icon />
            </div>
            <div className="col-span-3">
              <h2>{data.title}</h2>
              <p className="mt-2 font-bold">{data.total}</p>
            </div>
          </div>
        ))}
      </div>
      <h3 className="text-md font-medium my-6 text-border">
        Những Bộ Phim Đăng Tải Gần Đây
      </h3>
      {isLoading || deleteLoading ? (
        <Loader />
      ) : movies.length > 0 ? (
        <>
          <Table
            data={movies}
            admin={true}
            isLoading={deleteLoading}
            onDeleteFunction={deleteMovieHandler}
          />
          {/* Loading more */}
          <div className="w-full flex-rows gap-6 my-5">
            <button
              onClick={prevPage}
              disabled={page === 1}
              className={sameClass}
            >
              <TbPlayerTrackPrev className="text-xl" />
            </button>
            <button
              onClick={nextPage}
              disabled={page === pages}
              className={sameClass}
            >
              <TbPlayerTrackNext className="text-xl" />
            </button>
          </div>
        </>
      ) : (
        <Empty message="Danh sách phim hiện đang bị trống" />
      )}
    </SideBar>
  );
};

export default Dashboard;
