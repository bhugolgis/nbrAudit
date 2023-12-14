import React, { useCallback, useRef, useState } from "react";
import {
  DataTable,
  Selected,
  StatusFields,
  StatusModal,
} from "../../../../../style";
import useCgmData from "../../container";
import {
  Form,
  Select,
  Row,
  Col,
  Button,
  message,
  Tabs,
  Collapse,
  Modal,
  Input,
  Space,
  Spin,
} from "antd";
import { ApprovedStatus, PendingStatus } from "../../../../../style";
import TextArea from "antd/lib/input/TextArea";
import {
  adminWoAuthInstance,
  cgmInstance,
} from "../../../../../../../libs/utils/fetch-utils";
import { REACT_APP_BASE_URL } from "../../../../../../../libs/utils/urls";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import {
  Token,
  UserGroup,
} from "../../../../../../../libs/utils/sessionStorage";
import { AiFillEye, AiTwotoneEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import { SubHeading, Content, Title, MainContainer } from "./style";
import { BiArrowBack } from "react-icons/bi";
import axios from "axios";
import ImageViewer from "react-simple-image-viewer";
import { SnippetsOutlined } from "@ant-design/icons";
import { ROUTES } from "../../../../../../user-side/src/app/constants/routes/routes";
import { MdDateRange } from "react-icons/md";
import disData from "../../../../../../../data/disFilter.json";
import {
  JobDescription,
  MonthTag,
  VacancyTag,
} from "../../../../../../user-side/src/app/pages/dashboard/style";

const { Option } = Select;
const { Panel } = Collapse;

const BeneficiaryJobApplications = () => {
  const [docView, setDocView] = useState(false);
  const showDocView = () => {
    setDocView(true);
  };
  const hideDocView = () => {
    setDocView(false);
  };
  const {
    pendingJobApplicationList,
    sortlistedJobList,
    selectedJobList,
    rejectedJobList,
  } = useCgmData();
  const [cgmStatus, setCgmStatus] = useState();
  const [finalStatus, setFinalStatus] = useState("");
  const [remarks, setRemarks] = useState("");
  const [viewProfile, setViewProfile] = useState(false);
  const [userDetails, setUserDetails] = useState();

  const [cgmField, setCgmField] = useState(false);
  const [finalField, setFinalField] = useState(false);
  const [remarkField, setRemarkField] = useState(false);
  const handleCgmStatus = (value) => {
    setCgmStatus(value);
  };
  const handleFinalStatus = (value) => {
    setFinalStatus(value);
  };
  const handleRemarks = (e) => {
    setRemarks(e.target.value);
  };

  const [docViewer, setDocViewer] = useState(false);
  const openDocuments = useCallback(() => {
    setDocViewer(true);
  });

  const closeDocuments = useCallback(() => {
    setDocViewer(false);
  });
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

  const [pendingId, setPendingId] = useState();
  const [shortlistedId, setShortlistedId] = useState();
  const [selectedId, setSelectedId] = useState();

  const [isUpdated, setIsUpdated] = useState(false);

  const PendingListcolumns = [
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
            {text}
          </a>
        );
      },
    },
    { title: "Application ID", dataIndex: "ApplicationCode" },
    {
      title: "Beneficiary Name",
      dataIndex: "candidate__name",
      ...getColumnSearchProps("candidate__name"),
      width: "15%",
    },
    {
      title: "Beneficiary Id",
      dataIndex: "candidate__uniqueId",
      ...getColumnSearchProps("candidate__uniqueId"),
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
      filterSearch: true,
      filters: disData,
      onFilter: (value, record) =>
        record.candidate__district.indexOf(value) === 0,
    },
    {
      title: "Application Status",
      dataIndex: "JobTabStatus",
      render: (text) => {
        if (text == "Pending") {
          return <PendingStatus>{text}</PendingStatus>;
        } else if (text == "Shortlisted") {
          return <Selected>{text}</Selected>;
        } else if (text == "Selected") {
          return <ApprovedStatus>{text}</ApprovedStatus>;
        }
      },
    },
    {
      title: "Job Name",
      dataIndex: "job__JobName",
      width: "15%",
      ...getColumnSearchProps("job__JobName"),
    },
    {
      title: "Application Date",
      dataIndex: "createdDate",
      ...getColumnSearchProps("createdDate"),
      render: (text) => {
        return text.slice(0, 10);
      },
    },
    {
      title: "Cgm Remarks",
      dataIndex: "CgmRemarks",
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
      render: (text) => {
        return (
          <>
            {text == true ? (
              <ApprovedStatus>Approved</ApprovedStatus>
            ) : (
              <PendingStatus>Pending</PendingStatus>
            )}
          </>
        );
      },
    },
    {
      title: "View",
      dataIndex: "candidate",
      render: (text) => {
        return (
          <>
            <AiFillEye
              style={{
                fontSize: "15px",
                marginRight: "5px",
                cursor: "pointer",
              }}
              onClick={() => {
                axios
                  .get(
                    `${REACT_APP_BASE_URL}/adminmodule/UserListView/${text}/`
                  )
                  .then((response) => {
                    setUserDetails(response.data.data);
                    setViewProfile(true);
                  })
                  .catch((error) => {
                    message.error(error.data.message);
                  });
              }}
            />
          </>
        );
      },
    },
    {
      title: "Edit",
      dataIndex: ["id", "pendingList"],
      render: (id, pendingList) => {
        return (
          <>
            <a onClick={showModal}>
              <AiTwotoneEdit
                style={{ fontSize: "15px", marginRight: "5px" }}
                onClick={() => {
                  setPendingId(pendingList.id);
                  setRemarks(pendingList.CgmRemarks);
                }}
              />
            </a>
            <StatusModal
              title="View Form"
              visible={open}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Form layout="vertical">
                <StatusFields>
                  <Form.Item label="Cgm Status">
                    <Select
                      style={{ width: "220px" }}
                      onChange={handleCgmStatus}
                      value={cgmStatus}
                      disabled={cgmField}
                    >
                      <Option value="Shortlisted">Shortlisted</Option>
                      <Option value="Rejected">Rejected</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Final Status">
                    <Select
                      style={{ width: "230px" }}
                      onChange={handleFinalStatus}
                      disabled={finalField}
                    >
                      <Option value={true}>Approved</Option>
                      <Option value={false}>Rejected</Option>
                    </Select>
                  </Form.Item>
                </StatusFields>
                <Row>
                  <Col span={24}>
                    <Form.Item label="Remarks">
                      <TextArea
                        onChange={handleRemarks}
                        disabled={remarkField}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item>
                  <Button
                    type="primary"
                    onClick={() => {
                      if (UserGroup == "admin") {
                        if (finalStatus == null || finalStatus == "")
                          message.warning("Final Status Field is empty");
                        else {
                          setIsUpdated(true);
                          cgmInstance
                            .patch(
                              `${REACT_APP_BASE_URL}/cgm/CgmChangeStatus/${pendingList.id}/`,
                              {
                                FinalJobApplicationStatus: finalStatus,
                                CgmRemarks: remarks,
                              },
                              {
                                headers: {
                                  "Content-Type": "application/json",
                                  Authorization: `token ${Token}`,
                                },
                              }
                            )
                            .then((response) => {
                              setIsUpdated(false);
                              if (
                                response.status == 200 &&
                                response.data.status == "success"
                              ) {
                                setOpen(false);
                                message.success(response.data.message);
                                setTimeout(() => {
                                  window.location.reload();
                                }, 500);
                              } else if (
                                response.status == 200 &&
                                response.data.status == "error"
                              ) {
                                message.error(response.data.message);
                              }
                            });
                        }
                      } else if (UserGroup == "cgm") {
                        if (cgmStatus == null || cgmStatus == "") {
                          message.warning("Cgm Status Field is empty");
                        } else {
                          setIsUpdated(true);
                          cgmInstance
                            .patch(
                              `${REACT_APP_BASE_URL}/cgm/CgmChangeStatus/${pendingId}/`,
                              {
                                JobTabStatus: cgmStatus,
                                CgmRemarks: remarks,
                                FinalJobApplicationStatus: "Pending",
                              },
                              {
                                headers: {
                                  "Content-Type": "application/json",
                                  Authorization: `token ${Token}`,
                                },
                              }
                            )
                            .then((response) => {
                              setIsUpdated(false);
                              if (
                                response.status == 200 &&
                                response.data.status == "success"
                              ) {
                                setOpen(false);
                                message.success(response.data.message);
                                setTimeout(() => {
                                  window.location.reload();
                                }, 500);
                              } else if (
                                response.status == 200 &&
                                response.data.status == "error"
                              ) {
                                message.error(response.data.message);
                              }
                            });
                        }
                      }
                    }}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </StatusModal>
          </>
        );
      },
    },
    // {
    //   title: "Docs",
    //   dataIndex: "formFields",
    //   render: (arr) => {
    //     if (Object.keys(arr).length === 0 && arr.constructor === Object) {
    //       return null;
    //     } else {
    //       return (
    //         <>
    //           <SnippetsOutlined onClick={showDocView} />
    //           <Modal
    //             title="Documents Submitted"
    //             open={docView}
    //             onOk={hideDocView}
    //             onCancel={hideDocView}
    //             okText="Ok"
    //             cancelText="Cancel"
    //           >
    //             {arr.map((data) => {
    //               return (
    //                 <span>
    //                   <p>{data.fieldName} : </p>
    //                   <img
    //                     src={data.value}
    //                     width="100px"
    //                     onClick={() => {
    //                       openDocuments();
    //                     }}
    //                   />
    //                 </span>
    //               );
    //             })}
    //           </Modal>
    //         </>
    //       );
    //     }
    //   },
    // },
  ];

  const ShortlistedListColumns = [
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
                            color: "#808080",
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
            {text}
          </a>
        );
      },
    },
    { title: "Application ID", dataIndex: "ApplicationCode" },
    {
      title: "Beneficiary Name",
      dataIndex: "candidate__name",
      width: "15%",
    },
    {
      title: "Beneficiary Id",
      dataIndex: "candidate__uniqueId",
      ...getColumnSearchProps("candidate__uniqueId"),
    },
    {
      title: "Phone Number",
      dataIndex: "candidate__phoneNumber",
      width: "6%",
    },
    {
      title: "Caste",
      dataIndex: "candidate__CasteName",
    },
    {
      title: "District",
      dataIndex: "candidate__district",
      filterSearch: true,
      filters: disData,
      onFilter: (value, record) =>
        record.candidate__district.indexOf(value) === 0,
    },
    {
      title: "Application Status",
      dataIndex: "JobTabStatus",

      render: (text) => {
        if (text == "Pending") {
          return <PendingStatus>{text}</PendingStatus>;
        } else if (text == "Shortlisted") {
          return <Selected>{text}</Selected>;
        } else if (text == "Selected") {
          return <ApprovedStatus>{text}</ApprovedStatus>;
        }
      },
    },
    {
      title: "Job Name",
      dataIndex: "job__JobName",
      width: "15%",
      ...getColumnSearchProps("job__JobName"),
    },
    {
      title: "Application Date",
      dataIndex: "createdDate",
      ...getColumnSearchProps("createdDate"),
      render: (text) => {
        return text.slice(0, 10);
      },
    },
    {
      title: "Cgm Remarks",
      dataIndex: "CgmRemarks",
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
      render: (text) => {
        return (
          <>
            {text == true ? (
              <ApprovedStatus>Approved</ApprovedStatus>
            ) : (
              <PendingStatus>Pending</PendingStatus>
            )}
          </>
        );
      },
    },
    {
      title: "View",
      dataIndex: "candidate",
      render: (text) => {
        return (
          <>
            <AiFillEye
              style={{
                fontSize: "15px",
                marginRight: "5px",
                cursor: "pointer",
              }}
              onClick={() => {
                axios
                  .get(
                    `${REACT_APP_BASE_URL}/adminmodule/UserListView/${text}/`
                  )
                  .then((response) => {
                    setUserDetails(response.data.data);
                    setViewProfile(true);
                  })
                  .catch((error) => {
                    message.error(error.data.message);
                  });
              }}
            />
          </>
        );
      },
    },
    {
      title: "Edit",
      dataIndex: ["id", "shortlistedList"],
      render: (id, shortlistedList) => {
        return (
          <>
            <a onClick={showModal}>
              <AiTwotoneEdit
                style={{ fontSize: "15px", marginRight: "5px" }}
                onClick={() => {
                  setShortlistedId(shortlistedList.id);
                  setRemarks(shortlistedList.CgmRemarks);
                }}
              />
            </a>
            <StatusModal
              title="View Form"
              visible={open}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Form layout="vertical">
                <StatusFields>
                  <Form.Item label="Cgm Status">
                    <Select
                      style={{ width: "220px" }}
                      onChange={handleCgmStatus}
                      value={cgmStatus}
                      disabled={cgmField}
                    >
                      <Option value="Selected">Selected</Option>
                      <Option value="Rejected">Rejected</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Final Status">
                    <Select
                      style={{ width: "230px" }}
                      onChange={handleFinalStatus}
                      disabled={finalField}
                    >
                      <Option value={true}>Approved</Option>
                      <Option value={false}>Rejected</Option>
                    </Select>
                  </Form.Item>
                </StatusFields>
                <Row>
                  <Col span={24}>
                    <Form.Item label="Remarks">
                      <TextArea
                        onChange={handleRemarks}
                        disabled={remarkField}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item>
                  <Button
                    type="primary"
                    onClick={() => {
                      if (UserGroup == "admin") {
                        if (finalStatus == null || finalStatus == "")
                          message.warning("Final Status Field is empty");
                        else {
                          cgmInstance
                            .patch(
                              `${REACT_APP_BASE_URL}/cgm/CgmChangeStatus/${shortlistedId}/`,
                              {
                                FinalJobApplicationStatus: finalStatus,
                                CgmRemarks: remarks,
                              },

                              {
                                headers: {
                                  "Content-Type": "application/json",
                                  Authorization: `token ${Token}`,
                                },
                              }
                            )
                            .then((response) => {
                              if (
                                response.status == 200 &&
                                response.data.status == "success"
                              ) {
                                setOpen(false);
                                message.success(response.data.message);
                                setTimeout(() => {
                                  window.location.reload();
                                }, 500);
                              } else if (
                                response.status == 200 &&
                                response.data.status == "error"
                              ) {
                                message.error(response.data.message);
                              }
                            });
                        }
                      } else if (UserGroup == "cgm") {
                        if (cgmStatus == null || cgmStatus == "") {
                          message.warning("Cgm Status Field is empty");
                        } else {
                          cgmInstance
                            .patch(
                              `${REACT_APP_BASE_URL}/cgm/CgmChangeStatus/${shortlistedList.id}/`,
                              {
                                JobTabStatus: cgmStatus,
                                CgmRemarks: remarks,
                                FinalJobApplicationStatus: "Pending",
                              },
                              {
                                headers: {
                                  "Content-Type": "application/json",
                                  Authorization: `token ${Token}`,
                                },
                              }
                            )
                            .then((response) => {
                              if (
                                response.status == 200 &&
                                response.data.status == "success"
                              ) {
                                setOpen(false);
                                message.success(response.data.message);
                                setTimeout(() => {
                                  window.location.reload();
                                }, 500);
                              } else if (
                                response.status == 200 &&
                                response.data.status == "error"
                              ) {
                                message.error(response.data.message);
                              }
                            });
                        }
                      }
                    }}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </StatusModal>
          </>
        );
      },
    },
    // {
    //   title: "Docs",
    //   dataIndex: "formFields",
    //   render: (arr) => {
    //     if (Object.keys(arr).length === 0 && arr.constructor === Object) {
    //       return null;
    //     } else {
    //       return (
    //         <>
    //           <SnippetsOutlined onClick={showDocView} />
    //           <Modal
    //             title="Documents Submitted"
    //             open={docView}
    //             onOk={hideDocView}
    //             onCancel={hideDocView}
    //             okText="Ok"
    //             cancelText="Cancel"
    //           >
    //             {arr.map((data) => {
    //               return (
    //                 <span>
    //                   <p>{data.fieldName} : </p>
    //                   <img
    //                     src={data.value}
    //                     width="100px"
    //                     onClick={() => {
    //                       openDocuments();
    //                     }}
    //                   />
    //                 </span>
    //               );
    //             })}
    //           </Modal>
    //         </>
    //       );
    //     }
    //   },
    // },
  ];

  const SelectedListColumns = [
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
            {text}
          </a>
        );
      },
    },
    { title: "Application ID", dataIndex: "ApplicationCode" },
    {
      title: "Beneficiary Name",
      dataIndex: "candidate__name",
      width: "15%",
    },
    {
      title: "Beneficiary Id",
      dataIndex: "candidate__uniqueId",
      ...getColumnSearchProps("candidate__uniqueId"),
    },
    {
      title: "Phone Number",
      dataIndex: "candidate__phoneNumber",
      width: "5%",
    },
    {
      title: "Caste",
      dataIndex: "candidate__CasteName",
    },
    {
      title: "District",
      dataIndex: "candidate__district",
      filterSearch: true,
      filters: disData,
      onFilter: (value, record) =>
        record.candidate__district.indexOf(value) === 0,
    },
    {
      title: "Application Status",
      dataIndex: "JobTabStatus",

      render: (text) => {
        if (text == "Pending") {
          return <PendingStatus>{text}</PendingStatus>;
        } else if (text == "Shortlisted") {
          return <Selected>{text}</Selected>;
        } else if (text == "Selected") {
          return <ApprovedStatus>{text}</ApprovedStatus>;
        }
      },
    },
    {
      title: "Job Name",
      dataIndex: "job__JobName",
      width: "15%",
      ...getColumnSearchProps("job__JobName"),
    },
    {
      title: "Application Date",
      dataIndex: "createdDate",
      ...getColumnSearchProps("createdDate"),
      render: (text) => {
        return text.slice(0, 10);
      },
    },
    {
      title: "Cgm Remarks",
      dataIndex: "CgmRemarks",
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
      title: "View",
      dataIndex: "candidate",
      render: (text) => {
        return (
          <>
            <AiFillEye
              style={{
                fontSize: "15px",
                marginRight: "5px",
                cursor: "pointer",
              }}
              onClick={() => {
                axios
                  .get(
                    `${REACT_APP_BASE_URL}/adminmodule/UserListView/${text}/`
                  )
                  .then((response) => {
                    setUserDetails(response.data.data);
                    setViewProfile(true);
                  })
                  .catch((error) => {
                    message.error(error.data.message);
                  });
              }}
            />
          </>
        );
      },
    },

    {
      title: "Edit",
      dataIndex: ["id", "list"],
      render: (text, list) => {
        if (
          UserGroup == "admin" &&
          list.FinalJobApplicationStatus == "Pending"
        ) {
          return (
            <>
              <a onClick={showModal}>
                <AiTwotoneEdit
                  style={{ fontSize: "15px", marginRight: "5px" }}
                  onClick={() => {
                    setSelectedId(list.id);
                    setRemarks(list.CgmRemarks);
                    setRemarkField(true);
                  }}
                />
              </a>
              <StatusModal
                title="View Form"
                visible={open}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <Form layout="vertical">
                  <StatusFields>
                    <Form.Item label="Cgm Status">
                      <Select
                        style={{ width: "220px" }}
                        onChange={handleCgmStatus}
                        value={cgmStatus}
                        disabled={cgmField}
                      >
                        <Option value="Shortlisted">Shortlisted</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="Final Status">
                      <Select
                        style={{ width: "230px" }}
                        onChange={handleFinalStatus}
                        disabled={finalField}
                      >
                        <Option value="Approved">Approved</Option>
                        <Option value="Rejected">Rejected</Option>
                      </Select>
                    </Form.Item>
                  </StatusFields>
                  <Row>
                    <Col span={24}>
                      <Form.Item label="Remarks">
                        <TextArea
                          onChange={handleRemarks}
                          disabled={remarkField}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item>
                    <Button
                      type="primary"
                      onClick={() => {
                        if (UserGroup == "admin") {
                          if (finalStatus == null)
                            message.warning("Final Status Field is empty");
                          else {
                            cgmInstance
                              .patch(
                                `${REACT_APP_BASE_URL}/cgm/CgmChangeStatus/${selectedId}/`,
                                {
                                  FinalJobApplicationStatus: finalStatus,
                                  CgmRemarks: remarks,
                                },
                                {
                                  headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `token ${Token}`,
                                  },
                                }
                              )
                              .then((response) => {
                                if (
                                  response.status == 200 &&
                                  response.data.status == "success"
                                ) {
                                  setOpen(false);
                                  message.success(response.data.message);
                                  setTimeout(() => {
                                    window.location.reload();
                                  }, 500);
                                } else if (
                                  response.status == 200 &&
                                  response.data.status == "error"
                                ) {
                                  message.error(response.data.message);
                                }
                              });
                          }
                        } else if (UserGroup == "cgm") {
                          if (cgmStatus == null || cgmStatus == "") {
                            message.warning("Cgm Status Field is empty");
                          } else {
                            cgmInstance
                              .patch(
                                `${REACT_APP_BASE_URL}/cgm/CgmChangeStatus/${text}/`,
                                {
                                  JobTabStatus: cgmStatus,
                                  CgmRemarks: remarks,
                                },
                                {
                                  headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `token ${Token}`,
                                  },
                                }
                              )
                              .then((response) => {
                                if (
                                  response.status == 200 &&
                                  response.data.status == "success"
                                ) {
                                  setOpen(false);
                                  message.success(response.data.message);
                                  setTimeout(() => {
                                    window.location.reload();
                                  }, 500);
                                } else if (
                                  response.status == 200 &&
                                  response.data.status == "error"
                                ) {
                                  message.error(response.data.message);
                                }
                              });
                          }
                        }
                      }}
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </StatusModal>
            </>
          );
        } else {
          return;
        }
      },
    },
    // {
    //   title: "Docs",
    //   dataIndex: "formFields",
    //   render: (arr) => {
    //     if (Object.keys(arr).length === 0 && arr.constructor === Object) {
    //       return null;
    //     } else {
    //       return (
    //         <>
    //           <SnippetsOutlined onClick={showDocView} />
    //           <Modal
    //             title="Documents Submitted"
    //             open={docView}
    //             onOk={hideDocView}
    //             onCancel={hideDocView}
    //             okText="Ok"
    //             cancelText="Cancel"
    //           >
    //             {arr.map((data) => {
    //               return (
    //                 <span>
    //                   <p>{data.fieldName} : </p>
    //                   <img
    //                     src={data.value}
    //                     width="100px"
    //                     onClick={() => {
    //                       openImageViewer();
    //                     }}
    //                   />
    //                 </span>
    //               );
    //             })}
    //           </Modal>
    //         </>
    //       );
    //     }
    //   },
    // },
  ];

  const RejectedListColumns = [
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
            {text}
          </a>
        );
      },
    },
    { title: "Application ID", dataIndex: "ApplicationCode" },
    {
      title: "Beneficiary Name",
      dataIndex: "candidate__name",
      width: "15%",
    },
    {
      title: "Beneficiary Id",
      dataIndex: "candidate__uniqueId",
      ...getColumnSearchProps("candidate__uniqueId"),
    },
    {
      title: "Phone Number",
      dataIndex: "candidate__phoneNumber",
      width: "5%",
    },
    {
      title: "Caste",
      dataIndex: "candidate__CasteName",
    },
    {
      title: "District",
      dataIndex: "candidate__district",
      filterSearch: true,
      filters: disData,
      onFilter: (value, record) =>
        record.candidate__district.indexOf(value) === 0,
    },
    {
      title: "Application Status",
      dataIndex: "JobTabStatus",
      render: (text) => {
        return <PendingStatus>{text}</PendingStatus>;
      },
    },
    {
      title: "Job Name",
      dataIndex: "job__JobName",
      width: "15%",
      ...getColumnSearchProps("job__JobName"),
    },
    {
      title: "Application Date",
      dataIndex: "createdDate",
      ...getColumnSearchProps("createdDate"),
      render: (text) => {
        return text.slice(0, 10);
      },
    },
    {
      title: "Cgm Remarks",
      dataIndex: "CgmRemarks",
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
          return <Selected>{status}</Selected>;
        } else if (status == "Rejected") {
          return <PendingStatus>{status}</PendingStatus>;
        }
      },
    },
    {
      title: "View",
      dataIndex: "candidate",
      render: (text) => {
        return (
          <>
            <AiFillEye
              style={{
                fontSize: "15px",
                marginRight: "5px",
                cursor: "pointer",
              }}
              onClick={() => {
                axios
                  .get(
                    `${REACT_APP_BASE_URL}/adminmodule/UserListView/${text}/`
                  )
                  .then((response) => {
                    setUserDetails(response.data.data);
                    setViewProfile(true);
                  })
                  .catch((error) => {
                    message.error(error.data.message);
                  });
              }}
            />
          </>
        );
      },
    },
    {
      title: "Edit",
      dataIndex: ["id", "list"],
    },
  ];

  const [open, setOpen] = useState(false);
  const showModal = (id) => {
    setOpen(true);
    if (UserGroup == "admin") {
      setCgmField(true);
    } else if (UserGroup == "cgm") {
      setFinalField(true);
    }
  };
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  // Photo View
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const openImageViewer = useCallback(() => {
    setIsViewerOpen(true);
  }, []);
  const closeImageViewer = () => {
    setIsViewerOpen(false);
  };

  // Caste Certificate View

  const [isCasteViewerOpen, setIsCasteViewerOpen] = useState(false);
  const openCasteImageViewer = useCallback(() => {
    setIsCasteViewerOpen(true);
  });
  const closeCasteImageViewer = useCallback(() => {
    setIsCasteViewerOpen(false);
  });

  // Income Certificate View

  const [isIncomeViewerOpen, setIsIncomeViewerOpen] = useState(false);
  const openIncomeViewer = useCallback(() => {
    setIsIncomeViewerOpen(true);
  }, []);
  const closeIncomeViewer = () => {
    setIsIncomeViewerOpen(false);
  };

  // Disability Certificate View

  const [isDisabilityOpen, setIsDisabilityOpen] = useState(false);
  const openDisabilityViewer = useCallback(() => {
    setIsDisabilityOpen(true);
  }, []);
  const closeDisabilityViewer = () => {
    setIsDisabilityOpen(false);
  };

  // Marksheets View
  const [isMarksheetOpen, setIsMarksheetOpen] = useState(false);
  const openMarksheetViewer = useCallback(() => {
    setIsMarksheetOpen(true);
  }, []);
  const closeMarksheetViewer = () => {
    setIsMarksheetOpen(false);
  };

  // Resume View

  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const openResumeViewer = useCallback(() => {
    setIsResumeOpen(true);
  }, []);
  const closeResumeViewer = () => {
    setIsResumeOpen(false);
  };

  if (viewProfile == true) {
    return (
      <MainContainer>
        {isViewerOpen && (
          <ImageViewer
            src={[REACT_APP_BASE_URL + userDetails.UserPersonalInfo[0].photo]}
            onClose={closeImageViewer}
            backgroundStyle={{
              backgroundColor: "rgba(0,0,0,0.9)",
            }}
          />
        )}
        {isCasteViewerOpen && (
          <ImageViewer
            src={[
              REACT_APP_BASE_URL +
                userDetails.UserPersonalInfo[0].casteCertificate,
            ]}
            onClose={closeCasteImageViewer}
            backgroundStyle={{
              backgroundColor: "rgba(0,0,0,0.9)",
            }}
          />
        )}
        {isIncomeViewerOpen && (
          <ImageViewer
            src={[
              REACT_APP_BASE_URL +
                userDetails.CustomUserIncomeAndDomicileInfo[0]
                  .incomeCertificate,
            ]}
            onClose={closeIncomeViewer}
            backgroundStyle={{
              backgroundColor: "rgba(0,0,0,0.9)",
            }}
          />
        )}
        {isDisabilityOpen && (
          <ImageViewer
            src={[
              REACT_APP_BASE_URL +
                userDetails.CustomUsereligibilityInfo[0].disabilityCertificate,
            ]}
            onClose={closeDisabilityViewer}
            backgroundStyle={{
              backgroundColor: "rgba(0,0,0,0.9)",
            }}
          />
        )}
        {isMarksheetOpen && (
          <ImageViewer
            src={[
              REACT_APP_BASE_URL +
                userDetails.CustomUserQualificationInfo[0].marksheets,
            ]}
            onClose={closeMarksheetViewer}
            backgroundStyle={{
              backgroundColor: "rgba(0,0,0,0.9)",
            }}
          />
        )}
        {isResumeOpen && (
          <ImageViewer
            src={[
              REACT_APP_BASE_URL +
                userDetails.CustomUserQualificationInfo[0].resume,
            ]}
            onClose={closeResumeViewer}
            backgroundStyle={{
              backgroundColor: "rgba(0,0,0,0.9)",
            }}
          />
        )}
        <BiArrowBack
          onClick={() => setViewProfile(false)}
          style={{ cursor: "pointer", fontSize: "20px" }}
        />
        <Collapse defaultActiveKey={["1"]} ghost>
          <Panel header="Personal Information" key="1">
            <Content>
              <Row>
                <Col span={6}>
                  <SubHeading>
                    <Title>Name</Title> :<br />
                    {userDetails.UserPersonalInfo[0].name}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Gender</Title> :
                    {userDetails.UserPersonalInfo[0].gender == "M" ? (
                      <SubHeading>Male</SubHeading>
                    ) : (
                      <SubHeading>Female</SubHeading>
                    )}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>DOB</Title> : <br />
                    {userDetails.UserPersonalInfo[0].dob}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Email</Title> : <br />{" "}
                    {userDetails.UserPersonalInfo[0].emailId}
                  </SubHeading>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <SubHeading>
                    <Title>Marital Status</Title> :
                    {userDetails.UserPersonalInfo[0].maritalStatus == false ? (
                      <SubHeading>Unmarried</SubHeading>
                    ) : (
                      <SubHeading>Married</SubHeading>
                    )}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Languages</Title> :<br />
                    {userDetails.UserPersonalInfo[0].languages}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Age</Title> : <br />
                    {userDetails.UserPersonalInfo[0].age}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Phone Number</Title> :<br />
                    {userDetails.UserPersonalInfo[0].phoneNumber}
                  </SubHeading>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <SubHeading>
                    <Title>Caste</Title> : <br />
                    {userDetails.UserPersonalInfo[0].caste}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Sub Caste</Title> :<br />
                    {userDetails.UserPersonalInfo[0].subCaste}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Have Caste Certificate ?</Title> :
                    {userDetails.UserPersonalInfo[0].haveCasteCertificate ==
                    false ? (
                      <SubHeading>No</SubHeading>
                    ) : (
                      <SubHeading>Yes</SubHeading>
                    )}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Caste Certificate From Aaple Sarkar</Title> :
                    {userDetails.UserPersonalInfo[0]
                      .isCasteCertificateFromAaple == false ? (
                      <SubHeading>No</SubHeading>
                    ) : (
                      <SubHeading>Yes</SubHeading>
                    )}
                  </SubHeading>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <SubHeading>
                    <Title>Caste Certificate Number</Title> : <br />
                    {userDetails.UserPersonalInfo[0].casteCertificateNumber}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Issue Authority</Title> : <br />
                    {userDetails.UserPersonalInfo[0].issueAuthority}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Issue Date</Title> : <br />
                    {userDetails.UserPersonalInfo[0].issueDate}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Parent Mobile</Title> : <br />
                    {userDetails.UserPersonalInfo[0].parentMobile}
                  </SubHeading>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <SubHeading>
                    <Title>Name as SSC</Title> : <br />
                    {userDetails.UserPersonalInfo[0].nameAsSsc}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>District</Title> : <br />
                    {userDetails.UserPersonalInfo[0].district}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Taluka</Title> : <br />
                    {userDetails.taluka}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>State</Title> : <br />
                    {userDetails.state}
                  </SubHeading>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <SubHeading>
                    <Title>Village</Title> : <br />
                    {userDetails.village}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Photo</Title> : <br />
                    <a
                      href={
                        REACT_APP_BASE_URL +
                        userDetails.UserPersonalInfo[0].photo
                      }
                      target="_blank"
                    >
                      Photo
                    </a>
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Caste Certificate</Title> : <br />
                    <a
                      href={
                        REACT_APP_BASE_URL +
                        userDetails.UserPersonalInfo[0].casteCertificate
                      }
                      target="_blank"
                    >
                      Caste Certificate
                    </a>
                  </SubHeading>
                </Col>
                <Col span={6}></Col>
              </Row>
            </Content>
          </Panel>
          <Panel header="Income and Domicile Information" key="2">
            <Content>
              <Row>
                <Col span={6}>
                  <SubHeading>
                    <Title>Family Income</Title> : <br />
                    {
                      userDetails.CustomUserIncomeAndDomicileInfo[0]
                        .familyIncome
                    }
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Do you have Income Certificate</Title> : <br />
                    {userDetails.CustomUserIncomeAndDomicileInfo[0]
                      .haveIncomeCertificate == true ? (
                      <SubHeading>Yes</SubHeading>
                    ) : (
                      <SubHeading>No</SubHeading>
                    )}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Income Certificate Number</Title> : <br />
                    {
                      userDetails.CustomUserIncomeAndDomicileInfo[0]
                        .incomeCertificateNumber
                    }
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Is Income Certificate From Aaple</Title> : <br />
                    {userDetails.CustomUserIncomeAndDomicileInfo[0]
                      .isIncomeCertificateFromAaple == true ? (
                      <SubHeading>Yes</SubHeading>
                    ) : (
                      <SubHeading>No</SubHeading>
                    )}
                  </SubHeading>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <SubHeading>
                    <Title>Issue Authority</Title> : <br />
                    {
                      userDetails.CustomUserIncomeAndDomicileInfo[0]
                        .issueAuthority
                    }
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Issue Date</Title> : <br />
                    {userDetails.CustomUserIncomeAndDomicileInfo[0].issueDate}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Issue Date Of Domicile</Title> : <br />
                    {
                      userDetails.CustomUserIncomeAndDomicileInfo[0]
                        .issueDateOfDomicile
                    }
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Income Certificate</Title> : <br />
                    <a
                      href={
                        REACT_APP_BASE_URL +
                        userDetails.CustomUserIncomeAndDomicileInfo[0]
                          .incomeCertificate
                      }
                      target="_blank"
                    >
                      Income Certificate
                    </a>
                  </SubHeading>
                </Col>
              </Row>
            </Content>
          </Panel>
          <Panel header="Eligibility Information" key="3">
            <Content>
              <Row>
                <Col span={6}>
                  <SubHeading>
                    <Title>Are you Salaried</Title> : <br />
                    {userDetails.CustomUsereligibilityInfo[0].isSalaried ==
                    true ? (
                      <SubHeading>Yes</SubHeading>
                    ) : (
                      <SubHeading>No</SubHeading>
                    )}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Job Type</Title> : <br />
                    {userDetails.CustomUsereligibilityInfo[0].jobType}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Are you Disabled</Title> : <br />
                    {userDetails.CustomUsereligibilityInfo[0].isDisability ==
                    true ? (
                      <SubHeading>Yes</SubHeading>
                    ) : (
                      <SubHeading>No</SubHeading>
                    )}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Disability</Title> : <br />
                    {userDetails.CustomUsereligibilityInfo[0].disability}
                  </SubHeading>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <SubHeading>
                    <Title>Have Disability Certificate ?</Title> : <br />
                    {userDetails.CustomUsereligibilityInfo[0]
                      .haveDisabilityCertificate == true ? (
                      <SubHeading>Yes</SubHeading>
                    ) : (
                      <SubHeading>No</SubHeading>
                    )}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Have Pid Number ?</Title> : <br />
                    {userDetails.CustomUsereligibilityInfo[0].havePidNo ==
                    true ? (
                      <SubHeading>Yes</SubHeading>
                    ) : (
                      <SubHeading>No</SubHeading>
                    )}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Disability Certificate Number</Title> : <br />
                    {
                      userDetails.CustomUsereligibilityInfo[0]
                        .disabilityCertificateNumber
                    }
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Issue Authority</Title> : <br />
                    {userDetails.CustomUsereligibilityInfo[0].issueAuthority}
                  </SubHeading>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <SubHeading>
                    <Title>Date of Issue</Title> : <br />
                    {userDetails.CustomUsereligibilityInfo[0].issueDate}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Aadhar Linked With Bank/Yuva/ Jandhan</Title> :
                    <br />
                    {userDetails.CustomUsereligibilityInfo[0]
                      .isAadharLinkedWithBankOrYuvaOrJandhan == true ? (
                      <SubHeading>Yes</SubHeading>
                    ) : (
                      <SubHeading>No</SubHeading>
                    )}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Account Have Limit Of Withdrawal Or Deposit</Title> :
                    <br />
                    {userDetails.CustomUsereligibilityInfo[0]
                      .doesAccountHaveLimitOfWithOrDepo == true ? (
                      <SubHeading>Yes</SubHeading>
                    ) : (
                      <SubHeading>No</SubHeading>
                    )}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Disablilty Certificate</Title> : <br />
                    <a
                      href={
                        REACT_APP_BASE_URL +
                        userDetails.CustomUsereligibilityInfo[0]
                          .disabilityCertificate
                      }
                      target="_blank"
                    >
                      Disablilty Certificate
                    </a>
                  </SubHeading>
                </Col>
              </Row>
            </Content>
          </Panel>
          <Panel header="Qualification Information" key="4">
            <Row>
              <Col span={6}>
                <SubHeading>
                  <Title>Qualification Level</Title> : <br />
                  {
                    userDetails.CustomUserQualificationInfo[0]
                      .qualificationLevel
                  }
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Stream</Title> : <br />
                  {userDetails.CustomUserQualificationInfo[0].stream}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Is Qualification Completed ?</Title> :
                  <br />
                  {userDetails.CustomUserQualificationInfo[0].completed ==
                  true ? (
                    <SubHeading>Yes</SubHeading>
                  ) : (
                    <SubHeading>No</SubHeading>
                  )}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>College School Name</Title> : <br />
                  {userDetails.CustomUserQualificationInfo[0].collegeSchoolName}
                </SubHeading>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <SubHeading>
                  <Title>Course</Title> : <br />
                  {userDetails.CustomUserQualificationInfo[0].course}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Board University</Title> : <br />
                  {userDetails.CustomUserQualificationInfo[0].boardUniversity}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Mode of Exam</Title> :
                  <br />
                  {userDetails.CustomUserQualificationInfo[0].mode}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Admission Year</Title> :
                  <br />
                  {userDetails.CustomUserQualificationInfo[0].admissionYear}
                </SubHeading>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <SubHeading>
                  <Title>Passing Year</Title> :
                  <br />
                  {userDetails.CustomUserQualificationInfo[0].passingYear}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Result</Title> :
                  <br />
                  {userDetails.CustomUserQualificationInfo[0].result}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Percentage</Title> :
                  <br />
                  {userDetails.CustomUserQualificationInfo[0].percentage}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Attempts</Title> :
                  <br />
                  {userDetails.CustomUserQualificationInfo[0].attempts}
                </SubHeading>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <SubHeading>
                  <Title>Any Gap ?</Title> :
                  <br />
                  {userDetails.CustomUserQualificationInfo[0].wasAnyGap ==
                  true ? (
                    <SubHeading>Yes</SubHeading>
                  ) : (
                    <SubHeading>No</SubHeading>
                  )}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Institute District</Title> :
                  <br />
                  {userDetails.CustomUserQualificationInfo[0].instituteDistrict}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Institute State</Title> :
                  <br />
                  {userDetails.CustomUserQualificationInfo[0].instituteState}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Institute Taluka</Title> :
                  <br />
                  {userDetails.CustomUserQualificationInfo[0].instituteTaluka}
                </SubHeading>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <SubHeading>
                  <Title>Marksheets</Title> :
                  <br />
                  <a
                    href={
                      REACT_APP_BASE_URL +
                      userDetails.CustomUserQualificationInfo[0].marksheets
                    }
                    target="_blank"
                  >
                    Marksheets
                  </a>
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Resume</Title> :
                  <br />
                  <a
                    href={
                      REACT_APP_BASE_URL +
                      userDetails.CustomUserQualificationInfo[0].resume
                    }
                    target="_blank"
                  >
                    Resume
                  </a>
                </SubHeading>
              </Col>
            </Row>
          </Panel>
          <Panel header="Residential Information" key="5">
            <Row>
              <Col span={6}>
                <SubHeading>
                  <Title>Address</Title> :
                  <br />
                  {userDetails.CustomUserResidentialInfo[0].address}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>State</Title> :
                  <br />
                  {userDetails.CustomUserResidentialInfo[0].state}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>District</Title> :
                  <br />
                  {userDetails.CustomUserResidentialInfo[0].district}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Taluka</Title> :
                  <br />
                  {userDetails.CustomUserResidentialInfo[0].taluka}
                </SubHeading>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <SubHeading>
                  <Title>Address Same as Permanent ?</Title> :
                  <br />
                  {userDetails.CustomUserResidentialInfo[0]
                    .isAddressSameAsPermanent == true ? (
                    <SubHeading>Yes</SubHeading>
                  ) : (
                    <SubHeading>No</SubHeading>
                  )}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Correspondence Address</Title> :
                  <br />
                  {
                    userDetails.CustomUserResidentialInfo[0]
                      .correspondenceAddress
                  }
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Correspondence State</Title> :
                  <br />
                  {userDetails.CustomUserResidentialInfo[0].correspondenceState}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Correspondence District</Title> :
                  <br />
                  {
                    userDetails.CustomUserResidentialInfo[0]
                      .correspondenceDistrict
                  }
                </SubHeading>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <SubHeading>
                  <Title>Correspondence District</Title> :
                  <br />
                  {
                    userDetails.CustomUserResidentialInfo[0]
                      .correspondenceDistrict
                  }
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Correspondence Taluka</Title> :
                  <br />
                  {
                    userDetails.CustomUserResidentialInfo[0]
                      .correspondenceTaluka
                  }
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Correspondence Village</Title> :
                  <br />
                  {
                    userDetails.CustomUserResidentialInfo[0]
                      .correspondenceVillage
                  }
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Correspondence PinCode</Title> :
                  <br />
                  {
                    userDetails.CustomUserResidentialInfo[0]
                      .correspondencePinCode
                  }
                </SubHeading>
              </Col>
            </Row>
          </Panel>
          <Panel header="Bank Information" key="6">
            <Row>
              <Col span={6}>
                <SubHeading>
                  <Title>Bank Name</Title> :
                  <br />
                  {userDetails.CustomUserBankInfo[0].bankName}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Bank Account Number</Title> :
                  <br />
                  {userDetails.CustomUserBankInfo[0].bankAccountNo}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Branch Name</Title> :
                  <br />
                  {userDetails.CustomUserBankInfo[0].branchName}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>IFSC Code</Title> :
                  <br />
                  {userDetails.CustomUserBankInfo[0].ifscCode}
                </SubHeading>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <SubHeading>
                  <Title>Is Aadhar linked with Bank / Yuva / Jandhan ?</Title>
                  :
                  <br />
                  {userDetails.CustomUserBankInfo[0].ifscCode}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>
                    Does Account have Limit of withdrawal or Deposit ?
                  </Title>
                  :
                  <br />
                  {userDetails.CustomUserQualificationInfo[0]
                    .doesAccountHaveLimitOfWithOrDepo == true ? (
                    <SubHeading>Yes</SubHeading>
                  ) : (
                    <SubHeading>No</SubHeading>
                  )}
                </SubHeading>
              </Col>
            </Row>
          </Panel>
          <Panel header="Other Information" key="7">
            <Row>
              <Col span={6}>
                <SubHeading>
                  <Title>Is Father Alive ?</Title>
                  :
                  <br />
                  {userDetails.CustomUserOtherInfo[0].isFatherAlive == true ? (
                    <SubHeading>Yes</SubHeading>
                  ) : (
                    <SubHeading>No</SubHeading>
                  )}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Father Name</Title>
                  :
                  <br />
                  {userDetails.CustomUserOtherInfo[0].fatherName}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Is Father Salaried ? </Title>
                  :
                  <br />
                  {userDetails.CustomUserOtherInfo[0].isFatherSalaried ==
                  true ? (
                    <SubHeading>Yes</SubHeading>
                  ) : (
                    <SubHeading>No</SubHeading>
                  )}{" "}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Occupation of Father</Title>
                  :
                  <br />
                  {userDetails.CustomUserOtherInfo[0].fatherOccupation}
                </SubHeading>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <SubHeading>
                  <Title>Is Father Salaried ? </Title>
                  :
                  <br />
                  {userDetails.CustomUserOtherInfo[0].isFatherSalaried ==
                  true ? (
                    <SubHeading>Yes</SubHeading>
                  ) : (
                    <SubHeading>No</SubHeading>
                  )}
                </SubHeading>
              </Col>
              <Col span={6}>
                {" "}
                <SubHeading>
                  <Title>Occupation of Father</Title>
                  :
                  <br />
                  {userDetails.CustomUserOtherInfo[0].fatherOccupation}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Is Mother Alive ? </Title>
                  :
                  <br />
                  {userDetails.CustomUserOtherInfo[0].isMotherAlive == true ? (
                    <SubHeading>Yes</SubHeading>
                  ) : (
                    <SubHeading>No</SubHeading>
                  )}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Name of Mother</Title>
                  :
                  <br />
                  {userDetails.CustomUserOtherInfo[0].motherName}
                </SubHeading>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <SubHeading>
                  <Title>Is Mother Salaried ? </Title>
                  :
                  <br />
                  {userDetails.CustomUserOtherInfo[0].isMotherSalaried ==
                  true ? (
                    <SubHeading>Yes</SubHeading>
                  ) : (
                    <SubHeading>No</SubHeading>
                  )}
                </SubHeading>
              </Col>
              <Col span={6}>
                {" "}
                <SubHeading>
                  <Title>Occupation of Mother</Title>
                  :
                  <br />
                  {userDetails.CustomUserOtherInfo[0].motherOccupation}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Ready to Relocate in Maharashtra ?</Title>
                  :
                  <br />
                  {userDetails.CustomUserOtherInfo[0]
                    .readyToRelocateInMaharashtra == true ? (
                    <SubHeading>Yes</SubHeading>
                  ) : (
                    <SubHeading>No</SubHeading>
                  )}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>District 1</Title>
                  :
                  <br />
                  {userDetails.CustomUserOtherInfo[0].district1}
                </SubHeading>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <SubHeading>
                  <Title>District 2</Title>
                  :
                  <br />
                  {userDetails.CustomUserOtherInfo[0].district2}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>District 3</Title>
                  :
                  <br />
                  {userDetails.CustomUserOtherInfo[0].district3}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>wheather stay in City ? </Title>
                  :
                  <br />
                  {userDetails.CustomUserOtherInfo[0].isMotherSalaried ==
                  true ? (
                    <SubHeading>Yes</SubHeading>
                  ) : (
                    <SubHeading>No</SubHeading>
                  )}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>wheather stay in Rural ? </Title>
                  :
                  <br />
                  {userDetails.CustomUserOtherInfo[0].wheatherStayInRural ==
                  true ? (
                    <SubHeading>Yes</SubHeading>
                  ) : (
                    <SubHeading>No</SubHeading>
                  )}
                </SubHeading>
              </Col>
            </Row>
          </Panel>
        </Collapse>
      </MainContainer>
    );
  } else {
    return (
      <Spin tip="Loading data..." spinning={isUpdated}>
        <div>
          <h3>Beneficiary Job Applications</h3>
          <Tabs defaultActiveKey="1">
            {UserGroup == "cgm" ? (
              <>
                <Tabs.TabPane tab="Pending Applications" key="1">
                  <DataTable
                    columns={PendingListcolumns}
                    dataSource={pendingJobApplicationList}
                    pagination={{ pageSize: 10 }}
                  />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Shortlisted Applications" key="2">
                  <DataTable
                    columns={ShortlistedListColumns}
                    dataSource={sortlistedJobList}
                    pagination={{ pageSize: 10 }}
                  />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Selected Applications" key="3">
                  <DataTable
                    columns={SelectedListColumns}
                    dataSource={selectedJobList}
                    pagination={{ pageSize: 10 }}
                  />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Rejected Applications" key="4">
                  <DataTable
                    columns={RejectedListColumns}
                    dataSource={rejectedJobList}
                    pagination={{ pageSize: 10 }}
                  />
                </Tabs.TabPane>
              </>
            ) : (
              <>
                <Tabs.TabPane tab="Selected Applications" key="3">
                  <DataTable
                    columns={SelectedListColumns}
                    dataSource={selectedJobList}
                    pagination={{ pageSize: 10 }}
                  />
                </Tabs.TabPane>
              </>
            )}
          </Tabs>
        </div>
      </Spin>
    );
  }
};
export default BeneficiaryJobApplications;
