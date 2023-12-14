import React from "react";
import { FormItem, MainContainer } from "./style";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Spin,
  message,
} from "antd";
import { InputFields } from "../training/style";
import { useState } from "react";
import data from "../../../data/dtdata.json";
import axios from "axios";
import { beneficaryInstance } from "../../utils/fetch-utils";
import { Token } from "../../utils/sessionStorage";
import { REACT_APP_BASE_URL } from "../../utils/urls";
const Option = Select;
const Erickshaw = () => {
  const [pancard, setPancard] = useState(null);
  const [talukaKey, setTalukaKey] = useState(0);
  const [taluka, setTaluka] = useState(null);
  const [district, setDistrict] = useState(null);
  const [selectVisible, setSelectVisible] = useState(true);

  const [availLoan, setAvailLoan] = useState(null);
  const [AccountNumber, setAccountNumber] = useState(null);
  const [SchemeName, setSchemeName] = useState(null);
  const [loanStatus, setLoanStatus] = useState();
  const [otherLoan, setOtherLoan] = useState();
  const [haveDrivingLicense, setHaveDrivingLicense] = useState();
  const [licenseNumber, setLicenseNumber] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [sign, setSign] = useState(null);
  const [aadhar, setAadhar] = useState(null);
  const [pan, setPan] = useState(null);
  const [drivinglicense, setDrivingLicense] = useState(null);
  const [incomeCertificate, setIncomeCertificate] = useState(null);
  const [loanDocs, setLoanDocs] = useState(null);
  const [rationCard, setRationCard] = useState(null);

  const [submitLoad, setSubmitLoad] = useState(false);
  const handleDistrict = (e) => {
    setDistrict(e.target.value);
  };

  const handleSubmit = () => {
    if (pancard == null) {
      message.warning("Pancard Number is empty");
    } else if (district == null) {
      message.warning("District is empty");
    } else if (taluka == null) {
      message.warning("Taluka is empty");
    } else if (availLoan == null) {
      message.warning("Please specify if you avail MPBCDC loan before");
    } else if (otherLoan == null) {
      message.warning("Please Specify if you want loan other than mpbcdc");
    } else if (haveDrivingLicense == null) {
      message.warning("Do you have driving license");
    } else if (photo == null) {
      message.warning("Please upload photo");
    } else if (sign == null) {
      message.warning("Please upload signature");
    } else if (aadhar == null) {
      message.warning("Please upload aadhar card");
    } else if (pan == null) {
      message.warning("Please upload pancard");
    } else if (incomeCertificate == null) {
      message.warning("Please upload Income Certificate");
    } else if (rationCard == null) {
      message.warning("Please upload Ration Card");
    } else {
      setSubmitLoad(true);
      const ErickshawData = new FormData();
      ErickshawData.append("specialScheme", 5);
      ErickshawData.append("panNumber", pancard);
      ErickshawData.append("areaOfOperationDistrict", district);
      ErickshawData.append("areaOfOperationTaluka", taluka);
      ErickshawData.append("DoyouavailMPBCDCLoanBefore", availLoan);
      ErickshawData.append("LoanAccountnumber", AccountNumber);
      ErickshawData.append("loanSchemeName", SchemeName);
      ErickshawData.append("loanPresentStatus", loanStatus);
      ErickshawData.append("willingToHaveLoanOtherThanMpbdc", otherLoan);
      ErickshawData.append("haveDrivingLicense", haveDrivingLicense);
      ErickshawData.append("drivingLicenseNumber", licenseNumber);
      ErickshawData.append("photo", photo);
      ErickshawData.append("sign", sign);
      ErickshawData.append("aadharCard", aadhar);
      ErickshawData.append("panCard", pan);
      if (drivinglicense != null) {
        ErickshawData.append("drivingLicense", drivinglicense);
      }
      ErickshawData.append("IncomeCertificate", incomeCertificate);
      if (loanDocs != null) {
        ErickshawData.append("mpbdcLoanDoc", loanDocs);
      }
      ErickshawData.append("rationCard", rationCard);
      axios({
        method: "post",
        url: `${REACT_APP_BASE_URL}/applicant/ApplyERickshawScheme`,
        data: ErickshawData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `token ${Token}`,
        },
      })
        .then((response) => {
          setSubmitLoad(false);
          if (response.status == 200 && response.data.status == "success") {
            Modal.success({ title: response.data.message });
            setTimeout(() => {
              window.location.replace("/user-dashboard");
            }, 1000);
          } else {
            Modal.error({ title: response.data.message });
          }
        })
        .catch((error) => {
          setSubmitLoad(false);
          Modal.error({ title: error.message });
        });
    }
  };
  return (
    <Spin tip="Submitting Form..." spinning={submitLoad}>
      <MainContainer>
        <Link to="/home">
          <BiArrowBack
            style={{
              cursor: "pointer",
              fontSize: "20px",
              marginBottom: "10px",
            }}
          />
        </Link>
        <h3>E Rickshaw Scheme</h3>
        <form>
          <Row>
            <Col span={6}>
              <FormItem label="Pancard" required>
                <Input
                  placeholder="Enter Pan Card Number"
                  style={{ width: "250px" }}
                  maxLength={10}
                  value={pancard}
                  onChange={(e) => {
                    setPancard(e.target.value);
                  }}
                />
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="Area of Operation District" required>
                <Select
                  showSearch
                  placeholder="Select district"
                  optionFilterProp="children"
                  onChange={(v, k) => {
                    setDistrict(v);
                    setTalukaKey(k.key);
                    setSelectVisible(false);
                  }}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                  value={district}
                  style={{ width: "250px" }}
                  name="district"
                >
                  {data.map((dis, index) => {
                    return (
                      <Option
                        key={index}
                        value={dis.district_name}
                        onChange={handleDistrict}
                      >
                        {dis.district_name}
                      </Option>
                    );
                  })}
                </Select>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                label="Area of Operation Taluka"
                name="taluka"
                rules={[
                  {
                    required: true,
                    message: "Please input your Taluka!",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select taluka"
                  optionFilterProp="children"
                  onChange={(v) => {
                    setTaluka(v);
                  }}
                  value={taluka}
                  disabled={selectVisible}
                  name="taluka"
                  style={{ width: "250px" }}
                >
                  {data[talukaKey].talukas.map((tal) => {
                    return (
                      <Option value={tal.taluka_name}>{tal.taluka_name}</Option>
                    );
                  })}
                </Select>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="Have you avail MPBCDC Loan Before" required>
                <Radio.Group
                  onChange={(e) => {
                    setAvailLoan(e.target.value);
                  }}
                >
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <FormItem label="Loan Account Number">
                <Input
                  placeholder="Enter Loan Account Number"
                  style={{ width: "250px" }}
                  onChange={(e) => {
                    setAccountNumber(e.target.value);
                  }}
                />
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="Loan Scheme Name">
                <Input
                  placeholder="Enter Loan Scheme Name"
                  style={{ width: "250px" }}
                  onChange={(e) => {
                    setSchemeName(e.target.value);
                  }}
                />
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="Loan Present Status">
                <Input
                  placeholder="Enter Loan Present Status"
                  style={{ width: "250px" }}
                  value={loanStatus}
                  onChange={(e) => {
                    setLoanStatus(e.target.value);
                  }}
                />
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="Do you want Loan other than MPBCDC" required>
                <Radio.Group
                  onChange={(e) => {
                    setOtherLoan(e.target.value);
                  }}
                >
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <FormItem label="Do you have driving license" required>
                <Radio.Group
                  onChange={(e) => {
                    setHaveDrivingLicense(e.target.value);
                  }}
                >
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="Driving License Number">
                <Input
                  placeholder="Enter driving license Number"
                  style={{ width: "250px" }}
                  onChange={(e) => {
                    setLicenseNumber(e.target.value);
                  }}
                />
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="Photo" required>
                <input
                  type="file"
                  onChange={(e) => {
                    setPhoto(e.target.files[0]);
                  }}
                />
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="Signature" required>
                <input
                  type="file"
                  onChange={(e) => {
                    setSign(e.target.files[0]);
                  }}
                />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <FormItem label="Aadhar Card" required>
                <input
                  type="file"
                  onChange={(e) => {
                    setAadhar(e.target.files[0]);
                  }}
                />
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="PanCard" required>
                <input
                  type="file"
                  onChange={(e) => {
                    setPan(e.target.files[0]);
                  }}
                />
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="Driving license">
                <input
                  type="file"
                  onChange={(e) => {
                    setDrivingLicense(e.target.files[0]);
                  }}
                />
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="Income Certificate" required>
                <input
                  type="file"
                  onChange={(e) => {
                    setIncomeCertificate(e.target.files[0]);
                  }}
                />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <FormItem label="MPBCDC Loan Document">
                <input
                  type="file"
                  onChange={(e) => {
                    setLoanDocs(e.target.files[0]);
                  }}
                />
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="Ration Card" required>
                <input
                  type="file"
                  onChange={(e) => {
                    setRationCard(e.target.files[0]);
                  }}
                />
              </FormItem>
            </Col>
          </Row>
          <FormItem>
            <Button type="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </FormItem>
        </form>
      </MainContainer>
    </Spin>
  );
};
export default Erickshaw;
