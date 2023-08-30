import React, { useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { FaCloudDownloadAlt, FaHeart, FaHome, FaPlay } from "react-icons/fa";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMovieByIdAction } from "../redux/Actions/movieAction";
import Loader from "../components/Notifications/Loader";
import { RiMovie2Line } from "react-icons/ri";
import { IfMovieLiked, LikeMovie } from "../context/Functionalities";

const WatchPage = () => {
  const { id } = useParams();
  const [play, setPlay] = useState(false);
  const dispatch = useDispatch();

  const sameClass = "w-full gap-6 flex-colo min-h-screen";
  // use selector get movie
  const { isLoading, isError, movie } = useSelector(
    (state) => state.getMovieById
  );
  const { isLoading: likeLoading } = useSelector(
    (state) => state.userLikeFavoriteMovie
  );
  const { userInfo } = useSelector((state) => state.userLogin);

  // if liked function kiểm tra nếu đã yêu thích rồi thì không cho add thêm và sẽ chuyển màu khác
  const isLiked = (movie) => IfMovieLiked(movie);

  // useEffect
  useEffect(() => {
    // fetch movie
    dispatch(getMovieByIdAction(id));
  }, [dispatch, id]);

  return (
    <div className="container mx-auto bg-dry p-6 mb-12">
      {!isError && (
        <div className="flex-btn flex-wrap mb-6 gap-2 bg-main rounded border border-gray-800 p-6">
          <Link
            to={`/movie/${movie?._id}`}
            className="md:text-xl text-sm flex gap-3 items-center font-bold text-dryGray"
          >
            <BiArrowBack /> {movie?.name}
          </Link>
          <div className="flex-btn sm:w-auto w-full gap-5">
            <button
              onClick={() => LikeMovie(movie, dispatch, userInfo)}
              disabled={isLiked(movie) || likeLoading}
              className={`bg-white hover:text-subMain ${
                isLiked(movie) ? "text-subMain" : "text-white"
              } transitions bg-opacity-30 rounded px-4 py-3 text-sm`}
            >
              <FaHeart />
            </button>
            <button className="bg-subMain flex-rows gap-2 hover:text-main transitions text-white rounded px-8 font-medium py-3 text-sm">
              <FaCloudDownloadAlt /> Download
            </button>
          </div>
        </div>
      )}

      {/* watch video */}
      {play ? (
        <video controls autoPlay={play} className="w-full h-full rounded">
          <source
            src={movie?.video ? movie?.video : "/images/trailer.mp4"}
            type="video/mp4"
            title={movie?.name}
          />
        </video>
      ) : (
        <div className="w-full h-screen rounded-lg overflow-hidden relative">
          {isLoading ? (
            <div className={sameClass}>
              <Loader />
            </div>
          ) : isError ? (
            <div className={sameClass}>
              <div className="flex-colo w-24 h-24 p-5 mb-4 rounded-full bg-dry text-subMain text-4xl">
                <RiMovie2Line />
              </div>
              <p className="text-border text-sm">
                Đã có lỗi xảy ra ! Vui lòng thử lại sau{" "}
              </p>
              <Link to={"/"}>
                <button className="bg-subMain flex-rows gap-2 hover:text-main transitions text-white rounded px-8 font-medium py-3 text-sm">
                  <FaHome /> Trở về trang chủ
                </button>
              </Link>
            </div>
          ) : (
            <>
              <div className="absolute top-0 left-0 bottom-0 right-0 bg-main bg-opacity-30 flex-colo">
                <button
                  onClick={() => setPlay(true)}
                  className="bg-white text-subMain flex-colo border border-subMain rounded-full w-20 h-20 font-medium text-xl"
                >
                  <FaPlay />
                </button>
              </div>
              <img
                src={movie?.image ? movie.image : "/images/imageMovie.jpg"}
                alt={movie?.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default WatchPage;
