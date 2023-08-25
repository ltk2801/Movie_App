import React from "react";
import Head from "../components/Head";

const Complaint = () => {
  return (
    <div className="min-height-screen container mx-auto px-2 my-6">
      <Head title="Khiếu Nại Bản Quyền" />
      <div className="xl:py-20 py-10 px-4">
        <div>
          <h3 className="text-xl lg:text-2xl mb-4 font-semibold">
            1. Trách nhiệm nội dung
          </h3>
          <p className="mt-3 text-sm leading-8 text-text">
            Nội dung trên website được đăng bởi người sử dụng, vì vậy trách
            nhiệm về nội dung thuộc về người gửi bài lên trên hệ thống. Ban quản
            trị của trang web sẽ thường xuyên kiểm tra các nội dung trên trang
            và loại bỏ các nội dung vi phạm bản quyền, nội dung quảng cáo, spam,
            clip rác, nội dung xúc phạm, không trái với các quy định pháp luật.
          </p>
        </div>
        <div className="mt-10">
          <h3 className="text-xl lg:text-2xl mb-4 font-semibold">
            2. Bản quyền
          </h3>
          <p className="mt-3 text-sm leading-8 text-text">
            Là một trang web về thông tin giải trí, nhưng chúng tôi không cam
            kết chắc chắn rằng có thể kiểm soát mọi thông tin trên trang web.
            Bất kỳ hành vi xâm phạm đến bản quyền nào nếu được báo cáo sẽ bị Ban
            quản trị gỡ bỏ khỏi trang web trong thời gian sớm nhất.
          </p>
        </div>
        <div className="mt-10">
          <h3 className="text-xl lg:text-2xl mb-4 font-semibold">
            3. Sở hữu trí tuệ
          </h3>
          <p className="mt-3 text-sm leading-8 text-text">
            Mọi nội dung được đăng tải trên website, bao gồm thiết kế, logo, các
            phần mềm, chức năng kỹ thuật, cấu trúc trang đều thuộc bản quyền của
            website . Nghiêm cấm mọi sao chép, sửa đổi, trưng bày, phân phát,
            chuyển tải, tái sử dụng, xuất bản, bán, cấp phép, tái tạo hay sử
            dụng bất cứ nội dung nào của trang web cho bất kỳ mục đích nào mà
            không có sự xác nhận của Ban quản trị website .
          </p>
        </div>
        <div className="mt-10">
          <h3 className="text-xl lg:text-2xl mb-4 font-semibold">
            4. Quy trình báo cáo vi phạm bản quyền
          </h3>
          <p className="mt-3 text-sm leading-8 text-text">
            Nếu bạn tin rằng bất kỳ nội dung nào được phát hành thông qua
            website vi phạm quyền sở hữu trí tuệ của bạn, vui lòng thông báo cho
            chúng tôi về việc vi phạm bản quyền qua bình luận bên dưới (Chú ý
            trong comment phải có chi tiết thông tin liên hệ và đường link nội
            dung vi phạm bản quyền trên website ) Chúng tôi sẽ xử lý từng thông
            báo vi phạm bản quyền mà chúng tôi nhận được theo quy định của Điều
            khoản sử dụng của website và quy định của pháp luật sở hữu trí tuệ.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Complaint;
