import React, { useEffect, useState, useRef } from "react";
import { Button, Input, Form, Spin, message, DatePicker } from "antd";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";
import { StatusFields, LoadContainer } from "./style";
import moment from "moment";
import { REACT_APP_BASE_URL } from "../../utils/urls";
import { Token, BeneficiaryId } from "../../utils/sessionStorage";

const LoanBankReleasepage = (props) => {
  const disabledDate = (current) => {
    return current && current.valueOf() < moment();
  };

  const [LoanTransactionDate, setLoanTransactionDate] = useState("");
  const handleLoanTransactionDate = (date, dateString) => {
    setLoanTransactionDate(moment(date).format());
  };
  const [LoanEMIDate, setLoanEMIDate] = useState("");
  const handleLoanEMIDate = (e) => {
    setLoanEMIDate(e.target.value);
  };
  const [LoanStartDate, setLoanStartDate] = useState("");
  const handleLoanStartDate = (date, dateString) => {
    setLoanStartDate(moment(date).format());
  };
  const [LoanCloseDate, setLoanCloseDate] = useState("");
  const handleLoanCloseDate = (date, dateString) => {
    setLoanCloseDate(moment(date).format());
  };

  const [LoanTransactionid, setLoanTransactionid] = useState("");
  const handleLoanTransactionid = (e) => {
    setLoanTransactionid(e.target.value);
  };

  const [LoanEMIAmount, setLoanEMIAmount] = useState("0");
  const handleLoanEMIAmount = (e) => {
    setLoanEMIAmount(e.target.value);
  };

  const [Lastremarks, setLastremarks] = useState("");
  const handleLastremarks = (e) => {
    setLastremarks(e.target.value);
  };

  const [LoanBankDocCpath, setLoanBankDocCpath] = useState(null);
  const handleLoanBankDocCpath = (event) => {
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
      setLoanBankDocCpath(event.target.files[0]);
    } else {
      message.warning("The size of the documents between 75 KB to 2 MB.");
    }
  };

  const [LoanBankDocDpath, setLoanBankDocDpath] = useState(null);
  const handleLoanBankDocDpath = (event) => {
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
      setLoanBankDocDpath(event.target.files[0]);
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
    if (LoanTransactionDate == "") {
      message.warning("Please Select Transaction Date");
    } else if (LoanTransactionid == "") {
      message.warning("Please enter Transaction ID");
    } else if (LoanEMIAmount == "") {
      message.warning("Please enter EMI amount");
    } else if (LoanEMIAmount >= userData.LoanAmount) {
      message.warning("Loan EMI Amount not allowed more then loan amount");
    } else if (LoanEMIDate == "") {
      message.warning("Please Enter EMI Date (DD) of every month");
    } else if (LoanStartDate == "") {
      message.warning("Please Select Loan Start Date");
    } else if (LoanCloseDate == "") {
      message.warning("Please Select Loan Close Date");
    } else if (LoanBankDocCpath == null) {
      message.warning("Please upload the Release Document 1");
    } else {
      const releaseData = new FormData();
      releaseData.append("LoanTransactionDate", LoanTransactionDate);
      releaseData.append("LoanTransactionid", LoanTransactionid);
      releaseData.append("LoanEMIDate", LoanEMIDate);
      releaseData.append("LoanStartDate", LoanStartDate);
      releaseData.append("LoanCloseDate", LoanCloseDate);
      releaseData.append("LoanEMIAmount", LoanEMIAmount);
      releaseData.append("PrevStatus", props.statusname || "");
      releaseData.append("LastStatus", "LOAN-ACTIVE");
      releaseData.append("LoanEMIAmount", LoanEMIAmount);
      releaseData.append("Lastremarks", Lastremarks);
      if (LoanBankDocCpath !== null) {
        releaseData.append("LoanBankDocCpath", LoanBankDocCpath);
      }
      if (LoanBankDocDpath !== null) {
        releaseData.append("LoanBankDocDpath", LoanBankDocDpath);
      }
      axios({
        method: "patch",
        url: `${REACT_APP_BASE_URL}/loan/LoanStatusUpdate/${props.id}/`,
        data: releaseData,
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
          setLoading(true);
          message.error("Technical Error");
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
                value={userData.LoanAmountSanctioned}
                type="Number"
                disabled
              />
            </Form.Item>

            <Form.Item label="Loan Amount (Retained as Guarantee)">
              <Input
                placeholder="Enter Loan Amount (Retained as Guarantee)"
                name="LoanAmountGuarantee"
                value={userData.LoanAmountGuarantee}
                type="Number"
                disabled
              />
            </Form.Item>

            <Form.Item label="Rate of Interest">
              <Input
                placeholder="Enter Rate of Interest"
                name="LoanROI"
                type="Number"
                value={userData.LoanROI}
                disabled
              />
            </Form.Item>

            <Form.Item label="Tenure (Repayment Period)">
              <Input
                placeholder="Enter Tenure (Repayment Period)"
                name="RepaymentPeriod"
                type="Number"
                value={userData.RepaymentPeriod}
                disabled
              />
            </Form.Item>

            <Form.Item label="Date of Transaction">
              <DatePicker
                name="LoanTransactionDate"
                onChange={handleLoanTransactionDate}

                //disabledDate={disabledDate}
              />
            </Form.Item>
            <Form.Item label="Transaction ID">
              <Input
                placeholder="Enter Transaction ID"
                name="LoanTransactionid"
                value={LoanTransactionid}
                onChange={handleLoanTransactionid}
              />
            </Form.Item>
            <Form.Item label="EMI Date">
              <Input
                placeholder="EMI Date (DD) of every month"
                name="LoanEMIDate"
                value={LoanEMIDate}
                onChange={handleLoanEMIDate}
              />
            </Form.Item>
            <Form.Item label="EMI Amount">
              <Input
                placeholder="Enter EMI Amount"
                name="LoanEMIAmount"
                type="Number"
                value={LoanEMIAmount}
                onChange={handleLoanEMIAmount}
              />
            </Form.Item>
            <Form.Item label="Loan Start Date">
              <DatePicker
                placeholder="Enter Loan Start Date"
                name="LoanStartDate"
                onChange={handleLoanStartDate}
              />
            </Form.Item>
            <Form.Item label="Loan Close Date">
              <DatePicker
                placeholder="Enter Loan Close Date"
                name="LoanCloseDate"
                onChange={handleLoanCloseDate}
                disabledDate={disabledDate}
              />
            </Form.Item>

            <Form.Item label="Remarks">
              <TextArea
                placeholder="Enter the Remarks"
                name="Lastremarks"
                value={Lastremarks}
                onChange={handleLastremarks}
              />
            </Form.Item>
            <Form.Item label="Release Document-1">
              <Input
                type="file"
                onChange={handleLoanBankDocCpath}
                accept="image/jpeg, .pdf"
              />
            </Form.Item>
            <Form.Item label="Release Document-2">
              <Input
                type="file"
                onChange={handleLoanBankDocDpath}
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
export default LoanBankReleasepage;
