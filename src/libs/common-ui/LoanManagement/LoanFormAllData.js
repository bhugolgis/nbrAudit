import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Input,
  Form,
  Divider,
  Tooltip,
  message,
  Spin,
  Row,
  Col,
  Space,
  Select,
  Collapse,
  Modal,
} from "antd";
import { BiArrowBack } from "react-icons/bi";
import { SearchOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import TextArea from "antd/lib/input/TextArea";
import disData from "../../../data/disFilter.json";
import axios from "axios";
import {
  MainContainer,
  DataTable,
  Cards,
  Profile,
  View,
  Edit,
  History,
  LoadContainer,
  ProfileDataModal,
  StatusModal,
  StatusFields,
  ApprovedStatus,
  PendingStatus,
  FormHeading,
  Title,
  DataContainer,
  HtmlTable,
} from "./style";
import useLoanList from "./container";
import { SearchInput } from "../../../apps/admin-side/style";
import data from "../../../data/dtdata.json";
import { REACT_APP_BASE_URL } from "../../utils/urls";
import moment from "moment";
import { loanmanagementInstance } from "../../../libs/utils/fetch-utils";
import { Token, UserGroup } from "../../utils/sessionStorage";
import LoanBankApprovepage from "./LoanBankApprovepage";
import LoanBankReleasepage from "./LoanBankReleasepage";
import LoanBankClosepage from "./LoanBankClosepage";
import Loanlogspage from "./Loanlogspage";
import { jsPDF } from "jspdf";
import { useReactToPrint } from "react-to-print";
import ReactToPrint from "react-to-print";
import DownloadLoanApp from "./loanAppDownload";
import { CloudDownloadOutlined } from "@ant-design/icons";
import Loanpdfdownload from "./Loanpdfdownload";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import { AiFillEye } from "react-icons/ai";
import { SubHeading } from "../../../apps/cgm-side/src/app/pages/schemes/style";
import { Content } from "../../../apps/cgm-side/src/app/pages/Jobs/applications/style";
import LoanForm from "./LoanForm";
import { ImCross } from "react-icons/im";

const ref = React.createRef();
const { Search } = Input;
const { Option } = Select;
const { Panel } = Collapse;
const { confirm } = Modal;

const style = { border: "0px solid #eceff1", padding: "8px 0 0 8px" };

const LoanFormAllData = (props) => {
  const [modalLoading, setModalLoading] = useState(true);

  const [loanformUpdate, setLoanformUpdate] = useState(false);

  const [viewProfile, setViewProfile] = useState(false);
  const [userDetails, setUserDetails] = useState();

  const { userList, pageLoading, nextData, prevData, handleNext, handlePrev } =
    useLoanList(props.statusname, props.heading);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const showTransferModal = () => {
    setIsTransferModalOpen(true);
  };

  const handleTransferOk = () => {
    setIsTransferModalOpen(false);
  };

  const handleTransferCancel = () => {
    setIsTransferModalOpen(false);
  };

  const [isBOPendingModalOpen, setIsBOPendingModalOpen] = useState(false);
  const showBOPendingModal = () => {
    setIsBOPendingModalOpen(true);
  };

  const handleBOPendingOk = () => {
    setIsBOPendingModalOpen(false);
  };

  const handleBOPendingCancel = () => {
    setIsBOPendingModalOpen(false);
  };

  const [isBOReleaseModalOpen, setIsBOReleaseModalOpen] = useState(false);
  const showBOReleaseModal = () => {
    setIsBOReleaseModalOpen(true);
  };

  const handleBOReleaseOk = () => {
    setIsBOReleaseModalOpen(false);
  };

  const handleBOReleaseCancel = () => {
    setIsBOReleaseModalOpen(false);
  };

  const [isBOCloseModalOpen, setIsBOCloseModalOpen] = useState(false);
  const showBOCloseModal = () => {
    setIsBOCloseModalOpen(true);
  };

  const handleBOCloseOk = () => {
    setIsBOCloseModalOpen(false);
  };

  const handleBOCloseCancel = () => {
    setIsBOCloseModalOpen(false);
  };

  const [isLoanLogsModalOpen, setIsLoanLogsModalOpen] = useState(false);
  const showLoanLogsModal = () => {
    setIsLoanLogsModalOpen(true);
  };

  const handleLoanLogsOk = () => {
    setIsLoanLogsModalOpen(false);
  };

  const handleLoanLogsCancel = () => {
    setIsLoanLogsModalOpen(false);
  };

  const [loanActionModaldata, setLoanActionModaldata] = useState([]);

  const [finalStatus, setFinalStatus] = useState("");
  const [remarks, setRemarks] = useState("");
  const handleFinalStatus = (value) => {
    setFinalStatus(value);
  };
  const handleRemarks = (e) => {
    setRemarks(e.target.value);
  };

  const doc = new jsPDF();

  const StatusName = (address) => {
    switch (address) {
      case "Scrunity-Pending":
        return (
          <Select style={{ width: "230px" }} onChange={handleFinalStatus}>
            <Option value={"DM"}>Approved</Option>
            <Option value={"SC-QUERY"}>Submitted-Query</Option>
          </Select>
        );
      case "Scrunity-Submitted-Query":
        return "Scrunity-Submitted-Query";
      case "Scrunity-Verified":
        return "Scrunity-Verified";

      case "DM-Pending":
        return (
          <Select style={{ width: "230px" }} onChange={handleFinalStatus}>
            <Option value={"BO"}>Sent to bank</Option>
            <Option value={"DM-QUERY"}>Submitted-Query</Option>
            <Option value={"DM-REJECT"}>Reject</Option>
          </Select>
        );
      case "DM-Submitted-Query":
        return "DM-Submitted-Query";
      case "DM-Verified":
        return "DM-Verified";
      case "DM-REJECT":
        return "DM-REJECT";

      // LoanBankApprovepage
      case "BO-Pending":
        return (
          <Select style={{ width: "230px" }} onChange={handleFinalStatus}>
            <Option value={"RM"}>Approved by Bank</Option>
            <Option value={"BO-REJECT"}>Rejected by Bank</Option>
            {/* <Option value={"LOAN-ACTIVE"}>Approved</Option> */}
            {/* <Option value={"MPBCDC-MD"}>Approved</Option> */}
          </Select>
        );
      // LoanBankApprovepage

      case "RM-Pending":
        return (
          <Select style={{ width: "230px" }} onChange={handleFinalStatus}>
            {loanActionModaldata.LoanAmount <= 500000 ? (
              <Option value={"BANK-RELEASE"}>Approved by RM</Option>
            ) : (
              <></>
            )}
            {loanActionModaldata.LoanAmount > 500000 &&
            loanActionModaldata.LoanAmount <= 1500000 ? (
              <Option value={"MPBCDC-ADMIN"}>Send to MPBCDC-ADMIN</Option>
            ) : (
              <></>
            )}
            {loanActionModaldata.LoanAmount > 1500000 ? (
              <Option value={"MPBCDC-MD"}>Send to MPBCDC-MD</Option>
            ) : (
              <></>
            )}
            <Option value={"RM-REJECT"}>Reject</Option>
          </Select>
        );

      // LoanBankReleasepage
      case "BANK-RELEASE-Pending":
        return (
          <Select style={{ width: "230px" }} onChange={handleFinalStatus}>
            <Option value={"LOAN-ACTIVE"}>Approved</Option>
          </Select>
        );
      // LoanBankReleasepage

      case "MPBCDC-ADMIN Pending":
        return (
          <Select style={{ width: "230px" }} onChange={handleFinalStatus}>
            <Option value={"BANK-RELEASE"}>Approved</Option>
            <Option value={"MPBCDC-ADMIN-REJECT"}>Reject</Option>
          </Select>
        );

      case "MPBCDC-MD Pending":
        return (
          <Select style={{ width: "230px" }} onChange={handleFinalStatus}>
            <Option value={"BANK-RELEASE"}>Approved</Option>
            <Option value={"MPBCDC-MD-REJECT"}>Reject</Option>
          </Select>
        );

      // LoanBankClosepage LOAN-ACTIVE
      case "Bank Loan Released":
        return (
          <Select style={{ width: "230px" }} onChange={handleFinalStatus}>
            <Option value={"LOAN-CLOSED"}>Loan Closed</Option>
            <Option value={"LOAN-DEFAULTER"}>Loan Defaulted</Option>
          </Select>
        );
      // LoanBankClosepage LOAN-ACTIVE

      case "MPBCDC-MD Approved":
        return "MPBCDC-MD Approved";
      // return (
      //   <Select style={{ width: "230px" }} onChange={handleFinalStatus}>
      //     <Option value={"LOAN-ACTIVE"}>Approved</Option>
      //   </Select>
      // );
      case "RM-Approved":
        return "RM-Approved";
      case "RM-Reject":
        return "RM-Reject";
      case "LOAN-CLOSED":
        return "LOAN-CLOSED";
      case "LOAN-DEFAULTER":
        return "LOAN-DEFAULTER";

      case "Bank-Approved":
        return "Bank-Approved";
      // case "Bank Loan Released":
      //   return "Bank Loan Released";

      case "MPBCDC-MD":
        return "MPBCDC";
      // return (
      //   <Select style={{ width: "230px" }} onChange={handleFinalStatus}>
      //     <Option value={"BANK-RELEASE"}>Approved</Option>
      //   </Select>
      // );
      case "BANK-RELEASE":
        return "BANK-RELEASE";

      default:
        return address;
    }
  };

  const [userloanformData, setUserloanformData] = useState();
  const [userData, setUserData] = useState();

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

  const [downloadForm, setDownloadForm] = useState(false);
  const [downloadButton, setDownloadButton] = useState(true);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const columns = [
    {
      title: "#",
      dataIndex: "#",
      render: (text) => {
        return (
          <>
            <Profile />
          </>
        );
      },
    },
    {
      title: "Application Id",
      dataIndex: "Applicationid",
      key: "Applicationid",
      ...getColumnSearchProps("Applicationid"),
    },
    {
      title: "Beneficiary Id",
      dataIndex: "BeneficiaryId",
      key: "BeneficiaryId",
    },
    {
      title: "First Name",
      dataIndex: "FirstName",
      key: "FirstName",
      // ...getColumnSearchProps("name"),
      width: "25%",
    },
    {
      title: "Middle Name",
      dataIndex: "MiddleName",
      key: "MiddleName",
      width: "15%",
    },
    {
      title: "Last Name",
      dataIndex: "LastName",
      key: "LastName",
      width: "15%",
    },
    {
      title: "Phone Number",
      dataIndex: "Phone",
      key: "Phone",
      width: "15%",
    },
    {
      title: "Email Id",
      dataIndex: "Emailid",
      key: "Emailid",
      width: "15%",
      render: (text) => {
        return <>{text == null ? <>NA</> : <>{text}</>}</>;
      },
    },
    {
      title: "Caste",
      dataIndex: "CasteName",
      key: "CasteName",
      render: (text) => {
        return <>{text == null ? <>NA</> : <>{text}</>}</>;
      },
    },
    {
      title: "Loan Scheme",
      dataIndex: "LoanScheme",
      key: "LoanScheme",
      ...getColumnSearchProps("LoanScheme"),
    },
    {
      title: "Loan Amount",
      dataIndex: "LoanAmount",
      key: "LoanAmount",
    },
    {
      title: "Status",
      dataIndex: "LastStatus",
      key: "LastStatus",
      render: (text) => {
        if (text == "SC") {
          return <PendingStatus>Scrutiny</PendingStatus>;
        } else if (text == "SC-QUERY") {
          return <PendingStatus>Scrunity Query</PendingStatus>;
        } else if (text == "DM") {
          return <PendingStatus>District Manager</PendingStatus>;
        } else if (text == "DM-QUERY") {
          return <PendingStatus>District Manager Query</PendingStatus>;
        } else if (text == "RM") {
          return <PendingStatus>Regional Manager</PendingStatus>;
        } else if (text == "RM-REJECT") {
          return <PendingStatus>Regional Manager Rejected</PendingStatus>;
        } else if (text == "BO") {
          return <PendingStatus>Bank Process</PendingStatus>;
        } else if (text == "MPBCDC-MD") {
          return <PendingStatus>MPBCDC-MD</PendingStatus>;
        } else if (text == "LOAN-ACTIVE") {
          return <ApprovedStatus>{text}</ApprovedStatus>;
        } else {
          return <>{text}</>;
        }
      },
    },
    {
      title: "Status Remarks",
      dataIndex: "Lastremarks",
      key: "Lastremarks",
    },
    {
      title: "District",
      dataIndex: "District",
      key: "District",
      // filters: disData,
      // onFilter: (value, record) => record.district.indexOf(value) === 0,
    },
    {
      title: "Actions",
      dataIndex: "id",
      key: "actions",
      render: function (row, data, text) {
        return (
          <>
            <Tooltip title="Loan Form view">
              <View
                onClick={() => {
                  showModal();
                  axios({
                    method: "get",
                    url: `${REACT_APP_BASE_URL}/loan/LoanFormDetailView/${data.id}`,
                  }).then((response) => {
                    setUserData(response.data);
                    setModalLoading(false);
                  });
                }}
              />
            </Tooltip>

            {(props.heading == "Submited Form" &&
              data.LastStatus == "SC-QUERY") ||
            (props.heading == "Submited Form" &&
              data.LastStatus == "DM-QUERY") ? (
              <>
                <Edit
                  onClick={() => {
                    axios({
                      method: "get",
                      url: `${REACT_APP_BASE_URL}/loan/LoanFormDetailView/${data.id}`,
                    }).then((response) => {
                      setUserloanformData(response.data);
                      setLoanformUpdate(true);
                    });

                    // setLoanActionModaldata(data);
                    // showTransferModal();
                  }}
                />
              </>
            ) : (
              ""
            )}

            {props.heading == "Scrunity-Pending" ||
            props.heading == "DM-Pending" ||
            // props.heading == "BO-Pending" ||
            props.heading == "RM-Pending" ||
            // props.heading == "BANK-RELEASE-Pending" ||
            props.heading == "MPBCDC-ADMIN Pending" ||
            // props.heading == "Loan-Active" ||
            props.heading == "MPBCDC-MD Pending" ? (
              <>
                <Edit
                  onClick={() => {
                    setLoanActionModaldata(data);
                    showTransferModal();
                  }}
                />
              </>
            ) : (
              ""
            )}

            {/* Okay select for RM, BO-REJECT (Approved by Bank, Reject by Bank) */}
            {props.heading == "BO-Pending" ? (
              <>
                <Edit
                  onClick={() => {
                    setLoanActionModaldata(data);
                    showBOPendingModal();
                  }}
                />
              </>
            ) : (
              ""
            )}

            {/* Okay select for LOAN-ACTIVE */}
            {props.heading == "BANK-RELEASE-Pending" ? (
              <>
                <Edit
                  onClick={() => {
                    setLoanActionModaldata(data);
                    showBOReleaseModal();
                  }}
                />
              </>
            ) : (
              ""
            )}

            {/* Okay select for LOAN-CLOSED, LOAN-DEFAULTER */}
            {props.heading == "Bank Loan Released" ? (
              <>
                <Edit
                  onClick={() => {
                    setLoanActionModaldata(data);
                    showBOCloseModal();
                  }}
                />
              </>
            ) : (
              ""
            )}
          </>
        );
      },
    },
    {
      title: "View Profile",
      dataIndex: "BeneficiaryId",
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
      title: "Logs",
      dataIndex: "id",
      key: "logs",
      render: function (row, data, text) {
        return (
          <>
            <History
              onClick={() => {
                setLoanActionModaldata(data);
                showLoanLogsModal();
              }}
            />
          </>
        );
      },
    },
    {
      title: "Cancel Application",
      dataIndex: ["id", "loanData"],
      render: (text, data) => {
        if (UserGroup == "beneficiary") {
          if (data.LastStatus == "SC") {
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
                          method: "delete",
                          url: `${REACT_APP_BASE_URL}/loan/DeleteLoanApplication/${data.id}/`,
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
        }
      },
    },
  ];

  const [disFilter, setDisFilter] = useState();
  const [nameFilter, setNameFilter] = useState();
  const handleName = (e) => {
    setNameFilter(e.target.value);
  };
  const handleDistrict = (e) => {
    setDisFilter(e.target.value);
  };

  if (loanformUpdate == true) {
    return (
      <>
        <BiArrowBack
          onClick={() => setLoanformUpdate(false)}
          style={{ cursor: "pointer", fontSize: "20px" }}
        />
        <LoanForm
          address={userloanformData.LoanSchemeCode}
          data={userloanformData}
        />
      </>
    );
  }
  if (viewProfile == true) {
    return (
      <>
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
                    <Title>Name</Title>
                    {userDetails.UserPersonalInfo[0].name}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Gender</Title>
                    {userDetails.UserPersonalInfo[0].gender == "M" ? (
                      <SubHeading>Male</SubHeading>
                    ) : (
                      <SubHeading>Female</SubHeading>
                    )}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>DOB</Title>
                    {userDetails.UserPersonalInfo[0].dob}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Email</Title>
                    {userDetails.UserPersonalInfo[0].emailId}
                  </SubHeading>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <SubHeading>
                    <Title>Marital Status</Title>
                    {userDetails.UserPersonalInfo[0].maritalStatus == false ? (
                      <SubHeading>Unmarried</SubHeading>
                    ) : (
                      <SubHeading>Married</SubHeading>
                    )}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Languages</Title>
                    {userDetails.UserPersonalInfo[0].languages}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Age</Title>
                    {userDetails.UserPersonalInfo[0].age}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Phone Number</Title>
                    {userDetails.UserPersonalInfo[0].phoneNumber}
                  </SubHeading>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <SubHeading>
                    <Title>Caste</Title>
                    {userDetails.UserPersonalInfo[0].caste}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Sub Caste</Title>
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
                    <Title>Caste Certificate Number</Title>
                    {userDetails.UserPersonalInfo[0].casteCertificateNumber}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Issue Authority</Title>
                    {userDetails.UserPersonalInfo[0].issueAuthority}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Issue Date</Title>
                    {userDetails.UserPersonalInfo[0].issueDate}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Parent Mobile</Title>
                    {userDetails.UserPersonalInfo[0].parentMobile}
                  </SubHeading>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <SubHeading>
                    <Title>Name as SSC</Title>
                    {userDetails.UserPersonalInfo[0].nameAsSsc}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>District</Title>
                    {userDetails.UserPersonalInfo[0].district}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Taluka</Title>
                    {userDetails.taluka}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>State</Title>
                    {userDetails.state}
                  </SubHeading>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <SubHeading>
                    <Title>Village</Title>
                    {userDetails.village}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Photo</Title>
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
                    <Title>Caste Certificate</Title>
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
                    <Title>Family Income</Title>
                    {
                      userDetails.CustomUserIncomeAndDomicileInfo[0]
                        .familyIncome
                    }
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Do you have Income Certificate</Title>
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
                    <Title>Income Certificate Number</Title>
                    {
                      userDetails.CustomUserIncomeAndDomicileInfo[0]
                        .incomeCertificateNumber
                    }
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Is Income Certificate From Aaple</Title>
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
                    <Title>Issue Authority</Title>
                    {
                      userDetails.CustomUserIncomeAndDomicileInfo[0]
                        .issueAuthority
                    }
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Issue Date</Title>
                    {userDetails.CustomUserIncomeAndDomicileInfo[0].issueDate}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Issue Date Of Domicile</Title>
                    {
                      userDetails.CustomUserIncomeAndDomicileInfo[0]
                        .issueDateOfDomicile
                    }
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Income Certificate</Title>
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
                    <Title>Are you Salaried</Title>
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
                    <Title>Job Type</Title>
                    {userDetails.CustomUsereligibilityInfo[0].jobType}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Are you Disabled</Title>
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
                    <Title>Disability</Title>
                    {userDetails.CustomUsereligibilityInfo[0].disability}
                  </SubHeading>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <SubHeading>
                    <Title>Have Disability Certificate ?</Title>
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
                    <Title>Have Pid Number ?</Title>
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
                    <Title>Disability Certificate Number</Title>
                    {
                      userDetails.CustomUsereligibilityInfo[0]
                        .disabilityCertificateNumber
                    }
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Issue Authority</Title>
                    {userDetails.CustomUsereligibilityInfo[0].issueAuthority}
                  </SubHeading>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <SubHeading>
                    <Title>Date of Issue</Title>
                    {userDetails.CustomUsereligibilityInfo[0].issueDate}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Aadhar Linked With Bank/Yuva/ Jandhan</Title> :
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
                    <Title>Disablilty Certificate</Title>
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
                  <Title>Qualification Level</Title>
                  {
                    userDetails.CustomUserQualificationInfo[0]
                      .qualificationLevel
                  }
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Stream</Title>
                  {userDetails.CustomUserQualificationInfo[0].stream}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Is Qualification Completed ?</Title> :
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
                  <Title>College School Name</Title>
                  {userDetails.CustomUserQualificationInfo[0].collegeSchoolName}
                </SubHeading>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <SubHeading>
                  <Title>Course</Title>
                  {userDetails.CustomUserQualificationInfo[0].course}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Board University</Title>
                  {userDetails.CustomUserQualificationInfo[0].boardUniversity}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Mode of Exam</Title> :
                  {userDetails.CustomUserQualificationInfo[0].mode}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Admission Year</Title> :
                  {userDetails.CustomUserQualificationInfo[0].admissionYear}
                </SubHeading>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <SubHeading>
                  <Title>Passing Year</Title> :
                  {userDetails.CustomUserQualificationInfo[0].passingYear}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Result</Title> :
                  {userDetails.CustomUserQualificationInfo[0].result}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Percentage</Title> :
                  {userDetails.CustomUserQualificationInfo[0].percentage}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Attempts</Title> :
                  {userDetails.CustomUserQualificationInfo[0].attempts}
                </SubHeading>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <SubHeading>
                  <Title>Any Gap ?</Title> :
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
                  {userDetails.CustomUserQualificationInfo[0].instituteDistrict}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Institute State</Title> :
                  {userDetails.CustomUserQualificationInfo[0].instituteState}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Institute Taluka</Title> :
                  {userDetails.CustomUserQualificationInfo[0].instituteTaluka}
                </SubHeading>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <SubHeading>
                  <Title>Marksheets</Title> :
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
                  {userDetails.CustomUserResidentialInfo[0].address}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>State</Title> :
                  {userDetails.CustomUserResidentialInfo[0].state}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>District</Title> :
                  {userDetails.CustomUserResidentialInfo[0].district}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Taluka</Title> :
                  {userDetails.CustomUserResidentialInfo[0].taluka}
                </SubHeading>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <SubHeading>
                  <Title>Address Same as Permanent ?</Title> :
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
                  {
                    userDetails.CustomUserResidentialInfo[0]
                      .correspondenceAddress
                  }
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Correspondence State</Title> :
                  {userDetails.CustomUserResidentialInfo[0].correspondenceState}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Correspondence District</Title> :
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
                  {
                    userDetails.CustomUserResidentialInfo[0]
                      .correspondenceDistrict
                  }
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Correspondence Taluka</Title> :
                  {
                    userDetails.CustomUserResidentialInfo[0]
                      .correspondenceTaluka
                  }
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Correspondence Village</Title> :
                  {
                    userDetails.CustomUserResidentialInfo[0]
                      .correspondenceVillage
                  }
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Correspondence PinCode</Title> :
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
                  {userDetails.CustomUserBankInfo[0].bankName}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Bank Account Number</Title> :
                  {userDetails.CustomUserBankInfo[0].bankAccountNo}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Branch Name</Title> :
                  {userDetails.CustomUserBankInfo[0].branchName}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>IFSC Code</Title> :
                  {userDetails.CustomUserBankInfo[0].ifscCode}
                </SubHeading>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <SubHeading>
                  <Title>Is Aadhar linked with Bank / Yuva / Jandhan ?</Title>:
                  {userDetails.CustomUserBankInfo[0].ifscCode}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>
                    Does Account have Limit of withdrawal or Deposit ?
                  </Title>
                  :
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
                  <Title>Is Father Alive ?</Title>:
                  {userDetails.CustomUserOtherInfo[0].isFatherAlive == true ? (
                    <SubHeading>Yes</SubHeading>
                  ) : (
                    <SubHeading>No</SubHeading>
                  )}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Father Name</Title>:
                  {userDetails.CustomUserOtherInfo[0].fatherName}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Is Father Salaried ? </Title>:
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
                  <Title>Occupation of Father</Title>:
                  {userDetails.CustomUserOtherInfo[0].fatherOccupation}
                </SubHeading>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <SubHeading>
                  <Title>Is Father Salaried ? </Title>:
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
                  <Title>Occupation of Father</Title>:
                  {userDetails.CustomUserOtherInfo[0].fatherOccupation}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Is Mother Alive ? </Title>:
                  {userDetails.CustomUserOtherInfo[0].isMotherAlive == true ? (
                    <SubHeading>Yes</SubHeading>
                  ) : (
                    <SubHeading>No</SubHeading>
                  )}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Name of Mother</Title>:
                  {userDetails.CustomUserOtherInfo[0].motherName}
                </SubHeading>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <SubHeading>
                  <Title>Is Mother Salaried ? </Title>:
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
                  <Title>Occupation of Mother</Title>:
                  {userDetails.CustomUserOtherInfo[0].motherOccupation}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Ready to Relocate in Maharashtra ?</Title>:
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
                  <Title>District 1</Title>:
                  {userDetails.CustomUserOtherInfo[0].district1}
                </SubHeading>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <SubHeading>
                  <Title>District 2</Title>:
                  {userDetails.CustomUserOtherInfo[0].district2}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>District 3</Title>:
                  {userDetails.CustomUserOtherInfo[0].district3}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>wheather stay in City ? </Title>:
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
                  <Title>wheather stay in Rural ? </Title>:
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
      </>
    );
  }

  if (pageLoading == true) {
    return (
      <LoadContainer>
        <Spin tip="Loading data" />
      </LoadContainer>
    );
  } else if (
    viewProfile == false &&
    pageLoading == false &&
    loanformUpdate == false
  ) {
    return (
      <div>
        <span style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>Loan {props.heading} List</h3>
          {/* <Select
            showSearch
            placeholder="Select a district"
            onChange={(v, k) => {
              setDisFilter(v);
            }}
            style={{ width: "200px" }}
            name="district"
            value={disFilter}
          >
            {data.map((dis) => {
              return (
                <Option
                  value={dis.district_name}
                  name="district"
                  onChange={handleDistrict}
                >
                  {dis.district_name}
                </Option>
              );
            })}
          </Select>
          <SearchInput
            placeholder="Name"
            value={nameFilter}
            onChange={handleName}
            name="name"
          />
          <Button type="primary">Search</Button> */}
        </span>
        {/* {console.log(userList)} */}
        <DataTable columns={columns} dataSource={userList} />
        <span style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="primary"
            style={{ marginRight: "20px" }}
            disabled={prevData == null ? true : false}
            onClick={handlePrev}
          >
            Prev
          </Button>
          <Button
            type="primary"
            disabled={nextData == null ? true : false}
            onClick={handleNext}
          >
            Next
          </Button>
        </span>
        {/* <span>
          <InfiniteScroll
            dataLength={items}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading....</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {items.map((i, index) => (
              <div>div - #{i}</div>
            ))}
          </InfiniteScroll>
        </span> */}

        {/* {userList.map((data, index) => {
          return <h2>{data.name}</h2>;
        })} */}

        <StatusModal
          title="Update application status"
          visible={isTransferModalOpen}
          onOk={handleTransferOk}
          onCancel={handleTransferCancel}
        >
          <Form layout="vertical">
            <StatusFields>
              <Form.Item label="Application ID">
                {loanActionModaldata.Applicationid}
              </Form.Item>
            </StatusFields>
            <Row>
              <StatusFields>
                <Form.Item label="Status">
                  {StatusName(props.heading)}
                </Form.Item>
              </StatusFields>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item label="Remarks">
                  <TextArea onChange={handleRemarks} />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button
                type="primary"
                onClick={() => {
                  if (finalStatus == null || finalStatus == "") {
                    message.warning("Please select Status.");
                  } else {
                    loanmanagementInstance
                      .patch(
                        `${REACT_APP_BASE_URL}/loan/LoanStatusUpdate/${loanActionModaldata.id}/`,
                        {
                          PrevStatus: props.statusname || "",
                          LastStatus: finalStatus,
                          Lastremarks: remarks,
                        },
                        {
                          headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: `token ${Token}`,
                          },
                        }
                      )
                      .then((response) => {
                        if (
                          response.status == 200 &&
                          response.data.status == "success"
                        ) {
                          setIsTransferModalOpen(false);
                          message.success(response.data.message);
                          setTimeout(() => {
                            window.location.reload();
                          }, 500);
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

        <StatusModal
          title="Bank Approval Detail"
          visible={isBOPendingModalOpen}
          onOk={handleBOPendingOk}
          onCancel={handleBOPendingCancel}
        >
          <LoanBankApprovepage
            statusname={props.statusname}
            id={loanActionModaldata.id}
          ></LoanBankApprovepage>
        </StatusModal>

        <StatusModal
          title="Bank Release Detail"
          visible={isBOReleaseModalOpen}
          onOk={handleBOReleaseOk}
          onCancel={handleBOReleaseCancel}
        >
          <LoanBankReleasepage
            statusname={props.statusname}
            id={loanActionModaldata.id}
          ></LoanBankReleasepage>
        </StatusModal>

        <StatusModal
          title="Bank Loan Closure Detail"
          visible={isBOCloseModalOpen}
          onOk={handleBOCloseOk}
          onCancel={handleBOCloseCancel}
        >
          <LoanBankClosepage
            statusname={props.statusname}
            id={loanActionModaldata.id}
          ></LoanBankClosepage>
        </StatusModal>

        <StatusModal
          title="Loan Logs"
          visible={isLoanLogsModalOpen}
          onOk={handleLoanLogsOk}
          onCancel={handleLoanLogsCancel}
        >
          <Loanlogspage id={loanActionModaldata.id}></Loanlogspage>
        </StatusModal>

        <ProfileDataModal
          visible={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width="90%"
        >
          {modalLoading == true ? (
            <LoadContainer>
              <Spin tip="Loading data" />
            </LoadContainer>
          ) : (
            <div ref={componentRef}>
              {/* {downloadButton && (
                <Button
                  onClick={() => {
                    setDownloadButton(false);
                    handlePrint();
                  }}
                >
                  Download
                </Button>
              )} */}
              {/* {downloadForm && (
                <DownloadLoanApp ref={componentRef} userData={userData} />
              )} */}
              {/* <PDFViewer width="1000" height="600" >
                <Loanpdfdownload userData={userData} />
              </PDFViewer> */}

              <Form
                layout="vertical"
                style={{
                  border: "2px solid grey",
                  padding: "20px",
                  margin: "10px 0px",
                }}
              >
                <h2>{userData.name}</h2>
                <span
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3>{userData.LoanScheme}</h3>
                  {/* <CloudDownloadOutlined
                    onClick={() => {
                      setDownloadButton(false);
                      handlePrint();
                    }}
                    style={{ fontSize: "20px" }}
                  /> */}
                  <PDFDownloadLink
                    document={<Loanpdfdownload userData={userData} />}
                    fileName={
                      userData.Applicationid +
                      " " +
                      userData.FirstName +
                      "-document.pdf"
                    }
                  >
                    {({ blob, url, loading, error }) =>
                      loading ? (
                        "Loading document..."
                      ) : (
                        <CloudDownloadOutlined style={{ fontSize: "20px" }} />
                      )
                    }
                  </PDFDownloadLink>
                </span>
                <h4>Application ID - {userData.Applicationid}</h4>
                <FormHeading>Basic Details :</FormHeading>
                <div>
                  <Row>
                    <DataContainer span={8}>
                      <Title>FirstName: </Title>
                      {userData.FirstName}
                    </DataContainer>
                    <DataContainer span={8}>
                      <Title>MiddleName:</Title>
                      {userData.MiddleName}
                    </DataContainer>
                    <DataContainer span={8}>
                      <Title>LastName:</Title>
                      {userData.LastName}
                    </DataContainer>
                  </Row>
                  <Row style={{ margin: "10px 0px" }}>
                    <DataContainer span={8}>
                      <Title>Birth Date:</Title>
                      {moment(userData.Birthdate).format("DD-MMM-YYYY")}
                    </DataContainer>
                    <DataContainer span={8}>
                      <Title>Age:</Title>
                      {userData.Age}
                    </DataContainer>
                    <DataContainer span={8}>
                      <Title>Gender:</Title>
                      {userData.gender}
                    </DataContainer>
                  </Row>
                  <Row style={{ margin: "10px 0px" }}>
                    <DataContainer span={8}>
                      <Title>Father's Full Name:</Title>
                      {userData.FatherName}
                    </DataContainer>
                    <DataContainer span={8}>
                      <Title>Mother's Full Name:</Title>
                      {userData.MotherName}
                    </DataContainer>
                    <DataContainer span={8}>
                      <Title>Husband Full Name:</Title>
                      {userData.HusbandFullName}
                    </DataContainer>
                  </Row>
                  <Row>
                    <DataContainer span={8}>
                      <Title>Basic Education:</Title>
                      {userData.Education}
                    </DataContainer>
                    <DataContainer span={8}>
                      <Title>Ration Card Type:</Title>
                      {userData.RationCardType}
                    </DataContainer>
                    <DataContainer span={8}>
                      <Title>Business Name:</Title>
                      {userData.BusinessName}
                    </DataContainer>
                  </Row>
                  <FormHeading>Address Details: </FormHeading>
                  <Row style={{ margin: "10px 0px" }}>
                    <DataContainer span={8}>
                      <Title>City/Rural:</Title>
                      {userData.UrbanRural}
                    </DataContainer>
                    <DataContainer span={8}>
                      <Title>District:</Title>
                      {userData.District}
                    </DataContainer>
                    <DataContainer span={8}>
                      <Title>Taluka:</Title>
                      {userData.Taluka}
                    </DataContainer>
                  </Row>
                  <Row>
                    <DataContainer span={8}>
                      <Title>Present Address:</Title>
                      {userData.PresentAddline1} , {userData.PresentAddline2} ,{" "}
                      {userData.PresentAddline3} , {userData.PresentPincode}
                    </DataContainer>
                    <DataContainer span={8}>
                      <Title>Permanent Address:</Title>
                      {userData.PermanentAddline1} ,{userData.PermanentAddline2}{" "}
                      ,{userData.PermanentAddline3} ,{" "}
                      {userData.PermanentPincode}
                    </DataContainer>
                    <DataContainer span={8}>
                      <Title>Proposed Business Name:</Title>
                      {userData.ProposedBusinessName}
                    </DataContainer>
                  </Row>
                </div>
                {userData.LoanSchemeCode == "state-subsidy" ||
                userData.LoanSchemeCode == "state-mm" ||
                userData.LoanSchemeCode == "state-df" ||
                userData.LoanSchemeCode == "central-nsfdc-mky" ||
                userData.LoanSchemeCode == "central-nsfdc-msy" ||
                userData.LoanSchemeCode == "central-nsfdc-mcf" ||
                userData.LoanSchemeCode == "central-nsfdc-tl-a" ? (
                  <>
                    <FormHeading>Business D etails : </FormHeading>
                    <Row>
                      <DataContainer span={8}>
                        <Title>Business Name : </Title>
                        {userData.BusinessName}
                      </DataContainer>
                      <DataContainer span={8}>
                        <Title>
                          Beneficiary Investment Component(As per Schemes) :{" "}
                        </Title>
                        {userData.Investment}
                      </DataContainer>
                      <DataContainer span={8}>
                        <Title>Required Loan Amount : </Title>
                        {userData.LoanAmount}
                      </DataContainer>
                    </Row>
                    <Row>
                      <DataContainer span={8}>
                        <Title>Brief Information of Business : </Title>
                        {userData.BusinessInfo}
                      </DataContainer>
                      <DataContainer span={8}>
                        <Title>The Address of the place of Business : </Title>
                        {userData.LoanAmount}
                      </DataContainer>
                      <DataContainer span={8}>
                        <Title>Land Owned or Rented?:</Title>
                        {userData.OwnRented}
                      </DataContainer>
                    </Row>
                  </>
                ) : (
                  <></>
                )}
                <h3>PERSONAL DATA - </h3>
                {userData.LoanSchemeCode == "central-nsfdc-el-a" ||
                userData.LoanSchemeCode == "central-nsfdc-el-b" ||
                userData.LoanSchemeCode == "central-nskfdc-el-a" ||
                userData.LoanSchemeCode == "central-nskfdc-el-b" ? (
                  <>
                    <Row>
                      <DataContainer span={8}>
                        <Title>Caste:</Title>
                        {userData.Caste}
                      </DataContainer>
                      <DataContainer span={8}>
                        <Title>SubCaste:</Title>
                        {userData.SubCaste}
                      </DataContainer>
                      <DataContainer span={8}>
                        <Title>Annual Family Income:</Title>
                        {userData.AnnualFamilyIncome}
                      </DataContainer>
                    </Row>
                    <Row style={{ margin: "10px 0px" }}>
                      <DataContainer span={8}>
                        <Title>Contact No:</Title>
                        {userData.ContactNo}
                      </DataContainer>
                      <DataContainer span={8}>
                        <Title>Valid Passport No:</Title>
                        {userData.PassportNo}
                      </DataContainer>
                      <DataContainer span={8}>
                        <Title>Valid Passport Expiry Date:</Title>
                        {userData.PassportExpDate}
                      </DataContainer>
                    </Row>
                    <Row>
                      <DataContainer span={8}>
                        <Title>Valid Visa/Permit No:</Title>
                        {userData.VisaPermitNo}
                      </DataContainer>
                      <DataContainer span={8}>
                        <Title>Valid Visa/Permit Expiry Date:</Title>
                        {userData.VisaExpDate}
                      </DataContainer>
                      <DataContainer span={8}></DataContainer>
                    </Row>

                    <Row>
                      <DataContainer span={8}></DataContainer>
                      <DataContainer span={8}></DataContainer>
                      <DataContainer span={8}></DataContainer>
                    </Row>
                    <Row style={{ margin: "10px 0px" }}>
                      <HtmlTable>
                        <tr>
                          <th>
                            <h3>Examination</h3>
                          </th>
                          <th>
                            <h3>Institution/University</h3>
                          </th>
                          <th>
                            <h3>Year of passing</h3>
                          </th>
                          <th>
                            <h3>Percentage of marks/grade</h3>
                          </th>
                        </tr>
                        <tr>
                          <td>SSC</td>
                          <td>{userData.SSLCInstitution}</td>
                          <td>{userData.SSLCYearofpassing}</td>
                          <td>{userData.SSLCPercentageofmarks}</td>
                        </tr>
                        <tr>
                          <td> 10 + 2</td>
                          <td>{userData.HSCInstitution}</td>
                          <td>{userData.HSCYearofpassing}</td>
                          <td>{userData.HSCPercentageofmarks}</td>
                        </tr>
                        <tr>
                          <td>Graduation</td>
                          <td> {userData.GraduationInstitution}</td>
                          <td> {userData.GraduationYearofpassing}</td>
                          <td> {userData.GraduationPercentageofmarks}</td>
                        </tr>
                        <tr>
                          <td> P.G.</td>
                          <td> {userData.PGInstitution}</td>
                          <td> {userData.PGYearofpassing}</td>
                          <td> {userData.PGPercentageofmarks}</td>
                        </tr>
                        <tr>
                          <td> Any Other (please specify)</td>
                          <td> {userData.OtherInstitution}</td>
                          <td> {userData.OtherYearofpassing}</td>
                          <td> {userData.OtherPercentageofmarks}</td>
                        </tr>
                      </HtmlTable>
                    </Row>
                    <hr style={{ margin: "10px 0px" }} />
                    <h3>PARTICULARS OF PARENTS/GUARDIAN :</h3>
                    <Row>
                      <DataContainer span={6}>
                        <Title>Full Name:</Title>
                      </DataContainer>
                      <DataContainer span={6}>
                        {userData.ParentsFullName}
                      </DataContainer>
                      <DataContainer span={6}>
                        <Title>Age:</Title>
                      </DataContainer>
                      <DataContainer span={6}>
                        {userData.ParentsAge}
                      </DataContainer>
                    </Row>
                    <Row>
                      <DataContainer span={6}>
                        <Title>Phone Number Res:</Title>
                      </DataContainer>
                      <DataContainer span={6}>
                        {userData.ParentsResidencePhone}
                      </DataContainer>
                      <DataContainer span={6}>
                        <Title>Phone Number Office:</Title>
                      </DataContainer>
                      <DataContainer span={6}>
                        {userData.ParentsPlaceofworkPhone}
                      </DataContainer>
                    </Row>
                    <Row>
                      <DataContainer span={6}>
                        <Title>Permanent Address: Residence</Title>
                      </DataContainer>
                      <DataContainer span={6}>
                        {userData.ParentsResidenceAddress}
                      </DataContainer>
                      <DataContainer span={6}>
                        <Title>Address: Place of work</Title>
                      </DataContainer>
                      <DataContainer span={6}>
                        {userData.ParentsPlaceofworkAddress}
                      </DataContainer>
                    </Row>
                    <hr />
                    <h3>COURSE DETAILS :</h3>
                    <Row>
                      <DataContainer span={6}>
                        <Title>Fulltime Professional/Technical Course</Title>
                      </DataContainer>
                      <DataContainer span={6}>
                        {userData.CourseName}
                      </DataContainer>
                      <DataContainer span={6}>
                        <Title>
                          Details of placement to be provided by the Educational
                          Institute, if any
                        </Title>
                      </DataContainer>
                      <DataContainer span={6}>
                        {userData.DetailsOfPlacement}
                      </DataContainer>
                    </Row>
                    <Row>
                      <DataContainer span={6}>
                        <Title>DataContainerlege/Institute/University</Title>
                      </DataContainer>
                      <DataContainer span={6}>
                        {userData.CourseDataContainerlegeName}
                      </DataContainer>
                      <DataContainer span={6}>
                        <Title>Duration of the Course</Title>
                      </DataContainer>
                      <DataContainer span={6}>
                        {userData.CourseDuration}
                      </DataContainer>
                    </Row>
                    <Row>
                      <DataContainer span={6}>
                        <Title>Entrance exam, if any, qualified</Title>
                      </DataContainer>
                      <DataContainer span={6}>
                        {userData.EntranceExam}
                      </DataContainer>
                      <DataContainer span={6}>
                        <Title>Country</Title>
                      </DataContainer>
                      <DataContainer span={6}>
                        {userData.CourseCountry}
                      </DataContainer>
                    </Row>
                    <hr style={{ margin: "10px 0px" }} />
                    <h3>TOTAL STUDY EXPENSES:</h3>
                    <HtmlTable>
                      <tr>
                        <th>
                          <h3>Year wise / Semester wise</h3>
                        </th>
                        <th>1</th>
                        <th>2</th>
                        <th>3</th>
                        <th>4</th>
                        <th>5</th>
                        <th>6</th>
                        <th>Total</th>
                      </tr>
                      <tr>
                        <td> Admission Fees & Tuition Fee</td>
                        <td> {userData.ExpnAmtAdmissionFeesA}</td>
                        <td> {userData.ExpnAmtAdmissionFeesB}</td>
                        <td> {userData.ExpnAmtAdmissionFeesC}</td>
                        <td> {userData.ExpnAmtAdmissionFeesD}</td>
                        <td> {userData.ExpnAmtAdmissionFeesE}</td>
                        <td> {userData.ExpnAmtAdmissionFeesF}</td>
                        <td> {userData.ExpnAmtAdmissionFeesT}</td>
                      </tr>
                      <tr>
                        <td>
                          Books, Stationery and other instruments required for
                          the course
                        </td>
                        <td> {userData.ExpnAmtinstrumentsA}</td>
                        <td> {userData.ExpnAmtinstrumentsB}</td>
                        <td> {userData.ExpnAmtinstrumentsC}</td>
                        <td> {userData.ExpnAmtinstrumentsD}</td>
                        <td> {userData.ExpnAmtinstrumentsE}</td>
                        <td> {userData.ExpnAmtinstrumentsF}</td>
                        <td> {userData.ExpnAmtinstrumentsT}</td>
                      </tr>
                      <tr>
                        <td> Examination Fee</td>
                        <td> {userData.ExpnAmtExaminationFeeA}</td>
                        <td> {userData.ExpnAmtExaminationFeeB}</td>
                        <td> {userData.ExpnAmtExaminationFeeC}</td>
                        <td> {userData.ExpnAmtExaminationFeeD}</td>
                        <td> {userData.ExpnAmtExaminationFeeE}</td>
                        <td> {userData.ExpnAmtExaminationFeeF}</td>
                        <td> {userData.ExpnAmtExaminationFeeT}</td>
                      </tr>
                      <tr>
                        <td> Boarding and Lodging Expenses</td>
                        <td> {userData.ExpnAmtBoardingA}</td>
                        <td> {userData.ExpnAmtBoardingB}</td>
                        <td> {userData.ExpnAmtBoardingC}</td>
                        <td> {userData.ExpnAmtBoardingD}</td>
                        <td> {userData.ExpnAmtBoardingE}</td>
                        <td> {userData.ExpnAmtBoardingF}</td>
                        <td> {userData.ExpnAmtBoardingT}</td>
                      </tr>
                      <tr>
                        <td>
                          Insurance premium for policy for insuring loanees
                          against loan in case of death or permanent disability
                        </td>
                        <td> {userData.ExpnAmtInsurancepremiumA}</td>
                        <td> {userData.ExpnAmtInsurancepremiumB}</td>
                        <td> {userData.ExpnAmtInsurancepremiumC}</td>
                        <td> {userData.ExpnAmtInsurancepremiumD}</td>
                        <td> {userData.ExpnAmtInsurancepremiumE}</td>
                        <td> {userData.ExpnAmtInsurancepremiumF}</td>
                        <td> {userData.ExpnAmtInsurancepremiumT}</td>
                      </tr>
                      <tr>
                        <td>
                          Travel Expenses/Passage Money for studying abroad.
                        </td>
                        <td> {userData.ExpnAmtTravelExpensesA}</td>
                        <td> {userData.ExpnAmtTravelExpensesB}</td>
                        <td> {userData.ExpnAmtTravelExpensesC}</td>
                        <td> {userData.ExpnAmtTravelExpensesD}</td>
                        <td> {userData.ExpnAmtTravelExpensesE}</td>
                        <td> {userData.ExpnAmtTravelExpensesF}</td>
                        <td> {userData.ExpnAmtTravelExpensesT}</td>
                      </tr>
                      <tr>
                        <td>Caution Money, Development Fund etc.</td>
                        <td> {userData.ExpnAmtCautionMoneyA}</td>
                        <td> {userData.ExpnAmtCautionMoneyB}</td>
                        <td> {userData.ExpnAmtCautionMoneyC}</td>
                        <td> {userData.ExpnAmtCautionMoneyD}</td>
                        <td> {userData.ExpnAmtCautionMoneyE}</td>
                        <td> {userData.ExpnAmtCautionMoneyF}</td>
                        <td> {userData.ExpnAmtCautionMoneyT}</td>
                      </tr>
                      <tr>
                        <td>Total</td>
                        <td>
                          {userData.ExpnAmtAdmissionFeesA +
                            userData.ExpnAmtinstrumentsA +
                            userData.ExpnAmtExaminationFeeA +
                            userData.ExpnAmtBoardingA +
                            userData.ExpnAmtInsurancepremiumA +
                            userData.ExpnAmtTravelExpensesA +
                            userData.ExpnAmtCautionMoneyA}
                        </td>
                        <td>
                          {" "}
                          {userData.ExpnAmtAdmissionFeesB +
                            userData.ExpnAmtinstrumentsB +
                            userData.ExpnAmtExaminationFeeB +
                            userData.ExpnAmtBoardingB +
                            userData.ExpnAmtInsurancepremiumB +
                            userData.ExpnAmtTravelExpensesB +
                            userData.ExpnAmtCautionMoneyB}
                        </td>
                        <td>
                          {" "}
                          {userData.ExpnAmtAdmissionFeesC +
                            userData.ExpnAmtinstrumentsC +
                            userData.ExpnAmtExaminationFeeC +
                            userData.ExpnAmtBoardingC +
                            userData.ExpnAmtInsurancepremiumC +
                            userData.ExpnAmtTravelExpensesC +
                            userData.ExpnAmtCautionMoneyC}
                        </td>
                        <td>
                          {userData.ExpnAmtAdmissionFeesD +
                            userData.ExpnAmtinstrumentsD +
                            userData.ExpnAmtExaminationFeeD +
                            userData.ExpnAmtBoardingD +
                            userData.ExpnAmtInsurancepremiumD +
                            userData.ExpnAmtTravelExpensesD +
                            userData.ExpnAmtCautionMoneyD}
                        </td>
                        <td>
                          {userData.ExpnAmtAdmissionFeesE +
                            userData.ExpnAmtinstrumentsE +
                            userData.ExpnAmtExaminationFeeE +
                            userData.ExpnAmtBoardingE +
                            userData.ExpnAmtInsurancepremiumE +
                            userData.ExpnAmtTravelExpensesE +
                            userData.ExpnAmtCautionMoneyE}
                        </td>
                        <td>
                          {userData.ExpnAmtAdmissionFeesF +
                            userData.ExpnAmtinstrumentsF +
                            userData.ExpnAmtExaminationFeeF +
                            userData.ExpnAmtBoardingF +
                            userData.ExpnAmtInsurancepremiumF +
                            userData.ExpnAmtTravelExpensesF +
                            userData.ExpnAmtCautionMoneyF}
                        </td>
                        <td>
                          {userData.ExpnAmtAdmissionFeesA +
                            userData.ExpnAmtinstrumentsA +
                            userData.ExpnAmtExaminationFeeA +
                            userData.ExpnAmtBoardingA +
                            userData.ExpnAmtInsurancepremiumA +
                            userData.ExpnAmtTravelExpensesA +
                            userData.ExpnAmtCautionMoneyA +
                            userData.ExpnAmtAdmissionFeesB +
                            userData.ExpnAmtinstrumentsB +
                            userData.ExpnAmtExaminationFeeB +
                            userData.ExpnAmtBoardingB +
                            userData.ExpnAmtInsurancepremiumB +
                            userData.ExpnAmtTravelExpensesB +
                            userData.ExpnAmtCautionMoneyB +
                            userData.ExpnAmtAdmissionFeesC +
                            userData.ExpnAmtinstrumentsC +
                            userData.ExpnAmtExaminationFeeC +
                            userData.ExpnAmtBoardingC +
                            userData.ExpnAmtInsurancepremiumC +
                            userData.ExpnAmtTravelExpensesC +
                            userData.ExpnAmtCautionMoneyC +
                            userData.ExpnAmtAdmissionFeesD +
                            userData.ExpnAmtinstrumentsD +
                            userData.ExpnAmtExaminationFeeD +
                            userData.ExpnAmtBoardingD +
                            userData.ExpnAmtInsurancepremiumD +
                            userData.ExpnAmtTravelExpensesD +
                            userData.ExpnAmtCautionMoneyD +
                            userData.ExpnAmtAdmissionFeesE +
                            userData.ExpnAmtinstrumentsE +
                            userData.ExpnAmtExaminationFeeE +
                            userData.ExpnAmtBoardingE +
                            userData.ExpnAmtInsurancepremiumE +
                            userData.ExpnAmtTravelExpensesE +
                            userData.ExpnAmtCautionMoneyE +
                            userData.ExpnAmtAdmissionFeesF +
                            userData.ExpnAmtinstrumentsF +
                            userData.ExpnAmtExaminationFeeF +
                            userData.ExpnAmtBoardingF +
                            userData.ExpnAmtInsurancepremiumF +
                            userData.ExpnAmtTravelExpensesF +
                            userData.ExpnAmtCautionMoneyF}
                        </td>
                      </tr>
                    </HtmlTable>
                    <hr style={{ margin: "10px 0px" }} />
                    <h3>MEANS OF FINANCE:</h3>
                    <HtmlTable>
                      <tr>
                        <th></th>
                        <th>
                          <h3>Amount</h3>
                        </th>
                        <th>
                          <h3>Percentage %</h3>
                        </th>
                      </tr>
                      <tr>
                        <td>Promoters Contribution</td>
                        <td> {userData.AmtPromoters}</td>
                        <td> {userData.PerPromoters}</td>
                      </tr>
                      <tr>
                        <td>
                          Loan from{" "}
                          {userData.LoanSchemeCode == "central-nsfdc-el-a" ||
                          userData.LoanSchemeCode == "central-nsfdc-el-b"
                            ? "NSFDC"
                            : "NSKFDC"}
                        </td>
                        <td>{userData.LoanAmount}</td>
                        <td> {userData.PerLoanNSFDC}</td>
                      </tr>
                      <tr>
                        <td>Loan from State Channelising Agency</td>
                        <td>{userData.AmtLoanStateAgency}</td>
                        <td>{userData.PerLoanStateAgency}</td>
                      </tr>
                      <tr>
                        <td> Subsidy</td>
                        <td>{userData.AmtSubsidy}</td>
                        <td> {userData.PerSubsidy}</td>
                      </tr>
                      <tr>
                        <td>Total</td>
                        <td>{userData.AmtTotal}</td>
                        <td></td>
                      </tr>
                    </HtmlTable>
                    <hr style={{ margin: "10px 0px" }} />
                    <h3>OTHER DETAILS:</h3>
                    <HtmlTable>
                      <tr>
                        <td>
                          State in brief how the completion of the course is
                          going to help for improving your prospects of earning
                          your livelihood.
                        </td>
                        <td> {userData.OtherDetails}</td>
                      </tr>
                      <tr>
                        <td>Expected income per month</td>
                        <td> {userData.Expectedincomepm}</td>
                      </tr>
                      <tr>
                        <td>Anticipated monthly expenses</td>
                        <td> {userData.Anticipatedmonthlyexpn}</td>
                      </tr>
                      <tr>
                        <td>Amount available for Repayment of Loan</td>
                        <td> {userData.Amtavailableforrepayment}</td>
                      </tr>
                    </HtmlTable>

                    <Row>
                      <Col style={style} span={6}></Col>
                      <Col style={style} span={6}></Col>
                    </Row>
                  </>
                ) : (
                  ""
                )}

                {userData.Photopath ? (
                  <Row>
                    <Col style={style} span={8}>
                      <h4>Photo:</h4>
                    </Col>
                    <Col span={12} style={style}>
                      <a
                        href={REACT_APP_BASE_URL + userData.Photopath}
                        target="blank"
                      >
                        <img
                          src={REACT_APP_BASE_URL + userData.Photopath}
                          alt={userData.Photopath}
                          width={"150px"}
                        />
                      </a>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}
                {userData.Signaturepath ? (
                  <Row>
                    <Col style={style} span={8}>
                      <h4>Signature:</h4>
                    </Col>
                    <Col span={12} style={style}>
                      <a
                        href={REACT_APP_BASE_URL + userData.Signaturepath}
                        target="blank"
                      >
                        <img
                          src={REACT_APP_BASE_URL + userData.Signaturepath}
                          alt={userData.Signaturepath}
                          width={"150px"}
                        />
                      </a>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}

                {userData.Uaadharpath ? (
                  <Row>
                    <Col style={style} span={8}>
                      <h4>Udyam Aadhar Copy:</h4>
                    </Col>
                    <Col span={12} style={style}>
                      <a
                        href={REACT_APP_BASE_URL + userData.Uaadharpath}
                        target="blank"
                      >
                        Udyam Aadhar Copy
                      </a>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}
                {userData.AddressProofpath ? (
                  <Row>
                    <Col style={style} span={8}>
                      <h4>Copy of Address Proof:</h4>
                    </Col>
                    <Col span={12} style={style}>
                      <a
                        href={REACT_APP_BASE_URL + userData.AddressProofpath}
                        target="blank"
                      >
                        Copy of Address Proof
                      </a>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}
                {userData.AadharFrontpath ? (
                  <Row>
                    <Col style={style} span={8}>
                      <h4>Copy of Aadhar Card (Front Side):</h4>
                    </Col>
                    <Col span={12} style={style}>
                      <a
                        href={REACT_APP_BASE_URL + userData.AadharFrontpath}
                        target="blank"
                      >
                        Copy of Aadhar Card (Front Side)
                      </a>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}
                {userData.AadharBackpath ? (
                  <Row>
                    <Col style={style} span={8}>
                      <h4>Copy of Aadhar Card (back side):</h4>
                    </Col>
                    <Col span={12} style={style}>
                      <a
                        href={REACT_APP_BASE_URL + userData.AadharBackpath}
                        target="blank"
                      >
                        Copy of Aadhar Card (back side)
                      </a>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}
                {userData.SKDpath ? (
                  <Row>
                    <Col style={style} span={8}>
                      <h4>Safai Karmachari Dhakla(Attested Nagar Sevak):</h4>
                    </Col>
                    <Col span={12} style={style}>
                      <a
                        href={REACT_APP_BASE_URL + userData.SKDpath}
                        target="blank"
                      >
                        Safai Karmachari Dhakla(Attested Nagar Sevak)
                      </a>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}
                {userData.Pancardpath ? (
                  <Row>
                    <Col style={style} span={8}>
                      <h4>Pancard:</h4>
                    </Col>
                    <Col span={12} style={style}>
                      <a
                        href={REACT_APP_BASE_URL + userData.Pancardpath}
                        target="blank"
                      >
                        Pancard
                      </a>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}
                {userData.CasteCertificatepath ? (
                  <Row>
                    <Col style={style} span={8}>
                      <h4>Caste Certificate:</h4>
                    </Col>
                    <Col span={12} style={style}>
                      <a
                        href={
                          REACT_APP_BASE_URL + userData.CasteCertificatepath
                        }
                        target="blank"
                      >
                        Caste Certificate
                      </a>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}
                {userData.IncomeCertificatepath ? (
                  <Row>
                    <Col style={style} span={8}>
                      <h4>Income Certificate:</h4>
                    </Col>
                    <Col span={12} style={style}>
                      <a
                        href={
                          REACT_APP_BASE_URL + userData.IncomeCertificatepath
                        }
                        target="blank"
                      >
                        Income Certificate
                      </a>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}
                {userData.ProjectReportpath ? (
                  <Row>
                    <Col style={style} span={8}>
                      <h4>Project Report:</h4>
                    </Col>
                    <Col span={12} style={style}>
                      <a
                        href={REACT_APP_BASE_URL + userData.ProjectReportpath}
                        target="blank"
                      >
                        Project Report
                      </a>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}
                {userData.EducationCertificatepath ? (
                  <Row>
                    <Col style={style} span={8}>
                      <h4>Education Certificate:</h4>
                    </Col>
                    <Col span={12} style={style}>
                      <a
                        href={
                          REACT_APP_BASE_URL + userData.EducationCertificatepath
                        }
                        target="blank"
                      >
                        Education Certificate
                      </a>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}
                {userData.Admissionpath ? (
                  <Row>
                    <Col style={style} span={8}>
                      <h4>Admission Letter:</h4>
                    </Col>
                    <Col span={12} style={style}>
                      <a
                        href={REACT_APP_BASE_URL + userData.Admissionpath}
                        target="blank"
                      >
                        Admission Letter
                      </a>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}
                {userData.Eduexpnpath ? (
                  <Row>
                    <Col style={style} span={8}>
                      <h4>Letter by Institute About Educational Expenses:</h4>
                    </Col>
                    <Col span={12} style={style}>
                      <a
                        href={REACT_APP_BASE_URL + userData.Eduexpnpath}
                        target="blank"
                      >
                        Letter by Institute About Educational Expenses
                      </a>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}
                {userData.Guarantorpath ? (
                  <Row>
                    <Col style={style} span={8}>
                      <h4>Guarantor's letter:</h4>
                    </Col>
                    <Col span={12} style={style}>
                      <a
                        href={REACT_APP_BASE_URL + userData.Guarantorpath}
                        target="blank"
                      >
                        Guarantor's letter
                      </a>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}
                {userData.Passbookcqpath ? (
                  <Row>
                    <Col style={style} span={8}>
                      <h4>Passbook / Cheque:</h4>
                    </Col>
                    <Col span={12} style={style}>
                      <a
                        href={REACT_APP_BASE_URL + userData.Passbookcqpath}
                        target="blank"
                      >
                        Passbook / Cheque
                      </a>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}
                {userData.Rationcardpath ? (
                  <Row>
                    <Col style={style} span={8}>
                      <h4>Ration Card:</h4>
                    </Col>
                    <Col span={12} style={style}>
                      <a
                        href={REACT_APP_BASE_URL + userData.Rationcardpath}
                        target="blank"
                      >
                        Ration Card
                      </a>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}
                {userData.Voterspath ? (
                  <Row>
                    <Col style={style} span={8}>
                      <h4>Voter Id Card:</h4>
                    </Col>
                    <Col span={12} style={style}>
                      <a
                        href={REACT_APP_BASE_URL + userData.Voterspath}
                        target="blank"
                      >
                        Voter Id Card
                      </a>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}
                {userData.CasteCertificatepath ? (
                  <Row>
                    <Col style={style} span={8}>
                      <h4>Caste Certificate:</h4>
                    </Col>
                    <Col span={12} style={style}>
                      <a
                        href={
                          REACT_APP_BASE_URL + userData.CasteCertificatepath
                        }
                        target="blank"
                      >
                        Caste Certificate
                      </a>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}
                {userData.Visapath ? (
                  <Row>
                    <Col style={style} span={8}>
                      <h4>Visa:</h4>
                    </Col>
                    <Col span={12} style={style}>
                      <a
                        href={REACT_APP_BASE_URL + userData.Visapath}
                        target="blank"
                      >
                        Visa
                      </a>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}

                {/* <Col span={24} style={style}>
          <h3>Family Details:</h3>
          <DataTable columns={columns} dataSource={userData.FamilyData} />
        </Col> */}
                {/* <PDFDownloadLink document={<Loanpdfdownload userData={userData} />} fileName="my-document.pdf">
                  {({ blob, url, loading, error }) =>
                    loading ? 'Loading document...' : 'Download PDF'
                  }
                </PDFDownloadLink> */}
              </Form>
            </div>
          )}
        </ProfileDataModal>
      </div>
    );
  }
};
export default LoanFormAllData;
