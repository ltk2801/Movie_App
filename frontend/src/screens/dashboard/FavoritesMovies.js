import React from "react";
import Table from "../../components/Table";
import SideBar from "./SideBar";
import { Movies } from "../../assets/data/MovieData";

const FavoritesMovies = () => {
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Danh Sách Phim Yêu Thích</h2>
          <button className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded">
            Xóa Hết
          </button>
        </div>
        <Table data={Movies} admin={false} />
      </div>
    </SideBar>
  );
};

export default FavoritesMovies;
