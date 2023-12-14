import React from "react";
import useMahapreitDashboard from "../container";
import { Card, Col, Row, Spin, Table } from "antd";
import { Cards } from "../../../../../mpbcdc-admin/src/app/pages/dashboard";
import { LoadContainer } from "../../../../../user-side/style";

const Dashboard = () => {
  const schemeColumn = [
    { title: "Scheme Name", dataIndex: "specialScheme__schemeName" },
    {
      title: "Vertical",
      dataIndex: "specialScheme__schemeVertical__VerticalName",
    },
    { title: "Total Applications", dataIndex: "count" },
    { title: "Pending", dataIndex: "pending" },
    { title: "Sortlisted", dataIndex: "sortlisted" },
    { title: "Selected", dataIndex: "selected" },
    { title: "Rejected", dataIndex: "Rejected" },
  ];

  const jobColumn = [
    { title: "Job Name", dataIndex: "job__JobName" },
    { title: "Job Status", dataIndex: "job__JobStatus" },
    { title: "Total count", dataIndex: "count" },
    { title: "Pending", dataIndex: "pending" },
    { title: "Sortlisted", dataIndex: "sortlisted" },
    { title: "Selected", dataIndex: "selected" },
    { title: "Rejected", dataIndex: "Rejected" },
  ];
  const { dashboard, dashboardLoading } = useMahapreitDashboard();
  if (dashboardLoading == true) {
    return (
      <LoadContainer>
        <Spin tip="Loading data" />
      </LoadContainer>
    );
  } else {
    return (
      <div>
        <h3>Dashboard</h3>
        <Row gutter={24}>
          <Col span={6}>
            <Cards bordered={false}>
              <h4> Total Active Jobs</h4>
              <h2>{dashboard.TotalActiveJobs}</h2>
            </Cards>
          </Col>
          <Col span={6}>
            <Cards bordered={false}>
              <h4>Total Active Schemes</h4>
              <h2>{dashboard.TotalActiveSpecialSchemes}</h2>
            </Cards>
          </Col>
          <Col span={6}>
            <Cards bordered={false}>
              <h4>Job Application</h4>
              <h2>{dashboard.TotalJobAppReceived}</h2>
            </Cards>
          </Col>
          <Col span={6}>
            <Cards bordered={false}>
              <h4>Schemes Application</h4>
              <h2>{dashboard.TotalSpecialSchemeAppReceived}</h2>
            </Cards>
          </Col>
        </Row>
        <Card style={{ marginTop: "20px" }}>
          <h3>Schemewise Applications</h3>
          <Table
            columns={schemeColumn}
            dataSource={dashboard.DistrictWiseSpecialScheme}
            pagination={{ pageSize: 5 }}
          />
        </Card>
        <Card style={{ marginTop: "20px" }}>
          <h3>Jobwise applications</h3>
          <Table
            columns={jobColumn}
            dataSource={dashboard.JobStatusWiseCount}
            pagination={{ pageSize: 5 }}
          />
        </Card>
      </div>
    );
  }
};
export default Dashboard;
