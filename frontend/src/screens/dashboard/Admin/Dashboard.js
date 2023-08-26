import React from "react";
import { FaRegListAlt, FaUser } from "react-icons/fa";
import { HiViewGrid } from "react-icons/hi";
import { Movies } from "../../../assets/data/MovieData";
import SideBar from "../SideBar";
import Table from "../../../components/Table";

const Dashboard = () => {
  const DashboardData = [
    {
      bg: "bg-orange-600",
      icon: FaRegListAlt,
      title: "Số lượng bộ phim",
      total: 90,
    },
    {
      bg: "bg-blue-700",
      icon: HiViewGrid,
      title: "Số lượng thể loại",
      total: 8,
    },
    {
      bg: "bg-green-600",
      icon: FaUser,
      title: "Số lượng người dùng",
      total: 199,
    },
  ];

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
        Những Bộ Phim Gần Đây Nhất
      </h3>
      <Table data={Movies.slice(0, 5)} admin={true} />
    </SideBar>
  );
};

export default Dashboard;
