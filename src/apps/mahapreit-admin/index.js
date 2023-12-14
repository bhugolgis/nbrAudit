import { Row, Col, Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import AssistedBeneficiary from "../admin-side/src/app/pages/assissted";
import Dashboard from "./src/app/pages/dashboard";
import MahapreitJobs from "./src/app/pages/jobs";
import BeneficaryAllData from "../admin-side/src/app/pages/beneficiary";
import { FullName } from "../../libs/utils/sessionStorage";
import {
  AppstoreOutlined,
  FileOutlined,
  TeamOutlined,
  WalletOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import SpecialSchemes from "./src/app/pages/schemes";

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
    <Link to="/mahapreit-dashboard">Dashboard</Link>,
    "mahapreit-dashboard",
    <AppstoreOutlined />
  ),
  getItem(
    <Link to="/mahapreit-beneficiaires">Beneficiaries</Link>,
    "mahapreit-beneficiaires",
    <FileOutlined />
  ),
  getItem(
    <Link to="/beneficiary-asssited-list-mahapreit">Assisted Beneficiary</Link>,
    "beneficiary-asssited-list-mahapreit",
    <TeamOutlined />
  ),
  getItem(
    <Link to="/mahapreit-jobs">Jobs</Link>,
    "mahapreit-jobs",
    <WalletOutlined />
  ),
  getItem(
    <Link to="/mahapreit-schemes">Special Schemes</Link>,
    "mahapreit-schemes",
    <FileTextOutlined />
  ),
];
const MahapreitDashboard = () => {
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
        style={{ padding: "15px 30px", backgroundColor: "rgb(234, 238, 243)" }}
      >
        {relUrl == "mahapreit-dashboard" ? <Dashboard /> : ""}
        {relUrl == "mahapreit-jobs" ? <MahapreitJobs /> : ""}
        {relUrl == "beneficiary-asssited-list-mahapreit" ? (
          <AssistedBeneficiary />
        ) : (
          ""
        )}
        {relUrl == "mahapreit-beneficiaires" ? <BeneficaryAllData /> : ""}
        {relUrl == "mahapreit-schemes" ? <SpecialSchemes /> : ""}
      </Col>
    </Row>
  );
};
export default MahapreitDashboard;
