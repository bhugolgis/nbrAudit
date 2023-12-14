import { Col, Row, Spin } from "antd";
import React from "react";
import DistrictLoanApplicationTable from "../../../../../../libs/common-ui/Tables";
import SchemewiseLoanApplicationTable from "../../../../../../libs/common-ui/Tables/scheme";
import { CardsTable, DataTable, MainContainer } from "../../../../style";
import useRMData from "../container";
import { Cards } from "../../../../../dm-side/style";
import { LoadContainer } from "../../../../../user-side/style";

const Dashboard = () => {
  const { dashboard, loading } = useRMData();

  if (loading == true) {
    <LoadContainer>
      <Spin tip="Loading data..." />
    </LoadContainer>;
  } else {
    return (
      <>
        <Row style={{ display: "flex" }}>
          <Cards style={{ marginRight: "25px" }}>
            <h4>Total Beneficiary</h4>
            <h3>{dashboard.totalBeneficaryRegionCount}</h3>
          </Cards>
          <Cards>
            <h4>Total Loan Application</h4>
            <h3>{dashboard.TotalLoanApplication}</h3>
          </Cards>
        </Row>
        <Row>
          <Col span={10}>
            <CardsTable>
              <h3>Districtwise Loan Application</h3>
              <DistrictLoanApplicationTable
                DistrictWiseSpecialScheme={dashboard.DistrictWiseSpecialScheme}
              />
            </CardsTable>
          </Col>
          <Col span={14}>
            <CardsTable>
              <h3>Schemewise Loan Application</h3>
              <SchemewiseLoanApplicationTable
                SchemewiseloanApplications={
                  dashboard.SchemewiseloanApplications
                }
              />
            </CardsTable>
          </Col>
        </Row>
      </>
    );
  }
};
export default Dashboard;
