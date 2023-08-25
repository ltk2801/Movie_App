import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const Links = [
    {
      title: "Công ty",
      links: [
        {
          name: "Trang chủ",
          link: "/",
        },
        {
          name: "Giới thiệu",
          link: "/about-ús",
        },
        {
          name: "Liên hệ chúng tôi",
          link: "/contact-us",
        },
        {
          name: "Chính sách riêng tư",
          link: "/policys",
        },
      ],
    },
    {
      title: "Phim mới",
      links: [
        {
          name: "Phim Hot",
          link: "/movies",
        },
        {
          name: "Phim Lãng Mạn",
          link: "#",
        },
        {
          name: "Phim Kinh Dị",
          link: "#",
        },
        {
          name: "Phim Khoa Học",
          link: "#",
        },
      ],
    },
    {
      title: "Tài khoản của tôi",
      links: [
        {
          name: "Dashboard",
          link: "/dashboard",
        },
        {
          name: "Danh sách phim yêu thích",
          link: "/favorite",
        },
        {
          name: "Hồ sơ",
          link: "/profile",
        },
        {
          name: "Thay đổi password",
          link: "/password",
        },
      ],
    },
  ];

  return (
    <div className="bg-dry py-4 border-t-2 border-black">
      <div className="container mx-auto px-2">
        <div className="grid grid-cols-2 md:grid-cols-7 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 py-10 justify-between">
          <div className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3">
            <Link to="/">
              <img
                src="/images/logoFooter.png"
                alt="logo"
                className="w-full h-24 object-contain"
              />
            </Link>
            <p className="text-border mt-5 mr-10 text-sm leading-7">
              <i className="text-subMain">CineTime</i> - Trang xem phim Online
              với giao diện mới được bố trí và thiết kế thân thiện với người
              dùng. Nguồn phim được tổng hợp từ các website lớn với đa dạng các
              đầu phim và thể loại vô cùng phong phú.
            </p>
          </div>
          {Links.map((link, index) => (
            <div
              key={index}
              className="col-span-1 md:col-span-2 lg:col-span-3 pb-3.5 sm:pb-0"
            >
              <h3 className="text-md lg:leading-7 font-medium mb-4 sm:mb-5 lg:mb-6 pb-0.5">
                {link.title}
              </h3>
              <ul className="text-sm flex flex-col space-y-3">
                {link.links.map((text, index) => (
                  <li key={index} className="flex items-baseline">
                    <Link
                      to={text.link}
                      className="text-border inline-block w-full hover:text-subMain"
                    >
                      {text.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
