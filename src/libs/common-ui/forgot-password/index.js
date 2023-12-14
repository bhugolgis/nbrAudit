import React, { useState } from "react";
import { ForgotPass } from "../../../media";
import {
  Card,
  Container,
  ContentCol,
  DatePick,
  ImageCol,
  Submit,
} from "./style";
import { Row, Col, Form, Input, DatePicker, Button, message, Spin } from "antd";
import useResetPassword from "./container";
import axios from "axios";

const ForgotPassword = () => {
  const {
    verify,
    emailOrPhone,
    otp,
    otpValue,
    cgPassword,
    disable,
    sendEmail,
    spinning,
    setOtp,
    handlePassword,
    handleConfirmPass,
    ResetPassword,
    handleEmailOrPhone,
    handleUsername,
    handleDob,
    handleDetails,
    handleOtp,
  } = useResetPassword();

  return (
    <Spin tip="Loading..." spinning={spinning}>
      <div>
        <Row>
          <ImageCol span={12}>
            <img src={ForgotPass} width="500px" height="320px" />
          </ImageCol>
          <ContentCol span={12}>
            {cgPassword == false ? (
              <Card>
                {verify == true ? (
                  <></>
                ) : (
                  <>
                    <h3>Enter your registered Email</h3>
                    <Form layout="vertical">
                      <Form.Item>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          onChange={handleEmailOrPhone}
                          value={emailOrPhone}
                          disabled={disable}
                        />
                      </Form.Item>
                      {otp == true ? (
                        <Form.Item>
                          <Input
                            type="otp"
                            placeholder="Enter the Otp"
                            onChange={handleOtp}
                            value={otpValue}
                          />
                        </Form.Item>
                      ) : (
                        <></>
                      )}
                      <Form.Item>
                        <Submit
                          type="primary"
                          htmlType="onSubmit"
                          onClick={sendEmail}
                        >
                          {otp == false ? "Send Email" : "Verify"}
                        </Submit>
                      </Form.Item>
                    </Form>
                  </>
                )}
              </Card>
            ) : (
              <Card>
                <h3>Reset your password</h3>
                <Form layout="vertical">
                  <Form.Item>
                    <Input.Password
                      placeholder="Enter your password"
                      onChange={handlePassword}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Input.Password
                      placeholder="Confirm your password"
                      onChange={handleConfirmPass}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Submit
                      type="primary"
                      htmlType="onSubmit"
                      onClick={ResetPassword}
                    >
                      Reset Password
                    </Submit>
                  </Form.Item>
                </Form>
              </Card>
            )}
          </ContentCol>
        </Row>
      </div>
    </Spin>
  );
};
export default ForgotPassword;
