import React, { useEffect, useState, useRef } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  DatePicker,
  Row,
  Col,
  message,
  Spin,
} from "antd";
import moment from "moment";
import axios from "axios";
import styled from "styled-components";
import { InputFields } from "./personalinfo";
import {
  DatePick,
  LoadContainer,
  FormItem,
  Completed,
  Incomplete,
} from "./style";
import { Token } from "../../../../../../../libs/utils/sessionStorage";
import { REACT_APP_BASE_URL } from "../../../../../../../libs/utils/urls";
const BankDetails = (props) => {
  const formData = useRef();

  const [incomePageLoading, setIncomePageLoading] = useState(true);
  const [infoLoading, setInfoLoading] = useState(false);

  const [bankDetails, setBankDetails] = useState();
  const [haveBankAccount, setHavBankAccount] = useState();
  useEffect(() => {
    const userResponseFunc = async () => {
      const response = await axios({
        method: "get",
        url: `${REACT_APP_BASE_URL}/applicant/ApplicantDetailView`,
        headers: { Authorization: `token ${Token}` },
      });
      setBankDetails(response.data.CustomUserBankInfo[0]);
      setHavBankAccount(response.data.CustomUserBankInfo[0].haveBankAccount);
      setIncomePageLoading(false);
    };
    userResponseFunc();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      bankName,
      bankAccountNo,
      branchName,
      ifscCode,
      isAadharLinkedWithBankOrYuvaOrJandhan,
      doesAccountHaveLimitOfWithOrDepo,
    } = formData.current;

    const bankData = new FormData();

    if (haveBankAccount == null) {
      message.warning("Please select whether you have bank account or not ?");
    }
    if (haveBankAccount == true) {
      if (bankName.value == "") {
        message.warning("Please enter your Bank Name");
      } else if (bankAccountNo.value == "") {
        message.warning("Please enter your Bank Account Number");
      } else if (branchName.value == "") {
        message.warning("Please enter Branch Name");
      } else if (ifscCode.value == "") {
        message.warning("Please enter IFSC Code");
      } else if (isAadharLinkedWithBankOrYuvaOrJandhan.value == "") {
        message.warning(
          "Please select if Aadhar is linked with Bank/Yuva/Jandhan"
        );
      } else if (doesAccountHaveLimitOfWithOrDepo.value == "") {
        message.warning("Please Select if your Bank Account has limit ");
      } else {
        bankData.append("haveBankAccount", haveBankAccount);
        bankData.append("bankName", bankName.value);
        bankData.append("bankAccountNo", bankAccountNo.value);
        bankData.append("branchName", branchName.value);
        bankData.append("ifscCode", ifscCode.value);
        bankData.append(
          "isAadharLinkedWithBankOrYuvaOrJandhan",
          isAadharLinkedWithBankOrYuvaOrJandhan.value
        );
        bankData.append(
          "doesAccountHaveLimitOfWithOrDepo",
          doesAccountHaveLimitOfWithOrDepo.value
        );
        bankData.append("isCompleted", true);

        axios({
          method: "patch",
          url: `${REACT_APP_BASE_URL}/applicant/UpdateBankInformation`,
          data: bankData,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `token ${Token}`,
          },
        }).then((response) => {
          setInfoLoading(true);
          setTimeout(() => {
            setInfoLoading(false);
            message.success("Data Updated");
          }, 1000);
          setTimeout(() => {
            window.location.replace("/other-information");
          }, 1500);
        });
      }
    } else if (haveBankAccount == false) {
      bankData.append("haveBankAccount", haveBankAccount);
      bankData.append("isCompleted", true);
      axios({
        method: "patch",
        url: `${REACT_APP_BASE_URL}/applicant/UpdateBankInformation`,
        data: bankData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `token ${Token}`,
        },
      }).then((response) => {
        setInfoLoading(true);
        setTimeout(() => {
          setInfoLoading(false);
          message.success("Data Updated");
        }, 1000);
        setTimeout(() => {
          window.location.replace("/other-information");
        }, 1500);
      });
    }
  };
  if (incomePageLoading == true) {
    return (
      <LoadContainer>
        <Spin tip="Loading data" />
      </LoadContainer>
    );
  } else {
    return (
      <Spin spinning={infoLoading} tip="Saving Data">
        <MainContainer>
          {/* {bankDetails.isCompleted == true ? (
            <Completed>Completed</Completed>
          ) : (
            <Incomplete>Incomplete</Incomplete>
          )} */}
          <form ref={formData}>
            <Row>
              <FormItem label="Do you have Bank Account ?">
                <Radio.Group
                  name="haveBankAccount"
                  value={haveBankAccount}
                  onChange={(e) => {
                    setHavBankAccount(e.target.value);
                  }}
                  defaultValue={bankDetails.haveBankAccount}
                >
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </FormItem>
            </Row>
            {haveBankAccount == true ? (
              <>
                <Row>
                  <Col span={8}>
                    <FormItem
                      label="Bank Name"
                      name="bankName"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <InputFields
                        placeholder="Enter your Bank Name"
                        name="bankName"
                        defaultValue={bankDetails.bankName}
                      />
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem
                      label="Bank Account Number"
                      name="bankAccountNo"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <InputFields
                        placeholder="Enter your account number"
                        name="bankAccountNo"
                        defaultValue={bankDetails.bankAccountNo}
                      />
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem
                      label="Branch Name"
                      name="branchName"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <InputFields
                        placeholder="Enter your Branch Name"
                        name="branchName"
                        defaultValue={bankDetails.branchName}
                      />
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <FormItem
                      label="IFSC Code"
                      name="ifscCode"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <InputFields
                        placeholder="Enter your IFSC Code"
                        name="ifscCode"
                        defaultValue={bankDetails.ifscCode}
                      />
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem label="Have Aadhar Linked With Bank/Yuva/Jandhan ?">
                      <Radio.Group
                        name="isAadharLinkedWithBankOrYuvaOrJandhan"
                        defaultValue={
                          bankDetails.isAadharLinkedWithBankOrYuvaOrJandhan
                        }
                      >
                        <Radio value={true}>Yes</Radio>
                        <Radio value={false}>No</Radio>
                      </Radio.Group>
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Account Have Limit Of Withdrawal Or Deposit ?">
                      <Radio.Group
                        name="doesAccountHaveLimitOfWithOrDepo"
                        defaultValue={
                          bankDetails.doesAccountHaveLimitOfWithOrDepo
                        }
                      >
                        <Radio value={true}>Yes</Radio>
                        <Radio value={false}>No</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
              </>
            ) : (
              <></>
            )}
            <Button type="primary" onClick={handleSubmit}>
              Save and Proceed
            </Button>
          </form>
        </MainContainer>
      </Spin>
    );
  }
};
export default BankDetails;
export const MainContainer = styled.div`
  margin: 25px 30px;
`;
