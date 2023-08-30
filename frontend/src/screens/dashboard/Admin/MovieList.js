import React, { useEffect } from "react";
import Table from "../../../components/Table";
import SideBar from "../SideBar";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getAllMoviesAction } from "../../../redux/Actions/movieAction";
import Loader from "../../../components/Notifications/Loader";
import { Empty } from "../../../components/Notifications/Empty";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";
const MovieList = () => {
  const dispatch = useDispatch();
  // all movies
  const { isLoading, isError, movies, pages, page } = useSelector(
    (state) => state.getAllMovie
  );

  useEffect(() => {
    if (isError) {
      toast.error(isError);
    }
    dispatch(getAllMoviesAction({}));
  }, [dispatch, isError]);

  // pagination next and pev pages
  const nextPage = () => {
    dispatch(
      getAllMoviesAction({
        pageNumber: page + 1,
      })
    );
  };

  const prevPage = () => {
    dispatch(
      getAllMoviesAction({
        pageNumber: page - 1,
      })
    );
  };
  const sameClass =
    "text-white p-2 rounded font-semibold border-2 border-subMain hover:bg-subMain";
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Danh Sách Phim</h2>
          <button className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded">
            Xóa Hết
          </button>
        </div>
        {isLoading ? (
          <Loader />
        ) : movies?.length > 0 ? (
          <>
            <Table data={movies} admin={true} />
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
          <Empty message="Danh sách phim trống" />
        )}
      </div>
    </SideBar>
  );
};

export default MovieList;
