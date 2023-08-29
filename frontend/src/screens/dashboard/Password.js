import React, { useEffect } from "react";

import SideBar from "./SideBar";
import { Input } from "../../components/UsedInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { PasswordValidation } from "../../components/Validation/userValidation";
import { useDispatch, useSelector } from "react-redux";
import { InlineError } from "../../components/Notifications/Error";
import { changePasswordAction } from "../../redux/Actions/userActions";
import toast from "react-hot-toast";

const Password = () => {
  const dispatch = useDispatch();

  const { isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.userChangePassword
  );

  // validate userInput
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(PasswordValidation),
  });

  // on submit
  const onSubmit = (data) => {
    dispatch(changePasswordAction(data));
  };

  // useEffect
  useEffect(() => {
    if (isSuccess) {
      dispatch({ type: "USER_CHANGE_PASSWORD_RESET" });
    }
    if (isError) {
      toast.error(isError);
      dispatch({ type: "USER_CHANGE_PASSWORD_RESET" });
    }
    if (message) {
      toast.success(message);
      reset();
    }
  }, [isError, dispatch, isSuccess, message, reset]);

  return (
    <SideBar>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Thay Đổi Password</h2>
        <div className="w-full">
          <Input
            label="Mật khẩu cũ"
            placeholder="********"
            type="password"
            name="oldPassword"
            register={register("oldPassword")}
            bg={true}
          />
          {errors.oldPassword && (
            <InlineError text={errors.oldPassword.message} />
          )}
        </div>
        <div className="w-full">
          <Input
            label="Mật khẩu mới"
            placeholder="********"
            type="password"
            name="newPassword"
            register={register("newPassword")}
            bg={true}
          />
          {errors.newPassword && (
            <InlineError text={errors.newPassword.message} />
          )}
        </div>
        <div className="w-full">
          <Input
            label="Xác nhận lại mật khẩu"
            placeholder="********"
            type="password"
            name="confirmPassword"
            register={register("confirmPassword")}
            bg={true}
          />
          {errors.confirmPassword && (
            <InlineError text={errors.confirmPassword.message} />
          )}
        </div>
        <div className="flex justify-end items-center my-4">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto"
          >
            {isLoading ? "Đang cập nhật..." : " Thay Đổi Password"}
          </button>
        </div>
      </form>
    </SideBar>
  );
};

export default Password;
