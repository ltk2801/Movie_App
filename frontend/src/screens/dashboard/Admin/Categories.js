import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";

import { HiPlusCircle } from "react-icons/hi";
import Table2 from "../../../components/Table2";
import CategoryModal from "../../../components/Modals/CategoryModal";
import { useDispatch, useSelector } from "react-redux";

import {
  DeleteCategoryAction,
  getAllCategoriesAction,
} from "../../../redux/Actions/categoryAction";
import Loader from "../../../components/Notifications/Loader";
import { Empty } from "../../../components/Notifications/Empty";
import toast from "react-hot-toast";

const Categories = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState();

  const dispatch = useDispatch();

  // all categories
  const { categories, isLoading } = useSelector(
    (state) => state.categoryGetAll
  );
  // delete category
  const { isSuccess: deleteSuccess, isError: deleteError } = useSelector(
    (state) => state.categoryDelete
  );
  const adminDeleteCategoryHandler = (id) => {
    window.confirm("Bạn thật sự muốn xóa thể loại phim này ?") &&
      dispatch(DeleteCategoryAction(id));
  };

  const onEditFunction = (dataCategory) => {
    setCategory(dataCategory);
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    // get all categories
    dispatch(getAllCategoriesAction());
    if (modalOpen === false) {
      setCategory();
    }
    if (deleteError) {
      toast.error(deleteError);
      dispatch({
        type: "DELETE_CATEGORY_RESET",
      });
    }
    if (deleteSuccess) {
      dispatch({ type: "DELETE_CATEGORY_SUCCESS" });
    }
  }, [modalOpen, dispatch, deleteError, deleteSuccess]);

  return (
    <SideBar>
      <CategoryModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        category={category}
      />
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Danh Sách Thể Loại</h2>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-subMain flex-rows gap-4 font-medium transitions hover:bg-main border border-subMain text-white py-2 px-4 rounded"
          >
            <HiPlusCircle /> Thêm
          </button>
        </div>

        {isLoading ? (
          <Loader />
        ) : categories?.length > 0 ? (
          <Table2
            data={categories}
            users={false}
            onEditFunction={onEditFunction}
            onDeleteFunction={adminDeleteCategoryHandler}
          />
        ) : (
          <Empty message="Danh sách thể loại phim trống" />
        )}
      </div>
    </SideBar>
  );
};

export default Categories;
