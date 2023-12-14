import React, { useState } from "react";
import useTraining from "../training/container";
import { Card, Tag, Spin, Modal, Row, Tooltip, message } from "antd";
import { MonthTag, StatusTag, VacancyTag } from "../Home/style";
import { ApplyButton, FormModal } from "../training/style";
import TrainingForm from "../training/form";
import { LoadContainer } from "./style";
import useHome from "../Home/container";
import Slider from "react-slick";
import { Token, UserGroup } from "../../utils/sessionStorage";
import UserDashboard from "../../../apps/user-side";
import { MdDateRange } from "react-icons/md";
import { BsShareFill } from "react-icons/bs";
import Carousel from "better-react-carousel";

const AllTraining = () => {
  const { trainingList, trainingLoading, userList, numOfTraining } = useHome();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [trainingId, setTrainingId] = useState();
  const showTrainingFormModal = (id) => {
    setOpen(true);
    setTrainingId(id);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  if (trainingLoading == true) {
    return (
      <LoadContainer>
        <Spin tip="Loading data..." />
      </LoadContainer>
    );
  } else if (trainingList.results.length == 0) {
    return <h3>No training available</h3>;
  } else {
    return (
      <Carousel cols={4} rows={1} gap={10} loop>
        {trainingList.results.map((data, i) => {
          return (
            <Carousel.Item>
              <Card
                style={{
                  width: "260px",
                  margin: "0px 20px 20px 0px",
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                }}
              >
                <span
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3 style={{ height: "50px" }}>{data.trainingName}</h3>
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
                    color: " #808080",
                  }}
                >
                  <p style={{ margin: "0px" }}>
                    <MdDateRange style={{ margin: "0px 10px -2px 0px" }} />
                    Start Date:
                    {new Date(data.applicationStartDate).toLocaleString(
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
                    {new Date(data.applicationEndDate).toLocaleString("gu-IN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                </span>
                <span
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    fontWeight: "500",
                    color: " #808080",
                  }}
                >
                  {/* <MdDateRange style={{ margin: "4px 10px 0px 0px" }} />
      <p>{data.startDate.slice(0, 10)}</p>
      &nbsp;&nbsp;to&nbsp;&nbsp;
      <p> {data.endDate.slice(0, 10)}</p> */}
                </span>
                <p
                  style={{
                    textAlign: "justify",
                    overflow: "hidden",
                    lineHeight: "1.5",
                    height: "6em",
                    color: "#8c8c8c",
                    marginBottom: "15px",
                  }}
                >
                  {data.trainigDescription}
                </p>
                <VacancyTag>{data.vacancy} Vacancy</VacancyTag>
                <MonthTag>{data.duration} Months</MonthTag>
                <Row>
                  <a
                    onClick={() => {
                      Modal.info({
                        title: data.trainingName,
                        content: (
                          <div>
                            <span
                              style={{
                                fontWeight: "400",
                                color: " #808080",
                              }}
                            >
                              <p style={{ margin: "0px" }}>
                                <MdDateRange
                                  style={{ margin: "0px 10px -2px 0px" }}
                                />
                                Start Date:
                                {new Date(
                                  data.applicationStartDate
                                ).toLocaleString("gu-IN", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                })}
                              </p>
                              <p>
                                <MdDateRange
                                  style={{ margin: "4px 10px -2px 0px" }}
                                />
                                End Date:
                                {new Date(
                                  data.applicationEndDate
                                ).toLocaleString("gu-IN", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                })}
                              </p>
                            </span>
                            <p
                              style={{
                                textAlign: "justify",
                                overflow: "hidden",
                                lineHeight: "1.5",
                                height: "6em",
                                color: "#8c8c8c",
                                marginBottom: "15px",
                                textAlign: "justify",
                              }}
                            >
                              {data.trainigDescription}
                            </p>
                            <p>
                              <b>Minimum Qualification required</b>
                              <br />
                              {data.qualification}
                            </p>
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
                                Training Start Date:
                                {data.trainingStartDate.slice(0, 10)}
                              </p>
                              <p>
                                <MdDateRange
                                  style={{ margin: "0px 10px -2px 0px" }}
                                />
                                Training End Date:
                                {data.trainingEndDate.slice(0, 10)}
                              </p>
                            </span>
                            <VacancyTag>{data.vacancy} Vacancy</VacancyTag>
                            <MonthTag>{data.duration} Months</MonthTag>
                            <StatusTag>{data.category}</StatusTag>
                          </div>
                        ),
                      });
                    }}
                  >
                    Know more...
                  </a>
                </Row>
                <ApplyButton
                  onClick={() => {
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
                        title: "Please Completed your Personal Information",
                        onOk() {
                          window.location.replace("/personal-information");
                        },
                      });
                    } else if (
                      userList.CustomUserIncomeAndDomicileInfo[0].isCompleted !=
                      true
                    ) {
                      Modal.warning({
                        title: "Please Completed your Income Information",
                        onOk() {
                          window.location.replace(
                            "/income-and-domicile-information"
                          );
                        },
                      });
                    } else if (
                      userList.CustomUsereligibilityInfo[0].isCompleted != true
                    ) {
                      Modal.warning({
                        title: "Please Completed your Eligibility Information",
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
                          "Please Completed your Qualification Information",
                        onOk() {
                          window.location.replace("/qualification-information");
                        },
                      });
                    } else if (
                      userList.CustomUserResidentialInfo[0].isCompleted != true
                    ) {
                      Modal.warning({
                        title: "Please Completed your Residential Information",
                        onOk() {
                          window.location.replace("/residential-information");
                        },
                      });
                    } else if (
                      userList.CustomUserBankInfo[0].isCompleted != true
                    ) {
                      Modal.warning({
                        title: "Please Completed your Bank Information",
                        onOk() {
                          window.location.replace("/bank-information");
                        },
                      });
                    } else if (
                      userList.CustomUserOtherInfo[0].isCompleted != true
                    ) {
                      Modal.warning({
                        title: "Please Completed Other Information",
                        onOk() {
                          window.location.replace("/other-information");
                        },
                      });
                    } else {
                      showTrainingFormModal(data.id);
                    }
                  }}
                >
                  Apply Now
                </ApplyButton>
                <FormModal
                  title="Training Application Form"
                  open={open}
                  onOk={handleOk}
                  width="900px"
                  onCancel={handleCancel}
                >
                  <TrainingForm id={trainingId} modalView={open} />
                </FormModal>
              </Card>
            </Carousel.Item>
          );
        })}
      </Carousel>
    );
  }
};
export default AllTraining;
