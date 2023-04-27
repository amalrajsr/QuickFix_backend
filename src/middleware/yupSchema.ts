import * as yup from "yup";


export const expertForgotPassVerifyOtpSchema= yup.object().shape({
  mobile: yup
    .string()
    .typeError("mobile is required")
    .required("mobile is required")
    .matches(/^\d{10}$/, "mobile number is not valid"),
    otp: yup.number().typeError("please provide otp "),

});
export const forgotPasswordSchema = yup.object().shape({
  NewPass: yup
    .string()
    .min(6, "atleast 6 characters needed")
    .matches(/^\S*$/, "Password cannot contain spaces"),
  ReNewPass: yup
    .string()
    .matches(/^\S*$/, "Password cannot contain spaces")
    .required("field cannot be empty"),
});

export const passwordSchema = yup.object().shape({
  currentPass: yup
    .string()
    .matches(/^\S*$/, "Password cannot contain spaces")
    .required("field cannot be empty"),
  NewPass: yup
    .string()
    .min(6, "atleast 6 characters needed")
    .matches(/^\S*$/, "Password cannot contain spaces"),
  ReNewPass: yup
    .string()
    .matches(/^\S*$/, "Password cannot contain spaces")
    .required("field cannot be empty"),
});

export const expertForgotPasschema = yup.object().shape({
  mobile: yup
    .string()
    .typeError("mobile is required")
    .required("mobile is required")
    .matches(/^\d{10}$/, "mobile number is not valid"),
});

// expert login schema
export const expertSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required("please provide email")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "invalid email"
    ),
  password: yup.string().required("password is required"),
});


export const expertRegisterSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required("please provide email")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "invalid email"
    ),
  name: yup
    .string()
    .trim()
    .required("Please provide fullname")
    .test(
      "no-spaces",
      "Name should not be empty spaces",
      (value) => value.trim().length > 0
    )
    .matches(/^[a-zA-Z\s]+$/, "Only alphabets are allowed"),
  mobile: yup
    .string()
    .typeError("mobile is required")
    .required("mobile is required")
    .matches(/^\d{10}$/, "mobile number is not valid"),
});

// user registration
export const userSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Please provide fullname")
    .test(
      "no-spaces",
      "Name should not be empty spaces",
      (value) => value.trim().length > 0
    )
    .matches(/^[a-zA-Z\s]+$/, "Only alphabets are allowed"),
   mobile: yup
  .string()
  .typeError("mobile is required")
  .required('mobile is required')
  .matches(/^\d{10}$/, "mobile number is not valid"),
});

//user login
export const userLoginMobileSchema = yup.object().shape({
  mobile: yup
    .string()
    .typeError("mobile is required")
    .required("mobile is required")
    .matches(/^\d{10}$/, "mobile number is not valid"),
});

export const userLoginMobileAndOtpSchema= yup.object().shape({
  mobile: yup
    .string()
    .typeError("mobile is required")
    .required("mobile is required")
    .matches(/^\d{10}$/, "mobile number is not valid"),
    otp: yup.number().typeError("please provide otp "),

});

// user verify otp schema
export const userVerifyOtpSchema= yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Please provide fullname")
    .test(
      "no-spaces",
      "Name should not be empty spaces",
      (value) => value.trim().length > 0
    )
    .matches(/^[a-zA-Z\s]+$/, "Only alphabets are allowed"),
   mobile: yup
  .string()
  .typeError("mobile is required")
  .required('mobile is required')
  .matches(/^\d{10}$/, "mobile number is not valid"),
  otp: yup.number().typeError("please provide otp "),

});


export const otpSchema = yup.object().shape({
  mobile: yup.number().typeError("please provide otp "),
});

// admin login schema
export const adminSchema = yup.object().shape({
  name: yup.string().required("name is required"),
  password: yup.string().required("password is required"),
});


export const serviceSchema = yup.object().shape({
  service: yup.string().required("mobile is required"),
  installationCharge1Hour: yup
    .number()
    .typeError("mobile is required")
    .required("mobile is required"),
  installationChargeLatelyHours: yup
    .number()
    .typeError("mobile is required")
    .required("mobile is required"),
  repairCharge1Hour: yup
    .number()
    .typeError("mobile is required")
    .required("mobile is required"),
  repairChargeLatelyHours: yup
    .number()
    .typeError("mobile is required")
    .required("mobile is required"),
});

// user home address 
export const addressSchema = yup.object().shape({
  fullname: yup
    .string()
    .trim()
    .required("filed can't be empty")
    .test(
      "no-spaces",
      "Name should not be empty spaces",
      (value) => value.trim().length > 0
    )
    .matches(/^[a-zA-Z\s]+$/, "Only alphabets are allowed"),

  mobile: yup
    .string()
    .typeError("mobile is required")
    .required("mobile is required")
    .matches(/^\d{10}$/, "mobile number is not valid"),

  house: yup
    .string()
    .trim()
    .required("filed can't be empty")
    .test(
      "no-spaces",
      "Name should not be empty spaces",
      (value) => value.trim().length > 0
    )
    .matches(/^[a-zA-Z\s]+$/, "Only alphabets are allowed"),

  landmark: yup
    .string()
    .trim()
    .required("filed can't be empty")
    .test(
      "no-spaces",
      "Name should not be empty spaces",
      (value) => value.trim().length > 0
    )
    .matches(/^[a-zA-Z\s]+$/, "Only alphabets are allowed"),

  street: yup
    .string()
    .trim()
    .required("filed can't be empty")
    .test(
      "no-spaces",
      "Name should not be empty spaces",
      (value) => value.trim().length > 0
    )
    .matches(/^[a-zA-Z\s]+$/, "Only alphabets are allowed"),

  zipcode: yup
    .string()
    .matches(/^\d{6}$/, "zip code is not valid")
    .typeError("mobile is required")
    .required("mobile is required"),
});

export const locationSchema = yup.object().shape({
  place: yup
    .string()
    .trim()
    .required("filed can't be empty")
    .test(
      "no-spaces",
      "Name should not be empty spaces",
      (value) => value.trim().length > 0
    )
    .matches(/^[a-zA-Z\s]+$/, "Only alphabets are allowed"),

  pincode: yup
    .string()
    .matches(/^\d{6}$/, "zip code is not valid")
    .typeError("mobile is required")
    .required("mobile is required"),
});
