import React, { useEffect } from "react";
import { Input } from "../components/UsedInput";
import { Link, useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { RegisterValidation } from "../components/Validation/userValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InlineError } from "../components/Notifications/Error";
import { registerAction } from "../redux/Actions/userActions";
import toast from "react-hot-toast";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, userInfo, isSuccess } = useSelector(
    (state) => state.userRegister
  );
  const haveUser = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
  // validate userInput
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterValidation),
  });

  // on submit
  const onSubmit = (data) => {
    dispatch(registerAction(data));
  };

  // useEffect
  useEffect(() => {
    if (haveUser?.isAdmin) {
      navigate("/dashboard");
    } else if (haveUser) {
      navigate("/profile");
    }

    if (isSuccess) {
      toast.success(`Chào mừng ${userInfo?.fullName}`);
      dispatch({ type: "USER_REGISTER_RESET" });
    }
    if (isError) {
      toast.error(isError);
      dispatch({ type: "USER_REGISTER_RESET" });
    }
  }, [userInfo, isSuccess, isError, navigate, dispatch, haveUser]);

  return (
    <div className="container mx-auto px-2 my-24 flex-colo">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full 2xl:w-2/5 gap-8 flex-colo sm:p-14 p-7 md:w-3/5 bg-dry rounded-lg border border-border"
      >
        <img
          src="/images/logoFooter.png"
          alt="logo"
          className="w-full h-24 object-contain"
        />

        <div className="w-full">
          <Input
            label="Họ và tên"
            placeholder="Lưu Tuấn Khanh"
            type="text"
            name="fullName"
            register={register("fullName")}
            bg={true}
          />
          {errors.fullName && <InlineError text={errors.fullName.message} />}
        </div>
        <div className="w-full">
          <Input
            label="Email"
            placeholder="ltk2801@gmail.com"
            type="email"
            name="email"
            register={register("email")}
            bg={true}
          />
          {errors.email && <InlineError text={errors.email.message} />}
        </div>
        <div className="w-full">
          <Input
            label="Password"
            placeholder="*******"
            type="password"
            name="password"
            register={register("password")}
            bg={true}
          />
          {errors.password && <InlineError text={errors.password.message} />}
        </div>
        <button
          disabled={isLoading}
          type="submit"
          to="/dashboard"
          className="bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full"
        >
          {
            // if loading show loading
            isLoading ? (
              "Đang Load...."
            ) : (
              <>
                <FiLogIn /> Đăng ký
              </>
            )
          }
        </button>
        <p className="text-center text-border">
          Bạn đã có tài khoản?{" "}
          <Link to="/login" className="text-dryGray font-semibold ml-2">
            Đăng nhập ngay
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
