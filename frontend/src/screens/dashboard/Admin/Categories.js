import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";

import { HiPlusCircle } from "react-icons/hi";
import Table2 from "../../../components/Table2";
import { CategoriesData } from "../../../assets/data/CategoriesData";
import CategoryModal from "../../../components/Modals/CategoryModal";

const Categories = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState();

  const onEditFunction = (dataCategory) => {
    setCategory(dataCategory);
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    if (modalOpen === false) {
      setCategory();
    }
  }, [modalOpen]);

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
        <Table2
          data={CategoriesData}
          users={false}
          onEditFunction={onEditFunction}
        />
      </div>
    </SideBar>
  );
};

export default Categories;
