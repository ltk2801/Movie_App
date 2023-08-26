import React from "react";
import Head from "../components/Head";

import { FiMail, FiMapPin, FiPhoneCall } from "react-icons/fi";

const ContactUs = () => {
  const ContactData = [
    {
      id: 1,
      title: "Email của chúng tôi",
      info: "(Nếu có vấn đề bản quyền vui lòng liên hệ để chúng tôi gỡ phim xuống ngay lập tức…)",
      icon: FiMail,
      contact: "ltk2801@gmail.com",
    },
    {
      id: 2,
      title: "Số điện thoại của chúng tôi",
      info: "",
      icon: FiPhoneCall,
      contact: "+098 123 123 999",
    },
    {
      id: 3,
      title: "Địa chỉ của chúng tôi",
      info: "",
      icon: FiMapPin,
      contact:
        "Số 1 Huyền Trân Công Chúa, Phường Bến Thành, Quận 1, Thành phố Hồ Chí Minh",
    },
  ];

  return (
    <div className="min-height-screen container mx-auto px-2 my-6">
      <Head title="Liên Hệ Chúng Tôi" />
      <div className="grid mg:grid-cols-2 gap-6 lg:my-20 my-10 lg:grid-cols-3 xl:gap-8">
        {ContactData.map((item) => (
          <div
            key={item.id}
            className="border border-border flex-colo p-10 bg-dry rounded-lg text-center"
          >
            <span className="flex-colo w-20 h-20 mb-4 rounded-full bg-main text-subMain text-2xl">
              <item.icon />
            </span>
            <h5 className="text-xl font-semibold mb-2">{item.title}</h5>
            <p className="mb-0 text-sm text-text leading-7">
              <a href={`mailto:${item.contact}`} className="text-blue-600">
                {item.contact}
              </a>{" "}
              {item.info}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactUs;
