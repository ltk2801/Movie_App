import React from "react";
import { FiUser } from "react-icons/fi";

const Promos = () => {
  return (
    <div className="my-20 py-10 md:px-20 px-8 bg-dry">
      <div className="lg:grid lg:grid-cols-2 lg:gap-10 items-center">
        <div className="flex lg:gap-10 gap-6 flex-col">
          <h1 className="xl:text-3xl text-xl capitalize font-sans font-medium xl:leading-relaxed">
            Tải Xuống Xem Offline. <br /> Thư Giãn Trên Điện Thoại
          </h1>
          <p className="text-text text-sm xl:text-base leading-6 xl:leading-8">
            Khám phá trải nghiệm hoàn toàn mới với ứng dụng của chúng tôi - Tải
            Xuống và Xem Nội Dung Yêu Thích Mọi Lúc, Mọi Nơi. <br />
            Bạn sẽ được thư giãn và thả lỏng tinh thần ngay trên điện thoại
            thông minh của mình. Hãy tận hưởng những khoảnh khắc riêng tư và
            thời gian của riêng mình với chế độ xem offline, cho phép bạn lưu
            trữ nội dung và thư giãn mà không cần kết nối internet
          </p>
          <div className="flex gap-4 md:text-lg text-sm">
            <div className="flex-colo bg-black text-subMain px-6 py-3 rounded font-bold">
              HD 4K
            </div>
            <div className="flex gap-4 bg-black text-subMain px-6 py-3 rounded font-bold">
              <FiUser /> 2K
            </div>
          </div>
        </div>
        <div>
          <img
            src="/images/Mobile.jpg"
            alt="Mobile app"
            className="w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Promos;
