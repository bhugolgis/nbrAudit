import { Row, Col, Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import AssistedBeneficiary from "../admin-side/src/app/pages/assissted";
import LoanRMpage from "./src/app/pages/applications";
import Dashboard from "./src/app/pages/dashboard";
import { MainContainer } from "./style";
import LoanAppCountReport from "../../libs/common-ui/loanApplicationReport/countReport";
import LoanAppDetailReport from "../../libs/common-ui/loanApplicationReport/detailsReport";
import {
  AppstoreOutlined,
  TeamOutlined,
  FileOutlined,
  FileTextOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
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
    <Link to="/rm-dashboard">Dashboard</Link>,
    "rm-dashboard",
    <AppstoreOutlined />
  ),
  getItem(
    <Link to="/beneficiary-asssisted-list-rm">Assisted Beneficiary</Link>,
    "beneficiary-asssisted-list-rm",
    <TeamOutlined />
  ),
  getItem(
    <Link to="/loanrmpage">Loan Applications</Link>,
    "loanrmpage",
    <FileOutlined />
  ),
  getItem(
    <Link to="/rm-loanCount-report">Loan Application Count</Link>,
    "rm-loanCount-report",
    <FileTextOutlined />
  ),
  getItem(
    <Link to="/rm-loanDetail-report">Loan Application Detail</Link>,
    "rm-loanDetail-report",
    <ContainerOutlined />
  ),
];
const RmDashboard = () => {
  const mainUrl = window.location.pathname;
  const relUrl = mainUrl.slice(1);

  return (
    <Row>
      <Col span={4}>
        <Menu defaultSelectedKeys={`${relUrl}`} mode="inline" items={items} />
      </Col>
      <Col span={20}>
        <MainContainer>
          {relUrl == "rm-dashboard" ? <Dashboard /> : ""}
          {relUrl == "beneficiary-asssisted-list-rm" ? (
            <AssistedBeneficiary />
          ) : (
            ""
          )}
          {relUrl == "loanrmpage" ? <LoanRMpage /> : ""}
          {relUrl == "rm-loanCount-report" ? <LoanAppCountReport /> : ""}
          {relUrl == "rm-loanDetail-report" ? <LoanAppDetailReport /> : ""}
        </MainContainer>
      </Col>
    </Row>
  );
};
export default RmDashboard;
