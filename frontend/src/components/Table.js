import React from "react";
import { FaCloudDownloadAlt, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { GoEye } from "react-icons/go";

const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase";
const Text =
  "text-sm text-left leading-6 whitespace-nowrap px-5 py-3 uppercase";

// Rows
const Rows = ({ movie, admin, onDeleteFunction, isLoading }) => {
  return (
    <tr>
      <td className={`${Text}`}>
        <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
          <img
            className="h-full w-full  object-cover"
            src={movie?.titleImage}
            alt={movie?.name}
          />
        </div>
      </td>
      <td className={`${Text} truncate`}>{movie?.name}</td>
      <td className={`${Text}`}>{movie?.category}</td>
      <td className={`${Text}`}>{movie?.language}</td>
      <td className={`${Text}`}>{movie?.year}</td>
      <td className={`${Text}`}>{movie?.time} phút</td>
      <td className={`${Text} float-right flex-rows gap-2`}>
        {admin ? (
          <>
            <button className="border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2">
              Sửa <FaEdit className="text-green-500" />
            </button>
            <button
              disabled={isLoading}
              onClick={() => onDeleteFunction(movie?._id)}
              className="bg-subMain text-white rounded flex-colo w-6 h-6"
            >
              <MdDelete />
            </button>
          </>
        ) : (
          <>
            <button className="border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2">
              Tải về <FaCloudDownloadAlt className="text-green-500" />
            </button>
            <Link
              to={`/movie/${movie?._id}`}
              className="bg-subMain text-white rounded flex-colo w-6 h-6"
            >
              <GoEye />
            </Link>
            <button
              disabled={isLoading}
              onClick={() => onDeleteFunction(movie?._id)}
              className="bg-subMain text-white rounded flex-colo w-6 h-6"
            >
              <MdDelete />
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

// Table
const Table = ({ data, admin, onDeleteFunction, isLoading }) => {
  return (
    <div className=" overflow-hidden relative w-full">
      <table className="w-full table-auto border border-border divide-y divide-border">
        <thead>
          <tr className="bg-dryGray">
            <th scope="col" className={`${Head} border-r border-border`}>
              Hình ảnh
            </th>
            <th scope="col" className={`${Head}  border-r border-border`}>
              Tên
            </th>
            <th scope="col" className={`${Head}  border-r border-border`}>
              Thể loại
            </th>
            <th scope="col" className={`${Head}  border-r border-border`}>
              Ngôn ngữ
            </th>
            <th scope="col" className={`${Head}  border-r border-border`}>
              năm phát hành
            </th>
            <th scope="col" className={`${Head}  border-r border-border`}>
              Thời gian
            </th>
            <th scope="col" className={`${Head} text-end`}>
              Hành động
            </th>
          </tr>
        </thead>
        <tbody className="bg-main divide-y divide-gray-800">
          {data.map((movie, i) => (
            <Rows
              movie={movie}
              key={i}
              admin={admin}
              onDeleteFunction={onDeleteFunction}
              isLoading={isLoading}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
