import React from "react";
import { Input } from "../components/UsedInput";
import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

const Register = () => {
  return (
    <div className="container mx-auto px-2 my-24 flex-colo">
      <div className="w-full 2xl:w-2/5 gap-8 flex-colo sm:p-14 p-7 md:w-3/5 bg-dry rounded-lg border border-border">
        <img
          src="/images/logoFooter.png"
          alt="logo"
          className="w-full h-24 object-contain"
        />
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
        <Input
          label="Password"
          placeholder="*******"
          type="password"
          bg={true}
        />
        <Link
          to="/dashboard"
          className="bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full"
        >
          <FiLogIn /> Đăng ký
        </Link>
        <p className="text-center text-border">
          Bạn đã có tài khoản?{" "}
          <Link to="/login" className="text-dryGray font-semibold ml-2">
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
