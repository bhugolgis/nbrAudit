import React, { useState, useRef } from "react";
import useTraining from "./container";
import { FormItem, InputFields, MainContainer } from "./style";
import { Spin, Row, DatePicker, Button, Radio, message, Col } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { REACT_APP_BASE_URL } from "../../utils/urls";
import axios from "axios";
import { Token } from "../../utils/sessionStorage";

const TrainingForm = (props) => {
  const { formLoading, setFormLoading } = useTraining();
  const formData = useRef();
  const [incomeCertifcate, setIncomeCertificate] = useState();
  const [rationCard, setRationCard] = useState();
  const [leavingCertificate, setLeavingCertificate] = useState();
  const [residingValue, setResidingValue] = useState();

  const incomeCertificateChange = (event) => {
    setIncomeCertificate(event.target.files[0]);
  };
  const rationCardChange = (event) => {
    setRationCard(event.target.files[0]);
  };
  const leavingCertificateChange = (event) => {
    setLeavingCertificate(event.target.files[0]);
  };

  const handleChange = (e) => {
    setResidingValue(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      rationCardOrVoterIdCardNumber,
      nameOfWitness1,
      nameOfWitness2,
      technicalEducation,
      addressOfSchool,
      yearOfLeavingSchool,
      inWhichGradeLeftSchool,
      detailsOfApplicantsExperience,
      isEducationalInstituteResideInCity,
      distanceOfResidenceFromEducationalInstitute,
    } = formData.current;
    const trainingData = new FormData();
    trainingData.append(
      "rationCardOrVoterIdCardNumber",
      rationCardOrVoterIdCardNumber.value
    );
    trainingData.append("nameOfWitness1", nameOfWitness1.value);
    trainingData.append("nameOfWitness2", nameOfWitness2.value);
    trainingData.append("technicalEducation", technicalEducation.value);
    trainingData.append("addressOfSchool", addressOfSchool.value);
    trainingData.append("yearOfLeavingSchool", yearOfLeavingSchool.value);
    trainingData.append("inWhichGradeLeftSchool", inWhichGradeLeftSchool.value);
    trainingData.append(
      "detailsOfApplicantsExperience",
      detailsOfApplicantsExperience.value
    );
    trainingData.append(
      "isEducationalInstituteResideInCity",
      isEducationalInstituteResideInCity.value
    );

    trainingData.append(
      "distanceOfResidenceFromEducationalInstitute",
      distanceOfResidenceFromEducationalInstitute.value
    );
    trainingData.append("training", props.id);
    trainingData.append("incomeCertificate", incomeCertifcate);
    trainingData.append("rationCard", rationCard);
    trainingData.append(
      "schoolOrCollegeLeavingCertificate",
      leavingCertificate
    );
    trainingData.append("isEducationalInstituteResideInCity", residingValue);
    if (rationCardOrVoterIdCardNumber.value === "") {
      message.warning("Enter Voter/Ration ID Card Number");
    } else if (nameOfWitness1.value === "") {
      message.warning("Enter witness 1");
    } else if (nameOfWitness2.value === "") {
      message.warning("Enter Name of witness 2");
    } else if (technicalEducation.value === "") {
      message.warning("Enter the Technical Education");
    } else if (addressOfSchool.value === "") {
      message.warning("Enter Address of School");
    } else if (yearOfLeavingSchool.value === "") {
      message.warning("Enter Year of Leaving School");
    } else if (inWhichGradeLeftSchool.value === "") {
      message.warning("Enter grade in which school left");
    } else if (detailsOfApplicantsExperience.value === "") {
      message.warning("Enter Details of experience");
    } else if (isEducationalInstituteResideInCity.value === "") {
      message.warning("Select if education Institute is in City");
    } else if (distanceOfResidenceFromEducationalInstitute.value === "") {
      message.warning("Enter Distance of Residence from Institute");
    } else if (
      incomeCertifcate === null ||
      typeof incomeCertifcate != "object"
    ) {
      message.warning("Please Upload Income Certificate");
    } else if (rationCard === null || typeof rationCard != "object") {
      message.warning("Please Upload Ration Card/VoterId Card");
    } else if (
      leavingCertificate === null ||
      typeof leavingCertificate != "object"
    ) {
      message.warning("Please Upload Leaving Certificate");
    } else {
      setFormLoading(true);
      axios({
        method: "post",
        url: `${REACT_APP_BASE_URL}/training/addtrainingapplication/`,
        data: trainingData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `token ${Token}`,
        },
      })
        .then((response) => {
          setFormLoading(false);
          if (response.status === 200 && response.data.status === "success") {
            message.success(response.data.message);
            setTimeout(() => {
              window.location.replace("/user-training-application");
            }, 1000);
          } else if (
            response.status === 200 &&
            response.data.status === "error"
          ) {
            message.error(response.data.message);
          }
        })
        .catch((error) => {
          message.error(error.message);
        });
    }
  };

  return (
    <Spin tip="Submitting Form.." spinning={formLoading}>
      <MainContainer>
        <form ref={formData}>
          <Row
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Col span={8}>
              <FormItem label="Ration/VoterId Card Number" required>
                <InputFields
                  placeholder="Ration/VoterId Card Number"
                  name="rationCardOrVoterIdCardNumber"
                />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="Name of Witness 1" required>
                <InputFields
                  placeholder="Name of Witness"
                  name="nameOfWitness1"
                />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="Name of Witness 2" required>
                <InputFields
                  placeholder="Name of Witness"
                  name="nameOfWitness2"
                />
              </FormItem>
            </Col>
          </Row>
          <Row
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Col span={8}>
              <FormItem label="Technical Education" required>
                <InputFields
                  placeholder="Technical Education"
                  name="technicalEducation"
                />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="Address of School" required>
                <InputFields
                  placeholder="Address of School"
                  name="addressOfSchool"
                />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="Year of leaving school" required>
                <DatePicker
                  style={{ width: "220px" }}
                  name="yearOfLeavingSchool"
                  picker="year"
                />
              </FormItem>
            </Col>
          </Row>
          <Row
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Col span={8}>
              <FormItem label="School left in which Grade" required>
                <InputFields
                  placeholder="Grade in which school left"
                  name="inWhichGradeLeftSchool"
                />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="Details of experience" required>
                <TextArea
                  style={{ width: "220px" }}
                  name="detailsOfApplicantsExperience"
                />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="Educational Institute in City ?" required>
                <Radio.Group
                  name="isEducationalInstituteResideInCity"
                  onChange={handleChange}
                  value={residingValue}
                >
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </FormItem>
            </Col>
          </Row>
          <Row
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Col span={8}>
              <FormItem
                label="Distance of Residence from Institute(KM)"
                required
              >
                <InputFields
                  type="number"
                  placeholder="Distance"
                  name="distanceOfResidenceFromEducationalInstitute"
                />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="Income Certificate" required>
                <input type="file" onChange={incomeCertificateChange} />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="Ration Card" required>
                <input type="file" onChange={rationCardChange} />
              </FormItem>
            </Col>
          </Row>
          <Row
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Col span={8}>
              <FormItem label="School/College Leaving Certificate" required>
                <input type="file" onChange={leavingCertificateChange} />
              </FormItem>
            </Col>
          </Row>
          <Row
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <FormItem>
              <Button type="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </FormItem>
          </Row>
        </form>
      </MainContainer>
    </Spin>
  );
};
export default TrainingForm;
