import React, { useEffect, useState } from "react";

import SideBar from "./../SideBar";
import { Input, Message, Select } from "../../../components/UsedInput";
import Uploader from "../../../components/Uploader";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { ImUpload } from "react-icons/im";
import CastsModal from "../../../components/Modals/CastsModal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { movieValidation } from "../../../components/Validation/movieValidation";
import {
  createMovieAction,
  removeCastAction,
} from "../../../redux/Actions/movieAction";
import toast from "react-hot-toast";
import { InlineError } from "../../../components/Notifications/Error";
import { ImagePreview } from "../../../components/ImagePreview";

const AddMovie = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [cast, setCast] = useState(null);
  const [imageWithoutTitle, setImageWithoutTitle] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // use Selectors
  const { categories } = useSelector((state) => state.categoryGetAll);

  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.adminCreateMovie
  );
  const { casts } = useSelector((state) => state.casts);
  // validate userInput
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(movieValidation),
  });

  // on submit
  const onSubmit = (data) => {
    dispatch(
      createMovieAction({
        ...data,
        image: imageWithoutTitle,
        titleImage: imageTitle,
        video: videoUrl,
        casts,
      })
    );
  };

  // delete cast handler
  const deleteCastHandler = (id) => {
    window.confirm("Bạn thật sự muốn xóa diễn viên khỏi phim này ?") &&
      dispatch(removeCastAction(id)) &&
      toast.success("Diễn viễn đã đc xóa khỏi phim thành công");
  };

  // useEffect
  useEffect(() => {
    // if modal is false then reset cast
    if (modalOpen === false) {
      setCast();
    }
    // if its success then reset form and navigate to add Movie
    if (isSuccess) {
      reset({
        name: "",
        time: 0,
        language: "",
        year: 0,
        category: "",
        desc: "",
      });
      setImageTitle("");
      setImageWithoutTitle("");
      setVideoUrl("");
      dispatch({ type: "CREATE_MOVIE_RESET" });
      navigate("/addMovie");
    }
    // if error then show error
    if (isError) {
      toast.error(isError);
      dispatch({ type: "CREATE_MOVIE_RESET" });
    }
  }, [modalOpen, isSuccess, isError, dispatch, reset, navigate]);

  return (
    <SideBar>
      <CastsModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        cast={cast}
      />
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Thêm Mới Phim</h2>
        <div className="w-full grid md:grid-cols-2 gap-6">
          <div className="w-full">
            <Input
              label="Tên Bộ Phim"
              placeholder="Đảo hải tặc (Onepiece) "
              type="text"
              name="name"
              register={register("name")}
              bg={true}
            />
            {errors.name && <InlineError text={errors.name.message} />}
          </div>
          <div className="w-full">
            <Input
              label="Thời Lượng"
              placeholder="60 phút"
              type="number"
              name="time"
              register={register("time")}
              bg={true}
            />
            {errors.time && <InlineError text={errors.time.message} />}
          </div>
        </div>

        <div className="w-full grid md:grid-cols-2 gap-6">
          <div className="w-full">
            <Input
              label="Quốc Gia"
              placeholder="Âu Mỹ"
              type="text"
              name="language"
              register={register("language")}
              bg={true}
            />
            {errors.language && <InlineError text={errors.language.message} />}
          </div>
          <div className="w-full">
            <Input
              label="Năm Sản Xuất"
              placeholder="2023"
              type="number"
              name="year"
              register={register("year")}
              bg={true}
            />
            {errors.year && <InlineError text={errors.year.message} />}
          </div>
        </div>
        {/* Images */}
        <div className="w-full grid md:grid-cols-2 gap-6">
          {/* Hình ảnh không có tiêu đề*/}
          <div className="flex flex-col gap-2">
            <p className="text-border font-semibold text-sm">Hình ảnh</p>
            <Uploader setImageUrl={setImageWithoutTitle} />
            <ImagePreview image={imageWithoutTitle} name="imageWithouTitle" />
          </div>
          {/* Hình ảnh  có tiêu đề*/}
          <div className="flex flex-col gap-2">
            <p className="text-border font-semibold text-sm">Hình ảnh bìa</p>
            <Uploader setImageUrl={setImageTitle} />
            <ImagePreview image={imageTitle} name="imageTitle" />
          </div>
        </div>
        {/* Mô tả nội dung */}
        <div className="w-full">
          <Message
            label="Mô Tả Nội Dung"
            placeholder="Hãy viết gì đó để mô tả nội dung phim"
            name="desc"
            register={register("desc")}
          />
          {errors.desc && <InlineError text={errors.desc.message} />}
        </div>

        {/* Thể loại phim */}
        <div className="text-sm w-full">
          <Select
            label="Thể Loại Phim"
            options={categories?.length > 0 ? categories : []}
            name="category"
            register={register("category")}
          />
          {errors.category && <InlineError text={errors.category.message} />}
        </div>
        {/* MOVIE VIDEO */}
        <div className="flex flex-col gap-2 w-full ">
          <label className="text-border font-semibold text-sm">
            Video phim
          </label>
          <div className={`w-full grid ${videoUrl && "md:grid-cols-2"} gap-6`}>
            {videoUrl && (
              <div className="w-full bg-main text-sm text-subMain py-4 border border-border rounded flex-colo ">
                Video đã được tải lên
              </div>
            )}
            <Uploader setImageUrl={setVideoUrl} video={true} />
          </div>
        </div>
        {/* CAST */}
        <div className="w-full grid lg:grid-cols-2 gap-6 items-start">
          <button
            onClick={() => setModalOpen(true)}
            className="w-full py-4 bg-main border border-subMain border-dashed text-white rounded"
          >
            Thêm Diễn Viên
          </button>
          <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-4 grid-cols-2 gap-4">
            {casts?.length > 0 &&
              casts?.map((cast, i) => (
                <div
                  key={cast?.id ? cast.id : i}
                  className="p-2 italic text-xs text-text rounded flex-colo bg-main border border-border"
                >
                  <img
                    src={cast?.image ? cast.image : "/images/avatar.jpg"}
                    alt={cast?.name}
                    className="w-full h-24 object-cover rounded mb-2"
                  />
                  <p>{cast?.name}</p>
                  <div className="flex-rows mt-2 w-full gap-2">
                    <button
                      onClick={() => deleteCastHandler(cast?.id)}
                      className="w-6 h-6 flex-colo bg-dry border border-border  text-subMain rounded"
                    >
                      <MdDelete />
                    </button>
                    <button
                      onClick={() => {
                        setCast(cast);
                        setModalOpen(true);
                      }}
                      className="w-6 h-6 flex-colo bg-dry border border-border text-green-600  rounded"
                    >
                      <FaEdit />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {/* SUBMIT || !imageTitle || !imageWithoutTitle || !videoUrl */}
        <button
          disabled={isLoading}
          onClick={handleSubmit(onSubmit)}
          className="bg-subMain w-full flex-rows gap-6 font-medium  text-white py-4  rounded mt-10 "
        >
          {isLoading ? (
            "Đang thêm mới..."
          ) : (
            <>
              <ImUpload /> Thêm Mới Phim
            </>
          )}
        </button>
      </div>
    </SideBar>
  );
};

export default AddMovie;
