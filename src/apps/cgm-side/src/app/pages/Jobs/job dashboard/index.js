import React from "react";
import {
  Cards,
  CardContainer,
  TotalJob,
  ActiveJob,
  JobApplication,
  TotalJobIcons,
  CardTable,
  DataTable,
} from "../../../../../../admin-side/src/app/pages/jobs/style";
import { Row, Col, Spin, Card } from "antd";
import {
  districtwise,
  jobOfferingsColumn,
  verticalwise,
} from "../../../../../../admin-side/src/app/pages/jobs/constants";
import { LoadContainer } from "../../../../../../admin-side/src/app/pages/jobs/style";
import useCgmData from "../../container";
import { Column } from "@ant-design/plots";

const JobDashboard = () => {
  const { loading, cgmDashboardDetails, jobApplicationCount } = useCgmData();
  const data = jobApplicationCount;
  const config = {
    data,
    xField: "candidate__district",
    yField: "count",
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.8,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "count",
      },
      sales: {
        alias: "district",
      },
    },
  };
  if (loading == true) {
    return (
      <LoadContainer>
        <Spin tip="Loading data" />
      </LoadContainer>
    );
  } else {
    return (
      <div>
        <h3>Job Dashboard</h3>
        <Row>
          <Col span={6}>
            <Cards>
              <Row>
                <Col span={8}>
                  <ActiveJob />
                </Col>
                <Col span={16}>
                  <h4>Active Jobs</h4>
                  <h2>{cgmDashboardDetails.ActiveJobCount}</h2>
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
                  <h4>Job Applications</h4>
                  <h2>{cgmDashboardDetails.TotalJobApplication}</h2>
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
                  <h4>Users Benefitted</h4>
                  <h2>{cgmDashboardDetails.ApplicantBenefittedCount}</h2>
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
                  <h4>Total Jobs</h4>
                  <h2>{cgmDashboardDetails.AllJobCount}</h2>
                </Col>
              </Row>
            </Cards>
          </Col>
        </Row>
        <CardContainer>
          <Col span={9}>
            <CardTable>
              <h3>Districtwise Job Applications (Active)</h3>
              <DataTable
                columns={districtwise}
                dataSource={cgmDashboardDetails.districtJobApplicationCount}
                pagination={{ pageSize: 4 }}
              />
            </CardTable>
          </Col>
          <Col span={15}>
            <CardTable>
              <h3>Job Offerings (Active)</h3>
              <DataTable
                columns={jobOfferingsColumn}
                dataSource={cgmDashboardDetails.JobStatusWiseCount}
                pagination={{ pageSize: 4 }}
              />
            </CardTable>
          </Col>
        </CardContainer>
        <CardContainer>
          <Col span={24}>
            <Card
              style={{
                padding: "20px",
                height: "400px",
                marginRight: "20px",
                padding: "0px",
              }}
            >
              <h3>Districtwise Job Applications (Active)</h3>
              <Column
                {...config}
                style={{ height: "280px", padding: "20px 0px 0px 0px" }}
              />
            </Card>
          </Col>
        </CardContainer>
      </div>
    );
  }
};
export default JobDashboard;
