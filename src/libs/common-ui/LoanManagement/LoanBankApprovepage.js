import React, { useEffect, useState, useRef } from "react";
import { Button, Input, Form, Spin, message, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";
import { StatusFields, LoadContainer } from "./style";
import { REACT_APP_BASE_URL } from "../../utils/urls";
import { Token, BeneficiaryId } from "../../utils/sessionStorage";

const { Option } = Select;

const LoanBankApprovepage = (props) => {
  // const disabledDate = (current) => {
  //   return current && current.valueOf() < moment();
  // };

  const [LoanAmountSanctioned, setLoanAmountSanctioned] = useState("0");
  const handleLoanAmountSanctioned = (e) => {
    setLoanAmountSanctioned(e.target.value);
  };
  const [LoanAmountGuarantee, setLoanAmountGuarantee] = useState("");
  const handleLoanAmountGuarantee = (e) => {
    setLoanAmountGuarantee(e.target.value);
  };
  const [LoanROI, setLoanROI] = useState();
  const handleLoanROI = (e) => {
    setLoanROI(e.target.value);
  };
  const [RepaymentPeriod, setRepaymentPeriod] = useState();
  const handleRepaymentPeriod = (e) => {
    setRepaymentPeriod(e.target.value);
  };
  const [Lastremarks, setLastremarks] = useState("");
  const handleLastremarks = (e) => {
    setLastremarks(e.target.value);
  };

  const [FinalStatus, setFinalStatus] = useState("RM");
  const handleFinalStatus = (value) => {
    setFinalStatus(value);
  };

  const [LoanBankDocApath, setLoanBankDocApath] = useState();
  const handleLoanBankDocApath = (event) => {
    if (
      event.target.files[0].type != "image/jpeg" &&
      event.target.files[0].type != "application/pdf"
    ) {
      message.warning("File does not support. You must use .jpg or .pdf ");
    }

    if (
      event.target.files[0].size / 1024 > 75 &&
      event.target.files[0].size / 1024 <= 2048
    ) {
      setLoanBankDocApath(event.target.files[0]);
    } else {
      message.warning("The size of the documents between 75 KB to 2 MB.");
    }
  };

  const [LoanBankDocBpath, setLoanBankDocBpath] = useState();
  const handleLoanBankDocBpath = (event) => {
    if (
      event.target.files[0].type != "image/jpeg" &&
      event.target.files[0].type != "application/pdf"
    ) {
      message.warning("File does not support. You must use .jpg or .pdf ");
    }

    if (
      event.target.files[0].size / 1024 > 75 &&
      event.target.files[0].size / 1024 <= 2048
    ) {
      setLoanBankDocBpath(event.target.files[0]);
    } else {
      message.warning("The size of the documents between 75 KB to 2 MB.");
    }
  };

  // const [startDate, setStartDate] = useState("");
  // const handleStartDate = (date, dateString) => {
  //   setStartDate(date);
  // };
  // const [endDate, setEndDate] = useState("");
  // const handleEndDate = (date, dateString) => {
  //   setEndDate(date);
  // };
  const [open, setOpen] = useState(false);

  const [userData, setUserData] = useState();
  const getdt = () => {
    axios({
      method: "get",
      url: `${REACT_APP_BASE_URL}/loan/LoanFormDetailView/${props.id}`,
    }).then((response) => {
      setUserData(response.data);
      setOpen(true);
      //setModalLoading(false);
    });
  };

  useEffect(() => {
    getdt();
  }, [props]);

  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    if (LoanAmountSanctioned.value == "") {
      message.warning("Please enter Loan Sanctioned Amount");
    } else if (LoanAmountSanctioned.value >= userData.LoanAmount) {
      message.warning(
        "Loan Sanctioned Amount not allowed more then loan amount"
      );
    } else if (LoanAmountGuarantee.value == "") {
      message.warning("Please enter Loan Guarantee Amount");
    } else if (LoanROI.value == "") {
      message.warning("Please enter Loan Rate of Interest");
    } else if (RepaymentPeriod.value == "") {
      message.warning("Please enter Repayment Period");
    } else if (Lastremarks.value == "") {
      message.warning("Please enter Remarks");
    } else if (LoanBankDocApath == null) {
      message.warning("Please upload Loan Bank Document A");
    } else if (LoanBankDocBpath == null) {
      message.warning("Please upload Loan Bank Document B");
    } else {
      const sanctionData = new FormData();
      sanctionData.append("LoanAmountSanctioned", LoanAmountSanctioned);
      sanctionData.append("LoanAmountGuarantee", LoanAmountGuarantee);
      sanctionData.append("LoanROI", LoanROI);
      sanctionData.append("RepaymentPeriod", RepaymentPeriod);
      sanctionData.append("PrevStatus", props.statusname || "");
      sanctionData.append("LastStatus", FinalStatus);
      sanctionData.append("Lastremarks", Lastremarks);
      sanctionData.append("LoanBankDocApath", LoanBankDocApath);
      sanctionData.append("LoanBankDocBpath", LoanBankDocBpath);
      axios({
        method: "patch",
        url: `${REACT_APP_BASE_URL}/loan/LoanStatusUpdate/${props.id}/`,
        data: sanctionData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `token ${Token}`,
        },
      }).then((response) => {
        if (response.data.status == "success" && response.status == 200) {
          setLoading(true);
          message.success(response.data.message);
          setTimeout(() => {
            setLoading(false);
            window.location.reload();
          }, 1000);
        } else if (response.data.status == "error") {
          message.error(response.data.error);
        }
      });
    }
  };

  if (open == true) {
    return (
      <div>
        <Form layout="vertical">
          <StatusFields>
            <Form.Item label="Beneficiary id">
              <Input name="Beneficiaryid" value={BeneficiaryId} disabled />
            </Form.Item>
            <Form.Item label="Beneficiary Name">
              <Input
                name="BeneficiaryName"
                value={
                  userData.FirstName +
                  " " +
                  userData.MiddleName +
                  " " +
                  userData.LastName
                }
                disabled
              />
            </Form.Item>
            <Form.Item label="Date of Application">
              <Input
                name="createdDate"
                // value={userData.createdDate}
                disabled
              />
            </Form.Item>

            <Form.Item label="Scheme Name">
              <Input name="LoanScheme" value={userData.LoanScheme} disabled />
            </Form.Item>

            <Form.Item label="Loan Amount (Applied)">
              <Input name="LoanAmount" value={userData.LoanAmount} disabled />
            </Form.Item>

            <Form.Item label="Loan Amount (Sanctioned)">
              <Input
                placeholder="Enter Loan Amount Sanctioned"
                name="LoanAmountSanctioned"
                value={LoanAmountSanctioned}
                type="Number"
                onChange={handleLoanAmountSanctioned}
                required
              />
            </Form.Item>

            <Form.Item label="Loan Amount (Retained as Guarantee)">
              <Input
                placeholder="Enter Loan Amount (Retained as Guarantee)"
                name="LoanAmountGuarantee"
                value={LoanAmountGuarantee}
                type="Number"
                onChange={handleLoanAmountGuarantee}
                required
              />
            </Form.Item>

            <Form.Item label="Rate of Interest">
              <Input
                placeholder="Enter Rate of Interest"
                name="LoanROI"
                type="Number"
                value={LoanROI}
                onChange={handleLoanROI}
                required
              />
            </Form.Item>

            <Form.Item label="Tenure (Repayment Period)">
              <Input
                placeholder="Enter Tenure (Repayment Period)"
                name="RepaymentPeriod"
                type="Number"
                value={RepaymentPeriod}
                onChange={handleRepaymentPeriod}
                required
              />
            </Form.Item>

            <Form.Item label="Remarks">
              <TextArea
                placeholder="Enter the Remarks"
                name="Lastremarks"
                value={Lastremarks}
                onChange={handleLastremarks}
                // required
              />
            </Form.Item>

            <Form.Item label="Status">
              <Select
                style={{ width: "230px" }}
                onChange={handleFinalStatus}
                value={FinalStatus}
              >
                <Option value={"RM"}>Approved by Bank</Option>
                <Option value={"BO-REJECT"}>Reject by Bank</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Document-1">
              <Input
                type="file"
                onChange={handleLoanBankDocApath}
                accept="image/jpeg, .pdf"
              />
            </Form.Item>
            <Form.Item label="Document-2">
              <Input
                type="file"
                onChange={handleLoanBankDocBpath}
                accept="image/jpeg, .pdf"
              />
            </Form.Item>
          </StatusFields>
          {/* <Row>
                        <Col span={24}>
                          <Form.Item label="Remarks">
                            <TextArea onChange={handleRemarks} />
                          </Form.Item>
                        </Col>
                      </Row> */}
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={() => onSubmit()}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  } else {
    return (
      <LoadContainer>
        <Spin tip="Loading data" />
      </LoadContainer>
    );
  }
};
export default LoanBankApprovepage;
