import * as yup from "yup";

const reviewValidation = yup.object().shape({
  comment: yup
    .string()
    .required("Bình luận không được bỏ trống")
    .max(150, "Bình luận chỉ được chấp nhận dưới 150 ký tự"),
  rating: yup
    .number()
    .required("Vui lòng đánh giá số  ")
    .min(0, "Vui lòng đánh giá số ")
    .max(5, "Vui lòng đánh giá số "),
});

const movieValidation = yup.object().shape({
  name: yup
    .string()
    .required("Vui lòng nhập vào tên phim")
    .max(50, "Tên phim chỉ được tối đa 50 ký tự"),
  time: yup.number().required("Vui lòng nhập vào thời lượng phim"),
  language: yup.string().required("Vui lòng nhập vào quốc gia của phim"),
  year: yup.number().required("Vui lòng nhập vào năm sản xuất"),
  category: yup.string().required("Vui lòng nhập vào thể loại phim"),
  desc: yup
    .string()
    .required("Vui lòng nhập vào mô tả ngắn về bộ phim")
    .max(800, "Mô tả ngắn chỉ được tối đa 800 ký tự"),
});

export { reviewValidation, movieValidation };
