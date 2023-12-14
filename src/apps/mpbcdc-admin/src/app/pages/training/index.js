import React, { useState, useRef } from "react";
import { DataTable } from "../../../../style";
import { TrainingList } from "../../constants/columns";
import useMpbcdc from "../container";
import { trainingwAuthInstance } from "../../../../../../libs/utils/fetch-utils";
import {
  Col,
  Collapse,
  Modal,
  Row,
  Select,
  Spin,
  message,
  Button,
  Space,
  Input,
} from "antd";
import { DmRoutes } from "../../../../../dm-side/src/app/constants/routes";
import {
  JobDescription,
  MonthTag,
  StatusTag,
  VacancyTag,
} from "../../../../../../libs/common-ui/Home/style";
import { MdDateRange } from "react-icons/md";
import { AiFillEye, AiTwotoneEdit } from "react-icons/ai";
import axios from "axios";
import { REACT_APP_BASE_URL } from "../../../../../../libs/utils/urls";
import {
  Content,
  MainContainer,
  SubHeading,
  Title,
} from "../../../../../user-side/style";
import { SearchOutlined } from "@ant-design/icons";
import { BiArrowBack } from "react-icons/bi";
import { GrDocumentText } from "react-icons/gr";
import Highlighter from "react-highlight-words";

const { Option } = Select;
const { Panel } = Collapse;

const MpbcdcTrainingList = () => {
  const { trainingApplicationList } = useMpbcdc();
  const [userDetails, setUserDetails] = useState();
  const [viewProfile, setViewProfile] = useState(false);

  const [formData, setFormData] = useState();
  const [modalLoad, setModalLoad] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFormOk = () => {
    setIsModalOpen(false);
  };
  const handleFormCancel = () => {
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
  const columns = [
    {
      title: "Training",
      dataIndex: "training",
      render: (text) => {
        return (
          <a
            onClick={() => {
              trainingwAuthInstance
                .get(`${DmRoutes.Training.TRAINING_BY_ID}/${text}/`)
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
      title: "Name of Applicant",
      dataIndex: "user_name",
      ...getColumnSearchProps("user_name"),
    },
    {
      title: "Name of training",
      dataIndex: "training_name",
      ...getColumnSearchProps("training_name"),
    },
    { title: "Technical Education", dataIndex: "technicalEducation" },
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
    },
    { title: "Dm Remarks", dataIndex: "dmRemarks" },
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
    },
    {
      title: "View Profile",
      dataIndex: "id",
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
              onOk={handleFormOk}
              onCancel={handleFormCancel}
            >
              {modalLoad == true ? (
                <Spin tip="Loading data..." />
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
  ];
  if (viewProfile == true) {
    return (
      <div>
        <BiArrowBack
          onClick={() => setViewProfile(false)}
          style={{ fontSize: "18px", cursor: "pointer" }}
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
                  {" "}
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
                  {" "}
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
      </div>
    );
  } else {
    return (
      <div>
        <h3>Training List</h3>
        <DataTable
          columns={columns}
          dataSource={trainingApplicationList}
          pagination={{ pageSize: 5 }}
        />
      </div>
    );
  }
};
export default MpbcdcTrainingList;
