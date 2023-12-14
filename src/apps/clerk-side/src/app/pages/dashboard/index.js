import React from "react";
import { Cards, UserIcon, Count } from "./style";
import { Row, Col, Spin, Card } from "antd";
import useClerk from "../container";
import { LoadContainer, DataTable } from "../../../../style";
const ScrutinyDashboard = () => {
  const columns = [
    { title: "Application ID", dataIndex: "Applicationid" },
    { title: "Beneficiary ID", dataIndex: "BeneficiaryId" },
    { title: "First Name", dataIndex: "FirstName" },
    { title: "Middle Name", dataIndex: "MiddleName" },
    { title: "Last Name", dataIndex: "LastName" },
    { title: "Phone Number", dataIndex: "Phone" },
    { title: "Email ID", dataIndex: "Emailid" },
    { title: "Caste", dataIndex: "Caste" },
    { title: "Loan Scheme", dataIndex: "LoanScheme" },
    { title: "Loan Amount", dataIndex: "LoanAmount" },
    { title: "Status", dataIndex: "LastStatus" },
    { title: "Status Remarks", dataIndex: "Lastremarks" },
    { title: "District", dataIndex: "District" },
  ];
  const { clerkDashboard, dashboardLoading } = useClerk();
  if (dashboardLoading == true) {
    return (
      <LoadContainer>
        <Spin tip="Loading data" />
      </LoadContainer>
    );
  } else {
    return (
      <>
        <Row style={{ display: "flex", justifyContent: "space-between" }}>
          <Cards>
            <h4>Loan Applications</h4>
            <Count>{clerkDashboard.TotalLoanApplication}</Count>
          </Cards>
          <Cards>
            <h4>Pending Application</h4>
            <Count>{clerkDashboard.ScrutinyPending}</Count>
          </Cards>
          <Cards>
            <h4>Verfified Applications</h4>
            <Count>{clerkDashboard.TotalApplicationScrutinyVerified}</Count>
          </Cards>
        </Row>
        <h3 style={{ marginTop: "20px" }}>Recent Loan Applications</h3>
        <DataTable
          columns={columns}
          dataSource={clerkDashboard.LatestLoanApplication}
        />
      </>
    );
  }
};
export default ScrutinyDashboard;
