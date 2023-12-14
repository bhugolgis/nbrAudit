import { message } from "antd";
import responsiveObserve from "antd/lib/_util/responsiveObserve";
import axios from "axios";
import { useState } from "react";
import { validateDetails } from "../../api/commonapi";
import { COMMONROUTES } from "../../routes";
import { authInstance } from "../../utils/fetch-utils";
import { ResetToken } from "../../utils/sessionStorage";

const useResetPassword = () => {
  const [username, setUsername] = useState("");
  const [dob, setDob] = useState("");
  const [verify, setVerify] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [otp, setOtp] = useState(false);
  const [otpValue, setOtpValue] = useState();
  const [cgPassword, setCgPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState();
  const [disable, setDisable] = useState(false);

  const [spinning, setSpinning] = useState(false);

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleDob = (date, dateString) => {
    setDob(dateString);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPass = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleEmailOrPhone = (e) => {
    setEmailOrPhone(e.target.value);
  };

  const handleOtp = (e) => {
    setOtpValue(e.target.value);
  };
  const handleCgPassword = (e) => {
    setPasswordValue(e.target.value);
  };

  const validateDetails = async () => {
    const response = await authInstance.post(
      `${COMMONROUTES.AUTH.FORGOT_PASSWORD}`,
      {
        username: username,
        dateofBirth: dob,
      }
    );
    return response;
  };

  const handleDetails = async () => {
    if (username == "" || username == null || dob == "") {
      message.warning("Username or DOB is empty");
    } else {
      setSpinning(true);
      const response = await validateDetails();
      if (response.status == 200 && response.data.status == "success") {
        setSpinning(false);
        message.success(response.data.message);
        setVerify(true);
      } else if (response.status == 200 && response.data.status == "error") {
        message.error(response.data.message);
      }
    }
  };

  const sendEmail = async () => {
    setSpinning(true);
    if (otp == false) {
      const response = await authInstance.post(
        `${COMMONROUTES.AUTH.SEND_OTP}`,
        {
          phoneOrEmail: emailOrPhone,
        }
      );
      if (response.data.status == "error") {
        setSpinning(false);
        message.error(response.data.message);
      } else if (response.data.status == "sucess") {
        setSpinning(false);
        message.success(response.data.message);
        setOtp(true);
        setDisable(true);
      }
    } else {
      const response = await authInstance.post(
        `${COMMONROUTES.AUTH.CHECK_OTP}`,
        {
          phoneOrEmail: emailOrPhone,
          otp: otpValue,
        }
      );
      if (response.data.status == "success") {
        message.success(response.data.message);
        sessionStorage.setItem("resetToken", response.data.token);
        setCgPassword(true);
        setSpinning(false);
      } else if (response.data.status == "error") {
        setSpinning(false);
        message.error(response.data.message);
      }
    }
  };

  const ChangePassword = async () => {
    setSpinning(true);
    const response = await authInstance.put(
      `${COMMONROUTES.AUTH.CHANGE_PASSWORD}`,
      {
        newpassword: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${sessionStorage.getItem("resetToken")}`,
        },
      }
    );
    sessionStorage.clear();
    setSpinning(false);
    return response;
  };

  const ResetPassword = async () => {
    if (
      password == "" ||
      password == null ||
      confirmPassword == "" ||
      confirmPassword == null
    ) {
      message.warning("Password or confirm password is empty");
    } else if (confirmPassword != password) {
      message.warning("Passwords does not match");
    } else {
      const response = await ChangePassword();
      setSpinning(false);
      if (response.status == 200 && response.data.status == "success") {
        message.success(
          response.data.message + " " + "Redirecting to login..."
        );
        setTimeout(() => {
          window.location.replace("/login");
        }, 1000);
      } else if (response.status == 200 && response.data.status == "error") {
        message.error(response.data.message);
      } else if (response.status != 200) {
        message.error("Server Error");
      }
    }
  };

  return {
    username,
    dob,
    verify,
    emailOrPhone,
    otp,
    cgPassword,
    disable,
    spinning,
    setOtp,
    sendEmail,
    handleEmailOrPhone,
    handleUsername,
    handleDob,
    handlePassword,
    handleConfirmPass,
    ResetPassword,
    handleDetails,
    handleOtp,
  };
};
export default useResetPassword;
