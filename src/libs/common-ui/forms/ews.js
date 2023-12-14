import React, { useState, useRef } from "react";
import { MainContainer, ChildContainer, FormItem } from "./style";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { Radio, Select, Button, Input, message, Col, Row, Spin } from "antd";
import { REACT_APP_BASE_URL } from "../../utils/urls";
import { Token } from "../../utils/sessionStorage";
import axios from "axios";
import { send } from "react-ga";
const EwsForm = () => {
  const formData = useRef();
  const [region, setRegion] = useState();
  const [Document712, setDocument712] = useState();
  const handleDocument712 = (event) => {
    setDocument712(event.target.files[0]);
  };
  const [panCard, setPanCard] = useState();
  const handlePanCard = (event) => {
    setPanCard(event.target.files[0]);
  };
  const [aadharCard, setAadharCard] = useState();
  const handleAadharCard = (event) => {
    setAadharCard(event.target.files[0]);
  };
  const [incomeCertificate, setIncomeCertificate] = useState();
  const handleIncomeCertificate = (event) => {
    setIncomeCertificate(event.target.files[0]);
  };
  const [companyCertificate, setCompanyCertificate] = useState();
  const handleCompanyCertificate = (event) => {
    setCompanyCertificate(event.target.files[0]);
  };
  const [otherDocument, setOtherDocument] = useState();
  const handleOther = (event) => {
    setOtherDocument(event.target.files[0]);
  };

  const [schemeHome, setSchemeHome] = useState();
  const [sendData, setSendData] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      IsBeneficiariesbelongstoScheduledCastecommunities,
      haveyourownhouseunderPMAYorEWC,
      Annual_Family_Income,
    } = formData.current;

    const pmayData = new FormData();
    pmayData.append(
      "IsBeneficiariesbelongstoScheduledCastecommunities",
      IsBeneficiariesbelongstoScheduledCastecommunities.value
    );
    pmayData.append("Region", region);
    pmayData.append("specialScheme", 2);
    pmayData.append(
      "haveyourownhouseunderPMAYorEWC",
      haveyourownhouseunderPMAYorEWC.value
    );
    pmayData.append("Under_which_scheme_you_need_home", schemeHome);
    pmayData.append("Annual_Family_Income", Annual_Family_Income.value);
    // pmayData.append("Document_7_12", Document712);
    pmayData.append("panCard", panCard);
    pmayData.append("aadharCard", aadharCard);
    pmayData.append("IncomeCertificate", incomeCertificate);
    // pmayData.append("CompanyIncorporationCertificate", companyCertificate);
    pmayData.append("OtherDocument", otherDocument);
    if (IsBeneficiariesbelongstoScheduledCastecommunities.value == "") {
      message.warning("Please Enter if you belong to SC");
    } else if (region == null) {
      message.warning("Region is empty");
    } else if (haveyourownhouseunderPMAYorEWC.value == "") {
      message.warning("Please Specify if you have house under PMAY/EWC");
    } else if (schemeHome == "" || schemeHome == null) {
      message.warning("Enter the scheme under which you need home");
    } else if (
      Annual_Family_Income.value >= 300001 ||
      Annual_Family_Income.value == ""
    ) {
      message.warning("Family Income should be equal to or less than 3,00,000");
      // } else if (Document712 == null) {
      //   message.warning("Please upload Document_7_12");
    } else if (panCard == null) {
      message.warning("Please upload your PanCard");
    } else if (aadharCard == null) {
      message.warning("Please upload Aadhar Card");
    } else if (incomeCertificate == null) {
      message.warning("Please upload Income Certificate");
      // } else if (companyCertificate == null) {
      //   message.warning("Please upload Company Corporation Certificate");
    } else {
      setSendData(true);
      axios({
        method: "post",
        url: `${REACT_APP_BASE_URL}/applicant/ApplyPMAYorEWCcheme`,
        data: pmayData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `token ${Token}`,
        },
      })
        .then((response) => {
          setSendData(false);
          if (response.status == 200 && response.data.status == "success") {
            message.success(response.data.message);
            setTimeout(() => {
              window.location.replace("/user-dashboard");
            }, 1000);
          } else if (
            response.status == 200 &&
            response.data.status == "error"
          ) {
            message.error(response.data.message);
            setTimeout(() => {
              window.location.replace("/user-dashboard");
            });
          }
        })
        .catch((error) => {
          message.error(error.message);
        });
    }
  };
  return (
    <Spin tip="Submitting Form..." spinning={sendData}>
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
        <h3>Desire to have own house under PMAY/ EWS Form</h3>
        <form ref={formData}>
          <Row>
            <Col span={5}>
              <FormItem label="Do you belong to SC ?" required>
                <Radio.Group name="IsBeneficiariesbelongstoScheduledCastecommunities">
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="Region" required>
                <Select
                  showSearch
                  placeholder="Select a Region"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  style={{ width: "230px" }}
                  name="Region"
                  onChange={(v, k) => {
                    setRegion(v);
                  }}
                  options={[
                    {
                      value: "Pune",
                      label: "Pune",
                    },
                    {
                      value: "Konkan",
                      label: "Konkan",
                    },
                    {
                      value: "Nashik ",
                      label: "Nashik ",
                    },
                    {
                      value: "Aurangabad",
                      label: "Aurangabad",
                    },
                    {
                      value: "Amravati",
                      label: "Amravati",
                    },
                    {
                      value: "Nagpur",
                      label: "Nagpur",
                    },
                  ]}
                />
              </FormItem>
            </Col>
            <Col span={7}>
              <FormItem
                label="Do you have your own house under PMAY/EWC"
                required
              >
                <Radio.Group name="haveyourownhouseunderPMAYorEWC">
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                label="Under which scheme you need home"
                name="Under_which_scheme_you_need_home"
                required
              >
                <Select
                  name="Under_which_scheme_you_need_home"
                  placeholder="Scheme in which need home"
                  style={{
                    width: 200,
                  }}
                  onChange={(value) => {
                    setSchemeHome(value);
                  }}
                  options={[
                    {
                      value: "pmay",
                      label: "PMAY",
                    },
                    {
                      value: "ewc",
                      label: "EWC",
                    },
                  ]}
                />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={5}>
              <FormItem
                label="Annual Family Income"
                name="Annual_Family_Income"
                required
              >
                <Input
                  type="tel"
                  name="Annual_Family_Income"
                  placeholder="Enter Family Annual Income"
                  maxLength={6}
                  style={{ width: "200px" }}
                />
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="Pan Card" required>
                <input type="file" onChange={handlePanCard} />
              </FormItem>
              {/* <FormItem label="Document_7_12">
              <input type="file" onChange={handleDocument712} />
            </FormItem> */}
            </Col>
            <Col span={7}>
              <FormItem label="Aadhar Card" required>
                <input type="file" onChange={handleAadharCard} />
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="Income Certificate" required>
                <input type="file" onChange={handleIncomeCertificate} />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={5}>
              <FormItem label="Other Document" required>
                <input type="file" onChange={handleOther} />
              </FormItem>
            </Col>
            <Col span={6}>
              {/* <FormItem label="Company Incorporation Certificate">
              <input type="file" onChange={handleCompanyCertificate} />
            </FormItem> */}
            </Col>
            <Col span={7}></Col>
            <Col span={6}></Col>
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
export default EwsForm;
