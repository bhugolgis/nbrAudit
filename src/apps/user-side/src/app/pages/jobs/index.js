import React, { useState, useRef } from "react";
import { DataTable, MainContainer } from "../../../../style";
import useBeneficiaryData from "../container";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import {
  adminInstance,
  adminWoAuthInstance,
} from "../../../../../../libs/utils/fetch-utils";
import { ROUTES } from "../../constants/routes/routes";
import { MdDateRange } from "react-icons/md";
import { JobDescription, MonthTag, VacancyTag } from "../dashboard/style";
import { ImCross } from "react-icons/im";
import { REACT_APP_BASE_URL } from "../../../../../../libs/utils/urls";
import axios from "axios";
import { ExclamationCircleFilled } from "@ant-design/icons";
import {
  ApprovedStatus,
  PendingStatus,
  Selected,
} from "../../../../../cgm-side/style";
import { Shortlisted } from "../../../../../admin-side/src/app/pages/training/style";

const { confirm } = Modal;

const UserJobApplication = () => {
  const { userJobList } = useBeneficiaryData();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const UserJobApplications = [
    {
      title: "Job ID",
      dataIndex: "job",
      render: (text) => {
        return (
          <a
            onClick={() => {
              adminWoAuthInstance
                .get(`${ROUTES.JOB.RELEVANT_JOBS}?id=${text}`)
                .then((response) => {
                  const jobData = response.data.results[0];
                  Modal.info({
                    content: (
                      <div>
                        <span>
                          <h3 style={{ height: "50px" }}>{jobData.JobName}</h3>
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
                        <VacancyTag color=" #d6f5d6">
                          {jobData.TotalVacancy} Vacancy
                        </VacancyTag>
                        <MonthTag color="#cce5ff">{jobData.Duration}</MonthTag>
                      </div>
                    ),
                  });
                });
            }}
          >
            {text}{" "}
          </a>
        );
      },
    },
    {
      title: "Application ID",
      dataIndex: "ApplicationCode",
    },
    {
      title: "Name",
      dataIndex: "candidate__name",
    },
    {
      title: "Phone Number",
      dataIndex: "candidate__phoneNumber",
    },
    {
      title: "Caste",
      dataIndex: "candidate__CasteName",
    },
    {
      title: "District",
      dataIndex: "candidate__district",
    },
    {
      title: "Job Name",
      dataIndex: "job__JobName",
      ...getColumnSearchProps("job__JobName"),
    },
    {
      title: "Applied Date",
      dataIndex: "createdDate",
      ...getColumnSearchProps("createdDate"),
      render: (date) => {
        return <>{date.slice(0, 10)}</>;
      },
    },
    {
      title: "Cgm Checked Date",
      dataIndex: "CgmApplicationCheckDate",
      ...getColumnSearchProps("CgmApplicationCheckDate"),
      render: (text) => {
        if (text == null) {
          return;
        } else {
          return text.slice(0, 10);
        }
      },
    },
    {
      title: "Cgm Application Status",
      dataIndex: "JobTabStatus",
      filterSearch: true,
      filters: [
        {
          text: "Pending",
          value: "Pending",
        },
        {
          text: "Shortlisted",
          value: "Shortlisted",
        },
        {
          text: "Selected",
          value: "Selected",
        },
        {
          text: "Rejected",
          value: "Rejected",
        },
      ],
      onFilter: (value, record) => record.JobTabStatus.indexOf(value) === 0,
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
    {
      title: "Final Status",
      dataIndex: "FinalJobApplicationStatus",
      filterSearch: true,
      filters: [
        {
          text: "Pending",
          value: "Pending",
        },
        {
          text: "Approved",
          value: "Approved",
        },
        {
          text: "Rejected",
          value: "Rejected",
        },
      ],
      onFilter: (value, record) =>
        record.FinalJobApplicationStatus.indexOf(value) === 0,
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
      dataIndex: ["id", "userJobList"],
      render: (text, status) => {
        if (
          status.JobTabStatus == "Rejected" ||
          status.JobTabStatus == "Selected" ||
          status.FinalJobApplicationStatus == "Rejected"
        ) {
          return;
        } else {
          return (
            <span style={{ display: "flex", justifyContent: "center" }}>
              <ImCross
                style={{ color: " #e60000", cursor: "pointer" }}
                onClick={() => {
                  confirm({
                    title: "Are you sure want to delete this Application?",
                    icon: <ExclamationCircleFilled />,
                    okText: "Yes",
                    okType: "danger",
                    cancelText: "No",
                    onOk() {
                      axios({
                        method: "post",
                        url: `${REACT_APP_BASE_URL}/applicant/DeleteAppliedJob/${status.id}/`,
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
                }}
              />
            </span>
          );
        }
      },
    },
  ];
  return (
    <MainContainer>
      <h3>Applied Job Applications</h3>
      <DataTable
        columns={UserJobApplications}
        dataSource={userJobList}
        pagination={{ pageSize: 5 }}
      />
    </MainContainer>
  );
};
export default UserJobApplication;
