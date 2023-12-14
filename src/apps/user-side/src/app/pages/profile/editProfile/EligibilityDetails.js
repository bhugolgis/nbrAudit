import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Form,
  Input,
  Radio,
  Button,
  Row,
  Col,
  DatePicker,
  message,
  Spin,
  Select,
} from "antd";
import styled from "styled-components";
import axios from "axios";
import {
  LoadContainer,
  DatePick,
  InputFields,
  Completed,
  Incomplete,
} from "./style";
import moment from "moment";
import { Token } from "../../../../../../../libs/utils/sessionStorage";
import { REACT_APP_BASE_URL } from "../../../../../../../libs/utils/urls";
import { FormItem } from "./style";
import { saveAs } from "file-saver";
import ImageViewer from "react-simple-image-viewer";

const EligibilityDetails = () => {
  const [eligibilityPageLoading, setEligibilityPageLoading] = useState(true);
  const [infoLoading, setInfoLoading] = useState(false);
  const [eligibilityDetails, setEligibilityDetails] = useState();
  const [disabilityCertificate, setDisabilityCertificate] = useState();
  const [disableCheck, setDisableCheck] = useState();
  const [certificateCheck, setCertificateCheck] = useState();
  const [jobType, setJobType] = useState();
  const handleDisabilityCertificate = (e) => {
    setDisabilityCertificate(e.target.files[0]);
  };
  useEffect(() => {
    const userResponseFunc = async () => {
      const response = await axios({
        method: "get",
        url: `${REACT_APP_BASE_URL}/applicant/ApplicantDetailView`,
        headers: { Authorization: `token ${Token}` },
      });
      setEligibilityDetails(response.data.CustomUsereligibilityInfo[0]);
      setDisabilityCertificate(
        response.data.CustomUsereligibilityInfo[0].disabilityCertificate
      );
      setJobType(response.data.CustomUsereligibilityInfo[0].jobType);
      setDisableCheck(response.data.CustomUsereligibilityInfo[0].isDisability);

      setEligibilityPageLoading(false);
    };
    userResponseFunc();
  }, []);

  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const openImageViewer = useCallback(() => {
    setIsViewerOpen(true);
  }, []);
  const closeImageViewer = () => {
    setIsViewerOpen(false);
  };
  const formData = useRef();
  const onSubmit = (e) => {
    e.preventDefault();
    const {
      isSalaried,
      isDisability,
      disability,
      haveDisabilityCertificate,
      havePidNo,
      disabilityCertificateNumber,
      issueAuthority,
      issueDate,
    } = formData.current;

    const eligibilityData = new FormData();

    if (isSalaried.value == "") {
      message.warning("Please select the option if you are salaried or not");
    } else if (jobType == null) {
      message.warning("Job Type is Empty");
    } else if (isDisability.value == "") {
      message.warning("Select whether you are disabled or not");
    }
    if (disableCheck == true || certificateCheck == false) {
      if (disability.value == "") {
        message.warning("Disability is empty");
      } else if (haveDisabilityCertificate.value) {
        message.warning("Do you have disability certificate");
      }
    }
    if (disableCheck == true && certificateCheck == true) {
      if (disability.value == "") {
        message.warning("Disability is empty");
      } else if (haveDisabilityCertificate.value == "") {
        message.warning("Do you have disability certificate");
      } else if (havePidNo.value == "") {
        message.warning("Do you have Pid No");
      } else if (disabilityCertificateNumber.value == "") {
        message.warning("Disability Certificate Number is empty");
      } else if (issueAuthority.value == "") {
        message.warning("Issue Authority is empty");
      } else if (disabilityCertificate == null) {
        message.warning("Please upload Disability Certificate");
      } else if (issueDate.value == "") {
        message.warning("Date of Issue is empty");
      } else {
        eligibilityData.append("isSalaried", isSalaried.value);
        eligibilityData.append("jobType", jobType);
        eligibilityData.append("isDisability", disableCheck);
        eligibilityData.append("disability", disability.value);
        eligibilityData.append("isCompleted", true);
        eligibilityData.append("haveDisabilityCertificate", certificateCheck);
        eligibilityData.append("havePidNo", havePidNo.value);
        eligibilityData.append(
          "disabilityCertificateNumber",
          disabilityCertificateNumber.value
        );
        eligibilityData.append("issueAuthority", issueAuthority.value);
        eligibilityData.append("issueDate", issueDate.value);
        if (disabilityCertificate == null && disabilityCertificate == "") {
          eligibilityData.append(
            "disabilityCertificate",
            disabilityCertificate
          );
        }
        axios({
          method: "patch",
          url: `${REACT_APP_BASE_URL}/applicant/UpdateEligibilityInfo`,
          data: eligibilityData,
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
            window.location.replace("/qualification-information");
          }, 1500);
        });
      }
    }

    if (disableCheck == false) {
      eligibilityData.append("isSalaried", isSalaried.value);
      eligibilityData.append("jobType", jobType);
      eligibilityData.append("isDisability", disableCheck);
      eligibilityData.append("isCompleted", true);
      axios({
        method: "patch",
        url: `${REACT_APP_BASE_URL}/applicant/UpdateEligibilityInfo`,
        data: eligibilityData,
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
          window.location.replace("/qualification-information");
        }, 1500);
      });
    }

    if (disableCheck == true && certificateCheck == false) {
      if (disability.value == "") {
        message.warning("Disability is empty");
      } else if (haveDisabilityCertificate.value == "") {
        message.warning("Do you have disability certificate");
      } else if (havePidNo.value == "") {
        message.warning("Do you have Pid No");
      } else {
        eligibilityData.append("isSalaried", isSalaried.value);
        eligibilityData.append("jobType", jobType);
        eligibilityData.append("isDisability", disableCheck);
        eligibilityData.append("disability", disability.value);
        eligibilityData.append("isCompleted", true);
        eligibilityData.append("haveDisabilityCertificate", certificateCheck);
        eligibilityData.append("havePidNo", havePidNo.value);
        axios({
          method: "patch",
          url: `${REACT_APP_BASE_URL}/applicant/UpdateEligibilityInfo`,
          data: eligibilityData,
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
            window.location.replace("/qualification-information");
          }, 1500);
        });
      }
    }

    // } else {
    //   eligibilityData.append("isSalaried", isSalaried.value);
    //   eligibilityData.append("jobType", jobType.value);
    //   eligibilityData.append("isDisability", isDisability.value);
    //   eligibilityData.append("disability", disability.value);
    //   eligibilityData.append(
    //     "haveDisabilityCertificate",
    //     haveDisabilityCertificate.value
    //   );
    //   eligibilityData.append("havePidNo", havePidNo.value);
    //   eligibilityData.append(
    //     "disabilityCertificateNumber",
    //     disabilityCertificateNumber.value
    //   );
    //   eligibilityData.append("issueAuthority", issueAuthority.value);
    //   eligibilityData.append("issueDate", issueDate.value);
    //   eligibilityData.append("isCompleted", true);
    //   if (disabilityCertificate == null && disabilityCertificate == "") {
    //     eligibilityData.append("disabilityCertificate", disabilityCertificate);
    //   }
    //   axios({
    //     method: "patch",
    //     url: `${REACT_APP_BASE_URL}/applicant/UpdateEligibilityInfo`,
    //     data: eligibilityData,
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       Authorization: `token ${Token}`,
    //     },
    //   }).then((response) => {

    //     setInfoLoading(true);
    //     setTimeout(() => {
    //       setInfoLoading(false);
    //       message.success("Data Updated");
    //     }, 1000);
    //     setTimeout(() => {
    //       window.location.replace("/qualification-information");
    //     }, 1500);
    //   });
  };
  if (eligibilityPageLoading == true) {
    return (
      <LoadContainer>
        <Spin tip="Loading data" />
      </LoadContainer>
    );
  } else {
    return (
      <Spin spinning={infoLoading} tip="Saving Data">
        <Container>
          {isViewerOpen && (
            <ImageViewer
              src={[REACT_APP_BASE_URL + disabilityCertificate]}
              onClose={closeImageViewer}
              backgroundStyle={{
                backgroundColor: "rgba(0,0,0,0.9)",
              }}
            />
          )}
          {/* {eligibilityDetails.isCompleted == true ? (
            <Completed>Completed</Completed>
          ) : (
            <Incomplete>Incomplete </Incomplete>
          )} */}
          <form ref={formData}>
            <Row>
              <Col span={8}>
                <FormItem label="Are you Salaried ?" required>
                  <Radio.Group
                    name="isSalaried"
                    defaultValue={eligibilityDetails.isSalaried}
                  >
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  label="Job Type"
                  required={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    style={{
                      width: 250,
                    }}
                    placeholder="Please input your job type"
                    name="jobType"
                    value={jobType}
                    defaultValue={eligibilityDetails.jobType}
                    onChange={(v) => {
                      setJobType(v);
                    }}
                    options={[
                      {
                        value: "goverment",
                        label: "Goverment",
                      },
                      {
                        value: "private",
                        label: "Private",
                      },
                      {
                        value: "self-employed",
                        label: "Self-employed",
                      },
                      {
                        value: "unemployed",
                        label: "Unemployed",
                      },
                    ]}
                  />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="Are you Disabled ?" required>
                  <Radio.Group
                    name="isDisability"
                    value={disableCheck}
                    defaultValue={eligibilityDetails.isDisability}
                    onChange={(e) => {
                      setDisableCheck(e.target.value);
                    }}
                  >
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>
                </FormItem>
              </Col>
            </Row>
            {disableCheck && (
              <>
                <Row>
                  <Col span={8}>
                    <FormItem label="Disability" required>
                      <InputFields
                        placeholder="Specify your disability"
                        name="disability"
                        defaultValue={eligibilityDetails.disability}
                      />
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem
                      label="Do you have disability certificate ?"
                      required
                    >
                      <Radio.Group
                        value={certificateCheck}
                        onChange={(e) => {
                          setCertificateCheck(e.target.value);
                        }}
                        name="haveDisabilityCertificate"
                        defaultValue={
                          eligibilityDetails.haveDisabilityCertificate
                        }
                      >
                        <Radio value={true}>Yes</Radio>
                        <Radio value={false}>No</Radio>
                      </Radio.Group>
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem label="Do you have Pid No ?" required>
                      <Radio.Group
                        defaultValue={eligibilityDetails.havePidNo}
                        name="havePidNo"
                      >
                        <Radio value={true}>Yes</Radio>
                        <Radio value={false}>No</Radio>
                      </Radio.Group>
                    </FormItem>
                  </Col>
                </Row>
                {certificateCheck && (
                  <>
                    <Row>
                      <Col span={8}>
                        <FormItem
                          label="Disability Certificate Number"
                          required
                        >
                          <InputFields
                            placeholder="Enter your disability Certificate No."
                            name="disabilityCertificateNumber"
                            defaultValue={
                              eligibilityDetails.disabilityCertificateNumber
                            }
                          />
                        </FormItem>
                      </Col>
                      <Col span={8}>
                        <FormItem label="Issue Authority" required>
                          <InputFields
                            placeholder="Enter your issue Authority."
                            name="issueAuthority"
                            defaultValue={eligibilityDetails.issueAuthority}
                          />
                        </FormItem>
                      </Col>
                      <Col span={8}>
                        <FormItem label="Disability Certificate" required>
                          <input
                            type="file"
                            name="disabilityCertificateImage"
                            onChange={handleDisabilityCertificate}
                          />
                        </FormItem>
                        {eligibilityDetails.disabilityCertificate == null ? (
                          <></>
                        ) : (
                          <span
                            style={{ display: "flex", cursor: "pointer" }}
                            onClick={() => {
                              openImageViewer();
                            }}
                          >
                            <img
                              src={
                                REACT_APP_BASE_URL +
                                eligibilityDetails.disabilityCertificate
                              }
                              width="40px"
                              style={{ marginRight: "10px" }}
                            />
                            {eligibilityDetails.disabilityCertificate.slice(
                              eligibilityDetails.disabilityCertificate.lastIndexOf(
                                "/"
                              ) + 1
                            )}
                          </span>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        <FormItem label="Date of Issue" required>
                          <DatePick
                            name="issueDate"
                            defaultValue={
                              eligibilityDetails.issueDate == null
                                ? ""
                                : moment(eligibilityDetails.issueDate)
                            }
                          />
                        </FormItem>
                      </Col>
                      <Col span={8}></Col>
                      <Col span={8}></Col>
                    </Row>
                  </>
                )}
              </>
            )}

            <Button type="primary" onClick={onSubmit}>
              Save and Proceed
            </Button>
          </form>
        </Container>
      </Spin>
    );
  }
};
export default EligibilityDetails;
export const Container = styled.div`
  margin: 25px 30px;
`;
export const InputField = styled(Input)`
  width: 80%;
`;
