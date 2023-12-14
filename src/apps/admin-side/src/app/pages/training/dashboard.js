import { Card, Col, Row, Spin } from "antd";
import React from "react";
import {
  ActiveJob,
  CardContainer,
  CardTable,
  DataTable,
  JobApplication,
  TotalJob,
  TotalJobIcons,
} from "../jobs/style";
import { useState } from "react";
import { fetchAdminTrainingDashboard } from "../../api/commonApi";
import { useEffect } from "react";
import { LoadContainer } from "./style";
import styled from "styled-components";

const columns = [
  { title: "District", dataIndex: "user__district" },
  { title: "Total Applications", dataIndex: "count" },
  { title: "Pending", dataIndex: "pending" },
  { title: "Shortlisted", dataIndex: "sortlisted" },
  { title: "Selected", dataIndex: "selected" },
  { title: "Rejected", dataIndex: "Rejected" },
];
export default function AdminTrainingDashboard() {
  const [dashboard, setDashboard] = useState();
  const [loading, setLoading] = useState(true);
  const getTrainingDashboardData = async () => {
    const response = await fetchAdminTrainingDashboard();
    setDashboard(response);
    setLoading(false);
  };

  useEffect(() => {
    getTrainingDashboardData();
  }, []);

  if (loading == true) {
    <LoadContainer>
      <Spin tip="Loading data..." />
    </LoadContainer>;
  } else {
    return (
      <div>
        <h3>Training Dashboard</h3>
        <Row gutter={24}>
          <Col span={6}>
            <Cards>
              <Row>
                <Col span={8}>
                  <ActiveJob />
                </Col>
                <Col span={16}>
                  <h4>Active Training</h4>
                  <h2>{dashboard.TotalTrainingActive}</h2>
                </Col>
              </Row>
            </Cards>
          </Col>
          <Col span={6}>
            <Cards>
              <Row>
                <Col span={8}>
                  <JobApplication />
                </Col>
                <Col span={16}>
                  <h4>Total Applications</h4>
                  <h2>{dashboard.TotalTrainingApplication}</h2>
                </Col>
              </Row>
            </Cards>
          </Col>
          <Col span={6}>
            <Cards>
              <Row>
                <Col span={8}>
                  <TotalJobIcons />
                </Col>
                <Col span={16}>
                  <h4>Pending </h4>
                  <h2>{dashboard.TotalTrainingApplicationPending}</h2>
                </Col>
              </Row>
            </Cards>
          </Col>
          <Col span={6}>
            <Cards>
              <Row>
                <Col span={8}>
                  <TotalJob />
                </Col>
                <Col span={16}>
                  <h4>Beneficiary Selected</h4>
                  <h2>{dashboard.TotalTrainingApplicationSelected}</h2>
                </Col>
              </Row>
            </Cards>
          </Col>
        </Row>
        <div style={{ marginTop: "20px" }}>
          <CardTable>
            <h3>Districtwise Training Applications </h3>
            <DataTable
              columns={columns}
              dataSource={dashboard.DistrictWiseTrainingApplication}
              pagination={{ pageSize: 4 }}
            />
          </CardTable>
        </div>
      </div>
    );
  }
}

export const Cards = styled(Card)`
  margin-right: 20px;
  height: 90px;
  box-shadow: -8px 12px 18px 0 #dadee8;
  border-radius: 5px;
  .ant-card-body {
    padding: 15px;
  }
`;
