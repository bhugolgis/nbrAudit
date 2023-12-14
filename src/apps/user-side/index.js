import { Row, Col, Menu } from "antd";
import React from "react";
import {
  AppstoreOutlined,
  UserOutlined,
  ShoppingOutlined,
  FileTextOutlined,
  ProfileOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import UserProfile from "./src/app/pages/profile/userProfile";
import DashboardContent from "./src/app/pages/dashboard";
import LoanBeneficiarypage from "./src/app/pages/loan applications";
import UserJobApplication from "./src/app/pages/jobs";
import UserTrainingApplication from "./src/app/pages/training";
import UserSchemesApplication from "./src/app/pages/schemes";
import { FullName, Id } from "../../libs/utils/sessionStorage";

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
    <Link to="/user-dashboard">Dashboard</Link>,
    "user-dashboard",
    <AppstoreOutlined />
  ),
  getItem(
    <Link to="/user-profile">Profile</Link>,
    "user-profile",
    <UserOutlined />
  ),
  getItem(
    <Link to="/user-job-application">Job Application</Link>,
    "user-job-application",
    <ShoppingOutlined />
  ),
  // getItem(
  //   <Link to="/user-scheme-application">Schemes Application</Link>,
  //   "user-scheme-application",
  //   <AppstoreOutlined />
  // ),
  getItem(
    <Link to="/user-training-application">Training Application</Link>,
    "user-training-application",
    <ToolOutlined />
  ),

  getItem(
    <Link to="/loanbeneficiarypage">Loan Applications</Link>,
    "loanbeneficiarypage",
    <FileTextOutlined />
  ),
  getItem(
    <Link to="/beneficiary-scheme-application">
      Special Schemes Application
    </Link>,
    "beneficiary-scheme-application",
    <ProfileOutlined />
  ),
];

const UserDashboard = (props) => {
  const mainUrl = window.location.pathname;
  const relUrl = mainUrl.slice(1);

  return (
    <div>
      <Row>
        <Col span={4}>
          <h4 style={{ margin: "10px 23px 0px 23px" }}>Hello, {FullName}</h4>
          <h5 style={{ margin: "10px 23px" }}>ID - {Id}</h5>
          <Menu defaultSelectedKeys={[relUrl]} mode="inline" items={items} />
        </Col>
        <Col span={20} style={{ background: "rgb(234, 238, 243)" }}>
          {relUrl == "user-dashboard" ? <DashboardContent /> : ""}
          {relUrl == "user-profile" ? <UserProfile /> : ""}
          {relUrl == "loanbeneficiarypage" ? <LoanBeneficiarypage /> : ""}
          {relUrl == "user-job-application" ? <UserJobApplication /> : ""}
          {relUrl == "user-training-application" ? (
            <UserTrainingApplication />
          ) : (
            ""
          )}
          {relUrl == "beneficiary-scheme-application" ? (
            <UserSchemesApplication />
          ) : (
            " "
          )}
        </Col>
      </Row>
    </div>
  );
};
export default UserDashboard;
