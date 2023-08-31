import React, { useEffect, useState } from "react";
import MainModal from "./MainModal";
import { Input } from "../UsedInput";
import { HiPlusCircle } from "react-icons/hi";
import { RxUpdate } from "react-icons/rx";
import Uploader from "../Uploader";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  addCastAction,
  updateCastAction,
} from "../../redux/Actions/movieAction";
import toast from "react-hot-toast";
import { InlineError } from "../Notifications/Error";
import { ImagePreview } from "../ImagePreview";

const CastsModal = ({ modalOpen, setModalOpen, cast }) => {
  const dispatch = useDispatch();
  const [castImage, setCastImage] = useState("");
  const generateId = Math.floor(Math.random() * 100000000);
  const image = castImage ? castImage : cast?.image;

  // validate cast
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required("Tên diễn viên bắt buộc phải có"),
      })
    ),
  });

  // on submit
  const onSubmit = (data) => {
    if (cast) {
      // if cast is not null then update cast
      dispatch(
        updateCastAction({
          ...data,
          image: image,
          id: cast.id,
        })
      );
      toast.success("Cập nhật diễn viên thành công");
      setModalOpen(false);
    } else {
      // else add new cast
      dispatch(
        addCastAction({
          ...data,
          image: image,
          id: generateId,
        })
      );
      toast.success("Thêm diễn viên thành công");
      setModalOpen(false);
    }
    reset();
    setCastImage("");
  };

  useEffect(() => {
    if (cast) {
      setValue("name", cast?.name);
    }
  }, [cast, setValue]);

  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl">
        <h2 className="text-3xl font-bold">
          {cast ? "Cập Nhật Diễn Viên" : "Tạo Diễn Viên"}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 text-left mt-6"
        >
          <div className="w-full">
            <Input
              label="Tên Diễn Viên"
              placeholder="Kim Ngân"
              type="text"
              name="name"
              register={register("name")}
              bg={false}
            />
            {errors.name && <InlineError text={errors.name.message} />}
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-border font-semibold text-sm">
              Hình ảnh diễn viên
            </p>
            <Uploader setImageUrl={setCastImage} />
            <ImagePreview
              image={image ? image : "/images/avatar.jpg"}
              name="castImage"
            />
          </div>
          <button
            type="submit"
            // onClick={() => setModalOpen(false)}
            className="w-full flex-rows gap-4 py-3 text-lg transitions  hover:bg-dry border-2 border-subMain  rounded bg-subMain text-white"
          >
            {cast ? (
              <>
                <RxUpdate className="text-white" /> Cập Nhật
              </>
            ) : (
              <>
                <HiPlusCircle /> Thêm
              </>
            )}
          </button>
        </form>
      </div>
    </MainModal>
  );
};
export default CastsModal;
