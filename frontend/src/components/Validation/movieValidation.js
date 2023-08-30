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

export { reviewValidation };
