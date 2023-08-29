import React from "react";
import { BsFillGridFill } from "react-icons/bs";
import { FaHeart, FaListAlt, FaUsers } from "react-icons/fa";
import {
  RiLockPasswordLine,
  RiLogoutCircleLine,
  RiMovie2Fill,
} from "react-icons/ri";
import { HiViewGridAdd } from "react-icons/hi";
import { FiSettings } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../redux/Actions/userActions";
import toast from "react-hot-toast";

const SideBar = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Kiểm tra user đã đăng nhập hay chưa ( dựa trên state)
  const { userInfo } = useSelector((state) => state.userLogin);

  // logout function
  const logOutHandler = () => {
    dispatch(logoutAction());
    toast.success("Đăng xuất tài khoản thành công");
    navigate("/login");
  };

  const sideLinks = userInfo?.isAdmin
    ? [
        {
          name: "Dashboard",
          link: "/dashboard",
          icon: BsFillGridFill,
        },
        {
          name: "Danh Sách Phim",
          link: "/movieslist",
          icon: FaListAlt,
        },
        {
          name: "Thêm Phim Mới",
          link: "/addmovie",
          icon: RiMovie2Fill,
        },
        {
          name: "Thể Loại",
          link: "/categories",
          icon: HiViewGridAdd,
        },
        {
          name: "Người Dùng",
          link: "/users",
          icon: FaUsers,
        },
        {
          name: "Cập Nhật Hồ Sơ",
          link: "/profile",
          icon: FiSettings,
        },
        {
          name: "Danh Sách Phim Yêu Thích",
          link: "/favorites",
          icon: FaHeart,
        },
        {
          name: "Thay Đổi Password",
          link: "/password",
          icon: RiLockPasswordLine,
        },
      ]
    : userInfo
    ? [
        {
          name: "Cập Nhật Hồ Sơ",
          link: "/profile",
          icon: FiSettings,
        },
        {
          name: "Danh Sách Phim Yêu Thích",
          link: "/favorites",
          icon: FaHeart,
        },
        {
          name: "Thay Đổi Password",
          link: "/password",
          icon: RiLockPasswordLine,
        },
      ]
    : [];

  const active = "bg-dryGray text-subMain";
  const hover = "hover:text-white hover:bg-main";
  const inActive =
    "rounded font-medium text-sm transitions flex gap-3 items-center p-4";
  const Hover = ({ isActive }) =>
    isActive ? `${active} ${inActive}` : `${inActive} ${hover}`;

  return (
    <div className="min-h-screen container mx-auto px-2">
      <div className="xl:grid grid-cols-8 gap-10 items-start md:py-12 py-6">
        <div className="col-span-2 sticky bg-dry border border-gray-800 p-6 rounded-md xl:mb-0 mb-5">
          {
            // SideBar Links
            sideLinks.map((link, index) => (
              <NavLink to={link.link} key={index} className={Hover}>
                <link.icon /> <p>{link.name}</p>
              </NavLink>
            ))
          }
          <button
            onClick={logOutHandler}
            className={`${inActive} ${hover} w-full`}
          >
            <RiLogoutCircleLine /> <p>Đăng Xuất</p>
          </button>
        </div>
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="10"
          data-aos-offset="200"
          className="col-span-6 rounded-md bg-dry border border-gray-800 p-6"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
