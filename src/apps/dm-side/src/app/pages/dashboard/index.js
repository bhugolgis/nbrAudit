import React from "react";
import {
  CardContainer,
  UserIcon,
  Cards,
  Count,
  DataTable,
} from "../../../../style";
import { Row, Col, Spin, Tabs } from "antd";
import { CardsTable, LoadContainer } from "./style";
import useTraining from "../container";
import { UserGroup } from "../../../../../../libs/utils/sessionStorage";
import { CardTable } from "../../../../../admin-side/style";

const DistrictManagerDashboard = () => {
  const DistrictwiseLoanApplication = [
    { title: "District", dataIndex: "district" },
    { title: "Total Application", dataIndex: "DistrictWiseApplication" },
    { title: "Application Pending", dataIndex: "LoanApplicationPending" },
    { title: "DM Query", dataIndex: "LoanDmQuery" },
    { title: "DM Verified", dataIndex: "LoanDmVerified" },
    { title: "RM Reject", dataIndex: "LoanRMReject" },
    { title: "Loan Active", dataIndex: "LoanActive" },
  ];
  const SchemewiseLoanApplication = [
    {
      title: "Scheme",
      dataIndex: "LoanScheme",
    },
    {
      title: "Application Count",
      dataIndex: "TotalCount",
    },
  ];

  const trainingApplication = [
    { title: "District", dataIndex: "district" },
    { title: "Total", dataIndex: "TotalTrainingApplication" },
    { title: "Pending", dataIndex: "TotalTrainingPendingApplication" },
    { title: "Shortlisted", dataIndex: "TotalTrainingShortlistedApplication" },
    { title: "Selected", dataIndex: "TotalTrainingSelectedApplication" },
    { title: "Rejected", dataIndex: "TotalTrainingRejectedApplication" },
  ];

  const adminDistrictwise = [
    { title: "District", dataIndex: "district" },
    { title: "Total Applications", dataIndex: "DistrictWiseApplication" },
    { title: "Pending", dataIndex: "LoanApplicationPending" },
    { title: "Query", dataIndex: "LoanQuery" },
  ];

  const { dmDashboard, dashboardLoading, adminLoanDashboard } = useTraining();
  if (dashboardLoading == true) {
    <LoadContainer>
      <Spin tip="Loading data..." spinning={true} />
    </LoadContainer>;
  } else {
    return UserGroup == "admin" ? (
      <div>
        <h3>Loan Dashboard</h3>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Cards>
            <Row
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px",
              }}
            >
              <h4>Total Applications</h4>
              <Count>{adminLoanDashboard.TotalLoanApplication}</Count>
            </Row>
          </Cards>
          <Cards>
            <Row
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px",
              }}
            >
              <h4>Applications Pending</h4>
              <Count>{adminLoanDashboard.TotalLoanApplicationPending}</Count>
            </Row>
          </Cards>
          <Cards>
            <Row
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px",
              }}
            >
              <h4>Loans Active</h4>
              <Count>{adminLoanDashboard.TotalLoanActive}</Count>
            </Row>
          </Cards>
          <Cards>
            <Row
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px",
              }}
            >
              <h4>Applications Closed</h4>
              <Count>{adminLoanDashboard.TotalLoanClosed}</Count>
            </Row>
          </Cards>
        </div>
        <CardTable style={{ marginTop: "20px" }}>
          <h4>Districtwise loan Applications</h4>
          <DataTable
            columns={adminDistrictwise}
            dataSource={adminLoanDashboard.DistrictWiseLoanApplication}
          />
        </CardTable>
        <CardTable style={{ marginTop: "20px" }}>
          <DataTable
            columns={SchemewiseLoanApplication}
            dataSource={adminLoanDashboard.SchemewiseloanApplications}
          />
        </CardTable>
      </div>
    ) : (
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
                  <CardContainer>
                    <Cards>
                      <Row
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          padding: "10px",
                        }}
                      >
                        <h4>Total Beneficiary</h4>
                        <Count>{dmDashboard.TotalBeneficaryServed}</Count>
                      </Row>
                    </Cards>
                    <Cards>
                      <Row
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          padding: "10px",
                        }}
                      >
                        <h4>Total Application</h4>
                        <Count>{dmDashboard.TotalLoanApplication}</Count>
                      </Row>
                    </Cards>
                    <Cards>
                      <Row
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          padding: "10px",
                        }}
                      >
                        <h4>Pending Application</h4>
                        <Count>{dmDashboard.TotalLoanApplicationPending}</Count>
                      </Row>
                    </Cards>
                    <Cards>
                      <Row
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          padding: "10px",
                        }}
                      >
                        <h4>DM Query</h4>
                        <Count>{dmDashboard.TotalLoanDmQuery}</Count>
                      </Row>
                    </Cards>
                    <Cards>
                      <Row
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          padding: "10px",
                        }}
                      >
                        <h4>DM Verified</h4>
                        <Count>{dmDashboard.TotalLoanDmVerified}</Count>
                      </Row>
                    </Cards>
                  </CardContainer>
                  <Row
                    style={{
                      marginTop: "15px",
                    }}
                  >
                    <Cards>
                      <Row
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          padding: "10px",
                          marginRight: "10px",
                        }}
                      >
                        <h4>RM Reject</h4>
                        <Count>{dmDashboard.TotalLoanRMReject}</Count>
                      </Row>
                    </Cards>
                    <Cards>
                      <Row
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          padding: "10px",
                        }}
                      >
                        <h4>Loans Active</h4>
                        <Count>{dmDashboard.TotalLoanActive}</Count>
                      </Row>
                    </Cards>
                  </Row>
                  <CardsTable>
                    <h3>Districtwise Loan Application </h3>
                    <DataTable
                      columns={DistrictwiseLoanApplication}
                      dataSource={dmDashboard.DistrictWiseLoanApplication}
                      pagination={{ pageSize: "4" }}
                    />
                  </CardsTable>
                  <CardsTable>
                    <h3>Schemewise Loan Application</h3>
                    <DataTable
                      columns={SchemewiseLoanApplication}
                      dataSource={dmDashboard.SchemewiseloanApplications}
                      pagination={{ pageSize: "4" }}
                    />
                  </CardsTable>
                </>
              ),
            },
            {
              label: "Training",
              key: "2",
              children: (
                <>
                  <CardContainer>
                    <Cards>
                      <Row
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          padding: "10px",
                        }}
                      >
                        <h4>Total Beneficiary</h4>
                        <Count>{dmDashboard.TotalBeneficaryServed}</Count>
                      </Row>
                    </Cards>
                    <Cards>
                      <Row
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          padding: "10px",
                        }}
                      >
                        <h4>Total Application</h4>
                        <Count>{dmDashboard.TotalTrainingApplication}</Count>
                      </Row>
                    </Cards>
                    <Cards>
                      <Row
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          padding: "10px",
                        }}
                      >
                        <h4>Pending Application</h4>
                        <Count>{dmDashboard.TotalLoanApplicationPending}</Count>
                      </Row>
                    </Cards>
                    <Cards>
                      <Row
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          padding: "10px",
                        }}
                      >
                        <h4>Active Training</h4>
                        <Count>{dmDashboard.TotalTrainingActive}</Count>
                      </Row>
                    </Cards>
                  </CardContainer>
                  <CardsTable>
                    <h3>Districtwise Training Application </h3>
                    <DataTable
                      columns={trainingApplication}
                      dataSource={dmDashboard.TrainingApplications}
                      pagination={{ pageSize: "4" }}
                    />
                  </CardsTable>
                </>
              ),
            },
          ]}
        />
      </div>
    );
  }
};
export default DistrictManagerDashboard;
