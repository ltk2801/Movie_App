import React from "react";
import Table from "../../../components/Table";
import SideBar from "../SideBar";
import { Movies } from "../../../assets/data/MovieData";

const MovieList = () => {
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Danh Sách Phim</h2>
          <button className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded">
            Xóa Hết
          </button>
        </div>
        <Table data={Movies} admin={true} />
      </div>
    </SideBar>
  );
};

export default MovieList;
