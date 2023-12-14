import React, { useState } from "react";
import {
  Card,
  Spin,
  Collapse,
  Select,
  message,
  Tag,
  Row,
  Modal,
  Tooltip,
  Button,
  Form,
  Input,
} from "antd";
import {
  Accordian,
  LoadContainer,
  MainContainer,
  ApplyButton,
  JobModal,
  JobCard,
  JobDescription,
  VacancyTag,
  MonthTag,
  StatusTag,
} from "./style";
import useCommonJob from "./container";
import axios from "axios";
import { Token, UserGroup } from "../../utils/sessionStorage";
import { REACT_APP_BASE_URL } from "../../utils/urls";
import { MdDateRange } from "react-icons/md";
import { BsShareFill } from "react-icons/bs";
import { ExclamationCircleFilled } from "@ant-design/icons";
import imageToBase64 from "image-to-base64/browser";
import { useEffect } from "react";
import { Landscape } from "../../../media";
const { Panel } = Collapse;
const { Option } = Select;
const { confirm } = Modal;

const Jobs = () => {
  const {
    jobList,
    loading,
    open,
    verticalList,
    modalLoading,
    userList,
    handleOk,
    handleCancel,
    getJobList,
  } = useCommonJob();

  const [modal1Open, setModal1Open] = useState(false);

  const [jobFile, setjobFile] = useState();
  const jobfileList = [];

  const [base64String, setBase64String] = useState("");
  const handleFileInputChange = (event, fieldName) => {};
  // useEffect(() => {
  //   imageToBase64(Landscape) // Path to the image
  //     .then((response) => {
  //     })
  //     .catch((error) => {
  //     });
  // });
  if (loading == true) {
    return (
      <LoadContainer>
        <Spin tip="Loading data..." />
      </LoadContainer>
    );
  } else {
    return (
      <MainContainer>
        <span style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Latest Jobs to apply</h2>
          <Select
            showSearch
            style={{ width: "300px" }}
            placeholder="Select a Vertical"
            onChange={(value) => {
              getJobList(value);
            }}
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: null,
                label: "All",
              },
              {
                value: "1",
                label: "Renewable Energy & Electric Vehicles",
              },
              {
                value: "2",
                label: "Software Technology Park & Data center",
              },
              {
                value: "3",
                label: "Infrastructure Technology Projects",
              },
              {
                value: "4",
                label: "Agro Processing Value Chain and Bio Fuels",
              },
              {
                value: "5",
                label: "Affordable Housing",
              },
              {
                value: "6",
                label: "Environment and Climate Change",
              },
              {
                value: "7",
                label: "Energy Audit and Corrective systems",
              },
              {
                value: "8",
                label: "Emerging Technology Areas",
              },
              {
                value: "9",
                label: "Women Entrepreneurship & Business Development",
              },
              {
                value: "10",
                label: "Corporate Community Development",
              },
            ]}
          />
        </span>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {jobList.results.length == 0 ? (
            <h3>No jobs available</h3>
          ) : (
            <>
              {jobList.results.map((data, i) => {
                return (
                  <JobCard hoverable style={{ width: "260px" }}>
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h3 style={{ height: "50px" }}>{data.JobName}</h3>
                      <Tooltip title="Share">
                        <BsShareFill
                          style={{ marginTop: "8px" }}
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
                        color: " #808080",
                      }}
                    >
                      <p style={{ margin: "0px" }}>
                        <MdDateRange style={{ margin: "0px 10px -2px 0px" }} />
                        Start Date:
                        {new Date(data.ApplicationStartDate).toLocaleString(
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
                        {new Date(data.ApplicationEndDate).toLocaleString(
                          "gu-IN",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </span>
                    <JobDescription>{data.JobDescription}</JobDescription>

                    <VacancyTag color=" #d6f5d6">
                      {data.TotalVacancy} Vacancy
                    </VacancyTag>
                    <MonthTag color="#cce5ff">{data.Duration}</MonthTag>
                    <Row style={{ marginBottom: "10px" }}>
                      <a
                        onClick={() => {
                          Modal.info({
                            title: data.JobName,
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
                                      data.ApplicationStartDate
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
                                      data.ApplicationStartDate
                                    ).toLocaleString("gu-IN", {
                                      day: "2-digit",
                                      month: "2-digit",
                                      year: "numeric",
                                    })}
                                  </p>
                                </span>
                                <span>
                                  <p style={{ textAlign: "justify" }}>
                                    {data.JobDescription}
                                  </p>
                                </span>
                                <p>
                                  <b>Minimum Qualification requried</b>
                                  <br />
                                  {data.MinimumQualificationRequired}
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
                                    {new Date(data.JobStartDate).toLocaleString(
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
                                    {new Date(data.JobEndDate).toLocaleString(
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
                                  {data.TotalVacancy} Vacancy
                                </VacancyTag>
                                <MonthTag>{data.Duration} </MonthTag>
                                <StatusTag>
                                  Location - {data.location}
                                </StatusTag>
                              </div>
                            ),
                          });
                        }}
                      >
                        Know more...
                      </a>
                    </Row>
                    {/* <StatusTag color="#fff0b3">{data.JobStatus}</StatusTag> */}

                    <ApplyButton
                      onClick={() => {
                        if (data.JobApplicationForm.length == 0) {
                          if (UserGroup != "beneficiary") {
                            message.warning(
                              "Only Registered Beneficiaries are allowed to apply for a job"
                            );
                          } else if (
                            userList.UserPersonalInfo[0].isCompleted != true
                          ) {
                            message.warning(
                              "Please complete your personal Information"
                            );
                          } else if (
                            userList.CustomUserIncomeAndDomicileInfo[0]
                              .isCompleted != true
                          ) {
                            message.warning(
                              "Please complete Income and domicile information"
                            );
                          } else if (
                            userList.CustomUsereligibilityInfo[0].isCompleted !=
                            true
                          ) {
                            message.warning(
                              "Please complete Eligibility Information"
                            );
                          } else if (
                            userList.CustomUserQualificationInfo[0]
                              .isCompleted != true
                          ) {
                            message.warning(
                              "Please complete Qualification Information"
                            );
                          } else if (
                            userList.CustomUserResidentialInfo[0].isCompleted !=
                            true
                          ) {
                            message.warning(
                              "Please complete Residential Information"
                            );
                          } else if (
                            userList.CustomUserBankInfo[0].isCompleted != true
                          ) {
                            message.warning("Please complete Bank Information");
                          } else if (
                            userList.CustomUserOtherInfo[0].isCompleted != true
                          ) {
                            message.warning(
                              "Please complete Other Information"
                            );
                          } else {
                            axios({
                              method: "post",
                              url: `${REACT_APP_BASE_URL}/applicant/ApplyToJob`,
                              data: {
                                vertical: data.vertical,
                                job: data.id,
                                formFields: {},
                              },
                              headers: {
                                "Content-Type": "application/json",
                                Authorization: `token ${Token}`,
                              },
                            }).then((response) => {
                              message.success(response.data.message);
                            });
                          }
                        } else if (data.JobApplicationForm.length != 0) {
                          if (UserGroup != "beneficiary") {
                            message.warning(
                              "Only Registered Beneficiaries are allowed to apply for a job"
                            );
                          } else if (
                            userList.UserPersonalInfo[0].isCompleted != true
                          ) {
                            message.warning(
                              "Please complete your personal Information"
                            );
                          } else if (
                            userList.CustomUserIncomeAndDomicileInfo[0]
                              .isCompleted != true
                          ) {
                            message.warning(
                              "Please complete Income and domicile information"
                            );
                          } else if (
                            userList.CustomUsereligibilityInfo[0].isCompleted !=
                            true
                          ) {
                            message.warning(
                              "Please complete Eligibility Information"
                            );
                          } else if (
                            userList.CustomUserQualificationInfo[0]
                              .isCompleted != true
                          ) {
                            message.warning(
                              "Please complete Qualification Information"
                            );
                          } else if (
                            userList.CustomUserResidentialInfo[0].isCompleted !=
                            true
                          ) {
                            message.warning(
                              "Please complete Residential Information"
                            );
                          } else if (
                            userList.CustomUserBankInfo[0].isCompleted != true
                          ) {
                            message.warning("Please complete Bank Information");
                          } else if (
                            userList.CustomUserOtherInfo[0].isCompleted != true
                          ) {
                            message.warning(
                              "Please complete Other Information"
                            );
                          } else {
                            const showConfirm = () => {
                              confirm({
                                title: "Job Form",
                                okText: "Submit",
                                cancelText: "Cancel",
                                onOk() {
                                  if (
                                    jobfileList.length ==
                                    data.JobApplicationForm.length
                                  ) {
                                    axios({
                                      method: "post",
                                      url: `${REACT_APP_BASE_URL}/applicant/ApplyToJob`,
                                      data: {
                                        vertical: data.vertical,
                                        job: data.id,
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
                                    {data.JobApplicationForm.map((data) => {
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
                                                const file =
                                                  event.target.files[0];
                                                const reader = new FileReader();
                                                reader.readAsDataURL(file);
                                                reader.onload = () => {
                                                  setBase64String(
                                                    reader.result
                                                  );
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
                      Apply Now
                    </ApplyButton>
                  </JobCard>
                );
              })}
            </>
          )}
        </div>
        <Modal
          title="Vertically centered modal dialog"
          centered
          open={modal1Open}
          onOk={() => setModal1Open(false)}
          onCancel={() => setModal1Open(false)}
        ></Modal>
        <JobModal
          title="Apply to Job"
          visible={open}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {modalLoading == true ? (
            <Spin />
          ) : (
            <Select
              style={{
                width: "100%",
              }}
              placeholder="Select a vertical"
            >
              {verticalList.map((data) => {
                return (
                  <Option value={data.VerticalName}>{data.VerticalName}</Option>
                );
              })}
            </Select>
          )}
          <ApplyButton
            onClick={() => {
              //   axios.post({
              //     method: "post",
              //     url: "${REACT_APP_BASE_URL}/applicant/ApplyToJob",
              //     data: {
              //       vertical: verticalList.id,
              //       job: 0,
              //       formFields: {},
              //     },
              //   });
            }}
          >
            Apply for Job
          </ApplyButton>
        </JobModal>
      </MainContainer>
    );
  }
};
export default Jobs;
