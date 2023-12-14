import { Modal } from "antd";
import axios from "axios";
import React from "react";
import { trainingwAuthInstance } from "../../../../../../libs/utils/fetch-utils";
import { fetchTrainingByID } from "../../api/commonapi";
import { ROUTES } from "../routes/routes";
import { MdDateRange } from "react-icons/md";
import {
  JobDescription,
  VacancyTag,
  MonthTag,
  StatusTag,
} from "../../pages/dashboard/style";
import { ImCross } from "react-icons/im";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { REACT_APP_BASE_URL } from "../../../../../../libs/utils/urls";
import { ApprovedStatus, PendingStatus } from "../../../../../cgm-side/style";
import { Shortlisted } from "../../../../../admin-side/src/app/pages/training/style";

const { confirm } = Modal;

export const UserTrainingApplications = [
  {
    title: "Training ID",
    dataIndex: "training",
    render: (text) => {
      return (
        <a
          onClick={() => {
            trainingwAuthInstance
              .get(`${ROUTES.TRAINING.TRAINING_BY_ID}/${text}/`)
              .then((response) => {
                const trainingData = response.data.data;
                Modal.info({
                  title: trainingData.trainingName,
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
                            trainingData.applicationStartDate
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
                            trainingData.applicationEndDate
                          ).toLocaleString("gu-IN", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                        </p>
                      </span>
                      <JobDescription>
                        {trainingData.trainigDescription}
                      </JobDescription>
                      <p>
                        <b>Minimum Qualification requried</b>
                        <br />
                        {trainingData.qualification}
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
                            style={{
                              margin: "0px 10px -2px 0px",
                            }}
                          />
                          Training Start Date:
                          {trainingData.trainingStartDate.slice(0, 10)}
                        </p>
                        <p>
                          <MdDateRange
                            style={{
                              margin: "0px 10px -2px 0px",
                            }}
                          />
                          Training End Date:
                          {trainingData.trainingEndDate.slice(0, 10)}
                        </p>
                      </span>
                      <VacancyTag color=" #d6f5d6">
                        {trainingData.vacancy} Vacancy
                      </VacancyTag>
                      <MonthTag color="#cce5ff">
                        {trainingData.duration} Months
                      </MonthTag>
                      <StatusTag color="#fff0b3">
                        {trainingData.district}
                      </StatusTag>
                    </div>
                  ),
                });
              });
          }}
        >
          {text}
        </a>
      );
    },
  },
  { title: "Name", dataIndex: "training_name" },
  {
    title: "Education",
    dataIndex: "technicalEducation",
  },

  {
    title: "Ration/VoterID Number",
    dataIndex: "rationCardOrVoterIdCardNumber",
  },
  {
    title: "Application Status",
    dataIndex: "trainingApplicationStatus",
    render: (status) => {
      if (status == "Pending") {
        return <PendingStatus>{status}</PendingStatus>;
      } else if (status == "Shortlisted") {
        return <Shortlisted>{status}</Shortlisted>;
      } else if (status == "Selected") {
        return <ApprovedStatus>{status}</ApprovedStatus>;
      } else if (status == "Rejected") {
        return <PendingStatus>{status}</PendingStatus>;
      }
    },
  },
  { title: "DM Remarks", dataIndex: "dmRemarks" },
  {
    title: "Final Status",
    dataIndex: "trainingFinalStatus",
    render: (status) => {
      if (status == "Pending") {
        return <PendingStatus>{status}</PendingStatus>;
      } else if (status == "Approved") {
        return <ApprovedStatus>{status}</ApprovedStatus>;
      } else if (status == "Rejected") {
        return <PendingStatus>{status}</PendingStatus>;
      }
    },
  },
  {
    title: "Cancel Application",
    dataIndex: ["id", "trainingList"],
    render: (text, data) => {
      return (
        <span style={{ display: "flex", justifyContent: "center" }}>
          <ImCross
            style={{ color: " #e60000", cursor: "pointer" }}
            onClick={() => {
              if (data.trainingApplicationStatus == "Selected") {
                Modal.warning({ title: "Application cannot be cancelled" });
              } else {
                confirm({
                  title: "Are you sure want to delete this Application?",
                  icon: <ExclamationCircleFilled />,
                  okText: "Yes",
                  okType: "danger",
                  cancelText: "No",
                  onOk() {
                    axios({
                      method: "post",
                      url: `${REACT_APP_BASE_URL}/applicant/DeleteAppliedTraining/${data.id}/`,
                      data: {},
                    })
                      .then((response) => {
                        if (
                          response.data.status == "success" &&
                          response.status == 200
                        ) {
                          Modal.success({ title: response.data.message });
                          setTimeout(() => {
                            window.location.reload();
                          }, 1000);
                        } else if (
                          response.data.status == "error" &&
                          response.status == 200
                        ) {
                          Modal.error({ title: response.data.message });
                        }
                      })
                      .catch((error) => {
                        Modal.error({ title: error.message });
                      });
                  },
                  onCancel() {},
                });
              }
            }}
          />
        </span>
      );
    },
  },
];
