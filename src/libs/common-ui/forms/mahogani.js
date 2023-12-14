import {
  Form,
  Input,
  Radio,
  Select,
  Button,
  message,
  Row,
  Col,
  Modal,
  Spin,
} from "antd";
import React, { useRef, useState } from "react";
import { ChildContainer, FormItem, MainContainer } from "./style";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";
import { REACT_APP_BASE_URL } from "../../utils/urls";
import { Token } from "../../utils/sessionStorage";
const MahoganiForm = () => {
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

  const [sendData, setSendData] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      IsBeneficiariesbelongstoScheduledCastecommunities,
      Is_Beneficiaries_shall_possess_hold_minimum_one_Acer_land,
      Availability_of_water_sources,
    } = formData.current;

    const mahoganiFormData = new FormData();
    mahoganiFormData.append(
      "IsBeneficiariesbelongstoScheduledCastecommunities",
      IsBeneficiariesbelongstoScheduledCastecommunities.value
    );
    mahoganiFormData.append("Region", region);
    mahoganiFormData.append("specialScheme", 1);
    mahoganiFormData.append(
      "Is_Beneficiaries_shall_possess_hold_minimum_one_Acer_land",
      Is_Beneficiaries_shall_possess_hold_minimum_one_Acer_land.value
    );
    mahoganiFormData.append(
      "Availability_of_water_sources",
      Availability_of_water_sources.value
    );
    mahoganiFormData.append("Document_7_12", Document712);
    mahoganiFormData.append("panCard", panCard);
    mahoganiFormData.append("aadharCard", aadharCard);

    mahoganiFormData.append("OtherDocument", otherDocument);
    if (IsBeneficiariesbelongstoScheduledCastecommunities.value == "") {
      message.warning("Please Enter if you belong to SC");
    } else if (region == null) {
      message.warning("Please select the region");
    } else if (
      Is_Beneficiaries_shall_possess_hold_minimum_one_Acer_land.value == ""
    ) {
      message.warning(
        "Please select if you own more than minimum one acre land"
      );
    } else if (Availability_of_water_sources.value == "") {
      message.warning("Please select if water sources are available");
    } else if (Document712 == null) {
      message.warning("Please upload Document_7_12");
    } else if (panCard == null) {
      message.warning("Please upload your PanCard");
    } else if (aadharCard == null) {
      message.warning("Please upload Aadhar Card");
    } else {
      setSendData(true);
      axios({
        method: "post",
        url: `${REACT_APP_BASE_URL}/applicant/ApplyMahaGonyScheme`,
        data: mahoganiFormData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `token ${Token}`,
        },
      })
        .then((response) => {
          setSendData(false);
          if (response.status == 200 && response.data.status == "success") {
            Modal.success({ title: response.data.message });
            setTimeout(() => {
              window.location.replace("user-dashboard");
            }, 1000);
          } else if (
            response.status == 200 &&
            response.data.status == "error"
          ) {
            Modal.warning({
              title:
                response.data.message + ` Check the status on your Dashboard.`,
            });
            setTimeout(() => {
              window.location.replace("user-dashboard");
            }, 1000);
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
        <h3>Mahogani Plantation Form</h3>
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
                  style={{ width: "250px" }}
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
            <Col span={8}>
              <FormItem
                label="Do you possess or hold minimum one Acer land ?"
                required
              >
                <Radio.Group name="Is_Beneficiaries_shall_possess_hold_minimum_one_Acer_land">
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </FormItem>
            </Col>
            <Col span={5}>
              <FormItem label="Availability of water sources" required>
                <Radio.Group name="Availability_of_water_sources">
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={5}>
              <FormItem label="7/12 Extract" required>
                <input type="file" onChange={handleDocument712} />
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="Pan Card" required>
                <input type="file" onChange={handlePanCard} />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="Aadhar Card" required>
                <input type="file" onChange={handleAadharCard} />
              </FormItem>
            </Col>
            <Col span={5}>
              <FormItem label="Other Document" required>
                <input type="file" onChange={handleOther} />
              </FormItem>
            </Col>
          </Row>
          <ChildContainer></ChildContainer>
          <ChildContainer>
            {/* <FormItem label="Income Certificate">
            <input type="file" onChange={handleIncomeCertificate} />
          </FormItem> */}
          </ChildContainer>
          <span style={{ display: "flex" }}>
            {/* <FormItem label="Company Incorporation Certificate">
            <input type="file" onChange={handleCompanyCertificate} />
          </FormItem> */}
          </span>
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
export default MahoganiForm;
