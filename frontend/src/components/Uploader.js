import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { uploadImageservice } from "../redux/APIs/imageUploadService";
import Loader from "./Notifications/Loader";

const Uploader = ({ setImageUrl, video }) => {
  const [loading, setLoading] = useState(false);

  // upload file
  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = new FormData();
      file.append("file", acceptedFiles[0]);
      const data = await uploadImageservice(file, setLoading);
      setImageUrl(data);
    },
    [setImageUrl]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      multiple: false,
      onDrop,
    });

  return (
    <div className="w-full text-center flex-colo gap-6">
      {loading ? (
        <div className="px-6 w-full py-8 border-2 border-border botder-dashed bg-dry rounded-md">
          <Loader />
        </div>
      ) : (
        <div
          {...getRootProps()}
          className="px-6 w-full py-8 border-2 border-border border-dashed bg-main rounded-md cursor-pointer"
        >
          <input {...getInputProps()} />
          <span className="mx-auto flex-colo text-subMain text-3xl">
            <FiUploadCloud />
          </span>
          {video ? (
            <p className="text-sm mt-2">Tải lên video của bạn</p>
          ) : (
            <p className="text-sm mt-2">Kéo hình ảnh của bạn vào đây</p>
          )}
          <em className="text-xs text-border">
            {isDragActive
              ? "Kéo thả hình ảnh"
              : isDragReject
              ? "Loại tệp này không được chấp nhận..."
              : video
              ? "(Chỉ có file có đuôi .mp4  được chấp nhận)"
              : " (Chỉ có file có đuôi .jpg and .png được chấp nhận)"}
          </em>
        </div>
      )}
    </div>
  );
};

export default Uploader;
