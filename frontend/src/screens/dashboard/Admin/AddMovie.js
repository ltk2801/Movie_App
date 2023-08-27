import React, { useEffect, useState } from "react";

import SideBar from "./../SideBar";
import { Input, Message, Select } from "../../../components/UsedInput";
import Uploader from "../../../components/Uploader";
import { CategoriesData } from "../../../assets/data/CategoriesData";
import { Casts } from "../../../assets/data/MovieData";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { ImUpload } from "react-icons/im";
import CastsModal from "../../../components/Modals/CastsModal";

const AddMovie = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [cast, setCast] = useState(null);

  useEffect(() => {
    if (!modalOpen) {
      setCast();
    }
  }, [modalOpen]);

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
          <Input
            label="Tên Bộ Phim"
            placeholder="Đảo hải tặc (Onepiece) "
            type="text"
            bg={true}
          />
          <Input label="Thời Lượng" placeholder="2hr" type="text" bg={true} />
        </div>

        <div className="w-full grid md:grid-cols-2 gap-6">
          <Input
            label="Ngôn Ngữ"
            placeholder="Tiếng Anh"
            type="text"
            bg={true}
          />
          <Input
            label="Năm Sản Xuất"
            placeholder="2023"
            type="number"
            bg={true}
          />
        </div>
        {/* Images */}
        <div className="w-full grid md:grid-cols-2 gap-6">
          {/* Hình ảnh không có tiêu đề*/}
          <div className="flex flex-col gap-2">
            <p className="text-border font-semibold text-sm">Hình ảnh</p>
            <Uploader />
            <div className="w-32 h-32 p-2 bg-main border border-border rounded">
              <img
                src="/images/imageMovie.jpg"
                alt=""
                className="w-full h-full object-cover rounded"
              />
            </div>
          </div>
          {/* Hình ảnh  có tiêu đề*/}
          <div className="flex flex-col gap-2">
            <p className="text-border font-semibold text-sm">Hình ảnh bìa</p>
            <Uploader />
            <div className="w-32 h-32 p-2 bg-main border border-border rounded">
              <img
                src="/images/movie.jpg"
                alt=""
                className="w-full h-full object-cover rounded"
              />
            </div>
          </div>
        </div>
        {/* Mô tả nội dung */}
        <Message
          label="Mô Tả Nội Dung"
          placeholder="Hãy viết gì đó để mô tả nội dung phim"
        />
        {/* Thể loại phim */}
        <div className="text-sm w-full">
          <Select label="Thể Loại Phim" options={CategoriesData} />
        </div>
        {/* MOVIE VIDEO */}
        <div className="flex flex-col gap-2 w-full ">
          <label className="text-border font-semibold text-sm">
            Video phim
          </label>
          <Uploader />
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
            {Casts.map((cast, i) => (
              <div
                key={i}
                className="p-2 italic text-xs text-text rounded flex-colo bg-main border border-border"
              >
                <img
                  src={cast.image ? cast.image : "/images/avatar.jpg"}
                  alt={cast.name}
                  className="w-full h-24 object-cover rounded mb-2"
                />
                <p>{cast.name}</p>
                <div className="flex-rows mt-2 w-full gap-2">
                  <button className="w-6 h-6 flex-colo bg-dry border border-border  text-subMain rounded">
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
        {/* SUBMIT */}
        <button className="bg-subMain w-full flex-rows gap-6 font-medium  text-white py-4  rounded mt-10 ">
          <ImUpload /> Thêm Mới Phim
        </button>
      </div>
    </SideBar>
  );
};

export default AddMovie;
