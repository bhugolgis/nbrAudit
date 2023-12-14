import React, { useState } from "react";
import { Row, Col, Button, Form, Input, DatePicker, Modal } from "antd";
import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background: #47cdce;
  background: -webkit-linear-gradient(top left, #47cdce, #595eba);
  background: -moz-linear-gradient(top left, #47cdce, #595eba);
  background: linear-gradient(to bottom right, #47cdce, #595eba); */
  @media (max-width: 480px) {
    padding: 20px;
  }
`;
export const Card = styled.div`
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
`;
export const LoginCol = styled(Col)`
  display: flex;
  flex-direction: column;
  margin: 30px 0px;
`;
export const SignInButton = styled(Button)`
  border-radius: 20px;
  width: 100%;
`;
export const MainLogo = styled.img`
  height: 50px;
  width: 300px;
  margin-bottom: 20px;
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
export const PaymentLogo = styled.img`
  width: 80px;
  height: 50px;
`;
export const FormItem = styled(Form.Item)`
  margin-bottom: 15px;
`;
export const PaymentCard = styled.span`
  display: flex;
  justify-content: space-between;
`;
export const Fieldflex = styled(Row)`
  display: flex;
  justify-content: space-between;
`;
export const InputFields = styled(Input)`
  width: 280px;
`;
export const DatePick = styled(DatePicker)`
  width: 280px;
`;
export const MessageModal = styled(Modal)`
  .ant-modal-header {
    display: none;
  }
  .ant-btn ant-btn-default {
    display: none;
  }
`;
export const RegisterForm = styled(Form)`
  .ant-form-item-label {
    font-size: 20px;
  }
`;
export const FieldEven = styled(Col)`
  display: flex;
  justify-content: space-evenly;
`;
