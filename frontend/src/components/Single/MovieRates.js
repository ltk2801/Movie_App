import React, { useState } from "react";
import { BsBookmarkStarFill } from "react-icons/bs";
import Rating from "../Stars";
import Titles from "../Titles";
import { Message, Select } from "../UsedInput";
import { Casts } from "../../assets/data/MovieData";

const MovieRates = ({ movie }) => {
  const ratings = [
    {
      title: "0 - Rất kém",
      value: 0,
    },
    {
      title: "1 - Kém",
      value: 1,
    },
    {
      title: "2 - Tạm ổn",
      value: 2,
    },
    {
      title: "3 - Khá tốt",
      value: 3,
    },
    {
      title: "4 - Rất tốt",
      value: 4,
    },
    {
      title: "5 - Tuyệt vời",
      value: 5,
    },
  ];

  const [rating, setRating] = useState();

  return (
    <div className="my-12">
      <Titles title="Đánh giá bộ phim" Icon={BsBookmarkStarFill} />
      <div className="mt-10 xl:grid flex-colo grid-cols-5 gap-12 bg-dry xs:p-10 py-10 px-2 sm:p-20 rounded">
        {/* write review */}
        <div className="xl:col-span-2 w-full flex flex-col gap-8">
          <h3 className="text-xl font-semibold text-text">
            Đánh giá "{movie?.name}"
          </h3>
          <p className="text-sm leading-7 font-medium text-border">
            Viết bình luận cho bộ phim này, bình luận của bạn sẽ được đăng ở
            đây. Bình luận của bạn sẽ giúp cho chúng tôi đọc được và cải thiện
            chất lượng website. Cảm ơn các bạn rất nhiều ❤
          </p>
          <div className="text-sm w-full">
            <Select
              label=""
              options={ratings}
              onChange={(e) => setRating(e.target.value)}
            />
            <div className="flex mt-4 text-lg gap-2 text-star">
              <Rating value={rating} />
            </div>
          </div>
          {/* message */}
          <Message label="Đánh giá" placeholder="Viết bình luận của bạn..." />
          {/* submit */}
          <button className="bg-subMain text-white py-3 rounded w-full flex-colo">
            Đăng
          </button>
        </div>
        {/* REVIEWRS */}
        <div className="col-span-3 flex flex-col gap-6">
          <h3 className="text-xl text-text font-semibold">(50) bình luận</h3>
          <div className="w-full flex flex-col bg-main gap-6 rounded-lg md:p-12 p-6 h-header overflow-y-scroll ">
            {Casts.map((user, i) => (
              <div className="md:grid flex flex-col w-full grid-cols-12 gap-6 bg-dry p-4 border border-gray-800 rounded-lg">
                <div className="col-span-2 bg-main hidden md:block">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-full h-20 rounded-lg object-cover"
                  />
                </div>
                <div className="col-span-7 flex flex-col gap-2">
                  <h2>{user?.name}</h2>
                  <p className="text-xs leading-6 font-medium text-text">
                    {user?.message}
                  </p>
                </div>
                {/* rates */}
                <div className="col-span-3 flex-rows border-l border-border text-xs gap-1 text-star">
                  <Rating value={user?.rate} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieRates;
