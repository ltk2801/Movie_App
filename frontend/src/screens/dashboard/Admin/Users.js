import React from "react";
import SideBar from "../SideBar";
import Table2 from "../../../components/Table2";
import { Casts } from "../../../assets/data/MovieData";

const Users = () => {
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Danh Sách Người Dùng</h2>
        <Table2 data={Casts} users={true} />
      </div>
    </SideBar>
  );
};

export default Users;
