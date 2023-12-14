import React, { useState, useRef } from "react";
import { ApprovedStatus, DataTable, PendingStatus } from "../../../../style";
import { BeneficiaryListcolumns } from "../../constants/columns";
import {
  Tabs,
  Button,
  message,
  Collapse,
  Row,
  Col,
  Form,
  Select,
  Space,
  Input,
  Modal,
} from "antd";
import useCgmData from "../container";
import { AiFillEye } from "react-icons/ai";
import { REACT_APP_BASE_URL } from "../../../../../../libs/utils/urls";
import axios from "axios";
import {
  MainContainer,
  SubHeading,
  Title,
  Content,
  StatusModal,
  StatusFields,
} from "./style";
import { BiArrowBack } from "react-icons/bi";
import { AiTwotoneEdit } from "react-icons/ai";
import TextArea from "antd/lib/input/TextArea";
import { Token } from "../../../../../../libs/utils/sessionStorage";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import disData from "../../../../../../data/disFilter.json";
import { Shortlisted } from "../../../../../admin-side/src/app/pages/training/style";
import { render } from "@testing-library/react";

const { Panel } = Collapse;
const { Option } = Select;
const CgmSpecialSchemes = () => {
  const {
    schemePenList,
    schemeShortList,
    schemeSelectList,
    schemeRejectList,
    getPendingNext,
    getPendingPrev,
  } = useCgmData();
  const [viewProfile, setViewProfile] = useState(false);
  const [userDetails, setUserDetails] = useState();

  const [schemeStatus, setSchemeStatus] = useState();
  const [remarks, setRemarks] = useState();

  const [open, setOpen] = useState(false);
  const showModal = (id) => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
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

  const [tabKey, setTabKey] = useState("1");
  const [schemeAppId, setSchemeAppId] = useState();

  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState();
  const SpecialSchemes = [
    {
      title: "Beneficiary Name",
      dataIndex: "NameOfBeneficiary",
      key: "NameOfBeneficiary",
      width: "10%",
      ...getColumnSearchProps("NameOfBeneficiary"),
    },
    {
      title: "Beneficiary ID",
      dataIndex: "schemeBeneficary__uniqueId",
      ...getColumnSearchProps("schemeBeneficary__uniqueId"),
    },
    {
      title: "Region",
      dataIndex: "Region",
      width: "5%",
    },
    { title: "Annual Family Income", dataIndex: "Annual_Family_Income" },
    {
      title: "Email",
      dataIndex: "emailId",
      width: "5%",
    },
    {
      title: "Applied Scheme",
      dataIndex: "specialScheme_id",
      render: (id) => {
        if (id == 1) {
          return <>Mahogany Tree Plantation</>;
        } else if (id == 2) {
          return <>Affordable Housing</>;
        } else if (id == 3) {
          return <>Construction Activities</>;
        } else if (id == 4) {
          return <>Plantation, Beatification & Landscaping Works</>;
        } else if (id == 5) {
          return <>E - Rickshaw</>;
        }
      },
    },
    {
      title: "District",
      dataIndex: "District",
      key: "district",
      filterSearch: true,
      filters: disData,
      onFilter: (value, record) => record.District.indexOf(value) === 0,
    },
    {
      title: "Name of Company",
      dataIndex: "nameOfCompany",
      ...getColumnSearchProps("nameOfCompany"),
    },
    {
      title: "Application Date",
      dataIndex: "createdDate",
      ...getColumnSearchProps("createdDate"),
      render: (date) => {
        return <>{date.slice(0, 10)}</>;
      },
    },
    {
      title: "Cgm Status",
      dataIndex: "SchemeApplicationStatus",
      render: (text) => {
        if (text == "Pending") {
          return <PendingStatus>{text}</PendingStatus>;
        } else if (text == "Shortlisted") {
          return <Shortlisted>{text}</Shortlisted>;
        } else if (text == "Selected") {
          return <ApprovedStatus>{text}</ApprovedStatus>;
        } else if (text == "Rejected") {
          return <PendingStatus>{text}</PendingStatus>;
        }
      },
    },
    {
      title: "Cgm Remarks",
      dataIndex: "CgmSchemeRemarks",
    },
    {
      title: "View Form",
      dataIndex: ["specialScheme", "schemeData"],
      render: (id, data) => {
        return (
          <>
            <AiFillEye
              style={{ fontSize: "15px", cursor: "pointer" }}
              onClick={() => {
                setFormVisible(true);
                setFormData(data);
              }}
            />
          </>
        );
      },
    },
    {
      title: "View Profile",
      dataIndex: "schemeBeneficary_id",
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
                    message.error(error.response.data.message);
                  });
              }}
            />
          </>
        );
      },
    },
    {
      title: "Actions",
      dataIndex: ["id", "schemeList"],
      render: (text, data) => {
        if (
          data.SchemeApplicationStatus == "Selected" ||
          data.SchemeApplicationStatus == "Rejected"
        ) {
          return;
        } else {
          return (
            <>
              <a
                onClick={() => {
                  setOpen(true);
                  setSchemeAppId(data.id);
                  setRemarks(data.CgmSchemeRemarks);
                }}
              >
                <AiTwotoneEdit
                  style={{ fontSize: "15px", marginRight: "5px" }}
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
                    <Form.Item label="CGM Status" required>
                      <Select
                        style={{ width: "220px" }}
                        onChange={(v) => {
                          setSchemeStatus(v);
                        }}
                      >
                        {tabKey == "1" ? (
                          <>
                            <Option value="Shortlisted">Shortlisted</Option>
                            <Option value="Rejected">Rejected</Option>
                          </>
                        ) : (
                          <></>
                        )}
                        {tabKey == "2" ? (
                          <>
                            <Option value="Selected">Selected</Option>
                            <Option value="Rejected">Rejected</Option>
                          </>
                        ) : (
                          <></>
                        )}
                      </Select>
                    </Form.Item>
                  </StatusFields>
                  <Row>
                    <Col span={24}>
                      <Form.Item label="Remarks">
                        <TextArea
                          onChange={(e) => {
                            setRemarks(e.target.value);
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item>
                    <Button
                      type="primary"
                      onClick={() => {
                        if (schemeStatus == null) {
                          message.warning("CgmStatus is empty");
                        } else {
                          axios
                            .patch(
                              `${REACT_APP_BASE_URL}/cgm/CgmSpecialSchemeChangeStatus/${schemeAppId}/`,
                              {
                                SchemeApplicationStatus: schemeStatus,
                                CgmSchemeRemarks: remarks,
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
                                response.data.status == "success"
                              ) {
                                message.error(response.data.message);
                              }
                            });
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
        }
      },
    },
  ];

  if (viewProfile == true) {
    return (
      <MainContainer>
        <BiArrowBack onClick={() => setViewProfile(false)} />
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
                    <Title>Email</Title> : <br />
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
                    </a>{" "}
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
                    </a>{" "}
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
                    <Title>Disability Certificate</Title> : <br />
                    <a
                      href={
                        REACT_APP_BASE_URL +
                        userDetails.CustomUsereligibilityInfo[0]
                          .disabilityCertificate
                      }
                      target="_blank"
                    >
                      Disability Certificate
                    </a>{" "}
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
                  <Title>Institute State</Title> :
                  <br />
                  {userDetails.CustomUserQualificationInfo[0].instituteState}
                </SubHeading>
                {/* <SubHeading>
                  <Title>Institute District</Title> :
                  <br />
                  {userDetails.CustomUserQualificationInfo[0].instituteDistrict}
                </SubHeading> */}
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Marksheets</Title> : <br />
                  <a
                    href={
                      REACT_APP_BASE_URL +
                      userDetails.CustomUserQualificationInfo[0].marksheets
                    }
                    target="_blank"
                  >
                    Marksheets
                  </a>{" "}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Resume</Title> : <br />
                  <a
                    href={
                      REACT_APP_BASE_URL +
                      userDetails.CustomUserQualificationInfo[0].resume
                    }
                    target="_blank"
                  >
                    Resume
                  </a>{" "}
                </SubHeading>
                {/* <SubHeading>
                  <Title>Institute Taluka</Title> :
                  <br />
                  {userDetails.CustomUserQualificationInfo[0].instituteTaluka}
                </SubHeading> */}
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
  } else if (viewProfile == false && formVisible == false) {
    return (
      <div>
        <h3>Beneficiary Special Scheme Applications</h3>
        <Tabs
          defaultActiveKey={tabKey}
          onChange={(key) => {
            setTabKey(key);
          }}
          items={[
            {
              label: `Pending Applications`,
              key: "1",
              children: (
                <>
                  <DataTable
                    columns={SpecialSchemes}
                    dataSource={schemePenList}
                  />
                  <Space
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button type="primary" onClick={getPendingPrev}>
                      Prev
                    </Button>
                    <Button type="primary" onClick={getPendingNext}>
                      Next
                    </Button>
                  </Space>
                </>
              ),
            },
            {
              label: `Shortlisted Applications`,
              key: "2",
              children: (
                <>
                  <DataTable
                    columns={SpecialSchemes}
                    dataSource={schemeShortList}
                  />
                  <Space
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button type="primary" onClick={getPendingPrev}>
                      Prev
                    </Button>
                    <Button type="primary" onClick={getPendingNext}>
                      Next
                    </Button>
                  </Space>
                </>
              ),
            },
            {
              label: `Selected Applications`,
              key: "3",
              children: (
                <DataTable
                  columns={SpecialSchemes}
                  dataSource={schemeSelectList}
                />
              ),
            },
            {
              label: `Rejected Applications`,
              key: "4",
              children: (
                <DataTable
                  columns={SpecialSchemes}
                  dataSource={schemeRejectList}
                />
              ),
            },
          ]}
        />
      </div>
    );
  } else if (formVisible == true) {
    return (
      <div>
        <BiArrowBack
          style={{ cursor: "pointer" }}
          onClick={() => setFormVisible(false)}
        />
        <div style={{ marginTop: "20px" }}>
          <b> {formData.NameOfBeneficiary}</b>
          <br />
          <br />
          {formData.specialScheme_id == 1 ? (
            <div>
              <Row>
                <Col span={5}>
                  <b>Do you belong to SC ?</b>
                  <p>
                    {formData.IsBeneficiariesbelongstoScheduledCastecommunities ==
                    true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
                <Col span={5}>
                  <b>Region</b>
                  <p>{formData.Region}</p>
                </Col>
                <Col span={9}>
                  <b>Do you possess or hold minimum one Acer land ?</b>
                  <p>
                    {formData.Is_Beneficiaries_shall_possess_hold_minimum_one_Acer_land ==
                    true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
                <Col span={5}>
                  <b>Availability of water sources</b>
                  <p>
                    {formData.Availability_of_water_sources == true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={5}>
                  <b>Document_7_12</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.Document_7_12}
                    target="_blank"
                  >
                    Document_7_12
                  </a>
                </Col>
                <Col span={5}>
                  <b>PanCard</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.panCard}
                    target="_blank"
                  >
                    PanCard
                  </a>
                </Col>
                <Col span={9}>
                  <b>AadharCard</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.aadharCard}
                    target="_blank"
                  >
                    AadharCard
                  </a>
                </Col>
                <Col span={5}>
                  <b>OtherDocument</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.OtherDocument}
                    target="_blank"
                  >
                    OtherDocument
                  </a>
                </Col>
              </Row>
            </div>
          ) : (
            <></>
          )}
          {formData.specialScheme_id == 2 ? (
            <div>
              <Row>
                <Col span={5}>
                  <b>Do you belong to SC ?</b>
                  <p>
                    {formData.IsBeneficiariesbelongstoScheduledCastecommunities ==
                    true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
                <Col span={4}>
                  <b>Region</b>
                  <p>{formData.Region}</p>
                </Col>
                <Col span={8}>
                  <b>Have your own house under PMAY or EWC ?</b>
                  <p>{formData.haveyourownhouseunderPMAYorEWC}</p>
                </Col>
                <Col span={7}>
                  <b>Under which scheme you need home ?</b>
                  <p>{formData.Under_which_scheme_you_need_home}</p>
                </Col>
              </Row>
              <Row>
                <Col span={5}>
                  <b>Annual Family Income</b>
                  <p>{formData.Annual_Family_Income}</p>
                </Col>
                <Col span={4}>
                  <b>PanCard</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.panCard}
                    target="_blank"
                  >
                    PanCard
                  </a>
                </Col>
                <Col span={8}>
                  <b>AadharCard</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.aadharCard}
                    target="_blank"
                  >
                    AadharCard
                  </a>
                </Col>
                <Col span={6}>
                  <b>IncomeCertificate</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.IncomeCertificate}
                    target="_blank"
                  >
                    IncomeCertificate
                  </a>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <b>OtherDocument</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.OtherDocument}
                    target="_blank"
                  >
                    OtherDocument
                  </a>
                </Col>
                <Col span={6}></Col>
                <Col span={6}></Col>
                <Col span={6}></Col>
              </Row>
            </div>
          ) : (
            <></>
          )}
          {formData.specialScheme_id == 3 ? (
            <div>
              <Row>
                <Col span={5}>
                  {" "}
                  <b>Do you belong to SC ?</b>
                  <p>
                    {formData.IsBeneficiariesbelongstoScheduledCastecommunities ==
                    true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
                <Col span={5}>
                  <b>Region</b>
                  <p>{formData.Region}</p>
                </Col>
                <Col span={6}>
                  <b>Name of Company</b>
                  <p>{formData.nameOfCompany}</p>
                </Col>
                <Col span={8}>
                  <b>Owner of Company</b>
                  <p>{formData.OwnerOfCompany}</p>
                </Col>
              </Row>
              <Row>
                <Col span={5}>
                  <b>Excavation</b>
                  <p>{formData.Excavation == true ? "Yes" : "No"}</p>
                </Col>
                <Col span={5}>
                  <b>Levelling</b>
                  <p>{formData.Levelling == true ? "Yes" : "No"}</p>
                </Col>
                <Col span={5}>
                  <b>RCC_PCC_work</b>
                  <p>{formData.RCC_PCC_work == true ? "Yes" : "No"}</p>
                </Col>
                <Col span={9}>
                  <b>
                    Demarcation of plot boundaries Construction of compound wall
                  </b>
                  <p>
                    {formData.Demarcation_of_plot_boundaries_Construction_of_compound_wall ==
                    true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={5}>
                  <b>Brickwork and Plastering</b>
                  <p>
                    {formData.Brickwork_and_Plastering == true ? "Yes" : "No"}
                  </p>
                </Col>
                <Col span={5}>
                  <b>Doorsandwindowsfitting</b>
                  <p>
                    {formData.Doorsandwindowsfitting == true ? "Yes" : "No"}
                  </p>
                </Col>
                <Col span={5}>
                  <b>Solarpanelfitting</b>
                  <p>{formData.Solarpanelfitting == true ? "Yes" : "No"}</p>
                </Col>
                <Col span={9}>
                  <b>
                    work Reinforcement Cutting Bending of steel and fabrication
                  </b>
                  <p>
                    {formData.work_Reinforcement_Cutting_Bending_of_steel_and_fabrication ==
                    true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={5}>
                  <b>Tree plantation Landscaping</b>
                  <p>
                    {formData.Tree_plantation_Landscaping == true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
                <Col span={5}>
                  <b>Drainage Line and Services Laying</b>
                  <p>
                    {formData.Drainage_Line_and_Services_Laying == true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
                <Col span={5}>
                  <b>PQC</b>
                  <p>{formData.PQC == true ? "Yes" : "No"}</p>
                </Col>
                <Col span={9}>
                  <b>
                    Finishing Electrical work Plumbing work Tiling work Painting
                  </b>
                  <p>
                    {formData.Finishing_Electrical_work_Plumbing_work_Tiling_work_Painting ==
                    true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={5}>
                  <b>Storm water works</b>
                  <p>{formData.Storm_water_works == true ? "Yes" : "No"}</p>
                </Col>
                <Col span={5}>
                  <b>Waterproofing work</b>
                  <p>{formData.Waterproofing_work == true ? "Yes" : "No"}</p>
                </Col>
                <Col span={5}>
                  <b>Transit Mixer Driver and Helper</b>
                  <p>
                    {formData.Transit_Mixer_Driver_and_Helper == true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
                <Col span={9}>
                  <b>Labour work for ancillary activities</b>
                  <p>
                    {formData.Labour_work_for_ancillary_activities == true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={5}>
                  <b>PanCard</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.panCard}
                    target="_blank"
                  >
                    PanCard
                  </a>
                </Col>
                <Col span={5}>
                  <b>AadharCard</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.aadharCard}
                    target="_blank"
                  >
                    AadharCard
                  </a>
                </Col>
                <Col span={5}>
                  <b>IncomeCertificate</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.IncomeCertificate}
                    target="_blank"
                  >
                    IncomeCertificate
                  </a>
                </Col>
                <Col span={8}>
                  <b>Company Incorporation Certificate</b>
                  <br />
                  <a
                    href={
                      REACT_APP_BASE_URL +
                      formData.CompanyIncorporationCertificate
                    }
                  >
                    CompanyIncorporationCertificate
                  </a>
                </Col>
              </Row>
              <br />
              <Row>
                <Col span={5}>
                  <b>OtherDocument</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.OtherDocument}
                    target="_blank"
                  >
                    OtherDocument
                  </a>
                </Col>
              </Row>
            </div>
          ) : (
            <></>
          )}
          {formData.specialScheme_id == 4 ? (
            <div>
              <Row>
                <Col span={5}>
                  <b>Excavation</b>
                  <p>{formData.Excavation == true ? "Yes" : "No"}</p>
                </Col>
                <Col span={5}>
                  <b>Levelling</b>
                  <p>{formData.Levelling == true ? "Yes" : "No"}</p>
                </Col>
                <Col span={5}>
                  <b>RCC_PCC_work</b>
                  <p>{formData.RCC_PCC_work == true ? "Yes" : "No"}</p>
                </Col>
                <Col span={8}>
                  <b>Brickwork and Plastering</b>
                  <p>
                    {formData.Brickwork_and_Plastering == true ? "Yes" : "No"}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={5}>
                  <b>Solarpanelfitting</b>
                  <p>{formData.Solarpanelfitting == true ? "Yes" : "No"}</p>
                </Col>
                <Col span={5}>
                  {" "}
                  <b>Tree plantation Landscaping</b>
                  <p>
                    {formData.Tree_plantation_Landscaping == true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
                <Col span={5}>
                  {" "}
                  <b>Labour work for ancillary activities</b>
                  <p>
                    {formData.Labour_work_for_ancillary_activities == true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
                <Col span={8}>
                  {" "}
                  <b>
                    Finishing Electrical work Plumbing work Tiling work Painting
                  </b>
                  <p>
                    {formData.Finishing_Electrical_work_Plumbing_work_Tiling_work_Painting ==
                    true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={5}>
                  <b>AadharCard</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.aadharCard}
                    target="_blank"
                  >
                    AadharCard
                  </a>
                </Col>
                <Col span={5}>
                  <b>Education Certificate</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.EducationCertificate}
                    target="_blank"
                  >
                    AadharCard
                  </a>
                </Col>
                <Col span={5}>
                  <b>PanCard</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.panCard}
                    target="_blank"
                  >
                    PanCard
                  </a>
                </Col>
                <Col span={8}>
                  <b>Experience Certificate</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.ExpCertificate}
                    target="_blank"
                  >
                    Experience Certificate
                  </a>
                </Col>
              </Row>
            </div>
          ) : (
            <></>
          )}
          {formData.specialScheme_id == 5 ? (
            <div>
              <Row>
                <Col span={6}>
                  <b>Pan Card Number</b>
                  <p>{formData.panNumber}</p>
                </Col>
                <Col span={6}>
                  <b>Area of Operation District</b>
                  <p>{formData.areaOfOperationDistrict}</p>
                </Col>
                <Col span={6}>
                  <b>Area of Operation Taluka</b>
                  <p>{formData.areaOfOperationTaluka}</p>
                </Col>
                <Col span={6}>
                  <b>Availed MPBCDC Loan Before ?</b>
                  <p>
                    {formData.DoyouavailMPBCDCLoanBefore == true ? "Yes" : "No"}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <b>Loan Account number</b>
                  <p>
                    {formData.LoanAccountnumber == null
                      ? "NA"
                      : formData.LoanAccountnumber}
                  </p>
                </Col>
                <Col span={6}>
                  <b>Loan Scheme Name</b>
                  <p>{formData.loanSchemeName}</p>
                </Col>
                <Col span={6}>
                  <b>Loan Present Status</b>
                  <p>{formData.loanPresentStatus}</p>
                </Col>
                <Col span={6}>
                  <b>Want Loan other than MPBCDC ?</b>
                  <p>
                    {formData.willingToHaveLoanOtherThanMpbdc == true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <b>Have Driving License</b>
                  <p>{formData.haveDrivingLicense == true ? "Yes" : "No"}</p>
                </Col>
                <Col span={6}>
                  <b>Driving License Number</b>
                  <p>{formData.drivingLicenseNumber}</p>
                </Col>
                <Col span={6}>
                  <b>Photo</b>
                  <br />
                  <a href={REACT_APP_BASE_URL + formData.photo} target="_blank">
                    Photo
                  </a>
                </Col>
                <Col span={6}>
                  <b>Signature</b>
                  <br />
                  <a href={REACT_APP_BASE_URL + formData.sign} target="_blank">
                    Signature
                  </a>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <b>AadharCard</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.aadharCard}
                    target="_blank"
                  >
                    AadharCard
                  </a>
                </Col>
                <Col span={6}>
                  <b>PanCard</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.panCard}
                    target="_blank"
                  >
                    PanCard
                  </a>
                </Col>
                <Col span={6}>
                  <b>Driving License</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.drivingLicense}
                    target="_blank"
                  >
                    Driving License
                  </a>
                </Col>
                <Col span={6}>
                  <b>IncomeCertificate</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.IncomeCertificate}
                    target="_blank"
                  >
                    IncomeCertificate
                  </a>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <b>MpbdcLoanDoc</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.mpbdcLoanDoc}
                    target="_blank"
                  >
                    MpbdcLoanDoc
                  </a>
                </Col>
                <Col span={6}>
                  <b>RationCard</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.rationCard}
                    target="_blank"
                  >
                    RationCard
                  </a>
                </Col>
              </Row>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
};
export default CgmSpecialSchemes;
