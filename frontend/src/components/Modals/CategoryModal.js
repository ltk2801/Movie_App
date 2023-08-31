import React, { useEffect, useState } from "react";
import MainModal from "./MainModal";
import { Input } from "../UsedInput";
import { HiPlusCircle } from "react-icons/hi";
import { RxUpdate } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateCategoryAction,
  UpdateCategoryAction,
} from "../../redux/Actions/categoryAction";
import toast from "react-hot-toast";
const CategoryModal = ({ modalOpen, setModalOpen, category }) => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.categoryCreate
  );

  const {
    isLoading: upLoading,
    isError: upError,
    isSuccess: upSuccess,
  } = useSelector((state) => state.categoryUpdate);

  // create category handler
  const createCategoryHandler = (e) => {
    e.preventDefault();
    if (title) {
      // if category is not empty then update category else create category
      if (category) {
        dispatch(UpdateCategoryAction(category?._id, { title: title }));
        setModalOpen(!modalOpen);
      } else {
        dispatch(CreateCategoryAction({ title: title }));
        setTitle("");
        setModalOpen(!modalOpen);
      }
    } else {
      toast.error("Vui lòng nhập tên thể loại");
    }
  };

  // useEffect
  useEffect(() => {
    if (upError || isError) {
      toast.error(upError || isError);
      dispatch({
        type: isError ? "CREATE_CATEGORY_RESET" : " UPDATE_CATEGORY_RESET",
      });
    }
    if (upSuccess || isSuccess) {
      dispatch({
        type: isError ? "CREATE_CATEGORY_RESET" : "UPDATE_CATEGORY_RESET",
      });
    }
    // if category is not null then set title to category title
    if (category) {
      setTitle(category?.title);
    }
    // if modal is close set title to empty
    if (modalOpen === false) {
      setTitle("");
    }
  }, [dispatch, isError, isSuccess, modalOpen, upError, upSuccess, category]);

  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl">
        <h2 className="text-3xl font-bold">
          {category ? "Cập Nhật Thể Loại" : "Tạo Thể Loại"}
        </h2>
        <form
          className="flex flex-col gap-6 text-left mt-6"
          onSubmit={createCategoryHandler}
        >
          <Input
            label="Tên Thể Loại"
            placeholder={"Nhập tên thể loại"}
            type="text"
            bg={false}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            disabled={isLoading || upLoading}
            type="submit"
            className="w-full flex-rows gap-4 py-3 text-lg transitions  hover:bg-dry border-2 border-subMain  rounded bg-subMain text-white"
          >
            {isLoading || upLoading ? (
              "Đang Load..."
            ) : category ? (
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
