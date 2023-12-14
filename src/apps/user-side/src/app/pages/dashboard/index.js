import React, { useState } from "react";
import {
  Card,
  Spin,
  Collapse,
  message,
  Modal,
  Tabs,
  Row,
  Tag,
  Divider,
} from "antd";
import {
  LoadContainer,
  MainContainer,
  ApplyButton,
  Accordian,
  JobCard,
  JobDescription,
  StatusTag,
  VacancyTag,
  MonthTag,
  TrainingModal,
} from "./style";
import useBeneficiaryData from "../container";
import { useEffect } from "react";
import axios from "axios";
import { Token, UserGroup } from "../../../../../../libs/utils/sessionStorage";
import { fetchRelevantJobs, fetchUserAllData } from "../../api/commonapi";
import { adminInstance } from "../../../../../../libs/utils/fetch-utils";
import { REACT_APP_BASE_URL } from "../../../../../../libs/utils/urls";
import NoticesCarousel from "../../../../../../libs/common-ui/carousels/notices";
import { MdDateRange } from "react-icons/md";
import showTrainingModal from "../../../../../../libs/common-ui/carousels/allTraining";
import AllTraining from "../../../../../../libs/common-ui/carousels/allTraining";
import TrainingForm from "../../../../../../libs/common-ui/training/form";
const { Panel } = Collapse;

const DashboardContent = (props) => {
  const {
    userJobList,
    listLoading,
    relevantTraining,
    relevantTrainingLoading,
    relevantJobs,
    relevantJobsLoading,
    appliedJobsLoading,
    appliedTrainingLoading,
    userList,
    trainingList,
    schemeList,
    schemesLoading,
  } = useBeneficiaryData();

  const [open, setOpen] = useState(false);
  const [trainingId, setTrainingId] = useState();
  const [tabKey, setTabKey] = useState();
  return (
    <MainContainer>
      <h3>Recommendations</h3>
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: `JOBS`,
            key: "1",
            children: (
              <>
                {relevantJobsLoading == true ? (
                  <Spin />
                ) : (
                  <span
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                    }}
                  >
                    {relevantJobs.results.map((jobData) => {
                      return (
                        <JobCard hoverable style={{ width: "350px" }}>
                          <span>
                            <h3 style={{ height: "50px" }}>
                              {jobData.JobName}
                            </h3>
                          </span>
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
                                jobData.ApplicationStartDate
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
                                jobData.ApplicationEndDate
                              ).toLocaleString("gu-IN", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              })}
                            </p>
                          </span>
                          <JobDescription>
                            {jobData.JobDescription}
                          </JobDescription>

                          <VacancyTag color=" #d6f5d6">
                            {jobData.TotalVacancy} Vacancy
                          </VacancyTag>
                          <MonthTag color="#cce5ff">
                            {jobData.Duration}
                          </MonthTag>
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
                                            style={{
                                              margin: "0px 10px -2px 0px",
                                            }}
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
                                            style={{
                                              margin: "0px 10px -2px 0px",
                                            }}
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
                                          Start Date:
                                          {new Date(
                                            jobData.JobStartDate
                                          ).toLocaleString("gu-IN", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                          })}
                                        </p>
                                        <p>
                                          <MdDateRange
                                            style={{
                                              margin: "4px 10px -2px 0px",
                                            }}
                                          />
                                          End Date:
                                          {new Date(
                                            jobData.JobEndDate
                                          ).toLocaleString("gu-IN", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                          })}
                                        </p>
                                      </span>
                                      <VacancyTag>
                                        {jobData.TotalVacancy} Vacancy
                                      </VacancyTag>
                                      <MonthTag>{jobData.Duration} </MonthTag>
                                      <StatusTag>
                                        Location - {jobData.location}
                                      </StatusTag>
                                    </div>
                                  ),
                                });
                              }}
                            >
                              Know more...
                            </a>
                          </Row>
                          {/* <StatusTag color="#fff0b3">
                            {jobData.JobStatus}
                          </StatusTag> */}
                          <ApplyButton
                            onClick={() => {
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
                                userList.CustomUsereligibilityInfo[0]
                                  .isCompleted != true
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
                                userList.CustomUserResidentialInfo[0]
                                  .isCompleted != true
                              ) {
                                message.warning(
                                  "Please complete  Residential Information"
                                );
                              } else if (
                                userList.CustomUserBankInfo[0].isCompleted !=
                                true
                              ) {
                                message.warning(
                                  "Please complete  Bank Information"
                                );
                              } else if (
                                userList.CustomUserOtherInfo[0].isCompleted !=
                                true
                              ) {
                                message.warning(
                                  "Please complete  Other Information"
                                );
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
                                  message.success(response.data.message);
                                });
                              }
                            }}
                          >
                            Apply Now
                          </ApplyButton>
                        </JobCard>
                      );
                    })}
                  </span>
                )}
              </>
            ),
          },
          {
            label: `TRAINING`,
            key: "2",
            children: (
              <>
                {relevantTrainingLoading == true ? (
                  <Spin />
                ) : (
                  <span
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                    }}
                  >
                    {relevantTraining.map((data) => {
                      return (
                        <JobCard hoverable style={{ width: "350px" }}>
                          <span>
                            <h3 style={{ height: "50px" }}>
                              {data.trainingName}
                            </h3>
                          </span>
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
                              {new Date(data.applicationEndDate).toLocaleString(
                                "gu-IN",
                                {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                }
                              )}
                            </p>
                          </span>
                          <JobDescription>
                            {data.trainigDescription}
                          </JobDescription>
                          <VacancyTag color=" #d6f5d6">
                            {data.vacancy} Vacancy
                          </VacancyTag>
                          <MonthTag color="#cce5ff">
                            {data.duration} Months
                          </MonthTag>
                          <StatusTag color="#fff0b3">{data.district}</StatusTag>
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
                                            style={{
                                              margin: "0px 10px -2px 0px",
                                            }}
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
                                            style={{
                                              margin: "4px 10px -2px 0px",
                                            }}
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
                                        <b>Minimum Qualification requried</b>
                                        <br />
                                        {data.qualification}
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
                                          Start Date:
                                          {new Date(
                                            data.trainingStartDate
                                          ).toLocaleString("gu-IN", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                          })}
                                        </p>
                                        <p>
                                          <MdDateRange
                                            style={{
                                              margin: "4px 10px -2px 0px",
                                            }}
                                          />
                                          End Date:
                                          {new Date(
                                            data.trainingEndDate
                                          ).toLocaleString("gu-IN", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                          })}
                                        </p>
                                      </span>
                                      <VacancyTag>
                                        {data.vacancy} Vacancy
                                      </VacancyTag>
                                      <MonthTag>
                                        {data.duration} Months
                                      </MonthTag>
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
                              setOpen(true);
                              setTrainingId(data.id);
                            }}
                          >
                            Apply Now
                          </ApplyButton>
                        </JobCard>
                      );
                    })}
                  </span>
                )}
              </>
            ),
          },
        ]}
      />

      <h3>Special Schemes</h3>
      <NoticesCarousel />
      <h3>Application Status</h3>
      <Tabs
        defaultActiveKey="1"
        onChange={(key) => setTabKey(key)}
        items={[
          {
            label: `JOBS`,
            key: "1",
            children: (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                {appliedJobsLoading == true ? (
                  <Spin />
                ) : (
                  <>
                    {userJobList.map((data) => {
                      return (
                        <Card
                          hoverable
                          style={{
                            width: 440,
                            margin: "20px 15px 15px",
                            borderRadius: "10px",
                            borderLeft: "8px solid  #193367",
                          }}
                        >
                          <Row
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <b>{data.job__JobName}</b>
                          </Row>
                          <Divider
                            style={{
                              height: "2px",
                              borderRadius: "5px",
                              background: "#e6e6e6",
                              margin: "12px 0px",
                            }}
                          />
                          {/* <p>
                            <b>Vertical</b> - {data.vertical__VerticalName}
                          </p> */}
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <span
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: "10px",
                              }}
                            >
                              <b>CGM Status &nbsp;&nbsp; - &nbsp;&nbsp;</b>
                              {data.JobTabStatus == "Pending" ? (
                                <Tag style={{ margin: "0px" }} color="red">
                                  {data.JobTabStatus}
                                </Tag>
                              ) : (
                                <></>
                              )}
                              {data.JobTabStatus == "Shortlisted" ? (
                                <Tag style={{ margin: "0px" }} color="orange">
                                  {data.JobTabStatus}
                                </Tag>
                              ) : (
                                <></>
                              )}
                              {data.JobTabStatus == "Selected" ? (
                                <Tag style={{ margin: "0px" }} color="cyan">
                                  {data.JobTabStatus}
                                </Tag>
                              ) : (
                                <></>
                              )}
                              {data.JobTabStatus == "Rejected" ? (
                                <Tag style={{ margin: "0px" }} color="red">
                                  {data.JobTabStatus}
                                </Tag>
                              ) : (
                                <></>
                              )}
                            </span>
                            <span
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: "10px",
                              }}
                            >
                              <b>MD Status &nbsp;&nbsp; - &nbsp;&nbsp;</b>
                              {data.FinalJobApplicationStatus == "Pending" ? (
                                <Tag style={{ margin: "0px" }} color="red">
                                  {data.FinalJobApplicationStatus}
                                </Tag>
                              ) : (
                                <></>
                              )}
                              {data.FinalJobApplicationStatus == "Approved" ? (
                                <Tag style={{ margin: "0px" }} color="cyan">
                                  {data.FinalJobApplicationStatus}
                                </Tag>
                              ) : (
                                <></>
                              )}
                              {data.FinalJobApplicationStatus == "Rejected" ? (
                                <Tag style={{ margin: "0px" }} color="red">
                                  {data.FinalJobApplicationStatus}
                                </Tag>
                              ) : (
                                <></>
                              )}
                            </span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <p>
                              <b>Check Date &nbsp;&nbsp; - &nbsp;&nbsp;</b>
                              {new Date(
                                data.CgmApplicationCheckDate
                              ).toLocaleString("gu-IN", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              })}
                            </p>
                            <p>
                              <b>Check Date &nbsp;&nbsp; - &nbsp;&nbsp;</b>
                              {data.MDApplicationCheckDate == null ? (
                                <>Not Checked</>
                              ) : (
                                <>
                                  {new Date(
                                    data.MDApplicationCheckDate
                                  ).toLocaleString("gu-IN", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                  })}
                                </>
                              )}
                            </p>
                          </div>
                          <b>CGM Remarks</b>
                          {data.CgmRemarks}
                          <br />
                          <b>MD Remarks</b>
                          {data.MDRemarks}
                        </Card>
                      );
                    })}
                  </>
                )}
              </div>
            ),
          },
          {
            label: `TRAINING`,
            key: "2",
            children: (
              <>
                {appliedTrainingLoading == true ? (
                  <Spin />
                ) : (
                  <span style={{ display: "flex", flexWrap: "wrap" }}>
                    {trainingList.map((data) => {
                      return (
                        <Card
                          hoverable
                          style={{
                            width: 440,
                            margin: "20px 15px 15px",
                            borderRadius: "10px",
                            borderLeft: "8px solid  #193367",
                          }}
                        >
                          <Row
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <b>{data.training_name}</b>
                          </Row>
                          <Divider
                            style={{
                              height: "2px",
                              borderRadius: "5px",
                              background: "#e6e6e6",
                              margin: "12px 0px",
                            }}
                          />
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <span
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: "10px",
                              }}
                            >
                              <b>DM Status &nbsp;&nbsp; - &nbsp;&nbsp;</b>
                              {data.trainingApplicationStatus == "Pending" ? (
                                <Tag style={{ margin: "0px" }} color="red">
                                  {data.trainingApplicationStatus}
                                </Tag>
                              ) : (
                                <></>
                              )}
                              {data.trainingApplicationStatus ==
                              "Shortlisted" ? (
                                <Tag style={{ margin: "0px" }} color="orange">
                                  {data.trainingApplicationStatus}
                                </Tag>
                              ) : (
                                <></>
                              )}
                              {data.trainingApplicationStatus == "Selected" ? (
                                <Tag style={{ margin: "0px" }} color="cyan">
                                  {data.trainingApplicationStatus}
                                </Tag>
                              ) : (
                                <></>
                              )}
                              {data.trainingApplicationStatus == "Rejected" ? (
                                <Tag style={{ margin: "0px" }} color="red">
                                  {data.trainingApplicationStatus}
                                </Tag>
                              ) : (
                                <></>
                              )}
                            </span>
                            <span
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: "10px",
                              }}
                            >
                              <b>MD Status &nbsp;&nbsp; - &nbsp;&nbsp;</b>
                              {data.trainingFinalStatus == "Pending" ? (
                                <Tag style={{ margin: "0px" }} color="red">
                                  {data.trainingFinalStatus}
                                </Tag>
                              ) : (
                                <></>
                              )}
                              {data.trainingFinalStatus == "Approved" ? (
                                <Tag style={{ margin: "0px" }} color="cyan">
                                  {data.trainingFinalStatus}
                                </Tag>
                              ) : (
                                <></>
                              )}
                              {data.trainingFinalStatus == "Rejected" ? (
                                <Tag style={{ margin: "0px" }} color="red">
                                  {data.trainingFinalStatus}
                                </Tag>
                              ) : (
                                <></>
                              )}
                            </span>
                          </div>
                          <b>DM Remarks</b>
                          {data.dmRemarks}
                          {}
                        </Card>
                      );
                    })}
                  </span>
                )}
              </>
            ),
          },
          {
            label: "SCHEMES",
            key: "3",
            children: (
              <>
                {schemesLoading == true ? (
                  <Spin />
                ) : (
                  <>
                    <span style={{ display: "flex", flexWrap: "wrap" }}>
                      {schemeList.map((data) => {
                        return (
                          <Card
                            hoverable
                            style={{
                              width: 440,
                              margin: "20px 15px 15px",
                              borderRadius: "10px",
                              borderLeft: "8px solid  #193367",
                            }}
                          >
                            <b> {data.specialScheme.schemeName}</b>
                            <Divider
                              style={{
                                height: "2px",
                                borderRadius: "5px",
                                background: "#e6e6e6",
                                margin: "12px 0px",
                              }}
                            />
                            <span
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <b>Application Date - </b>
                              {data.createdDate.slice(0, 10)}
                              <b>CGM Status &nbsp;&nbsp; - &nbsp;&nbsp;</b>
                              {data.SchemeApplicationStatus == "Pending" ? (
                                <Tag style={{ margin: "0px" }} color="red">
                                  {data.SchemeApplicationStatus}
                                </Tag>
                              ) : (
                                <></>
                              )}
                              {data.SchemeApplicationStatus == "Shortlisted" ? (
                                <Tag style={{ margin: "0px" }} color="orange">
                                  {data.SchemeApplicationStatus}
                                </Tag>
                              ) : (
                                <></>
                              )}
                              {data.SchemeApplicationStatus == "Selected" ? (
                                <Tag style={{ margin: "0px" }} color="cyan">
                                  {data.SchemeApplicationStatus}
                                </Tag>
                              ) : (
                                <></>
                              )}
                              {data.SchemeApplicationStatus == "Rejected" ? (
                                <Tag style={{ margin: "0px" }} color="red">
                                  {data.SchemeApplicationStatus}
                                </Tag>
                              ) : (
                                <></>
                              )}
                            </span>
                            <br />
                            {/* <p>Scheme Description - {data.schemeDescription}</p> */}
                            <h4>
                              Cgm Check Date -
                              {data.CgmSchemeApplicationCheckDate}
                            </h4>
                            <h4>Remarks - {data.CgmSchemeRemarks}</h4>
                          </Card>
                        );
                      })}
                    </span>
                  </>
                )}
              </>
            ),
          },
        ]}
      />

      <TrainingModal
        title="Training Application Form"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <TrainingForm id={trainingId} />
      </TrainingModal>
    </MainContainer>
  );
};
export default DashboardContent;
