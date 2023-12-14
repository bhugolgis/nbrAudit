import React, { useState, useEffect } from "react";
import { Menu, Row, Col, Tabs } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import LoanFormAllData from "./LoanFormAllData";
import {
  NavBeneficiary,
  NavDashboard,
  NavJob,
  NavLoan,
  NavTraining,
  NavUser,
} from "../../../apps/admin-side/style";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const { TabPane } = Tabs;

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
  getItem("Users", "users", <NavUser />, [
    getItem(<Link to="/admin-cgm">CGM</Link>, "admin-cgm"),
    getItem(<Link to="/admin-dm">District Manager</Link>, "admin-dm"),
    getItem(<Link to="/admin-rm">Regional Manager</Link>, "admin-rm"),
  ]),
  getItem("Jobs", "admin-jobs", <NavJob />, [
    getItem(
      <Link to="/admin-job-dashboard">Jobs Dashboard</Link>,
      "admin-job-dashboard"
    ),
    getItem(
      <Link to="/admin-current-jobs">Current Jobs</Link>,
      "admin-current-jobs"
    ),

    getItem(<Link to="/admin-past-jobs">Past Jobs</Link>, "admin-past-jobs"),
  ]),
  getItem("Loan Schemes", "admin-loan-schemes", <NavLoan />),
  getItem("Training", "admin-training", <NavTraining />),
];

const LoanMPBCDCMDpage = () => {
  const mainUrl = window.location.pathname;
  const relUrl = mainUrl.slice(1);
  const [userData, setUserData] = useState();

  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     //url: `http://3.109.48.93:8000/loanmanagement/StatuswiseTotalListAPI`,
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //       Authorization: `token ${sessionStorage.getItem("token")}`,
  //     },
  //   }).then((response) => {
  //     setUserData(response.data.count);
  //   });
  // });

  return (
    <div>
      <Row>
        <Col span={24} style={{ backgroundColor: "#eaeef3", padding: "30px" }}>
          <Tabs>
            <TabPane tab="MPBCDC-MD Pending" key="tab-a">
              <LoanFormAllData
                statusname="MPBCDC-MD"
                heading="MPBCDC-MD Pending"
              />
            </TabPane>

            <TabPane tab="Bank-Release" key="tab-b">
              <LoanFormAllData
                statusname="BANK-RELEASE"
                heading="Bank-Release"
              />
            </TabPane>

            <TabPane tab="MPBCDC-MD-REJECT" key="tab-c">
              <LoanFormAllData
                statusname="MPBCDC-MD-REJECT"
                heading="MPBCDC-MD-REJECT"
              />
            </TabPane>

            <TabPane tab="On-Going Applications" key="tab-b">
              <LoanFormAllData
                statusname="LOAN-ACTIVE"
                heading="On-Going Loan Applications"
              />
            </TabPane>

            <TabPane tab="Loan closed" key="tab-e">
              <LoanFormAllData statusname="LOAN-CLOSED" heading="Loan Closed" />
            </TabPane>

            <TabPane tab="Loan Defaulted" key="tab-f">
              <LoanFormAllData
                statusname="LOAN-DEFAULTER"
                heading="Loan Defaulted"
              />
            </TabPane>

            <TabPane tab="All loan status" key="tab-g">
              <LoanFormAllData statusname="ALL" heading="All loan status" />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
};

export default LoanMPBCDCMDpage;
