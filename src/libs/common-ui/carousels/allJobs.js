import React, { useState } from "react";
import styled from "styled-components";
import {
  Card,
  Button,
  Spin,
  message,
  Modal,
  Row,
  Tooltip,
  Form,
  Input,
} from "antd";
import axios from "axios";
import { ApplyButton, Cards, LoadContainer, SubTitle } from "./style";
import useHome from "../Home/container";
import { JobDescription, MonthTag, StatusTag, VacancyTag } from "../Home/style";
import { MdDateRange } from "react-icons/md";
import useCarousel from "./container";
import { Token, UserGroup } from "../../utils/sessionStorage";
import { REACT_APP_BASE_URL } from "../../utils/urls";
import { BsShareFill } from "react-icons/bs";
import Carousel from "better-react-carousel";

const { confirm } = Modal;

const AllJobs = () => {
  const { jobList, jobLoading, numOfJobs } = useHome();
  const [base64String, setBase64String] = useState("");

  const { userList } = useCarousel();
  const jobfileList = [];

  if (jobLoading == true) {
    return (
      <LoadContainer>
        <Spin tip="Loading data" />
      </LoadContainer>
    );
  } else if (jobList.results.length == 0) {
    return <h3>No Jobs available</h3>;
  } else {
    return (
      <Carousel cols={4} rows={1} gap={10} loop>
        {jobList.results.map((jobData) => {
          return (
            <Carousel.Item>
              <Cards>
                <span
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3 style={{ height: "50px" }}>{jobData.JobName}</h3>
                  <Tooltip title="Share">
                    <BsShareFill
                      style={{ marginTop: "8px", cursor: "pointer" }}
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        message.success("Link copied to Clipboard");
                      }}
                    />
                  </Tooltip>
                </span>
                <span
                  style={{
                    fontWeight: "400",
                    color: "#808080",
                  }}
                >
                  <p style={{ margin: "0px" }}>
                    <MdDateRange style={{ margin: "0px 10px -2px 0px" }} />
                    Start Date:
                    {new Date(jobData.ApplicationStartDate).toLocaleString(
                      "gu-IN",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }
                    )}
                  </p>
                  <p>
                    <MdDateRange style={{ margin: "4px 10px -2px 0px" }} />
                    End Date:
                    {new Date(jobData.ApplicationEndDate).toLocaleString(
                      "gu-IN",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }
                    )}
                  </p>
                </span>
                <JobDescription>{jobData.JobDescription}</JobDescription>
                <VacancyTag>{jobData.TotalVacancy} Vacancy</VacancyTag>
                <MonthTag>{jobData.Duration} </MonthTag>
                <Row style={{ marginBottom: "10px" }}>
                  <a
                    onClick={() => {
                      Modal.info({
                        title: jobData.JobName,
                        content: (
                          <div>
                            <span
                              style={{
                                fontWeight: "400",
                                color: " #808080",
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <p style={{ margin: "0px" }}>
                                <MdDateRange
                                  style={{ margin: "0px 10px -2px 0px" }}
                                />
                                Application Start Date:
                                {new Date(
                                  jobData.ApplicationStartDate
                                ).toLocaleString("gu-IN", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                })}
                              </p>
                              <p>
                                <MdDateRange
                                  style={{ margin: "0px 10px -2px 0px" }}
                                />
                                ApplicationEnd Date:
                                {new Date(
                                  jobData.ApplicationStartDate
                                ).toLocaleString("gu-IN", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                })}
                              </p>
                            </span>
                            <span>
                              <p style={{ textAlign: "justify" }}>
                                {jobData.JobDescription}
                              </p>
                            </span>
                            <p>
                              <b>Minimum Qualification requried</b>
                              <br />
                              {jobData.MinimumQualificationRequired}
                            </p>
                            <span
                              style={{
                                fontWeight: "400",
                                color: " #808080",
                              }}
                            >
                              <p style={{ margin: "0px" }}>
                                <MdDateRange
                                  style={{
                                    margin: "0px 10px -2px 0px",
                                  }}
                                />
                                Job Start Date:
                                {new Date(jobData.JobStartDate).toLocaleString(
                                  "gu-IN",
                                  {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                  }
                                )}
                              </p>
                              <p>
                                <MdDateRange
                                  style={{
                                    margin: "4px 10px -2px 0px",
                                  }}
                                />
                                Job End Date:
                                {new Date(jobData.JobEndDate).toLocaleString(
                                  "gu-IN",
                                  {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                  }
                                )}
                              </p>
                            </span>
                            <VacancyTag>
                              {jobData.TotalVacancy} Vacancy
                            </VacancyTag>
                            <MonthTag>{jobData.Duration} </MonthTag>
                            <StatusTag>Location - {jobData.location}</StatusTag>
                          </div>
                        ),
                      });
                    }}
                  >
                    Know more...
                  </a>
                </Row>
                {/* <StatusTag>{jobData.JobStatus}</StatusTag> */}

                <ApplyButton
                  onClick={() => {
                    if (jobData.JobApplicationForm.length == 0) {
                      if (Token == null && UserGroup != "beneficiary") {
                        Modal.warning({
                          title: "Please login as beneficiary to continue",
                          onOk() {
                            window.location.replace("/login");
                          },
                        });
                      } else if (
                        userList.UserPersonalInfo[0].isCompleted != true
                      ) {
                        Modal.warning({
                          title: "Please Complete your Personal Information",
                          onOk() {
                            window.location.replace("/personal-information");
                          },
                        });
                      } else if (
                        userList.CustomUserIncomeAndDomicileInfo[0]
                          .isCompleted != true
                      ) {
                        Modal.warning({
                          title: "Please Complete your Income Information",
                          onOk() {
                            window.location.replace(
                              "/income-and-domicile-information"
                            );
                          },
                        });
                      } else if (
                        userList.CustomUsereligibilityInfo[0].isCompleted !=
                        true
                      ) {
                        Modal.warning({
                          title: "Please Complete your Eligibility Information",
                          onOk() {
                            window.location.replace("/eligibility-information");
                          },
                        });
                      } else if (
                        userList.CustomUserQualificationInfo[0].isCompleted !=
                        true
                      ) {
                        Modal.warning({
                          title:
                            "Please Complete your Qualification Information",
                          onOk() {
                            window.location.replace(
                              "/qualification-information"
                            );
                          },
                        });
                      } else if (
                        userList.CustomUserResidentialInfo[0].isCompleted !=
                        true
                      ) {
                        Modal.warning({
                          title: "Please Complete your Residential Information",
                          onOk() {
                            window.location.replace("/residential-information");
                          },
                        });
                      } else if (
                        userList.CustomUserBankInfo[0].isCompleted != true
                      ) {
                        Modal.warning({
                          title: "Please Complete your Bank Information",
                          onOk() {
                            window.location.replace("/bank-information");
                          },
                        });
                      } else if (
                        userList.CustomUserOtherInfo[0].isCompleted != true
                      ) {
                        Modal.warning({
                          title: "Please Complete Other Information",
                          onOk() {
                            window.location.replace("/other-information");
                          },
                        });
                      } else {
                        axios({
                          method: "post",
                          url: `${REACT_APP_BASE_URL}/applicant/ApplyToJob`,
                          data: {
                            vertical: jobData.vertical,
                            job: jobData.id,
                            formFields: {},
                          },
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `token ${Token}`,
                          },
                        }).then((response) => {
                          Modal.success({
                            title:
                              response.data.message +
                              " Please check your Dashboard for Status.",
                          });
                        });
                      }
                    } else {
                      if (Token == null && UserGroup != "beneficiary") {
                        Modal.warning({
                          title: "Please login as beneficiary to continue",
                          onOk() {
                            window.location.replace("/login");
                          },
                        });
                      } else if (
                        userList.UserPersonalInfo[0].isCompleted != true
                      ) {
                        Modal.warning({
                          title: "Please Complete your Personal Information",
                          onOk() {
                            window.location.replace("/personal-information");
                          },
                        });
                      } else if (
                        userList.CustomUserIncomeAndDomicileInfo[0]
                          .isCompleted != true
                      ) {
                        Modal.warning({
                          title: "Please Complete your Income Information",
                          onOk() {
                            window.location.replace(
                              "/income-and-domicile-information"
                            );
                          },
                        });
                      } else if (
                        userList.CustomUsereligibilityInfo[0].isCompleted !=
                        true
                      ) {
                        Modal.warning({
                          title: "Please Complete your Eligibility Information",
                          onOk() {
                            window.location.replace("/eligibility-information");
                          },
                        });
                      } else if (
                        userList.CustomUserQualificationInfo[0].isCompleted !=
                        true
                      ) {
                        Modal.warning({
                          title:
                            "Please Complete your Qualification Information",
                          onOk() {
                            window.location.replace(
                              "/qualification-information"
                            );
                          },
                        });
                      } else if (
                        userList.CustomUserResidentialInfo[0].isCompleted !=
                        true
                      ) {
                        Modal.warning({
                          title: "Please Complete your Residential Information",
                          onOk() {
                            window.location.replace("/residential-information");
                          },
                        });
                      } else if (
                        userList.CustomUserBankInfo[0].isCompleted != true
                      ) {
                        Modal.warning({
                          title: "Please Complete your Bank Information",
                          onOk() {
                            window.location.replace("/bank-information");
                          },
                        });
                      } else if (
                        userList.CustomUserOtherInfo[0].isCompleted != true
                      ) {
                        Modal.warning({
                          title: "Please Complete Other Information",
                          onOk() {
                            window.location.replace("/other-information");
                          },
                        });
                      } else {
                        const showConfirm = () => {
                          confirm({
                            title: "Job Form",
                            okText: "Submit",
                            cancelText: "Cancel",
                            onOk() {
                              if (
                                jobfileList.length ==
                                jobData.JobApplicationForm.length
                              ) {
                                axios({
                                  method: "post",
                                  url: `${REACT_APP_BASE_URL}/applicant/ApplyToJob`,
                                  data: {
                                    vertical: jobData.vertical,
                                    job: jobData.id,
                                    formFields: jobfileList,
                                  },
                                  headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `token ${Token}`,
                                  },
                                }).then((response) => {
                                  message.success(response.data.message);
                                });
                              } else {
                                message.warning(
                                  "Please upload all the documents"
                                );
                              }
                            },
                            content: (
                              <>
                                <b>Please upload only images.</b>
                                {jobData.JobApplicationForm.map((data) => {
                                  return (
                                    <Form>
                                      <Form.Item
                                        label={data.fieldName}
                                        required
                                        style={{ margin: "10px 0px" }}
                                      >
                                        <Input
                                          type="file"
                                          required
                                          name={data.fieldName}
                                          onChange={(event) => {
                                            const file = event.target.files[0];
                                            const reader = new FileReader();
                                            reader.readAsDataURL(file);
                                            reader.onload = () => {
                                              setBase64String(reader.result);
                                              jobfileList.push({
                                                fieldName: data.fieldName,
                                                value: reader.result,
                                              });
                                            };
                                          }}
                                        />
                                        <br />
                                      </Form.Item>
                                    </Form>
                                  );
                                })}
                              </>
                            ),
                          });
                        };
                        showConfirm();
                      }
                    }
                  }}
                >
                  Apply
                </ApplyButton>
              </Cards>
            </Carousel.Item>
          );
        })}
      </Carousel>
    );
  }
};

export default AllJobs;
