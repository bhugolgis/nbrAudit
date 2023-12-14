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
  DatePicker,
  Checkbox,
} from "antd";
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
} from "./style";
import useLoanList from "./container";
import { SearchInput } from "../../../apps/admin-side/style";
import data from "../../../data/dtdata.json";
import { REACT_APP_BASE_URL } from "../../utils/urls";
import moment from "moment";
import { loanmanagementInstance } from "../../../libs/utils/fetch-utils";
import { Token } from "../../utils/sessionStorage";
import LoanBankApprovepage from "./LoanBankApprovepage";
import LoanBankReleasepage from "./LoanBankReleasepage";
import LoanBankClosepage from "./LoanBankClosepage";
import Loanlogspage from "./Loanlogspage";

const { Search } = Input;
const { Option } = Select;
const style = { border: "0px solid #eceff1", padding: "8px 0 0 8px" };

const LoanList = (props) => {
  const [userList, setUserData] = useState();
  const getdt = () => {
    axios({
      method: "get",
      url: `${REACT_APP_BASE_URL}/loan/LoanSchemeLists/?search=`,
    }).then((response) => {
      setUserData(response.data.results);
      //setModalLoading(false);
    });
  };

  useEffect(() => {
    getdt();
  }, []);

  // const userList = [
  //   {
  //     id: 1,
  //     LoanSchemeName: "Subsidy Scheme",
  //     LoanSchemeCode: "state-subsidy",
  //     isActiveFromDate: "1-jan-2023",
  //     isActiveToDate: "1-jan-2025",
  //     isActive: false,
  //   },
  //   {
  //     id: 2,
  //     LoanSchemeName: "Money Margin Scheme",
  //     LoanSchemeCode: "state-mm",
  //     isActiveFromDate: "1-jan-2023",
  //     isActiveToDate: "1-jan-2025",
  //     isActive: false,
  //   },
  //   {
  //     id: 3,
  //     LoanSchemeName: "Direct Finance Scheme",
  //     LoanSchemeCode: "state-df",
  //     isActiveFromDate: "1-jan-2023",
  //     isActiveToDate: "1-jan-2025",
  //     isActive: false,
  //   },

  //   {
  //     id: 4,
  //     LoanSchemeName: "NSFDC-Term Loan",
  //     LoanSchemeCode: "central-nsfdc-tl-a",
  //     isActiveFromDate: "1-jan-2023",
  //     isActiveToDate: "1-jan-2025",
  //     isActive: false,
  //   },
  //   {
  //     id: 5,
  //     LoanSchemeName: "NSFDC Micro Credit Finance",
  //     LoanSchemeCode: "central-nsfdc-mcf",
  //     isActiveFromDate: "1-jan-2023",
  //     isActiveToDate: "1-jan-2025",
  //     isActive: false,
  //   },
  //   {
  //     id: 6,
  //     LoanSchemeName: "NSFDC Mahila Samrudhi",
  //     LoanSchemeCode: "central-nsfdc-msy",
  //     isActiveFromDate: "1-jan-2023",
  //     isActiveToDate: "1-jan-2025",
  //     isActive: false,
  //   },
  //   {
  //     id: 7,
  //     LoanSchemeName: "NSFDC Mahila Kisan Yojana",
  //     LoanSchemeCode: "central-nsfdc-mky",
  //     isActiveFromDate: "1-jan-2023",
  //     isActiveToDate: "1-jan-2025",
  //     isActive: false,
  //   },
  //   {
  //     id: 8,
  //     LoanSchemeName: "NSFDC Educational Loan For domestic higher education",
  //     LoanSchemeCode: "central-nsfdc-el-a",
  //     isActiveFromDate: "1-jan-2023",
  //     isActiveToDate: "1-jan-2025",
  //     isActive: true,
  //   },
  //   {
  //     id: 9,
  //     LoanSchemeName: "NSFDC Educational Loan For higher education abroad",
  //     LoanSchemeCode: "central-nsfdc-el-b",
  //     isActiveFromDate: "1-jan-2023",
  //     isActiveToDate: "1-jan-2025",
  //     isActive: true,
  //   },

  //   {
  //     id: 10,
  //     LoanSchemeName: "NSKFDC Term Loan",
  //     LoanSchemeCode: "central-nskfdc-gtl",
  //     isActiveFromDate: "1-jan-2023",
  //     isActiveToDate: "1-jan-2025",
  //     isActive: false,
  //   },
  //   {
  //     id: 11,
  //     LoanSchemeName: "NSKFDC Micro Credit Finance",
  //     LoanSchemeCode: "central-nskfdc-mcf",
  //     isActiveFromDate: "1-jan-2023",
  //     isActiveToDate: "1-jan-2025",
  //     isActive: false,
  //   },
  //   {
  //     id: 12,
  //     LoanSchemeName: "NSKFDC Mahila Samrudhi",
  //     LoanSchemeCode: "central-nskfdc-msy",
  //     isActiveFromDate: "1-jan-2023",
  //     isActiveToDate: "1-jan-2025",
  //     isActive: false,
  //   },
  //   {
  //     id: 13,
  //     LoanSchemeName: "NSKFDC Mahila Adhikarita Yojana",
  //     LoanSchemeCode: "central-nskfdc-may",
  //     isActiveFromDate: "1-jan-2023",
  //     isActiveToDate: "1-jan-2025",
  //     isActive: false,
  //   },
  //   {
  //     id: 14,
  //     LoanSchemeName: "NSKFDC Educational Loan For domestic higher education",
  //     LoanSchemeCode: "central-nskfdc-el-a",
  //     isActiveFromDate: "1-jan-2023",
  //     isActiveToDate: "1-jan-2025",
  //     isActive: true,
  //   },
  //   {
  //     id: 15,
  //     LoanSchemeName: "NSKFDC Educational Loan For higher education abroad",
  //     LoanSchemeCode: "central-nskfdc-el-b",
  //     isActiveFromDate: "1-jan-2023",
  //     isActiveToDate: "1-jan-2025",
  //     isActive: true,
  //   },
  // ];

  const [isLoanLogsModalOpen, setIsLoanLogsModalOpen] = useState(false);
  const [schemename, setschemename] = useState("");
  const [schemedetail, setschemedetail] = useState();
  const [FinalisActiveFromDate, setFinalisActiveFromDate] = useState("");
  const [FinalisActiveToDate, setFinalisActiveToDate] = useState("");
  const [FinalisActive, setFinalisActive] = useState(false);

  const showLoanLogsModal = (e) => {
    setschemename(e);
    setschemedetail(userList.filter((name) => name.id == e)[0]);

    setFinalisActiveFromDate(
      userList.filter((name) => name.id == e)[0].isActiveFromDate
    );
    setFinalisActiveToDate(
      userList.filter((name) => name.id == e)[0].isActiveToDate
    );
    setFinalisActive(userList.filter((name) => name.id == e)[0].isActive);

    setIsLoanLogsModalOpen(true);
  };

  const handleLoanLogsOk = () => {
    setIsLoanLogsModalOpen(false);
  };

  const handleLoanLogsCancel = () => {
    setIsLoanLogsModalOpen(false);
  };

  const handleisActiveFromDate = (e) => {
    setFinalisActiveFromDate(e);
  };
  const handleisActiveToDate = (e) => {
    setFinalisActiveToDate(e);
  };
  const handleisActive = (e) => {
    setFinalisActive(e.target.checked);
  };

  // const [userData, setUserData] = useState();
  const columns = [
    // {
    //   title: "#",
    //   dataIndex: "#",
    //   render: (text) => {
    //     return (
    //       <>
    //         <Profile />
    //       </>
    //     );
    //   },
    // },
    {
      title: "Loan Scheme Name",
      dataIndex: "LoanSchemeCode",
      key: "LoanSchemeCode",
    },

    {
      title: "Active From Date",
      dataIndex: "isActiveFromDate",
      key: "isActiveFromDate",
    },
    {
      title: "Active To Date",
      dataIndex: "isActiveToDate",
      key: "isActiveToDate",
      // filters: disData,
      // onFilter: (value, record) => record.district.indexOf(value) === 0,
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (text) => {
        return (
          <>
            {/* {text == true ? "Enabled" : "Disabled"} */}
            {text == true ? (
              <ApprovedStatus>Enabled</ApprovedStatus>
            ) : (
              <PendingStatus>Disabled</PendingStatus>
            )}
            {/* <Checkbox checked={text} /> */}
          </>
        );
      },
    },

    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (text) => {
        return (
          <>
            <Edit
              onClick={() => {
                showLoanLogsModal(text);
              }}
            />
          </>
        );
      },
    },
  ];

  return (
    <div>
      <span style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Loan Scheme {props.heading} List</h3>
      </span>
      {/* {console.log(userList)} */}
      <DataTable columns={columns} dataSource={userList} />

      {isLoanLogsModalOpen ? (
        <>
          <StatusModal
            title="Loan Scheme Activation Detail"
            visible={isLoanLogsModalOpen}
            onOk={handleLoanLogsOk}
            onCancel={handleLoanLogsCancel}
          >
            <Form layout="vertical">
              {/* <StatusFields>
                  <Form.Item label="id">
                    {schemedetail.id}
                  </Form.Item>
                </StatusFields> */}
              <Row>
                <StatusFields>
                  <Form.Item label="Loan Scheme Name">
                    <h3>{schemedetail.LoanSchemeName}</h3>
                    {/* defaultValue={
                      personalInfo.issueDate == null
                        ? ""
                        : moment(personalInfo.issueDate)
                    } */}
                  </Form.Item>
                </StatusFields>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item label="Active From Date" name="isActiveFromDate">
                    <DatePicker
                      defaultValue={moment(FinalisActiveFromDate)}
                      onChange={handleisActiveFromDate}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item label="Active To Date">
                    <DatePicker
                      defaultValue={moment(FinalisActiveToDate)}
                      onChange={handleisActiveToDate}
                    />
                  </Form.Item>
                </Col>
              </Row>
              {/* <Row>
                <Col span={24}>
                  <Form.Item label="Active">
                    <Checkbox
                      onChange={handleisActive}
                      checked={FinalisActive}
                    />
                  </Form.Item>
                </Col>
              </Row> */}
              <Form.Item>
                <Button
                  type="primary"
                  onClick={() => {
                    if (
                      FinalisActiveFromDate == null ||
                      FinalisActiveFromDate == ""
                    ) {
                      message.warning("Please select Active From Date.");
                    } else if (
                      FinalisActiveToDate == null ||
                      FinalisActiveToDate == ""
                    ) {
                      message.warning("Please select Active To Date.");
                    } else {
                      loanmanagementInstance
                        .patch(
                          `${REACT_APP_BASE_URL}/loan/LoanSchemeListUpdate/${schemename}/`,
                          {
                            isActiveFromDate: moment(
                              FinalisActiveFromDate
                            ).format("YYYY-MM-DD"),
                            isActiveToDate:
                              moment(FinalisActiveToDate).format("YYYY-MM-DD"),
                            // isActive: FinalisActive,
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
                            setIsLoanLogsModalOpen(false);
                            message.success(response.data.message);
                            // setTimeout(() => {
                            //   window.location.reload();
                            // }, 500);
                          }
                        });
                    }
                  }}
                >
                  Update
                </Button>
              </Form.Item>
            </Form>
          </StatusModal>
        </>
      ) : (
        ""
      )}
    </div>
  );
};
export default LoanList;
