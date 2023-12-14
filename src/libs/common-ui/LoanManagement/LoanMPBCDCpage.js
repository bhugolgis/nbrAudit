import React, { useState, useEffect } from "react";
import { Menu, Row, Col, Tabs } from "antd";
import { Link } from "react-router-dom";
import LoanFormAllData from "./LoanFormAllData";
import {
  NavBeneficiary,
  NavDashboard,
  NavJob,
  NavLoan,
  NavTraining,
  NavUser,
} from "../../../apps/admin-side/style";

const { TabPane } = Tabs;

const LoanMPBCDCpage = () => {
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
        <Col span={24} style={{ backgroundColor: "#eaeef3" }}>
          <Tabs>
            <TabPane tab="MPBCDC-ADMIN" key="tab-a">
              <LoanFormAllData
                statusname="MPBCDC-ADMIN"
                heading="MPBCDC-ADMIN Pending"
              />
            </TabPane>

            <TabPane tab="Bank-Release" key="tab-b">
              <LoanFormAllData
                statusname="BANK-RELEASE"
                heading="Bank-Release"
              />
            </TabPane>

            <TabPane tab="MPBCDC-ADMIN-REJECT" key="tab-c">
              <LoanFormAllData
                statusname="MPBCDC-ADMIN-REJECT"
                heading="MPBCDC-ADMIN-REJECT"
              />
            </TabPane>

            <TabPane tab="On-Going Applications" key="tab-d">
              <LoanFormAllData
                statusname="LOAN-ACTIVE"
                heading="On-Going Loan Applications"
              />
            </TabPane>

            <TabPane tab="All loan status" key="tab-e">
              <LoanFormAllData statusname="ALL" heading="All loan status" />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
};

export default LoanMPBCDCpage;
