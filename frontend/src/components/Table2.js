import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { shortUppercaseId, dateFormat } from "./Notifications/Empty";

const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase";
const Text =
  "text-sm text-left leading-6 whitespace-nowrap px-5 py-3 uppercase";

// Rows
const Rows = ({ data, users, onEditFunction, onDeleteFunction }) => {
  return (
    <tr>
      {/* users */}
      {users ? (
        <>
          <td className={`${Text}`}>
            <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
              <img
                className="h-full w-full  object-cover"
                src={data?.image ? data.image : "/images/avatar.jpg"}
                alt={data?.fullName}
              />
            </div>
          </td>
          <td className={`${Text} `}>
            {data?._id ? shortUppercaseId(data?._id) : "2R75T8"}
          </td>
          <td className={`${Text}`}>{data?.fullName}</td>
          <td className={`${Text}`}>{data?.email}</td>
          <td className={`${Text}`}>{dateFormat(data?.createdAt)}</td>
          <td className={`${Text}`}>{data?.isAdmin ? "Admin" : "User"}</td>
          <td className={`${Text} float-right flex-rows gap-2`}>
            {!data.isAdmin && (
              <button
                onClick={() => onDeleteFunction(data?._id)}
                className="bg-subMain text-white rounded flex-colo w-6 h-6"
              >
                <MdDelete />
              </button>
            )}
          </td>
        </>
      ) : (
        // Categories
        <>
          <td className={`${Text} font-bold `}>
            {data?._id ? shortUppercaseId(data?._id) : "2R75T8"}
          </td>
          <td className={`${Text}`}>{dateFormat(data?.createdAt)}</td>
          <td className={`${Text}`}>{data?.title}</td>
          <td className={`${Text} float-right flex-rows gap-2`}>
            <button
              onClick={() => onEditFunction(data)}
              className="border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2"
            >
              Sửa <FaEdit className="text-green-500" />
            </button>
            <button
              onClick={() => onDeleteFunction(data?._id)}
              className="bg-subMain text-white rounded flex-colo w-6 h-6"
            >
              <MdDelete />
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

// Table
const Table2 = ({ data, users, onEditFunction, onDeleteFunction }) => {
  return (
    // <div className="overflow-x-scroll overflow-hidden relative w-full">
    <div className="overflow-hidden relative w-full">
      <table className="w-full table-auto border border-border divide-y divide-border">
        <thead>
          <tr className="bg-dryGray">
            {users ? (
              <>
                <th scope="col" className={`${Head}  border-r border-border`}>
                  Hình ảnh
                </th>
                <th scope="col" className={`${Head}  border-r border-border`}>
                  Id
                </th>
                <th scope="col" className={`${Head}  border-r border-border`}>
                  Họ và tên
                </th>
                <th scope="col" className={`${Head}  border-r border-border`}>
                  Email
                </th>
                <th scope="col" className={`${Head}  border-r border-border`}>
                  Ngày tạo
                </th>
                <th scope="col" className={`${Head}  border-r border-border`}>
                  Vai trò
                </th>
              </>
            ) : (
              <>
                <th scope="col" className={`${Head}  border-r border-border`}>
                  Id
                </th>
                <th scope="col" className={`${Head}  border-r border-border`}>
                  Ngày tạo
                </th>
                <th scope="col" className={`${Head}  border-r border-border`}>
                  Tên thể loại
                </th>
              </>
            )}
            <th scope="col" className={`${Head} text-end`}>
              Hành động
            </th>
          </tr>
        </thead>
        <tbody className="bg-main divide-y divide-gray-800">
          {data.map((data, i) => (
            <Rows
              key={i}
              data={data}
              users={users}
              onEditFunction={onEditFunction}
              onDeleteFunction={onDeleteFunction}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table2;
