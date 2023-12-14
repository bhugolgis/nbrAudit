import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { FormItem, MainContainer } from "./style";
import { BiArrowBack } from "react-icons/bi";
import { Button, Col, message, Modal, Radio, Row, Spin } from "antd";
import { useState } from "react";
import { Token } from "../../utils/sessionStorage";
import axios from "axios";
import { REACT_APP_BASE_URL } from "../../utils/urls";

const Plantation = () => {
  const formData = useRef();
  const [panCard, setPanCard] = useState();
  const handlePanCard = (event) => {
    setPanCard(event.target.files[0]);
  };
  const [aadharCard, setAadharCard] = useState();
  const handleAadharCard = (event) => {
    setAadharCard(event.target.files[0]);
  };

  const [educationCertificate, setEducationCertificate] = useState();
  const handleEduCertificate = (event) => {
    setEducationCertificate(event.target.files[0]);
  };

  const [expCertificate, setExpCertificate] = useState();
  const handleExpCertificate = (event) => {
    setExpCertificate(event.target.files[0]);
  };

  const [sendData, setSendData] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      Demarcation_of_plot_boundaries_Construction_of_compound_wall,
      Excavation,
      Levelling,
      RCC_PCC_work,
      Brickwork_and_Plastering,
      Finishing_Electrical_work_Plumbing_work_Tiling_work_Painting,
      Solarpanelfitting,
      Tree_plantation_Landscaping,
      Labour_work_for_ancillary_activities,
    } = formData.current;
    const plantationData = new FormData();
    plantationData.append("Excavation", Excavation.value);
    plantationData.append("Levelling", Levelling.value);
    plantationData.append("RCC_PCC_work", RCC_PCC_work.value);
    plantationData.append(
      "Brickwork_and_Plastering",
      Brickwork_and_Plastering.value
    );
    plantationData.append(
      "Finishing_Electrical_work_Plumbing_work_Tiling_work_Painting",
      Finishing_Electrical_work_Plumbing_work_Tiling_work_Painting.value
    );
    plantationData.append("Solarpanelfitting", Solarpanelfitting.value);
    plantationData.append(
      "Tree_plantation_Landscaping",
      Tree_plantation_Landscaping.value
    );
    plantationData.append(
      "Labour_work_for_ancillary_activities",
      Labour_work_for_ancillary_activities.value
    );
    plantationData.append("aadharCard", aadharCard);
    plantationData.append("panCard", panCard);
    if (educationCertificate != null) {
      plantationData.append("EducationCertificate", educationCertificate);
    }
    if (expCertificate != null) {
      plantationData.append("expCertificate", expCertificate);
    }
    plantationData.append("specialScheme", 4);

    if (Excavation.value == "") {
      message.warning("Please Specify Excavation");
    } else if (Levelling.value == "") {
      message.warning("Please specify Levelling");
    } else if (RCC_PCC_work.value == "") {
      message.warning("Please specify RCC PCC Work");
    } else if (Brickwork_and_Plastering.value == "") {
      message.warning("Please specify Brickwork and Plastering");
    } else if (
      Finishing_Electrical_work_Plumbing_work_Tiling_work_Painting.value == ""
    ) {
      message.warning(
        "Please Finishing Electrical work Plumbing work Tiling work Painting"
      );
    } else if (Solarpanelfitting.value == "") {
      message.warning("Please Specify Solar and Panel Fitting");
    } else if (Tree_plantation_Landscaping.value == "") {
      message.warning("Please specify tree plantation landscaping ");
    } else if (Labour_work_for_ancillary_activities.value == "") {
      message.warning("Please Specify Labout work for ancillary activities");
    } else if (aadharCard == null) {
      message.warning("Please upload your Aadhar Card");
      // } else if (educationCertificate == null) {
      //   message.warning("Please upload Education Certificate");
    } else if (panCard == null) {
      message.warning("Please upload Pan Card");
      // } else if (expCertificate == null) {
      //   message.warning("Please upload Experience Certificate");
    } else {
      setSendData(true);
      axios({
        method: "post",
        url: `${REACT_APP_BASE_URL}/applicant/ApplyPlantationAndBeautificationScheme`,
        data: plantationData,
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
            setTimeout(() => {
              window.location.replace("/user-dashboard");
            }, 1000);
          } else if (
            response.status == 200 &&
            response.data.status == "error"
          ) {
            Modal.error({ title: response.data.message });
          }
          setTimeout(() => {
            window.location.replace("/user-dashboard");
          }, 1000);
        })
        .catch((error) => {
          setSendData(false);
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
        <h3>Plantation, Beatification & Landscaping Works</h3>
        <form ref={formData}>
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
              <FormItem label="Brickwork and Plastering" required>
                <Radio.Group name="Brickwork_and_Plastering">
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <FormItem label="Solar Panel fitting" required>
                <Radio.Group name="Solarpanelfitting">
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="Tree plantation Landscaping" required>
                <Radio.Group name="Tree_plantation_Landscaping">
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
              <FormItem label="Aadhar Card" required>
                <input
                  type="file"
                  onChange={handleAadharCard}
                  accept="image/jpeg, .pdf"
                />
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="Education Certificate">
                <input
                  type="file"
                  onChange={handleEduCertificate}
                  accept="image/jpeg, .pdf"
                />
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="Pan Card" required>
                <input
                  type="file"
                  onChange={handlePanCard}
                  accept="image/jpeg, .pdf"
                />
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="Experience Certificate">
                <input
                  type="file"
                  onChange={handleExpCertificate}
                  accept="image/jpeg, .pdf"
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
export default Plantation;
