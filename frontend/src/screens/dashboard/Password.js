import React from "react";

import SideBar from "./SideBar";
import { Input } from "../../components/UsedInput";

const Password = () => {
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Thay Đổi Password</h2>
        <Input
          label="Mật khẩu cũ"
          placeholder="********"
          type="password"
          bg={true}
        />
        <Input
          label="Mật khẩu mới"
          placeholder="********"
          type="password"
          bg={true}
        />
        <Input
          label="Xác nhận lại mật khẩu"
          placeholder="********"
          type="password"
          bg={true}
        />
        <div className="flex justify-end items-center my-4">
          <button className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">
            Thay Đổi Password
          </button>
        </div>
      </div>
    </SideBar>
  );
};

export default Password;
