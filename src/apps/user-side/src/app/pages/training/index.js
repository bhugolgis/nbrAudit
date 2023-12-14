import React, { useState, useRef } from "react";
import { trainingwAuthInstance } from "../../../../../../libs/utils/fetch-utils";
import { DataTable, MainContainer } from "../../../../style";
import { ROUTES } from "../../constants/routes/routes";
import useBeneficiaryData from "../container";
import { MdDateRange } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import { JobDescription } from "../dashboard/style";
import { ApprovedStatus, PendingStatus } from "../../../../../cgm-side/style";
import { Shortlisted } from "../../../../../admin-side/src/app/pages/training/style";
import { ImCross } from "react-icons/im";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Col, Modal, Row, Button, Space, Input, Spin } from "antd";
import {
  MonthTag,
  StatusTag,
  VacancyTag,
} from "../../../../../../libs/common-ui/Home/style";
import axios from "axios";
import { REACT_APP_BASE_URL } from "../../../../../../libs/utils/urls";
import { GrDocumentText } from "react-icons/gr";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const { confirm } = Modal;

const UserTrainingApplication = () => {
  const { trainingList } = useBeneficiaryData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState();
  const [modalLoad, setModalLoad] = useState(true);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
  const UserTrainingApplications = [
    {
      title: "Training",
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
    {
      title: "Name",
      dataIndex: "training_name",
      ...getColumnSearchProps("training_name"),
    },
    {
      title: "Education",
      dataIndex: "technicalEducation",
    },
    {
      title: "Ration/VoterID Number",
      dataIndex: "rationCardOrVoterIdCardNumber",
    },
    {
      title: "Applied Date",
      dataIndex: "createdDate",
      ...getColumnSearchProps("createdDate"),
    },
    {
      title: "Application Status",
      dataIndex: "trainingApplicationStatus",
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
      onFilter: (value, record) =>
        record.trainingApplicationStatus.indexOf(value) === 0,
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
        record.trainingFinalStatus.indexOf(value) === 0,
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
      title: "View Form",
      dataIndex: ["id", "profile"],
      render: (id, data) => {
        return (
          <>
            <GrDocumentText
              onClick={() => {
                setIsModalOpen(true);
                trainingwAuthInstance
                  .get(
                    `${REACT_APP_BASE_URL}/training/gettrainingapplicationbyid/${data.id}`
                  )
                  .then((response) => {
                    setModalLoad(false);
                    setFormData(response.data.data);
                  });
              }}
              style={{ cursor: "pointer" }}
            />

            <Modal
              title="Training Application Form"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              {modalLoad == true ? (
                <Spin />
              ) : (
                <>
                  <h3 style={{ color: "#0099ff" }}>Form Details: </h3>
                  <Row>
                    <Col span={12}>
                      <h4>Ration/VoterId Card Number</h4>
                      {formData.rationCardOrVoterIdCardNumber}
                    </Col>
                    <Col span={12}>
                      <h4>Name of Witness 1</h4>
                      {formData.nameOfWitness1}
                    </Col>
                  </Row>
                  <Row style={{ margin: "10px 0px" }}>
                    <Col span={12}>
                      <h4>Name of Witness 2</h4>
                      {formData.nameOfWitness2}
                    </Col>
                    <Col span={12}>
                      <h4>Technical Education</h4>
                      {formData.technicalEducation}
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <h4>Address of School</h4>
                      {formData.addressOfSchool}
                    </Col>
                    <Col span={12}>
                      <h4>Year of Leaving School</h4>
                      {formData.yearOfLeavingSchool}
                    </Col>
                  </Row>
                  <Row style={{ margin: "10px 0px" }}>
                    <Col span={12}>
                      <h4>In Which Grade Left School</h4>
                      {formData.inWhichGradeLeftSchool}
                    </Col>
                    <Col span={12}>
                      <h4>Is Educational Institute Reside in City</h4>
                      {formData.isEducationalInstituteResideInCity == true ? (
                        <>Yes</>
                      ) : (
                        <>No</>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <h4>Details of Experience</h4>
                      {formData.detailsOfApplicantsExperience}
                    </Col>
                    <Col span={12}>
                      <h4>Distance of Residence From Educational Institute</h4>
                      {formData.distanceOfResidenceFromEducationalInstitute}
                    </Col>
                  </Row>
                  <Row style={{ margin: "10px 0px" }}>
                    <Col span={12}>
                      <h4>Income Certificate</h4>
                      <a href={REACT_APP_BASE_URL + formData.incomeCertificate}>
                        Income Certifcate
                      </a>
                    </Col>
                    <Col span={12}>
                      <h4>Ration Card</h4>
                      <a href={REACT_APP_BASE_URL + formData.rationCard}>
                        Ration Card
                      </a>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <h4>School/College Leaving Certificate</h4>
                      <a
                        href={
                          REACT_APP_BASE_URL +
                          formData.schoolOrCollegeLeavingCertificate
                        }
                      >
                        Leaving Cerficate
                      </a>
                    </Col>
                  </Row>
                </>
              )}
            </Modal>
          </>
        );
      },
    },
    {
      title: "Cancel Application",
      dataIndex: ["id", "trainingList"],
      render: (text, data) => {
        if (
          data.trainingApplicationStatus == "Selected" ||
          data.trainingApplicationStatus == "Rejected" ||
          data.trainingFinalStatus == "Rejected"
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
      <h3>Applied Training Applications</h3>
      <DataTable columns={UserTrainingApplications} dataSource={trainingList} />
    </MainContainer>
  );
};

export default UserTrainingApplication;
