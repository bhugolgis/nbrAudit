import { Row, Col, Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import TrainingApplications from "../dm-side/src/app/pages/trainingApplications";
import { MainContainer } from "../rm-side/style";
import LoanScrunitypage from "./src/app/pages/applications";
import ScrutinyDashboard from "./src/app/pages/dashboard";
import { FullName } from "../../libs/utils/sessionStorage";
import { AppstoreOutlined, FileOutlined } from "@ant-design/icons";

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
    <Link to="/clerk-dashboard">Dashboard</Link>,
    "clerk-dashboard",
    <AppstoreOutlined />
  ),
  getItem(
    <Link to="/loanscrunitypage">Loan Applications</Link>,
    "loanscrunitypage",
    <FileOutlined />
  ),
];
const ClerkDashboard = () => {
  const mainUrl = window.location.pathname;
  const relUrl = mainUrl.slice(1);

  return (
    <div>
      <Row>
        <Col span={4}>
          <h4 style={{ margin: "10px 23px 10px 23px" }}>Hello, {FullName}</h4>
          <Menu defaultSelectedKeys={`${relUrl}`} mode="inline" items={items} />
        </Col>
        <Col span={20}>
          <MainContainer>
            {relUrl == "clerk-dashboard" ? <ScrutinyDashboard /> : ""}
            {relUrl == "loanscrunitypage" ? <LoanScrunitypage /> : ""}
            {relUrl == "clerk-training-applications" ? (
              <TrainingApplications />
            ) : (
              ""
            )}
          </MainContainer>
        </Col>
      </Row>
    </div>
  );
};
export default ClerkDashboard;
