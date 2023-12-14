import { Row, Col, Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import DistrictManagerDashboard from "./src/app/pages/dashboard";
import LoanDMpage from "./src/app/pages/applications";
import {
  AppstoreOutlined,
  UserOutlined,
  FileOutlined,
  ApartmentOutlined,
  ContainerOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import AddTraining from "./src/app/pages/addTraining";
import CurrentTraining from "./src/app/pages/currentTraining";
import TrainingApplications from "./src/app/pages/trainingApplications";
import AssistedBeneficiary from "../admin-side/src/app/pages/assissted";
import LoanAppCountReport from "../../libs/common-ui/loanApplicationReport/countReport";
import LoanAppDetailReport from "../../libs/common-ui/loanApplicationReport/detailsReport";
import { FullName } from "../../libs/utils/sessionStorage";
import PastTraining from "./src/app/pages/pastTraining";

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
    <Link to="/dm-dashboard">Dashboard</Link>,
    "dm-dashboard",
    <AppstoreOutlined />
  ),
  getItem(
    <Link to="/beneficiary-asssisted-list-dm">Assisted Beneficiary</Link>,
    "beneficiary-asssisted-list-dm",
    <UserOutlined />
  ),

  getItem(
    <Link to="/loandmpage">Loan Applications</Link>,
    "loandmpage",
    <FileOutlined />
  ),
  getItem(
    <Link to="/dm-training-application">Training Applications</Link>,
    "dm-training-application",
    <FileOutlined />
  ),

  getItem("Manage Training", "manage-training", <ApartmentOutlined />, [
    getItem(<Link to="/add-training">Add Training</Link>, "add-training"),
    getItem(
      <Link to="/current-training">Current Training</Link>,
      "current-training"
    ),
    getItem(
      <Link to="/dm-past-training">Past Training</Link>,
      "dm-past-training"
    ),
  ]),
  getItem(
    <Link to="/dm-loanCount-report">Loan Application Count</Link>,
    "dm-loanCount-report",
    <FileTextOutlined />
  ),
  getItem(
    <Link to="/dm-loanDetail-report">Loan Application Detail</Link>,
    "dm-loanDetail-report",
    <ContainerOutlined />
  ),
];
const DmDashboard = () => {
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
        {relUrl == "dm-dashboard" ? <DistrictManagerDashboard /> : ""}
        {relUrl == "loandmpage" ? <LoanDMpage /> : ""}
        {relUrl == "add-training" ? <AddTraining /> : ""}
        {relUrl == "current-training" ? <CurrentTraining /> : ""}
        {relUrl == "dm-training-application" ? <TrainingApplications /> : ""}
        {relUrl == "beneficiary-asssisted-list-dm" ? (
          <AssistedBeneficiary />
        ) : (
          ""
        )}
        {relUrl == "dm-loanCount-report" ? <LoanAppCountReport /> : ""}
        {relUrl == "dm-loanDetail-report" ? <LoanAppDetailReport /> : ""}
        {relUrl == "dm-past-training" ? <PastTraining /> : ""}
      </Col>
    </Row>
  );
};
export default DmDashboard;
