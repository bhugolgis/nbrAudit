import React from "react";
import { Collapse, Button, Modal, Spin } from "antd";
import styled from "styled-components";
import { Head } from "./style";
import { TiTick } from "react-icons/ti";
import useSchemes from "./container";
import { Token, UserGroup } from "../../utils/sessionStorage";
import { MpbcdcLogo } from "../../../media";
const { Panel } = Collapse;

const Subsidy = (props) => {
  const { userList, loanList, loading } = useSchemes("Subsidy Scheme");

  if (loading == true) {
    return <Spin tip="loading.." spinning={loading} />;
  } else {
    return (
      <Container>
        <span style={{ display: "flex" }}>
          <img src={MpbcdcLogo} width="3%" height="3%" />
          <Head>SUBSIDY SCHEME</Head>
        </span>
        <div class="clearfix"></div>
        <h2>Procedures to be followed while implementing subsidy scheme</h2>
        <TiTick />
        Various schemes are implemented by Mahatma Phule Backward Classes
        Development Corporation. A special component scheme is being implemented
        and under this scheme Rs. 20,000 to a maximum of Loan up to Rs. 50,000 /
        - are sanctioned through nationalized banks. This includes bank loan 50%
        and corporation grant 50% (minimum limit up to Rs. 10,000).
        <br />
        <br />
        <TiTick />
        While implementing the scheme through the corporation, the following
        required documents are taken from the beneficiary and appropriate
        proposals are sent to the bank accordingly. After receiving loan
        sanction from the bank in such cases, A cheqe of the grant amount of
        Rs.10,000 / - or less is sent to the concerned bank and thereafter the
        loan is disbursed to the applicant through the bank. This is how a loan
        case is dealt with under a special component scheme. Applicants details
        and documents to be taken while accepting the loan and sending it to the
        bank are as follows.
        <br /> <br />
        <p>
          Under this scheme Financial assistance is given to businesses with
          project investment up to Rs. 50,000 / -. This includes a maximum of
          Rs. 10,000 to 50,000 (with limit) loan is sanctioned from the bank.
          This includes Rs. 10,000 grants are paid by the corporation and the
          rest by the bank at their interest rate.
        </p>
        {/* <DataTable dataSource={data}>
        <Column title="Sr No." dataIndex="no" key="no" />
        <Column title="Name of Scheme" dataIndex="name" key="name" />
        <Column title="Loan Limit(INR)" dataIndex="loan" key="loan" />
        <ColumnGroup title="Contribution">
          <Column title="MPBCDC" dataIndex="mpbcdc" key="mpbcdc" />
          <Column title="NSFKDC" dataIndex="nsfkdc" key="nsfkdc" />
          <Column title="Applicant" dataIndex="applicant" key="applicant" />
        </ColumnGroup>

        <Column title="Rate of Interest" dataIndex="rate" key="rate" />
      </DataTable> */}
        <h3>A) Documents required for loan approval.</h3>
        <ol>
          <li>Cast Certificate.</li>
          <li>Income Certificate.</li>
          <li>
            Residential Proof (Ration Card, Aadhar Card, Voters Card, PAN Card,
            Electricity Bill etc.)
          </li>
          <li>Documents related to the business such as price list of goods</li>
        </ol>
        <h3>
          B) After fulfilling the required documents, the following action is
          taken by the concerned district office.
        </h3>
        <ol>
          <li>
            The residence of the applicant as well as the place of business is
            verified.
          </li>
          <li>
            Subsequent loan cases are scrutinized and approved by the District
            Beneficiary Selection Committee set up under the chairmanship of the
            Hon'ble Collector.
          </li>
          <li>
            Loan cases approved in the District Beneficiary Selection Committee
            are recommended for approval to the Nationalized Bank through the
            concerned District Office.
          </li>
          <li>
            Once the approval of such cases is received from the nationalized
            banks, the amount of grant is sent by the Corporation to the
            concerned banks for distribution.
          </li>
        </ol>
        <Button
          type="primary"
          disabled={!loanList.results[0].isActive}
          onClick={() => {
            if (Token == null && UserGroup != "beneficiary") {
              Modal.warning({
                title: "Please login as beneficiary to continue",
                onOk() {
                  window.location.replace("/login");
                },
              });
            } else if (userList.UserPersonalInfo[0].isCompleted != true) {
              Modal.warning({
                title: "Please Completed your Personal Information",
                onOk() {
                  window.location.replace("/personal-information");
                },
              });
            } else if (
              userList.CustomUserIncomeAndDomicileInfo[0].isCompleted != true
            ) {
              Modal.warning({
                title: "Please Completed your Income Information",
                onOk() {
                  window.location.replace("/income-and-domicile-information");
                },
              });
            } else if (
              userList.CustomUsereligibilityInfo[0].isCompleted != true
            ) {
              Modal.warning({
                title: "Please Completed your Eligibility Information",
                onOk() {
                  window.location.replace("/eligibility-information");
                },
              });
            } else if (
              userList.CustomUserQualificationInfo[0].isCompleted != true
            ) {
              Modal.warning({
                title: "Please Completed your Qualification Information",
                onOk() {
                  window.location.replace("/qualification-information");
                },
              });
            } else if (
              userList.CustomUserResidentialInfo[0].isCompleted != true
            ) {
              Modal.warning({
                title: "Please Completed your Residential Information",
                onOk() {
                  window.location.replace("/residential-information");
                },
              });
            } else if (userList.CustomUserBankInfo[0].isCompleted != true) {
              Modal.warning({
                title: "Please Completed your Bank Information",
                onOk() {
                  window.location.replace("/bank-information");
                },
              });
            } else if (userList.CustomUserOtherInfo[0].isCompleted != true) {
              Modal.warning({
                title: "Please Completed Other Information",
                onOk() {
                  window.location.replace("/other-information");
                },
              });
            } else {
              window.location.replace("/state-subsidy");
            }
          }}
        >
          Apply
        </Button>
      </Container>
    );
  }
};
export default Subsidy;
export const Container = styled.div`
  margin: 40px;
`;
export const Accordian = styled(Panel)`
  margin: 15px 0px;
  .ant-collapse-content {
    background: white !important;
  }
  .ant-collapse-borderless {
    background-color: #ffd633;
    border: 1px solid #ccc;
  }
`;
export const ApplySpan = styled.span`
  display: flex;
  justify-content: space-between;
`;
