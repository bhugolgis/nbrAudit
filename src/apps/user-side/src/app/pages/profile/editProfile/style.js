import React from "react";
import styled from "styled-components";
import { DatePicker, Form, Select, Input, Menu, Steps } from "antd";

export const Container = styled.div`
  margin: 25px 30px;
`;
export const FormItem = styled(Form.Item)`
  display: flex;
  flex-direction: column;
  .ant-form-item-label {
    text-align: left;
    margin-bottom: 5px;
    white-space: normal;
    height: 45px;
  }
  .ant-form-item-row {
    display: flex;
    flex-direction: column;
  }
`;

export const FormLayout = styled(Form)`
  margin: 25px 30px;
`;
export const Label = styled.label`
  :before {
    content: " * ";
    color: red;
  }
`;

export const SelectDropDown = styled(Select)`
  width: 250px !important;
`;
export const DatePick = styled(DatePicker)`
  width: 250px;
`;
export const LoadContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10%;
`;
export const InputFields = styled(Input)`
  width: 250px;
`;
export const ProfileMenu = styled(Menu)`
  .ant-menu-item-selected {
    border-right: 3px solid;
  }
`;
export const Completed = styled.h3`
  color: #33cc33;
`;
export const Incomplete = styled.h3`
  color: #ff3300;
`;
export const StatusSteps = styled(Steps)`
  margin: 20px;
  .ant-steps-item-title {
    font-size: 13px;
  }
  .ant-steps-item-title::after {
    display: none;
  }
  .ant-steps-item-container {
    width: 100px;
  }
  .ant-steps-item-finish .ant-steps-item-icon {
    background-color: #009900;
    border-color: #009900;
  }
  .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon {
    color: #fff;
  }
  .ant-steps-item-process .ant-steps-item-icon {
    background-color: #cc0000;
    border-color: #cc0000;
  }
`;
