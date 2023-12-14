// Admin Menu Section with all the components as per url.

import React, { useState, useEffect } from "react";
import { Menu, Row, Col } from "antd";
import { Link } from "react-router-dom";
import AdminCgm from "./src/app/pages/users/cgm";
import AdminDashboard from "./src/app/pages/dashboard";
import BeneficaryAllData from "./src/app/pages/beneficiary";
import axios from "axios";
import DistrictManager from "./src/app/pages/users/dm";
import AdminRm from "./src/app/pages/users/rm";
import {
  NavBeneficiary,
  NavDashboard,
  NavJob,
  NavTraining,
  NavUser,
} from "./style";
import JobDashboard from "../cgm-side/src/app/pages/Jobs/job dashboard";
import CurrentJobs from "../cgm-side/src/app/pages/Jobs/current jobs";
import PastJobs from "../cgm-side/src/app/pages/Jobs/pastJobs";
import AdminTraining from "./src/app/pages/training";
import BeneficiaryJobApplications from "../cgm-side/src/app/pages/Jobs/applications";
import { FullName, Token } from "../../libs/utils/sessionStorage";
import { REACT_APP_BASE_URL } from "../../libs/utils/urls";
import SchemesApplications from "./src/app/pages/specialSchemes";
import AssistedBeneficiary from "./src/app/pages/assissted";
import LoanList from "../../libs/common-ui/LoanManagement/LoanList";
import SchemeDashboard from "../cgm-side/src/app/pages/dashboard/schemeDashboard";
import ClerkList from "./src/app/pages/users/clerk";
import { FileTextOutlined } from "@ant-design/icons";
import AdminTrainingDashboard from "./src/app/pages/training/dashboard";
import CurrentTraining from "../dm-side/src/app/pages/currentTraining";
import PastTraining from "../dm-side/src/app/pages/pastTraining";
import DistrictManagerDashboard from "../dm-side/src/app/pages/dashboard";
import SpecialSchemes from "../mahapreit-admin/src/app/pages/schemes";
import LoanMPBCDCMDpage from "../../libs/common-ui/LoanManagement/LoanMPBCDCMDpage";
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
    <Link to="/admin-dashboard">Dashboard</Link>,
    "admin-dashboard",
    <NavDashboard />
  ),
  getItem(
    <Link to="/admin-beneficiaries-list">Beneficiaries</Link>,
    "admin-beneficiaries-list",
    <NavBeneficiary />
  ),
  getItem(
    <Link to="/beneficiary-assisted">Assisted Beneficiary</Link>,
    "beneficiary-assisted",
    <NavBeneficiary />
  ),
  getItem("Manage Users", "users", <NavUser />, [
    getItem(<Link to="/admin-cgm">CGM</Link>, "admin-cgm"),
    getItem(<Link to="/admin-dm">District Manager</Link>, "admin-dm"),
    getItem(<Link to="/admin-rm">Regional Manager</Link>, "admin-rm"),
    getItem(<Link to="/admin-scrutiny">Scrutiny Clerk</Link>, "admin-scrutiny"),
  ]),

  getItem("Manage Jobs", "admin-jobs", <NavJob />, [
    getItem(
      <Link to="/admin-job-dashboard">Dashboard</Link>,
      "admin-job-dashboard"
    ),
    getItem(
      <Link to="/admin-job-applications">Applications</Link>,
      "admin-job-applications"
    ),
    getItem(
      <Link to="/admin-current-jobs">Current Jobs</Link>,
      "admin-current-jobs"
    ),

    getItem(<Link to="/admin-past-jobs">Past Jobs</Link>, "admin-past-jobs"),
  ]),
  getItem("Manage Training", "admin-training", <NavTraining />, [
    getItem(
      <Link to="/admin-training-dashboard">Dashboard</Link>,
      "admin-training-dashboard"
    ),
    getItem(<Link to="/admin-training">Applications</Link>, "admin-training"),
    getItem(
      <Link to="/admin-current-training">Current Training</Link>,
      "admin-current-training"
    ),
    getItem(
      <Link to="/admin-past-training">Past Training</Link>,
      "admin-past-training"
    ),
  ]),
  getItem("Manage Schemes", "admin-schemes", <FileTextOutlined />, [
    getItem(
      <Link to="/admin-schemes-dashboard">Dashboard</Link>,
      "admin-schemes-dashboard"
    ),
    getItem(
      <Link to="/admin-schemes-applications">Applications</Link>,
      "admin-schemes-applications"
    ),
  ]),
  // getItem(
  //   <Link to="/admin-special-schemes-application">Special Schemes</Link>,
  //   "admin-special-schemes-application",
  //   <NavLoan />
  // ),

  getItem("Manage Loan", "manage-loan", <FileTextOutlined />, [
    getItem(
      <Link to="/admin-loan-dashboard">Dashboard</Link>,
      "admin-loan-dashboard"
    ),
    getItem(
      <Link to="/loanmpbcdcmdpage">Applications</Link>,
      "loanmpbcdcmdpage"
    ),
  ]),
];

const AdminMain = (props) => {
  const mainUrl = window.location.pathname;
  const relUrl = mainUrl.slice(1);
  const [userData, setUserData] = useState();

  useEffect(() => {
    axios({
      method: "get",
      url: `${REACT_APP_BASE_URL}/adminmodule/ApplicantList`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: Token,
      },
    }).then((response) => {
      setUserData(response.data.count);
    });
  });
  return (
    <div>
      <Row>
        <Col span={4}>
          <h4 style={{ margin: "10px 23px 10px 23px" }}>Hello, {FullName}</h4>
          <Menu defaultSelectedKeys={`${relUrl}`} mode="inline" items={items} />
        </Col>
        <Col
          span={20}
          style={{ backgroundColor: "#eaeef3", padding: "15px 30px 30px 30px" }}
        >
          {relUrl == "admin-cgm" ? <AdminCgm /> : ""}
          {relUrl == "admin-dashboard" ? (
            <AdminDashboard userCount={userData} />
          ) : (
            ""
          )}
          {relUrl == "admin-beneficiaries-list" ? (
            <BeneficaryAllData userData={userData} />
          ) : (
            ""
          )}
          {relUrl == "admin-dm" ? <DistrictManager /> : ""}
          {relUrl == "admin-current-jobs" ? <CurrentJobs /> : ""}
          {relUrl == "admin-rm" ? <AdminRm /> : ""}
          {relUrl == "admin-past-jobs" ? <PastJobs /> : ""}
          {relUrl == "admin-job-dashboard" ? <JobDashboard /> : ""}
          {relUrl == "admin-loan-dashboard" ? <DistrictManagerDashboard /> : ""}
          {relUrl == "admin-training" ? <AdminTraining /> : ""}
          {relUrl == "admin-job-applications" ? (
            <BeneficiaryJobApplications />
          ) : (
            ""
          )}
          {relUrl == "admin-special-schemes-application" ? (
            <SchemesApplications />
          ) : (
            ""
          )}
          {relUrl == "beneficiary-assisted" ? <AssistedBeneficiary /> : ""}
          {relUrl == "LoanList" ? <LoanList /> : ""}
          {relUrl == "admin-schemes-dashboard" ? <SchemeDashboard /> : ""}
          {relUrl == "admin-scrutiny" ? <ClerkList /> : ""}
          {relUrl == "admin-training-dashboard" ? (
            <AdminTrainingDashboard />
          ) : (
            ""
          )}
          {relUrl == "admin-current-training" ? <CurrentTraining /> : ""}
          {relUrl == "admin-past-training" ? <PastTraining /> : ""}
          {relUrl == "admin-schemes-applications" ? <SpecialSchemes /> : ""}
          {relUrl == "loanmpbcdcmdpage" ? <LoanMPBCDCMDpage /> : ""}
        </Col>
      </Row>
    </div>
  );
};
export default AdminMain;
