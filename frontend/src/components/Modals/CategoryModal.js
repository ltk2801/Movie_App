import React from "react";
import MainModal from "./MainModal";
import { Input } from "../UsedInput";
import { HiPlusCircle } from "react-icons/hi";
import { RxUpdate } from "react-icons/rx";
const CategoryModal = ({ modalOpen, setModalOpen, category }) => {
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl">
        <h2 className="text-3xl font-bold">
          {category ? "Cập Nhật Thể Loại" : "Tạo Thể Loại"}
        </h2>
        <form className="flex flex-col gap-6 text-left mt-6">
          <Input
            label="Tên Thể Loại"
            placeholder={category ? category.title : "Hành động"}
            type="text"
            bg={false}
          />
          <button
            onClick={() => setModalOpen(false)}
            className="w-full flex-rows gap-4 py-3 text-lg transitions  hover:bg-dry border-2 border-subMain  rounded bg-subMain text-white"
          >
            {category ? (
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
export default CategoryModal;
