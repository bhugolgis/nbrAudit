import React from "react";
import useMpbcdc from "../container";
import { LoadContainer } from "../../../../../user-side/style";
import { Card, Col, Row, Space, Spin, Table, Tabs } from "antd";
import { SnippetsOutlined } from "@ant-design/icons";
import styled from "styled-components";

const columns = [
  { title: "District", dataIndex: "district" },
  { title: "Loan Applications", dataIndex: "LoanApplicationCount" },
];

const trainingCol = [
  { title: "District", dataIndex: "district" },
  { title: "Total Count", dataIndex: "trainingApplicationCount" },
  { title: "Pending", dataIndex: "TotalTrainingApplicationPending" },
  { title: "Sortlisted", dataIndex: "TotalTrainingApplicationShortlisted" },
  { title: "Selected", dataIndex: "TotalTrainingApplicationSelected" },
  { title: "Rejected", dataIndex: "TotalTrainingApplicationRejected" },
];
const Dashboard = () => {
  const { dashboard, dashboardLoading } = useMpbcdc();

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
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              label: "Loan",
              key: "1",
              children: (
                <>
                  <Row gutter={24}>
                    <Col span={6}>
                      <Cards bordered={false}>
                        <h4> Total Loan Applications</h4>
                        <h2>{dashboard.TotalLoanApplication}</h2>
                      </Cards>
                    </Col>
                    <Col span={6}>
                      <Cards bordered={false}>
                        <h4>Pending Loan Applications</h4>
                        <h2>{dashboard.TotalLoanPendingApplication}</h2>
                      </Cards>
                    </Col>
                    <Col span={6}>
                      <Cards bordered={false}>
                        <h4>Active Loans</h4>
                        <h2>{dashboard.ActiveLoanCount}</h2>
                      </Cards>
                    </Col>
                    <Col span={6}>
                      <Cards bordered={false}>
                        <h4>Total Loans</h4>
                        <h2>{dashboard.TotalLoan}</h2>
                      </Cards>
                    </Col>
                  </Row>

                  <Card style={{ marginTop: "20px" }}>
                    <h4>Districtwise Application Counts</h4>
                    <Table
                      columns={columns}
                      dataSource={dashboard.DistrictWiseCounts}
                      pagination={{ pageSize: 5 }}
                    />
                  </Card>
                </>
              ),
            },
            {
              label: "Training",
              key: "2",
              children: (
                <>
                  <Row gutter={24}>
                    <Col span={6}>
                      <Cards bordered={false}>
                        <h4>Total Training Applications</h4>
                        <h2>{dashboard.TotalTrainingApplication}</h2>
                      </Cards>
                    </Col>
                    <Col span={6}>
                      <Cards bordered={false}>
                        <h4>Pending Training Applications</h4>
                        <h2>{dashboard.TotalTrainingApplicationPending}</h2>
                      </Cards>
                    </Col>
                    <Col span={6}>
                      <Cards bordered={false}>
                        <h4>Active Training</h4>
                        <h2>{dashboard.ActiveTrainingCount}</h2>
                      </Cards>
                    </Col>
                    <Col span={6}>
                      <Cards bordered={false}>
                        <h4>Total Training</h4>
                        <h2>{dashboard.TotalTrainingActive}</h2>
                      </Cards>
                    </Col>
                  </Row>

                  <Card style={{ marginTop: "20px" }}>
                    <h4>Districtwise Training Application</h4>
                    <Table
                      columns={trainingCol}
                      dataSource={
                        dashboard.DistrictWiseTrainingApplicationCounts
                      }
                      pagination={{ pageSize: 5 }}
                    />
                  </Card>
                </>
              ),
            },
          ]}
        />
      </div>
    );
  }
};
export default Dashboard;

export const Cards = styled(Card)`
  height: 100px;
`;
