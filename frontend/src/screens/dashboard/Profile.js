import React, { useEffect, useState } from "react";
import Uploader from "../../components/Uploader";
import SideBar from "./SideBar";
import { Input } from "../../components/UsedInput";
import { useDispatch, useSelector } from "react-redux";
import { ProfileValidation } from "../../components/Validation/userValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InlineError } from "../../components/Notifications/Error";
import {
  deleteProfileAction,
  updateProfileAction,
} from "../../redux/Actions/userActions";

import toast from "react-hot-toast";
import { ImagePreview } from "../../components/ImagePreview";

const Profile = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  const [imageUrl, setImageUrl] = useState(userInfo ? userInfo.image : "");

  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.userUpdateProfile
  );

  const { isLoading: deleteLoading, isError: deleteError } = useSelector(
    (state) => state.userDeleteProfile
  );
  // validate userInput
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ProfileValidation),
  });

  // on submit update profile
  const onSubmit = (data) => {
    dispatch(updateProfileAction({ ...data, image: imageUrl }));
  };

  // on submit delete profile
  const deleteProfile = () => {
    window.confirm("Bạn thật sự muốn xóa tài khoản của mình ") &&
      dispatch(deleteProfileAction());
  };

  // useEffect
  useEffect(() => {
    if (userInfo) {
      setValue("fullName", userInfo?.fullName);
      setValue("email", userInfo?.email);
    }
    if (isSuccess) {
      dispatch({ type: "USER_UPDATE_PROFILE_RESET" });
    }
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({ type: "USER_DELETE_PROFILE_RESET" });
      dispatch({ type: "USER_UPDATE_PROFILE_RESET" });
    }
  }, [userInfo, setValue, isError, dispatch, isSuccess, deleteError]);

  return (
    <SideBar>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Hồ Sơ</h2>
        <div className="w-full grid lg:grid-cols-12 gap-6">
          <div className="col-span-10">
            <Uploader setImageUrl={setImageUrl} />
          </div>
          {/* Image preview */}
          <div className="col-span-2">
            <ImagePreview
              name={userInfo ? userInfo.fullName : "Lưu Tuấn Khanh"}
              image={imageUrl}
            />
          </div>
        </div>

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
        <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
          <button
            onClick={deleteProfile}
            type="button"
            disabled={deleteLoading || isLoading}
            className="bg-subMain font-medium transitions hover:bg-main border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto"
          >
            {deleteLoading ? "Đang Xóa Tài Khoản..." : "Xóa Tài Khoản"}
          </button>
          <button
            disabled={deleteLoading || isLoading}
            type="submit"
            className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto"
          >
            {isLoading ? "Đang Cập Nhật..." : "Cập Nhật Tài Khoản"}
          </button>
        </div>
      </form>
    </SideBar>
  );
};

export default Profile;
