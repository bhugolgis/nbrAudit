import { Card, Col, Row, Spin } from "antd";
import React from "react";
import styled from "styled-components";
import {
  ActiveJob,
  CardContainer,
  JobApplication,
  TotalJob,
  TotalJobIcons,
} from "../../../../../admin-side/src/app/pages/jobs/style";
import { CardTable } from "../../../../../admin-side/style";
import { DataTable } from "../../../../style";
import useCgmData from "../container";
import { LoadContainer } from "../schemes/style";
import { schemeOfferings } from "../../constants/columns";
import { useState, useRef } from "react";
import { Input, Space, Button } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import SearchFilter from "../../../../../../libs/common-ui/searchFilter";
import disData from "../../../../../../data/disFilter.json";

const SchemeDashboard = () => {
  const { schemeDashboard, schemeDashboardLoading } = useCgmData();

  const DistrictWiseSchemeApps = [
    {
      title: "District",
      dataIndex: "district",
      key: "district",
      filterSearch: true,
      filters: disData,
      onFilter: (value, record) => record.district.indexOf(value) === 0,
    },
    {
      title: "Application Count",
      dataIndex: "SpecialSchemeApplication",
    },
  ];
  if (schemeDashboardLoading == true) {
    return (
      <LoadContainer>
        <Spin tip="Loading data..." />
      </LoadContainer>
    );
  } else {
    return (
      <div>
        <h3>Special Schemes Dashboard</h3>
        <Row gutter={24}>
          <Col span={6}>
            <Cards>
              <Row>
                <Col span={8}>
                  <ActiveJob />
                </Col>
                <Col span={16}>
                  <h4>Active Schemes</h4>
                  <h2>{schemeDashboard.TotalSpecialSchemeActive}</h2>
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
                  <h4>Applications</h4>
                  <h2>{schemeDashboard.TotalSpecialSchemeApplication}</h2>
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
                  <h4>Beneficiary Selected</h4>
                  <h2>{schemeDashboard.TotalBeneficarySelected}</h2>
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
                  <h4>Total Schemes</h4>
                  <h2>{schemeDashboard.TotalSpecialScheme}</h2>
                </Col>
              </Row>
            </Cards>
          </Col>
        </Row>
        <CardContainer gutter={24}>
          <Col span={9}>
            <CardTable>
              <h3>Districtwise Scheme Applications (Active)</h3>
              <DataTable
                columns={DistrictWiseSchemeApps}
                dataSource={
                  schemeDashboard.DistrictWiseSpecialSchemeApplication
                }
                pagination={{ pageSize: 4 }}
              />
            </CardTable>
          </Col>
          <Col span={15}>
            <CardTable>
              <h3>Scheme Offerings (Active)</h3>
              <DataTable
                columns={schemeOfferings}
                dataSource={schemeDashboard.specialSchemeOfferings}
                pagination={{ pageSize: 4 }}
              />
            </CardTable>
          </Col>
        </CardContainer>
      </div>
    );
  }
};
export default SchemeDashboard;

export const Cards = styled(Card)`
  margin: 15px 0px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  border-radius: 10px;
`;
