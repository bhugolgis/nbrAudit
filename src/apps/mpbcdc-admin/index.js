import { Row, Col, Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import LoanAppCountReport from "../../libs/common-ui/loanApplicationReport/countReport";
import LoanAppDetailReport from "../../libs/common-ui/loanApplicationReport/detailsReport";
import LoanList from "../../libs/common-ui/LoanManagement/LoanList";
import AssistedBeneficiary from "../admin-side/src/app/pages/assissted";
import Dashboard from "./src/app/pages/dashboard";
import MpbcdcLoanApplication from "./src/app/pages/loanApplication";
import MpbcdcTrainingList from "./src/app/pages/training";
import { FullName } from "../../libs/utils/sessionStorage";
import {
  AppstoreOutlined,
  UserOutlined,
  ToolOutlined,
  ProfileOutlined,
  FileOutlined,
  FileTextOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import LoanMPBCDCpage from "../../libs/common-ui/LoanManagement/LoanMPBCDCpage";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem(
    <Link to="/mpbcdc-dashboard">Dashboard</Link>,
    "mpbcdc-dashboard",
    <AppstoreOutlined />
  ),
  getItem(
    <Link to="/beneficiary-assisted-list-mpbcdc">Assisted Beneficiary</Link>,
    "beneficiary-assisted-list-mpbcdc",
    <UserOutlined />
  ),
  getItem(
    <Link to="/mpbcdc-training">Training</Link>,
    "mpbcdc-training",
    <ToolOutlined />
  ),
  getItem(
    <Link to="/loanmpbcdcpage">Loan Applications</Link>,
    "loanmpbcdcpage",
    <FileTextOutlined />
  ),
  getItem(
    <Link to="/LoanList">Loan Status</Link>,
    "LoanList",
    <ProfileOutlined />
  ),
  getItem(
    <Link to="/mpbcdc-loan-application">Application count</Link>,
    "mpbcdc-loan-application",
    <FileOutlined />
  ),
  getItem(
    <Link to="/loan-count-report">Loan Application Count</Link>,
    "loan-count-report",
    <FileTextOutlined />
  ),
  getItem(
    <Link to="/loan-detail-report">Loan Application Detail</Link>,
    "loan-detail-report",
    <ContainerOutlined />
  ),
];
const MpbcdcDashboard = () => {
  const mainUrl = window.location.pathname;
  const relUrl = mainUrl.slice(1);

  return (
    <Row>
      <Col span={4}>
        <h4 style={{ margin: "10px 23px 10px 23px" }}>Hello, {FullName}</h4>
        <Menu defaultSelectedKeys={`${relUrl}`} mode="inline" items={items} />
      </Col>
      <Col
        span={20}
        style={{ padding: "15px 30px", background: "rgb(234, 238, 243)" }}
      >
        {relUrl == "mpbcdc-dashboard" ? <Dashboard /> : ""}
        {relUrl == "mpbcdc-training" ? <MpbcdcTrainingList /> : ""}
        {relUrl == "beneficiary-assisted-list-mpbcdc" ? (
          <AssistedBeneficiary />
        ) : (
          ""
        )}
        {relUrl == "LoanList" ? <LoanList /> : ""}
        {relUrl == "mpbcdc-loan-application" ? <MpbcdcLoanApplication /> : ""}
        {relUrl == "loan-count-report" ? <LoanAppCountReport /> : ""}
        {relUrl == "loan-detail-report" ? <LoanAppDetailReport /> : ""}
        {relUrl == "loanmpbcdcpage" ? <LoanMPBCDCpage /> : ""}
      </Col>
    </Row>
  );
};
export default MpbcdcDashboard;
