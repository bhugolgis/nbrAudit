import React, { useEffect, useState, useRef } from "react";
import { Form, Button, Radio, Row, Col, message, Spin, Select } from "antd";
import axios from "axios";
import styled from "styled-components";
import { InputFields } from "./personalinfo";
import { LoadContainer, FormItem, Completed, Incomplete } from "./style";
import data from "../../../../../../../data/dtdata.json";
import { Token } from "../../../../../../../libs/utils/sessionStorage";
import { REACT_APP_BASE_URL } from "../../../../../../../libs/utils/urls";

const { Option } = Select;
const OtherDetails = (props) => {
  const [district1, setDistrict1] = useState("");
  const handleDistrict1 = (e) => {
    setDistrict1(e.target.value);
  };
  const [district2, setDistrict2] = useState("");
  const handleDistrict2 = (e) => {
    setDistrict2(e.target.value);
  };
  const [district3, setDistrict3] = useState("");
  const handleDistrict3 = (e) => {
    setDistrict3(e.target.value);
  };

  const [WereToStay, setWereToStay] = useState("");

  const [motherOccupation, setMotherOccupation] = useState();
  const [fatherOccupation, setFatherOccupation] = useState();

  const formData = useRef();
  const [iserror, setIserror] = useState(false);

  const [incomePageLoading, setIncomePageLoading] = useState(true);
  const [infoLoading, setInfoLoading] = useState(false);
  const [readyToRelocate, setReadyToRelocate] = useState();
  const [otherInfoDetails, setOtherInfoDetails] = useState();
  const [fatherAlive, setFatherAlive] = useState();
  const [motherAlive, setMotherAlive] = useState();
  useEffect(() => {
    const userResponseFunc = async () => {
      const response = await axios({
        method: "get",
        url: `${REACT_APP_BASE_URL}/applicant/ApplicantDetailView`,
        headers: { Authorization: `token ${Token}` },
      });
      setOtherInfoDetails(response.data.CustomUserOtherInfo[0]);
      setDistrict1(response.data.CustomUserOtherInfo[0].district1);
      setDistrict2(response.data.CustomUserOtherInfo[0].district2);
      setDistrict3(response.data.CustomUserOtherInfo[0].district3);
      setWereToStay(response.data.CustomUserOtherInfo[0].WereToStay);
      setFatherAlive(response.data.CustomUserOtherInfo[0].isFatherAlive);
      setFatherOccupation(
        response.data.CustomUserOtherInfo[0].fatherOccupation
      );
      setMotherAlive(response.data.CustomUserOtherInfo[0].isMotherAlive);
      setMotherOccupation(
        response.data.CustomUserOtherInfo[0].motherOccupation
      );
      setIncomePageLoading(false);
      setReadyToRelocate(
        response.data.CustomUserOtherInfo[0].readyToRelocateInMaharashtra
      );
    };
    userResponseFunc();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // const { fatherName, motherName, WereToStay } = formData.current;
    const { fatherName, motherName } = formData.current;

    // if (fatherName.value == "") {
    //   message.warning("Please enter your father Name");
    // } else if (fatherAlive == null) {
    //   message.warning("Please select if your father is Alive");
    // } else if (fatherAlive == true) {
    //   if (fatherOccupation == "" || fatherOccupation == null) {
    //     message.warning("Father Occupation is empty");
    //   } else if (motherName.value == "") {
    //     message.warning("Mother name is empty");
    //   } else if (motherAlive == null) {
    //     message.warning("Please select if your mother is Alive");
    //   } else if (motherAlive == true) {
    //     if (motherOccupation == null || motherOccupation == "") {
    //       message.warning("Mother Occupation is empty");
    //     } else if (readyToRelocate == null) {
    //       message.warning("Please select if you are ready to relocate");
    //     } else if (readyToRelocate == true) {
    //       if (district1 == "" || district1 == null) {
    //         message.warning("Select first district as per preference");
    //       } else if (district2 == "" || district2 == null) {
    //         message.warning("Select second district as per preference");
    //       } else if (district3 == "" || district3 == null) {
    //         message.warning("Select third district as per preference");
    //       } else if (WereToStay.value == "") {
    //         message.warning("Select your preference of stay");
    //       } else if (WereToStay.value == "") {
    //         message.warning("Select your preference of stay");
    //       } else {
    //         const otherData = new FormData();
    //         otherData.append("fatherName", fatherName.value);
    //         otherData.append("isFatherAlive", fatherAlive);
    //         otherData.append("fatherOccupation", fatherOccupation);
    //         otherData.append("motherName", motherName.value);
    //         otherData.append("isMotherAlive", motherAlive);
    //         otherData.append("motherOccupation", motherOccupation);
    //         otherData.append("readyToRelocateInMaharashtra", readyToRelocate);
    //         otherData.append("district1", district1);
    //         otherData.append("district2", district2);
    //         otherData.append("district3", district3);
    //         otherData.append("WereToStay", WereToStay.value);
    //         otherData.append("isCompleted", true);
    //         axios({
    //           method: "patch",
    //           url: `${REACT_APP_BASE_URL}/applicant/UpdateOtherInfo`,
    //           data: otherData,
    //           headers: {
    //             "Content-Type": "multipart/form-data",
    //             Authorization: `token ${Token}`,
    //           },
    //         }).then((response) => {
    //           setInfoLoading(true);
    //           setTimeout(() => {
    //             setInfoLoading(false);
    //             message.success("Data Updated");
    //           }, 1000);
    //           setTimeout(() => {
    //             window.location.replace("/user-dashboard");
    //           }, 1500);
    //         });
    //       }
    //     } else if (readyToRelocate == false) {
    //       if (WereToStay.value == "") {
    //         message.warning("Select your preference of stay");
    //       } else {
    //         const otherData = new FormData();
    //         otherData.append("fatherName", fatherName.value);
    //         otherData.append("isFatherAlive", fatherAlive);
    //         otherData.append("fatherOccupation", fatherOccupation);
    //         otherData.append("motherName", motherName.value);
    //         otherData.append("isMotherAlive", motherAlive);
    //         otherData.append("motherOccupation", motherOccupation);
    //         otherData.append("readyToRelocateInMaharashtra", readyToRelocate);
    //         otherData.append("WereToStay", WereToStay.value);
    //         otherData.append("isCompleted", true);
    //         axios({
    //           method: "patch",
    //           url: `${REACT_APP_BASE_URL}/applicant/UpdateOtherInfo`,
    //           data: otherData,
    //           headers: {
    //             "Content-Type": "multipart/form-data",
    //             Authorization: `token ${Token}`,
    //           },
    //         }).then((response) => {
    //           setInfoLoading(true);
    //           setTimeout(() => {
    //             setInfoLoading(false);
    //             message.success("Data Updated");
    //           }, 1000);
    //           setTimeout(() => {
    //             window.location.replace("/user-dashboard");
    //           }, 1500);
    //         });
    //       }
    //     }
    //   } else if (motherAlive == false) {
    //     if (readyToRelocate == null) {
    //       message.warning("Please select if you are ready to relocate");
    //     } else if (readyToRelocate == true) {
    //       if (district1 == "" || district1 == null) {
    //         message.warning("Select first district as per preference");
    //       } else if (district2 == "" || district2 == null) {
    //         message.warning("Select second district as per preference");
    //       } else if (district3 == "" || district3 == null) {
    //         message.warning("Select third district as per preference");
    //       } else if (WereToStay.value == "") {
    //         message.warning("Select your preference of stay");
    //       } else if (WereToStay.value == "") {
    //         message.warning("Select your preference of stay");
    //       } else {
    //         const otherData = new FormData();
    //         otherData.append("fatherName", fatherName.value);
    //         otherData.append("isFatherAlive", fatherAlive);
    //         otherData.append("fatherOccupation", fatherOccupation);
    //         otherData.append("motherName", motherName.value);
    //         otherData.append("isMotherAlive", motherAlive);
    //         otherData.append("readyToRelocateInMaharashtra", readyToRelocate);
    //         otherData.append("district1", district1);
    //         otherData.append("district2", district2);
    //         otherData.append("district3", district3);
    //         otherData.append("WereToStay", WereToStay.value);
    //         otherData.append("isCompleted", true);
    //         axios({
    //           method: "patch",
    //           url: `${REACT_APP_BASE_URL}/applicant/UpdateOtherInfo`,
    //           data: otherData,
    //           headers: {
    //             "Content-Type": "multipart/form-data",
    //             Authorization: `token ${Token}`,
    //           },
    //         }).then((response) => {
    //           setInfoLoading(true);
    //           setTimeout(() => {
    //             setInfoLoading(false);
    //             message.success("Data Updated");
    //           }, 1000);
    //           setTimeout(() => {
    //             window.location.replace("/user-dashboard");
    //           }, 1500);
    //         });
    //       }
    //     } else if (readyToRelocate == false) {
    //       if (WereToStay.value == "") {
    //         message.warning("Select your preference of stay");
    //       } else {
    //         const otherData = new FormData();
    //         otherData.append("fatherName", fatherName.value);
    //         otherData.append("isFatherAlive", fatherAlive);
    //         otherData.append("fatherOccupation", fatherOccupation);
    //         otherData.append("motherName", motherName.value);
    //         otherData.append("isMotherAlive", motherAlive);
    //         otherData.append("readyToRelocateInMaharashtra", readyToRelocate);
    //         otherData.append("WereToStay", WereToStay.value);
    //         otherData.append("isCompleted", true);
    //         axios({
    //           method: "patch",
    //           url: `${REACT_APP_BASE_URL}/applicant/UpdateOtherInfo`,
    //           data: otherData,
    //           headers: {
    //             "Content-Type": "multipart/form-data",
    //             Authorization: `token ${Token}`,
    //           },
    //         }).then((response) => {
    //           setInfoLoading(true);
    //           setTimeout(() => {
    //             setInfoLoading(false);
    //             message.success("Data Updated");
    //           }, 1000);
    //           setTimeout(() => {
    //             window.location.replace("/user-dashboard");
    //           }, 1500);
    //         });
    //       }
    //     }
    //   }
    // } else if (fatherAlive == false) {
    //   if (motherName.value == "") {
    //     message.warning("Mother name is empty");
    //   } else if (motherAlive == null) {
    //     message.warning("Please select if your mother is Alive");
    //   } else if (motherAlive == true) {
    //     if (motherOccupation == null || motherOccupation == "") {
    //       message.warning("Mother Occupation is empty");
    //     } else if (readyToRelocate == null) {
    //       message.warning("Please select if you are ready to relocate");
    //     } else if (readyToRelocate == true) {
    //       if (district1 == "" || district1 == null) {
    //         message.warning("Select first district as per preference");
    //       } else if (district2 == "" || district2 == null) {
    //         message.warning("Select second district as per preference");
    //       } else if (district3 == "" || district3 == null) {
    //         message.warning("Select third district as per preference");
    //       } else if (WereToStay.value == "") {
    //         message.warning("Select your preference of stay");
    //       } else {
    //         const otherData = new FormData();
    //         otherData.append("fatherName", fatherName.value);
    //         otherData.append("isFatherAlive", fatherAlive);
    //         otherData.append("motherName", motherName.value);
    //         otherData.append("isMotherAlive", motherAlive);
    //         otherData.append("readyToRelocateInMaharashtra", readyToRelocate);
    //         otherData.append("district1", district1);
    //         otherData.append("district2", district2);
    //         otherData.append("district3", district3);
    //         otherData.append("WereToStay", WereToStay.value);
    //         otherData.append("isCompleted", true);
    //         axios({
    //           method: "patch",
    //           url: `${REACT_APP_BASE_URL}/applicant/UpdateOtherInfo`,
    //           data: otherData,
    //           headers: {
    //             "Content-Type": "multipart/form-data",
    //             Authorization: `token ${Token}`,
    //           },
    //         }).then((response) => {
    //           setInfoLoading(true);
    //           setTimeout(() => {
    //             setInfoLoading(false);
    //             message.success("Data Updated");
    //           }, 1000);
    //           setTimeout(() => {
    //             window.location.replace("/user-dashboard");
    //           }, 1500);
    //         });
    //       }
    //     } else if (readyToRelocate == false) {
    //       if (WereToStay.value == "") {
    //         message.warning("Select your preference of stay");
    //       } else {
    //         const otherData = new FormData();
    //         otherData.append("fatherName", fatherName.value);
    //         otherData.append("isFatherAlive", fatherAlive);
    //         otherData.append("motherName", motherName.value);
    //         otherData.append("isMotherAlive", motherAlive);
    //         otherData.append("motherOccupation", motherOccupation);
    //         otherData.append("readyToRelocateInMaharashtra", readyToRelocate);
    //         otherData.append("WereToStay", WereToStay.value);
    //         otherData.append("isCompleted", true);
    //         axios({
    //           method: "patch",
    //           url: `${REACT_APP_BASE_URL}/applicant/UpdateOtherInfo`,
    //           data: otherData,
    //           headers: {
    //             "Content-Type": "multipart/form-data",
    //             Authorization: `token ${Token}`,
    //           },
    //         }).then((response) => {
    //           setInfoLoading(true);
    //           setTimeout(() => {
    //             setInfoLoading(false);
    //             message.success("Data Updated");
    //           }, 1000);
    //           setTimeout(() => {
    //             window.location.replace("/user-dashboard");
    //           }, 1500);
    //         });
    //       }
    //     }
    //   } else if (motherAlive == false) {
    //     if (readyToRelocate == null) {
    //       message.warning("Please select if you are ready to relocate");
    //     } else if (readyToRelocate == true) {
    //       if (district1 == "" || district1 == null) {
    //         message.warning("Select first district as per preference");
    //       } else if (district2 == "" || district2 == null) {
    //         message.warning("Select second district as per preference");
    //       } else if (district3 == "" || district3 == null) {
    //         message.warning("Select third district as per preference");
    //       } else if (WereToStay.value == "") {
    //         message.warning("Select your preference of stay");
    //       } else if (WereToStay.value == "") {
    //         message.warning("Select your preference of stay");
    //       } else {
    //         const otherData = new FormData();
    //         otherData.append("fatherName", fatherName.value);
    //         otherData.append("isFatherAlive", fatherAlive);
    //         otherData.append("motherName", motherName.value);
    //         otherData.append("isMotherAlive", motherAlive);
    //         otherData.append("readyToRelocateInMaharashtra", readyToRelocate);
    //         otherData.append("district1", district1);
    //         otherData.append("district2", district2);
    //         otherData.append("district3", district3);
    //         otherData.append("WereToStay", WereToStay.value);
    //         otherData.append("isCompleted", true);
    //         axios({
    //           method: "patch",
    //           url: `${REACT_APP_BASE_URL}/applicant/UpdateOtherInfo`,
    //           data: otherData,
    //           headers: {
    //             "Content-Type": "multipart/form-data",
    //             Authorization: `token ${Token}`,
    //           },
    //         }).then((response) => {
    //           setInfoLoading(true);
    //           setTimeout(() => {
    //             setInfoLoading(false);
    //             message.success("Data Updated");
    //           }, 1000);
    //           setTimeout(() => {
    //             window.location.replace("/user-dashboard");
    //           }, 1500);
    //         });
    //       }
    //     } else if (readyToRelocate == false) {
    //       if (WereToStay.value == "") {
    //         message.warning("Select your preference of stay");
    //       } else {
    //         const otherData = new FormData();
    //         otherData.append("fatherName", fatherName.value);
    //         otherData.append("isFatherAlive", fatherAlive);
    //         otherData.append("motherName", motherName.value);
    //         otherData.append("isMotherAlive", motherAlive);
    //         otherData.append("readyToRelocateInMaharashtra", readyToRelocate);
    //         otherData.append("WereToStay", WereToStay.value);
    //         otherData.append("isCompleted", true);
    //         axios({
    //           method: "patch",
    //           url: `${REACT_APP_BASE_URL}/applicant/UpdateOtherInfo`,
    //           data: otherData,
    //           headers: {
    //             "Content-Type": "multipart/form-data",
    //             Authorization: `token ${Token}`,
    //           },
    //         }).then((response) => {
    //           setInfoLoading(true);
    //           setTimeout(() => {
    //             setInfoLoading(false);
    //             message.success("Data Updated");
    //           }, 1000);
    //           setTimeout(() => {
    //             window.location.replace("/user-dashboard");
    //           }, 1500);
    //         });
    //       }
    //     }
    //   }
    // }

    if (fatherName.value == "") {
      setIserror(true);
      message.warning("Please enter your father Name");
    } else if (fatherAlive == null) {
      setIserror(true);
      message.warning("Please select if your father is Alive");
    } else if (fatherAlive == true) {
      if (fatherOccupation == "" || fatherOccupation == null) {
        setIserror(true);
        message.warning("Father Occupation is empty");
      }
    } else if (motherName.value == "") {
      setIserror(true);
      message.warning("Please enter your mother Name");
    } else if (motherAlive == null) {
      setIserror(true);
      message.warning("Please select if your mother is Alive");
    } else if (motherAlive == true) {
      if (motherOccupation == "" || motherOccupation == null) {
        setIserror(true);
        message.warning("Mother Occupation is empty");
      }
    } else if (readyToRelocate == true) {
      if (district1 == "" || district1 == null) {
        setIserror(true);
        message.warning("Select first district as per preference");
      } else if (district2 == "" || district2 == null) {
        setIserror(true);
        message.warning("Select second district as per preference");
      } else if (district3 == "" || district3 == null) {
        setIserror(true);
        message.warning("Select third district as per preference");
      } else if (WereToStay == "") {
        setIserror(true);
        message.warning("Select your preference of stay");
      }
    }

    if (!iserror) {
      const otherData = new FormData();
      otherData.append("fatherName", fatherName.value);
      otherData.append("isFatherAlive", fatherAlive);
      otherData.append("fatherOccupation", fatherOccupation);
      otherData.append("motherName", motherName.value);
      otherData.append("isMotherAlive", motherAlive);
      otherData.append("motherOccupation", motherOccupation);
      otherData.append("readyToRelocateInMaharashtra", readyToRelocate);
      otherData.append("district1", district1);
      otherData.append("district2", district2);
      otherData.append("district3", district3);
      otherData.append("WereToStay", WereToStay);
      otherData.append("isCompleted", true);
      axios({
        method: "patch",
        url: `${REACT_APP_BASE_URL}/applicant/UpdateOtherInfo`,
        data: otherData,
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
          window.location.replace("/user-dashboard");
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
          {/* {otherInfoDetails.isCompleted == true ? (
            <Completed>Completed</Completed>
          ) : (
            <Incomplete>Incomplete</Incomplete>
          )} */}
          <form ref={formData}>
            <Row>
              <Col span={8}>
                <FormItem label="Name of Father">
                  <InputFields
                    placeholder="Name of Father"
                    name="fatherName"
                    defaultValue={otherInfoDetails.fatherName}
                  />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="Is Father Alive ?">
                  <Radio.Group
                    name="isFatherAlive"
                    value={fatherAlive}
                    onChange={(e) => {
                      setFatherAlive(e.target.value);
                    }}
                    // defaultValue={otherInfoDetails.isFatherAlive}
                  >
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>
                </FormItem>
              </Col>
              <Col span={8}>
                {/* <FormItem label="Is Father Salaried ?">
                  <Radio.Group
                    name="isFatherSalaried"
                    defaultValue={otherInfoDetails.isFatherSalaried}
                    disabled={fatherAlive == true ? false : true}
                  >
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>
                </FormItem> */}
                <FormItem label="Occupation of Father">
                  <Select
                    showSearch
                    placeholder="Select Father Occupation"
                    optionFilterProp="children"
                    disabled={fatherAlive == true ? false : true}
                    onChange={(v) => {
                      setFatherOccupation(v);
                    }}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    style={{ width: "250px" }}
                    name="fatherOccupation"
                    value={fatherOccupation}
                    defaultValue={otherInfoDetails.fatherOccupation}
                    options={[
                      {
                        value: "Farmer",
                        label: "Farmer",
                      },
                      {
                        value: "Business",
                        label: "Business",
                      },
                      {
                        value: "Self-Employed",
                        label: "Self-Employed",
                      },
                      {
                        value: "Government Employee",
                        label: "Government Employee",
                      },
                      {
                        value: "Private Employee",
                        label: "Private Employee",
                      },
                      {
                        value: "Homemaker",
                        label: "Homemaker",
                      },
                      {
                        value: "Unemployed",
                        label: "Unemployed",
                      },
                      {
                        value: "Unable to work",
                        label: "Unable to work",
                      },
                      {
                        value: "Retired",
                        label: "Retired",
                      },
                      {
                        value: "Others",
                        label: "Others",
                      },
                    ]}
                  />
                  {/* <InputFields
                    placeholder="Occupation of Father"
                    name="fatherOccupation"
                    defaultValue={otherInfoDetails.fatherOccupation}
                    disabled={fatherAlive == true ? false : true}
                  /> */}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <FormItem label="Name of Mother">
                  <InputFields
                    placeholder="Name of Mother"
                    name="motherName"
                    defaultValue={otherInfoDetails.motherName}
                  />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="Is Mother Alive ?">
                  <Radio.Group
                    name="isMotherAlive"
                    value={motherAlive}
                    onChange={(e) => {
                      setMotherAlive(e.target.value);
                    }}
                    defaultValue={otherInfoDetails.isMotherAlive}
                  >
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="Occupation of Mother">
                  <Select
                    showSearch
                    placeholder="Select Mother Occupation"
                    optionFilterProp="children"
                    disabled={motherAlive == true ? false : true}
                    onChange={(v) => {
                      setMotherOccupation(v);
                    }}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    style={{ width: "250px" }}
                    name="motherOccupation"
                    value={motherOccupation}
                    defaultValue={otherInfoDetails.motherOccupation}
                    options={[
                      {
                        value: "Business",
                        label: "Business",
                      },
                      {
                        value: "Self-Employed",
                        label: "Self-Employed",
                      },
                      {
                        value: "Government Employee",
                        label: "Government Employee",
                      },
                      {
                        value: "Private Employee",
                        label: "Private Employee",
                      },
                      {
                        value: "Homemaker",
                        label: "Homemaker",
                      },
                      {
                        value: "Unemployed",
                        label: "Unemployed",
                      },
                      {
                        value: "Unable to work",
                        label: "Unable to work",
                      },
                      {
                        value: "Retired",
                        label: "Retired",
                      },
                      {
                        value: "Others",
                        label: "Others",
                      },
                    ]}
                  />
                </FormItem>
              </Col>
            </Row>
            {readyToRelocate == true ? (
              <Row>
                <Col span={8}>
                  <Form.Item
                    label="Preference District 1"
                    rules={[
                      {
                        required: true,
                        message: "Please input your District!",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      placeholder="Select a district"
                      onChange={(v, k) => {
                        setDistrict1(v);
                      }}
                      style={{ width: "250px" }}
                      name="district1"
                      defaultValue={otherInfoDetails.district1}
                    >
                      {data.map((dis, index) => {
                        return (
                          <Option
                            value={dis.district_name}
                            onChange={handleDistrict1}
                            name="district1"
                          >
                            {dis.district_name}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Preference District 2"
                    rules={[
                      {
                        required: true,
                        message: "Please input your District!",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      placeholder="Select a district"
                      onChange={(v, k) => {
                        setDistrict2(v);
                      }}
                      style={{ width: "250px" }}
                      name="district2"
                      defaultValue={otherInfoDetails.district2}
                    >
                      {data.map((dis, index) => {
                        return (
                          <Option
                            value={dis.district_name}
                            onChange={handleDistrict2}
                            name="district2"
                          >
                            {dis.district_name}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Preference District 3"
                    rules={[
                      {
                        required: true,
                        message: "Please input your District!",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      placeholder="Select a district"
                      onChange={(v, k) => {
                        setDistrict3(v);
                      }}
                      style={{ width: "250px" }}
                      name="district3"
                      defaultValue={otherInfoDetails.district3}
                    >
                      {data.map((dis, index) => {
                        return (
                          <Option
                            value={dis.district_name}
                            onChange={handleDistrict3}
                            name="district3"
                          >
                            {dis.district_name}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            ) : (
              <></>
            )}
            <Row>
              <Col span={8}>
                {/* <FormItem label="Is Mother Salaried ?">
                  <Radio.Group
                    name="isMotherSalaried"
                    defaultValue={otherInfoDetails.isMotherSalaried}
                    disabled={motherAlive == true ? false : true}
                  >
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>
                </FormItem> */}
                <FormItem label="Ready To Relocate In Maharashtra ?">
                  <Radio.Group
                    name="readyToRelocateInMaharashtra"
                    defaultValue={otherInfoDetails.readyToRelocateInMaharashtra}
                    value={readyToRelocate}
                    onChange={(e) => {
                      setReadyToRelocate(e.target.value);
                    }}
                  >
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>
                </FormItem>
              </Col>
              {readyToRelocate == true ? (
                <Col span={8}>
                  <FormItem label="Where to Stay ?">
                    <Radio.Group
                      name="WereToStay"
                      defaultValue={otherInfoDetails.WereToStay}
                      value={WereToStay}
                      onChange={(e) => {
                        setWereToStay(e.target.value);
                      }}
                    >
                      <Radio value="City">City</Radio>
                      <Radio value="Rural">Rural</Radio>
                    </Radio.Group>
                  </FormItem>
                </Col>
              ) : (
                <></>
              )}

              <Col span={8}></Col>
            </Row>

            <Row>
              <Col span={8}></Col>
              {/* <Col span={8}>
                <FormItem label="Wheather Stay In Rural ?">
                  <Radio.Group
                    name="wheatherStayInRural"
                    defaultValue={otherInfoDetails.wheatherStayInRural}
                  >
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>
                </FormItem>
              </Col> */}
              {/* <Col span={8}></Col> */}
            </Row>
            <Button type="primary" onClick={handleSubmit}>
              Save and Proceed
            </Button>
          </form>
        </MainContainer>
      </Spin>
    );
  }
};
export default OtherDetails;
export const MainContainer = styled.div`
  margin: 25px 30px;
`;
