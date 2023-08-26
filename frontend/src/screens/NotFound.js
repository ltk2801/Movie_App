import React from "react";
import { Link } from "react-router-dom";
import { BiHomeAlt } from "react-icons/bi";

const NotFound = () => {
  return (
    <div className="flex-colo gap-8 w-full min-h-screen text-white bg-main lg:py-20 py-10 px-6">
      <img
        src="/images/error.jpg"
        alt="notfound"
        className="w-full h-96 object-contain"
      />
      <h1 className="lg:text-4xl font-bold">Trang Này Không Tồn Tại</h1>
      <p className="font-medium text-border italic leading-6">
        Trang bạn đang tìm kiếm không tồn tại. Có thể bạn đã nhập sai URL 💥💥
      </p>
      <Link
        to="/"
        className="bg-subMain transitions text-white flex-rows gap-4 font-medium py-3 hover:text-main px-6  rounded-md"
      >
        <BiHomeAlt /> Quay Về Trang Chủ
      </Link>
    </div>
  );
};

export default NotFound;
