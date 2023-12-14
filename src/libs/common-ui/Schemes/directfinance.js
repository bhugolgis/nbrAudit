import React from "react";
import { Collapse, Button, Modal, Spin } from "antd";
import styled from "styled-components";
import { Head } from "./style";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";
import useSchemes from "./container";
import { Token, UserGroup } from "../../utils/sessionStorage";
import { MpbcdcLogo } from "../../../media";
const { Panel } = Collapse;

const DirectFinance = (props) => {
  const { isActive, userList, loanList, loading } = useSchemes(
    "Direct Finance Scheme"
  );

  if (loading == true) {
    return <Spin tip="loading.." spinning={loading} />;
  } else {
    return (
      <Container>
        <span style={{ display: "flex" }}>
          <img src={MpbcdcLogo} width="3%" height="3%" />
          <Head>DIRECT FINANCE SCHEME</Head>
        </span>
        <div class="clearfix"></div>
        <h2>
          Procedures to be followed while implementing direct finance scheme
        </h2>
        <TiTick />
        Various schemes are implemented by Mahatma Phule Backward Classes
        Development Corporation. A special component scheme is being implemented
        in this and under this scheme Loans up to Rs. 1,00,000 / - are
        sanctioned by the Corporation. The Corporation's participation in this
        is Rs. 85,000 / - and the grant is Rs. 10,000 / - (with limit). Also the
        participation of the applicant is Rs. 5,000 / -. The loan is to be
        repaid in 3 years at the same monthly installment. The interest rate on
        this loan is 4% per cent.
        <br />
        <br />
        <TiTick />
        People from backward classes should be financially empowered and maximum
        number of people should be able to benefit. Also, to avoid difficulties
        in lending through banks and delays in loan disbursement, the loan limit
        of the direct loan scheme is Rs. 25,000 / - to Rs. 1,00,000 / - has been
        sanctioned as per Government Resolution No. MPC-2017 / Q.No.274 /
        Corporations, dated 21st December 2018.
        <br /> <br />
        <p>
          Under this scheme, loan scheme is implemented directly from the share
          capital received by Mahatma Phule Corporation. The format of the
          scheme is as follows.
        </p>
        <TiTick /> Project limit is Rs. Up to Rs. 1,00,000 / -<br />
        <TiTick /> Corporation's participation is Rs. 85,000 / - and the grant
        is Rs. 10,000 / - (with limit).
        <br />
        <TiTick /> Applicant's participation is Rs. 5,000 / -.
        <br />
        <TiTick /> The loan is to be repaid within 3 years (36 months) in equal
        monthly installments.
        <br />
        <TiTick /> There is 4% an interest rate on this loan.
        <br />
        <br />
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
          <li>Approval and funding are sought from the Regional Manager.</li>
          <li>
            Regional managers seek funding from the head office in the relevant
            loan case
          </li>
          <li>
            The first installment (75%) is paid by the district office excluding
            the beneficiary's contribution in the respective loan cases and the
            second installment (25%) is paid after the commencement of the
            actual business as per the inspection opinion conducted by the
            Regional Manager.
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
              window.location.replace("/state-df");
            }
          }}
        >
          Apply
        </Button>
      </Container>
    );
  }
};
export default DirectFinance;
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
