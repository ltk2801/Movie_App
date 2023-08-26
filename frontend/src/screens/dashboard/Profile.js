import React from "react";
import Uploader from "../../components/Uploader";
import SideBar from "./SideBar";
import { Input } from "../../components/UsedInput";

const Profile = () => {
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Hồ Sơ</h2>
        <Uploader />
        <Input
          label="Họ và tên"
          placeholder="Lưu Tuấn Khanh"
          type="text"
          bg={true}
        />
        <Input
          label="Email"
          placeholder="ltk2801@gmail.com"
          type="email"
          bg={true}
        />
        <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
          <button className="bg-subMain font-medium transitions hover:bg-main border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">
            Xóa Tài Khoản
          </button>
          <button className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">
            Cập Nhật Tài Khoản
          </button>
        </div>
      </div>
    </SideBar>
  );
};

export default Profile;
