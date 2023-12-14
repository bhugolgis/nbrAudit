import React, { useState, useRef } from "react";
import { MainContainer, ChildContainer, FormItem } from "./style";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import {
  Radio,
  Select,
  Button,
  Input,
  message,
  Row,
  Col,
  Modal,
  Spin,
} from "antd";
import { REACT_APP_BASE_URL } from "../../utils/urls";
import { Token } from "../../utils/sessionStorage";
import axios from "axios";
const HousingForm = () => {
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
      nameOfCompany,
      OwnerOfCompany,
      Demarcation_of_plot_boundaries_Construction_of_compound_wall,
      Excavation,
      Levelling,
      RCC_PCC_work,
      work_Reinforcement_Cutting_Bending_of_steel_and_fabrication,
      Brickwork_and_Plastering,
      Finishing_Electrical_work_Plumbing_work_Tiling_work_Painting,
      Doorsandwindowsfitting,
      Solarpanelfitting,
      Tree_plantation_Landscaping,
      Drainage_Line_and_Services_Laying,
      PQC,
      Storm_water_works,
      Waterproofing_work,
      Transit_Mixer_Driver_and_Helper,
      Labour_work_for_ancillary_activities,
    } = formData.current;

    const housingData = new FormData();
    housingData.append(
      "IsBeneficiariesbelongstoScheduledCastecommunities",
      IsBeneficiariesbelongstoScheduledCastecommunities.value
    );
    housingData.append("Region", region);
    housingData.append("specialScheme", 3);
    housingData.append("nameOfCompany", nameOfCompany.value);
    housingData.append("OwnerOfCompany", OwnerOfCompany.value);
    housingData.append(
      "Demarcation_of_plot_boundaries_Construction_of_compound_wall",
      Demarcation_of_plot_boundaries_Construction_of_compound_wall.value
    );
    housingData.append("Excavation", Excavation.value);
    housingData.append("Levelling", Levelling.value);
    housingData.append("RCC_PCC_work", RCC_PCC_work.value);
    housingData.append(
      "work_Reinforcement_Cutting_Bending_of_steel_and_fabrication",
      work_Reinforcement_Cutting_Bending_of_steel_and_fabrication.value
    );
    housingData.append(
      "Brickwork_and_Plastering",
      Brickwork_and_Plastering.value
    );
    housingData.append(
      "Finishing_Electrical_work_Plumbing_work_Tiling_work_Painting",
      Finishing_Electrical_work_Plumbing_work_Tiling_work_Painting.value
    );
    housingData.append("Doorsandwindowsfitting", Doorsandwindowsfitting.value);
    housingData.append("Solarpanelfitting", Solarpanelfitting.value);
    housingData.append(
      "Tree_plantation_Landscaping",
      Tree_plantation_Landscaping.value
    );
    housingData.append(
      "Drainage_Line_and_Services_Laying",
      Drainage_Line_and_Services_Laying.value
    );
    housingData.append("PQC", PQC.value);
    housingData.append("Storm_water_works", Storm_water_works.value);
    housingData.append("Waterproofing_work", Waterproofing_work.value);
    housingData.append(
      "Transit_Mixer_Driver_and_Helper",
      Transit_Mixer_Driver_and_Helper.value
    );
    housingData.append(
      "Labour_work_for_ancillary_activities",
      Labour_work_for_ancillary_activities.value
    );
    housingData.append("panCard", panCard);
    housingData.append("aadharCard", aadharCard);
    housingData.append("IncomeCertificate", incomeCertificate);
    housingData.append("CompanyIncorporationCertificate", companyCertificate);
    if (typeof otherDocument == "object") {
      housingData.append("OtherDocument", otherDocument);
    }
    if (IsBeneficiariesbelongstoScheduledCastecommunities.value == "") {
      message.warning("Please Enter if you belong to SC");
    } else if (region == "" || region == null) {
      message.warning("Please Select you region");
    } else if (nameOfCompany.value == "" || nameOfCompany.value == null) {
      message.warning("Please Specify Name of company");
    } else if (OwnerOfCompany.value == "" || OwnerOfCompany.value == null) {
      message.warning("Please Specify Owner of company");
    } else if (Excavation.value == "") {
      message.warning("Please Specify Excavation");
    } else if (Levelling.value == "") {
      message.warning("Please specify Levelling");
    } else if (RCC_PCC_work.value == "") {
      message.warning("Please specify RCC PCC Work");
    } else if (
      Demarcation_of_plot_boundaries_Construction_of_compound_wall.value == ""
    ) {
      message.warning(
        "Please specify Demarcation of plot boundaries Construction of compound wall"
      );
    } else if (Brickwork_and_Plastering.value == "") {
      message.warning("Please specify Brickwork and Plastering");
    } else if (Doorsandwindowsfitting.value == "") {
      message.warning("Please SPecify Doors and Windows Fitting");
    } else if (Solarpanelfitting.value == "") {
      message.warning("Please Specify Solar and Panel Fitting");
    } else if (
      work_Reinforcement_Cutting_Bending_of_steel_and_fabrication.value == ""
    ) {
      message.warning(
        "Please specify work Reinforcement Cutting Bending of steel and fabrication "
      );
    } else if (Tree_plantation_Landscaping.value == "") {
      message.warning("Please specify tree plantation landscaping ");
    } else if (Drainage_Line_and_Services_Laying.value == "") {
      message.warning("Please specify Drainage line and Services Laying");
    } else if (PQC.value == "") {
      message.warning("Please specify PQC");
    } else if (
      Finishing_Electrical_work_Plumbing_work_Tiling_work_Painting.value == ""
    ) {
      message.warning(
        "Please Finishing Electrical work Plumbing work Tiling work Painting"
      );
    } else if (Storm_water_works.value == "") {
      message.warning("Please Specify Storm water works");
    } else if (Waterproofing_work.value == "") {
      message.warning("Please specify waterproofing work");
    } else if (Transit_Mixer_Driver_and_Helper.value == "") {
      message.warning("Please specify Transit Mixer Driver and Helper");
    } else if (Labour_work_for_ancillary_activities.value == "") {
      message.warning("Please Specify Labout work for ancillary activities");
    } else if (panCard == null) {
      message.warning("Please upload your PanCard");
    } else if (aadharCard == null) {
      message.warning("Please upload Aadhar Card");
    } else if (incomeCertificate == null) {
      message.warning("Please upload Income Certificate");
    } else if (companyCertificate == null) {
      message.warning("Please upload Company Corporation Certificate");
    } else {
      setSendData(true);
      axios({
        method: "post",
        url: `${REACT_APP_BASE_URL}/applicant/ApplyStartUpOrcompaniesforAffordableHousingconstructionactivitiescheme`,
        data: housingData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `token ${Token}`,
        },
      })
        .then((response) => {
          setSendData(false);
          if (response.status == 200 && response.data.status == "success") {
            Modal.success({
              title: response.data.message,
            });
            // setTimeout(() => {
            //   window.location.replace("/user-dashboard");
            // }, 1000);
          } else if (
            response.status == 200 &&
            response.data.status == "error"
          ) {
            Modal.error({ title: response.data.message });
          }
          // setTimeout(() => {
          //   window.location.replace("/user-dashboard");
          // }, 1000);
        })
        .catch((error) => {
          setSendData(false);
          message.error(error.message);
        });
    }
  };
  return (
    <Spin tip="Submitting form..." spinning={sendData}>
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
        <h3>
          Start-up/ companies for Affordable Housing construction activities
          Form
        </h3>
        <form ref={formData}>
          <Row>
            <Col span={6}>
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
                  style={{ width: "220px" }}
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
            <Col span={6}>
              <FormItem label="Name of Company" name="nameOfCompany" required>
                <Input
                  name="nameOfCompany"
                  placeholder="Enter the name"
                  style={{ width: "220px" }}
                />
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="Owner of Company" name="OwnerOfCompany" required>
                <Input
                  name="OwnerOfCompany"
                  placeholder="Enter the name"
                  style={{ width: "220px" }}
                />
              </FormItem>
            </Col>
          </Row>
          <h3>Select your skills</h3>
          <Row>
            <Col span={6}>
              <FormItem label="Excavation" required>
                <Radio.Group name="Excavation">
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="Levelling" required>
                <Radio.Group name="Levelling">
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="RCC_PCC_work" required>
                <Radio.Group name="RCC_PCC_work">
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                label="Demarcation of plot boundaries Construction of compound wall"
                required
              >
                <Radio.Group name="Demarcation_of_plot_boundaries_Construction_of_compound_wall">
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <FormItem label="Brickwork and Plastering" required>
                <Radio.Group name="Brickwork_and_Plastering">
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="Doors and windows fitting" required>
                <Radio.Group name="Doorsandwindowsfitting">
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="Solar Panel fitting" required>
                <Radio.Group name="Solarpanelfitting">
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                label="work Reinforcement Cutting Bending of steel and fabrication"
                required
              >
                <Radio.Group name="work_Reinforcement_Cutting_Bending_of_steel_and_fabrication">
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <FormItem label="Tree plantation Landscaping" required>
                <Radio.Group name="Tree_plantation_Landscaping">
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="Drainage Line and Services Laying" required>
                <Radio.Group name="Drainage_Line_and_Services_Laying">
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="PQC" required>
                <Radio.Group name="PQC">
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                label="Finishing Electrical work Plumbing work Tiling work Painting"
                required
              >
                <Radio.Group name="Finishing_Electrical_work_Plumbing_work_Tiling_work_Painting">
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <FormItem label="Storm water works" required>
                <Radio.Group name="Storm_water_works">
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="Waterproofing work" required>
                <Radio.Group name="Waterproofing_work">
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="Transit Mixer Driver and Helper" required>
                <Radio.Group name="Transit_Mixer_Driver_and_Helper">
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="Labour work for ancillary activities" required>
                <Radio.Group name="Labour_work_for_ancillary_activities">
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <FormItem label="Pan Card" required>
                <input type="file" onChange={handlePanCard} />
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="Aadhar Card" required>
                <input type="file" onChange={handleAadharCard} />
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="Income Certificate" required>
                <input type="file" onChange={handleIncomeCertificate} />
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="Company Incorporation Certificate" required>
                <input type="file" onChange={handleCompanyCertificate} />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <FormItem label="Other Document" required>
                <input type="file" onChange={handleOther} />
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
export default HousingForm;
