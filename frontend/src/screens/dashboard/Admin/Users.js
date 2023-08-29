import React, { useEffect } from "react";
import SideBar from "../SideBar";
import Table2 from "../../../components/Table2";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsersAction,
  deleteUserAction,
} from "../../../redux/Actions/userActions";
import toast from "react-hot-toast";
import Loader from "../../../components/Notifications/Loader";
import { Empty } from "../../../components/Notifications/Empty";

const Users = () => {
  const dispatch = useDispatch();

  // get Favorite Movies
  const { isLoading, isError, users } = useSelector(
    (state) => state.adminGetAllUsers
  );
  // delete
  const { isError: deleteError, isSuccess: deleteSuccess } = useSelector(
    (state) => state.adminDeleteUser
  );

  // delete user handler
  const deleteUserHandler = (id) => {
    window.confirm("Bạn thật sự muốn xóa người dùng này ?") &&
      dispatch(deleteUserAction(id));
  };

  // useEffect
  useEffect(() => {
    dispatch(getAllUsersAction());
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({
        type: isError ? "GET_ALL_USERS_RESET" : "DELETE_USER_RESET",
      });
    }
  }, [dispatch, isError, deleteError, deleteSuccess]);

  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Danh Sách Người Dùng</h2>
        {isLoading ? (
          <Loader />
        ) : users.length > 0 ? (
          <Table2
            data={users}
            users={true}
            onDeleteFunction={deleteUserHandler}
          />
        ) : (
          <Empty message="Ứng dụng chưa có người dùng nào cả " />
        )}
      </div>
    </SideBar>
  );
};

export default Users;
