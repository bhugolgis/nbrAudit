import React, { useState } from "react";
import {
  Row,
  Col,
  Button,
  Checkbox,
  Form,
  Input,
  message,
  Spin,
  Modal,
} from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { MpbcdcLogo, NbrLogo, MahaLogo, LoginIcon } from "../../../media";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { REACT_APP_BASE_URL } from "../../utils/urls";
import Translater from "../Translation";

var CryptoJS = require("crypto-js");

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // const generateRandomKey = () => {
  //   const randomBytes = new Uint8Array(32);
  //   window.crypto.getRandomValues(randomBytes);
  //   return Array.from(randomBytes, (byte) =>
  //     byte.toString(16).padStart(2, "0")
  //   ).join("");
  // };

  const handleUserChange = (e) => {
    const SECRET_KEY =
      "d73b3572d4b6e4df6c5b0efb0616e9a8c9266ba6d6a10abdc78a11485d002fd8";

    // Convert key and iv from hex to WordArray
    const keyBytes = CryptoJS.enc.Hex.parse(SECRET_KEY);
    const ivBytes = CryptoJS.enc.Hex.parse("00000000000000000000000000000000");

    // Get the value from the input field
    const data = e.target.value;

    // Create the AES cipher
    const cipher = CryptoJS.AES.encrypt(data, keyBytes, {
      iv: ivBytes,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    // Convert the ciphertext to base64
    const encryptedData = cipher.toString();

    // Do something with the encrypted data
    console.log("Encrypted Data:", encryptedData);

    // Set the username
    setUsername(encryptedData);
  };

  const handlePassChange = (e) => {
    const SECRET_KEY =
      "d73b3572d4b6e4df6c5b0efb0616e9a8c9266ba6d6a10abdc78a11485d002fd8";

    // Convert key and iv from hex to WordArray
    const keyBytes = CryptoJS.enc.Hex.parse(SECRET_KEY);
    const ivBytes = CryptoJS.enc.Hex.parse("00000000000000000000000000000000");

    // Get the value from the input field
    const data = e.target.value;

    // Create the AES cipher
    const cipher = CryptoJS.AES.encrypt(data, keyBytes, {
      iv: ivBytes,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    // Convert the ciphertext to base64
    const encryptedData = cipher.toString();

    // Do something with the encrypted data
    console.log("Encrypted Password:", encryptedData);

    // Set the password
    setPassword(encryptedData);
  };

  const [captchaValue, setCaptchaValue] = useState(false);
  const handleCaptchaValue = () => {
    setCaptchaValue(true);
  };

  const handleLogin = () => {
    if (username != "" && password != "") {
      setLoading(true);
      const headers = {
        "Content-Type": "application/json",
      };
      axios
        .post(
          `${REACT_APP_BASE_URL}/adminmodule/TestCustomLoginAPI`,
          {
            username: username,
            password: password,
          },
          headers
        )
        .then((response) => {
          const loginResponse = response.data;
          if (loginResponse.status == "success" && response.status == 200) {
            const encryptedToken = CryptoJS.AES.encrypt(
              loginResponse.token,
              "y9L@91nYW%BRfc1g"
            ).toString();
            sessionStorage.setItem("name", loginResponse.data.username);
            sessionStorage.setItem("userGroup", loginResponse.data.user_group);
            sessionStorage.setItem("token", encryptedToken);
            sessionStorage.setItem("id", loginResponse.data.id);
            sessionStorage.setItem("fullName", loginResponse.data.name);
            Modal.info({
              title: "You will be logged out in 1 hour after login",
              onOk() {
                setLoading(false);
                message.success(loginResponse.message);
                if (loginResponse.data.user_group == "admin") {
                  sessionStorage.setItem("dmDistrict", "");
                  window.location.replace("/admin-dashboard");
                } else if (loginResponse.data.user_group == "cgm") {
                  sessionStorage.setItem("dmDistrict", "");
                  sessionStorage.setItem(
                    "verticalName",
                    loginResponse.data.departmenName
                  );
                  sessionStorage.setItem(
                    "verticalId",
                    loginResponse.data.VerticalId
                  );
                  window.location.replace("/cgm-dashboard");
                } else if (loginResponse.data.user_group == "beneficiary") {
                  sessionStorage.setItem("dmDistrict", "");
                  sessionStorage.setItem(
                    "BeneficiaryId",
                    loginResponse.data.uniqueId
                  );
                  if (
                    loginResponse.data.UserPersonalInfo[0].isCompleted ==
                      true &&
                    loginResponse.data.CustomUsereligibilityInfo[0]
                      .isCompleted == true &&
                    loginResponse.data.CustomUserResidentialInfo[0]
                      .isCompleted == true &&
                    loginResponse.data.CustomUserQualificationInfo[0]
                      .isCompleted == true &&
                    loginResponse.data.CustomUserOtherInfo[0].isCompleted ==
                      true &&
                    loginResponse.data.CustomUserIncomeAndDomicileInfo[0]
                      .isCompleted == true &&
                    loginResponse.data.CustomUserBankInfo[0].isCompleted == true
                  ) {
                    window.location.replace("/user-dashboard");
                  } else {
                    window.location.replace("/personal-information");
                  }
                } else if (loginResponse.data.user_group == "regionalManager") {
                  const a = [];
                  Object.keys(loginResponse.data.rmDistricts).map((key, i) =>
                    a.push(loginResponse.data.rmDistricts[key])
                  );
                  sessionStorage.setItem("dmDistrict", a.toString());

                  window.location.replace("/rm-dashboard");
                } else if (loginResponse.data.user_group == "scrutinyClerk") {
                  sessionStorage.setItem(
                    "dmDistrict",
                    loginResponse.data.SclerkDistrict
                  );

                  window.location.replace("/clerk-dashboard");
                } else if (
                  loginResponse.data.user_group == "MPBCDCOfficeAdmin"
                ) {
                  sessionStorage.setItem("dmDistrict", "");
                  window.location.replace("/mpbcdc-dashboard");
                } else if (
                  loginResponse.data.user_group == "MahaPreitOfficeAdmin"
                ) {
                  sessionStorage.setItem("dmDistrict", "");
                  window.location.replace("/mahapreit-dashboard");
                } else if (loginResponse.data.user_group == "districtManager") {
                  sessionStorage.setItem(
                    "dmDistrict",
                    loginResponse.data.dmDistrict
                  );
                  window.location.replace("dm-dashboard");
                } else if (loginResponse.data.user_group == "MPBCDC_MD") {
                  sessionStorage.setItem("dmDistrict", "");
                  window.location.replace("/loanmpbcdcmdpage");
                }
              },
            });
          } else if (
            loginResponse.status == "error" &&
            response.status == 200
          ) {
            setLoading(false);
            message.error(loginResponse.message);
          }
        })
        .catch((error) => {
          setLoading(false);
          message.error(error.message);
        });
    }
  };

  return (
    <div>
      <Spin tip="Logging In..." size="large" spinning={loading}>
        <ChildContainer>
          <Col1 span={12}>
            <img src={LoginIcon} height="250px" width="250px" />
            <LoginHeader>Welcome !</LoginHeader>
          </Col1>
          <Col span={12}>
            <Row style={{ display: "flex", justifyContent: "flex-end" }}>
              <Translater />
            </Row>
            <Col2>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "20px 0px",
                }}
              >
                <MainLogo src={MahaLogo} />
                <img src={MpbcdcLogo} width="60px" height="60px" />
              </span>

              <Form layout="vertical">
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter your username"
                    value={username}
                    onChange={handleUserChange}
                  />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePassChange}
                  />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked">
                  <span
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Checkbox>Remember me</Checkbox>
                    <h4>
                      <Link to="/forgot-password">Forgot Password ?</Link>
                    </h4>
                  </span>
                </Form.Item>
                <Form.Item>
                  <ReCAPTCHA
                    sitekey="6Ld3Y10kAAAAAM5d0eaSM2BewOSEhjzwctYr0YT3"
                    onChange={handleCaptchaValue}
                  />
                </Form.Item>
                <Form.Item>
                  <SignInButton
                    type="primary"
                    htmlType="submit"
                    onClick={handleLogin}
                  >
                    Sign in
                  </SignInButton>
                </Form.Item>
                <h4 style={{ textAlign: "center" }}>
                  Don't have an account ?
                  <Link to="/register"> Create an Account</Link>
                </h4>
              </Form>
            </Col2>
          </Col>
        </ChildContainer>
      </Spin>
    </div>
  );
};

export default Login;

export const Card = styled.div`
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
`;

export const SignInButton = styled(Button)`
  border-radius: 20px;
  width: 100%;
`;
export const MainLogo = styled.img`
  height: 50px;
  width: 300px;
`;
export const StepsNumber = styled.h1`
  border-radius: 50%;
  background-color: #e6e6e6;
  padding: 5px 20px;
`;
export const StepsHead = styled.h2`
  margin-left: 20px;
  display: flex;
  align-items: center;
`;
export const StepsLine = styled.p`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;
export const Register = styled(Button)`
  width: 30%;
  border-radius: 20px;
`;
export const LoginHeader = styled.h1`
  font-size: 40px;
  margin-top: 20px;
  color: #fff;
`;
export const Col1 = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #0059ab;
  height: 100vh;
`;
export const ChildContainer = styled(Row)`
  display: flex;
  align-items: center;
  height: 100vh;
  flex-wrap: wrap;
`;
export const Col2 = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
