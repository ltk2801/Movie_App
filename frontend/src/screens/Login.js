import React, { useEffect } from "react";
import { Input } from "../components/UsedInput";
import { Link, useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { LoginValidation } from "../components/Validation/userValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InlineError } from "../components/Notifications/Error";
import { loginAction } from "../redux/Actions/userActions";

import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, userInfo, isSuccess } = useSelector(
    (state) => state.userLogin
  );

  // validate userInput
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginValidation),
  });

  // on submit
  const onSubmit = (data) => {
    dispatch(loginAction(data));
  };

  // useEffect
  useEffect(() => {
    if (userInfo?.isAdmin) {
      navigate("/dashboard");
    } else if (userInfo) {
      navigate("/profile");
    }

    if (isSuccess) {
      toast.success(`Chào mừng quay trở lại ${userInfo?.fullName}`);
    }
    if (isError) {
      toast.error(isError);
      dispatch({ type: "USER_LOGIN_RESET" });
    }
  }, [userInfo, isSuccess, isError, navigate, dispatch]);

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
          type="submit"
          disabled={isLoading}
          className="bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full"
        >
          {
            // if loading show loading
            isLoading ? (
              "Đang Load...."
            ) : (
              <>
                <FiLogIn /> Đăng Nhập
              </>
            )
          }
        </button>
        <p className="text-center text-border">
          Bạn chưa có tài khoản?{" "}
          <Link to="/register" className="text-dryGray font-semibold ml-2">
            Đăng ký ngay
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
