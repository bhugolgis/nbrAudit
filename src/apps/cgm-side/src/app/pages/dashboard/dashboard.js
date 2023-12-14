import React from "react";
import styled from "styled-components";
import { Table, Row, Col, Card } from "antd";
import { MdWork } from "react-icons/md";
import { RiFilePaperFill } from "react-icons/ri";
import { TiTick } from "react-icons/ti";
import BeneficaryAllData from "../../../../../admin-side/src/app/pages/beneficiary";
const { Meta } = Card;

const CgmDashboard = (props) => {
  return (
    <div>
      <Row style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Dashboard</h3>
        <h3>Assigned Vertical - {sessionStorage.getItem("verticalName")} </h3>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Cards>
            <Meta
              avatar={
                <MdWork
                  style={{
                    fontSize: "30px",
                    marginTop: "10px",
                    color: "#1a8cff",
                  }}
                />
              }
              title=""
              description="No of Jobs as per Vertical"
            />
          </Cards>
        </Col>
        <Col span={8}>
          <Cards>
            <Meta
              avatar={
                <RiFilePaperFill
                  style={{
                    fontSize: "30px",
                    marginTop: "10px",
                    color: "#ffcc00",
                  }}
                />
              }
              title=""
              description="Beneficiaries Registered"
            />
          </Cards>
        </Col>
        <Col span={8}>
          <Cards>
            <Meta
              avatar={
                <TiTick
                  style={{
                    fontSize: "30px",
                    marginTop: "10px",
                    color: "#33cc33",
                  }}
                />
              }
              title=""
              description="Approved Applications"
            />
          </Cards>
        </Col>
      </Row>

      <BeneficaryAllData />
    </div>
  );
};
export default CgmDashboard;
export const MainContainer = styled.div`
  padding: 30px;
  background-color: #f2f2f2;
`;
export const UserTable = styled(Table)`
  margin-top: 30px;
  .ant-table-thead > tr > th {
    background: #78a6c8;
    color: #fff;
  }
`;
export const Cards = styled(Card)`
  margin: 15px 0px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  border-radius: 10px;
`;
