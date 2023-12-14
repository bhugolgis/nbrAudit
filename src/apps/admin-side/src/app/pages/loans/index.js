import React from "react";
import { CardTable, DataTable } from "../../../../style";
import { Row, Col, Card, Spin } from "antd";
import { UserIcon } from "../../../../style";
import { SchemewiseLoan } from "./columns";
import styled from "styled-components";
import useAdminLoan from "./container";
import { LoadContainer } from "../beneficiary/style";
const AdminLoan = () => {
  const { loanDashboard, dashboardLoading } = useAdminLoan();

  if (dashboardLoading == true) {
    return (
      <LoadContainer>
        <Spin tip="Loading data" />
      </LoadContainer>
    );
  } else {
    return (
      <div>
        <h3>Loan Schemes Dashboard</h3>
        <Row gutter={24}>
          <Col span={6}>
            <Cards bordered={false}>
              <h4>Loan Application</h4>
              <h2>{loanDashboard.TotalLoanApplication}</h2>
            </Cards>
          </Col>
          <Col span={6}>
            <Cards bordered={false}>
              <h4>Active Loans</h4>
              <h2>{loanDashboard.ActiveLoanCount}</h2>
            </Cards>
          </Col>
          <Col span={6}>
            <Cards bordered={false}>
              <h4>Active Loans</h4>
              <h2>{loanDashboard.ActiveLoanCount}</h2>
            </Cards>
          </Col>
          <Col span={6}>
            <Cards bordered={false}>
              <h4>Active Loans</h4>
              <h2>{loanDashboard.ActiveLoanCount}</h2>
            </Cards>
          </Col>
        </Row>
      </div>
    );
  }
};
export default AdminLoan;

export const Cards = styled(Card)`
  height: 100px;
`;
