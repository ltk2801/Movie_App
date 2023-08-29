import * as yup from "yup";

// login validation
const LoginValidation = yup.object().shape({
  email: yup.string().email().required("Email phải bắt buộc").trim(),
  password: yup
    .string()
    .required("Password phải bắt buộc")
    .min(6, "Mật khẩu phải ít nhất 6 ký tự")
    .max(20, "Mật khẩu phải nhỏ hơn 20 ký tự")
    .matches(/(?=.*[0-9])/, "Mật khẩu phải chứa một số"),
});

// register validation
const RegisterValidation = yup.object().shape({
  email: yup.string().email().required("Email phải bắt buộc").trim(),
  password: yup
    .string()
    .required("Password phải bắt buộc")
    .min(6, "Mật khẩu phải ít nhất 6 ký tự")
    .max(20, "Mật khẩu phải nhỏ hơn 20 ký tự")
    .matches(/(?=.*[0-9])/, "Mật khẩu phải chứa một số"),
  fullName: yup
    .string()
    .required("Họ và tên phải bắt buộc")
    .max(40, "Họ và tên nhỏ hơn 40 ký tự")
    .matches(/^[\p{L}\s]*$/u, "Họ và tên chỉ được phép chứa chữ"),
});

//
const ProfileValidation = yup.object().shape({
  fullName: yup
    .string()
    .required("Họ và tên phải bắt buộc")
    .max(40, "Họ và tên nhỏ hơn 40 ký tự")
    .matches(/^[\p{L}\s]*$/u, "Họ và tên chỉ được phép chứa chữ"),
  email: yup.string().email().required("Email phải bắt buộc").trim(),
});

export { LoginValidation, RegisterValidation, ProfileValidation };
