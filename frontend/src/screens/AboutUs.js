import React from "react";
import Head from "../components/Head";
import { TbMovie } from "react-icons/tb";
import { FaUserPlus } from "react-icons/fa";
const AboutUs = () => {
  return (
    <div className="min-height-screen container mx-auto px-2 my-6">
      <Head title="Giới Thiệu" />
      <div className="xl:py-20 py-10 px-4">
        <div className="grid grid-flow-row xl:grid-cols-2 gap-4 xl:gap-16 items-center">
          <div>
            <h3 className="text-xl lg:text-3xl mb-4 font-semibold">
              Chào mừng đến với CineTime
            </h3>
            <div className="mt-3 text-sm leading-8 text-text">
              <p>
                <i className="text-subMain font-bold">CineTime</i> là website
                xem phim online và chia sẻ thông tin các bộ phim mới thông qua
                nhiều nguồn khác nhau từ các thành viên trên diễn đàn. Hàng ngàn
                video HD & FullHD cùng đi đôi với phụ đề vietsub, thuyết minh
                lồng tiếng đầy đủ đang chờ bạn khám phá.
                <br />
                Từ những bộ phim kinh điển cho đến những tác phẩm mới ra mắt,
                chúng tôi cung cấp đa dạng thể loại để đáp ứng mọi sở thích của
                bạn. Dù bạn là người yêu thích hành động, hài hước, tình cảm hay
                khoa học viễn tưởng, bạn luôn có cơ hội tìm thấy những bộ phim
                ưa thích của mình.
                <br />
                Với giao diện mới mẻ của trang web CineTime được thay đổi đơn
                giản thân thiện, trực quan, dễ sử dụng, cực nhanh, cực nét, cực
                mượt. Chúc các bạn xem phim vui vẻ !
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="p-8 bg-dry rounded-lg relative">
                <span className="text-3xl block font-extrabold ">10K</span>
                <h4 className="text-lg font-semibold mb-1">
                  Những Bộ Phim Hay{" "}
                </h4>

                <TbMovie className="w-11 h-11 absolute top-5 right-10 text-subMain" />

                <p className="mb-0 text-text leading-7 text-sm">
                  Chúng tôi tự hào mang đến cho bạn hơn 10,000 bộ phim đỉnh cao.
                </p>
              </div>
              <div className="p-8 bg-dry rounded-lg relative">
                <span className="text-3xl block font-extrabold ">8K</span>
                <h4 className="text-lg font-semibold mb-1">Người dùng</h4>
                <FaUserPlus className="w-11 h-11 absolute top-5 right-10 text-subMain" />
                <p className="mb-0 text-text leading-7 text-sm">
                  Đăng ký hoàn toàn miễn phí <br /> Trở thành người dùng của
                  chúng tôi ngay nào !
                </p>
              </div>
            </div>
          </div>
          <div className="mt-10 lg:mt-0">
            <img
              src="/images/about.jpg"
              alt="aboutUs"
              className="w-full xl:block hidden h-header rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
