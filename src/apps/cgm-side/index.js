import React, { useState, useEffect } from "react";
import { Menu, Row, Col } from "antd";
import {
  MailOutlined,
  SettingOutlined,
  AppstoreOutlined,
  ApartmentOutlined,
  FileOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import districtData from "../../data/dtdata.json";

import BeneficiaryApplications from "./src/app/pages/Jobs/applications";
import styled from "styled-components";
import AddJob from "./src/app/pages/Jobs/add jobs";
import PastJobs from "./src/app/pages/Jobs/pastJobs";
import CurrentJobs from "./src/app/pages/Jobs/current jobs";
import JobDashboard from "./src/app/pages/Jobs/job dashboard";
import CgmTraining from "../admin-side/src/app/pages/training";
import CgmSpecialSchemes from "./src/app/pages/schemes";
import SchemeDashboard from "./src/app/pages/dashboard/schemeDashboard";
import { FullName, Id } from "../../libs/utils/sessionStorage";
const Dashboard = (props) => {
  const mainUrl = window.location.pathname;
  const relUrl = mainUrl.slice(1);

  const [districtList, setDistrictList] = useState([]);
  useEffect(() => {
    districtData.map((data) => {
      setDistrictList((array) => [...array, data.district_name]);
    });
  }, []);

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
    getItem("Dashboard", "dashboard", <AppstoreOutlined />, [
      getItem(<Link to="/cgm-dashboard">Job </Link>, "cgm-dashboard"),
      getItem(
        <Link to="/cgm-scheme-dashboard">Schemes </Link>,
        "cgm-scheme-dashboard"
      ),
    ]),

    getItem(
      <Link to="/beneficiary-applications">Job Applications</Link>,
      "beneficiary-applications",
      <FileOutlined />
    ),
    getItem("Manage Jobs", "jobs", <ApartmentOutlined />, [
      getItem(<Link to="/cgm-add-job">Add Job</Link>, "cgm-add-job"),

      getItem(
        <Link to="/cgm-current-jobs">Current Jobs</Link>,
        "cgm-current-jobs"
      ),

      getItem(<Link to="/cgm-past-jobs">Past Jobs</Link>, "cgm-past-jobs"),
    ]),
    getItem(
      <Link to="/cgm-special-schemes">Special Schemes</Link>,
      "cgm-special-schemes",
      <FileTextOutlined />
    ),
  ];
  return (
    <div>
      <Row style={{ display: "flex" }}>
        <Col span={4}>
          <h4 style={{ margin: "10px 23px 10px 23px" }}>Hello, {FullName}</h4>
          <Sidebar
            defaultSelectedKeys={`${relUrl}`}
            mode="inline"
            items={items}
          />
        </Col>
        <Col
          span={20}
          style={{
            padding: "15px 30px 30px 30px",
            background: "rgb(234, 238, 243)",
          }}
        >
          {relUrl == "cgm-dashboard" ? (
            <JobDashboard list={districtList} />
          ) : (
            ""
          )}
          {relUrl == "beneficiary-applications" ? (
            <BeneficiaryApplications />
          ) : (
            ""
          )}
          {relUrl == "cgm-current-jobs" ? <CurrentJobs address={relUrl} /> : ""}
          {relUrl == "cgm-past-jobs" ? <PastJobs address={relUrl} /> : ""}
          {relUrl == "cgm-add-job" ? <AddJob /> : ""}
          {relUrl == "cgm-job-dashboard" ? <JobDashboard /> : ""}
          {relUrl == "cgm-training" ? <CgmTraining /> : ""}
          {relUrl == "cgm-special-schemes" ? <CgmSpecialSchemes /> : ""}
          {relUrl == "cgm-scheme-dashboard" ? <SchemeDashboard /> : ""}
        </Col>
      </Row>
    </div>
  );
};
export default Dashboard;
export const Sidebar = styled(Menu)`
  .ant-menu-inline {
    height: 100%;
  }
`;
