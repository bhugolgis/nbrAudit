import React, { useEffect, useState, useRef } from "react";
import { Button, Input, Form, Spin, message, DatePicker, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";
import { StatusFields, LoadContainer } from "./style";
import moment from "moment";
import { REACT_APP_BASE_URL } from "../../utils/urls";
import { Token, BeneficiaryId } from "../../utils/sessionStorage";

const { Option } = Select;

const LoanBankClosepage = (props) => {
  const disabledDate = (current) => {
    return current && current.valueOf() < moment();
  };

  const [LoanClosureDate, setLoanClosureDate] = useState("");
  const handleLoanClosureDate = (date, dateString) => {
    setLoanClosureDate(date);
  };

  const [Lastremarks, setLastremarks] = useState("");
  const handleLastremarks = (e) => {
    setLastremarks(e.target.value);
  };

  const [FinalStatus, setFinalStatus] = useState("LOAN-CLOSED");
  const handleFinalStatus = (value) => {
    setFinalStatus(value);
  };

  const [LoanBankDocEpath, setLoanBankDocEpath] = useState();
  const handleLoanBankDocEpath = (event) => {
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
      setLoanBankDocEpath(event.target.files[0]);
    } else {
      message.warning("The size of the documents between 75 KB to 2 MB.");
    }
  };

  const [LoanBankDocFpath, setLoanBankDocFpath] = useState();
  const handleLoanBankDocFpath = (event) => {
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
      setLoanBankDocFpath(event.target.files[0]);
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
    if (LoanBankDocEpath == null) {
      message.warning("Please upload Closure Document 1");
    } else {
      axios({
        method: "patch",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `token ${Token}`,
        },
        url: `${REACT_APP_BASE_URL}/loan/LoanStatusUpdate/${props.id}/`,
        data: {
          PrevStatus: props.statusname || "",
          LastStatus: FinalStatus,
          Lastremarks: Lastremarks,
          LoanBankDocEpath: LoanBankDocEpath,
          LoanBankDocFpath: LoanBankDocFpath,
        },
      })
        .then((response) => {
          if (response.data.status == "success" && response.status == 200) {
            setLoading(true);
            message.success(response.data.message);
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else if (response.data.status == "error") {
            setLoading(true);
            message.error(response.data.message);
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        })
        .catch((error) => {
          return message.error(error.message);
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
                value={moment(userData.LoanTransactionDate)}
                disabled
                //disabledDate={disabledDate}
              />
            </Form.Item>
            <Form.Item label="Transaction ID">
              <Input
                placeholder="Enter Transaction ID"
                name="LoanTransactionid"
                value={userData.LoanTransactionid}
                disabled
              />
            </Form.Item>
            <Form.Item label="EMI Date">
              <Input
                placeholder="EMI Date (DD) of every month"
                name="LoanEMIDate"
                value={userData.LoanEMIDate}
                disabled
              />
            </Form.Item>
            <Form.Item label="EMI Amount">
              <Input
                placeholder="Enter EMI Amount"
                name="LoanEMIAmount"
                type="Number"
                value={userData.LoanEMIAmount}
                disabled
              />
            </Form.Item>
            <Form.Item label="Loan Start Date">
              <DatePicker
                placeholder="Enter Loan Start Date"
                name="LoanStartDate"
                value={moment(userData.LoanStartDate)}
                disabled
              />
            </Form.Item>
            <Form.Item label="Loan Close Date">
              <DatePicker
                placeholder="Enter Loan Close Date"
                name="LoanCloseDate"
                value={moment(userData.LoanCloseDate)}
                disabled
              />
            </Form.Item>

            {/* <Form.Item label="Loan Closure Date">
              <DatePicker
                placeholder="Enter Loan Closure Date"
                name="LoanClosureDate"
                value={LoanClosureDate}
                onChange={handleLoanClosureDate}
                required
                disabledDate={disabledDate}
              />
            </Form.Item> */}

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
                <Option value={"LOAN-CLOSED"}>Loan Closed</Option>
                <Option value={"LOAN-DEFAULTER"}>Loan Defaulted</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Closure Document-1">
              <Input
                type="file"
                onChange={handleLoanBankDocEpath}
                accept="image/jpeg, .pdf"
              />
            </Form.Item>
            <Form.Item label="Closure Document-2">
              <Input
                type="file"
                onChange={handleLoanBankDocFpath}
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
export default LoanBankClosepage;
