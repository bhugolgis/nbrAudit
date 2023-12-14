import React from "react";
import { CaretRightOutlined, LoadingOutlined } from "@ant-design/icons";
import { Collapse, Table, Space, Tag, Button, Modal, Spin } from "antd";
import styled from "styled-components";
import { Head } from "./style";
import { DataTable } from "./style";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";
import useSchemes from "./container";
import { Token, UserGroup } from "../../utils/sessionStorage";
import { MpbcdcLogo } from "../../../media";

const { Panel } = Collapse;

const MainUrl = window.location.pathname;
const res = MainUrl.slice(1);
const MoneyMargin = (props) => {
  const { isActive, userList, loanList, loading } = useSchemes(
    "Money Margin Scheme"
  );

  if (loading == true) {
    return <Spin tip="loading.." spinning={loading} />;
  } else {
    return (
      <Container>
        <span style={{ display: "flex" }}>
          <img src={MpbcdcLogo} width="3%" height="3%" />
          <Head>MARGIN MONEY SCHEME</Head>
        </span>
        <div class="clearfix"></div>
        <h2>
          Procedures to be followed while implementing seed capital scheme
        </h2>
        <TiTick />
        Various schemes are implemented through Mahatma Phule Backward
        Development Corporation. In this, seed capital scheme is being
        implemented and under this scheme Rs. 50,000 to a maximum of Rs. Loans
        up to 5,00,000/- are sanctioned through nationalized banks. In this, the
        bank loan is 75% and the corporation loan is 20% and the applicant
        participates in the remaining 5%.
        <br />
        <br />
        <TiTick />
        While implementing the said scheme through the corporation, the
        following necessary documents are taken from the beneficiary and
        accordingly suitable proposals are sent to the bank. After receiving the
        loan approval from the bank in such cases, a check of 20% of the total
        loan amount approved by the bank through the corporation (including
        subsidy of Rs. 10,000/-) is sent to the concerned bank and thereafter
        the loan is disbursed to the applicant through the bank. This is how the
        loan case is processed under the seed capital scheme. Following are the
        details of the documents to be taken while accepting the application and
        sending it to the bank.
        <br /> <br />
        <p>
          Under this scheme Rs. Projects with investment up to 5 lakhs are
          considered. 20% seed capital amount (including subsidy of Rs.10,000/-)
          is provided by the corporation. 5% of the project amount is to be paid
          by the applicant as own contribution. The remaining 75% amount is
          sanctioned by the bank. A rate of interest of 4% is charged on the
          seed capital amount sanctioned by the Corporation. The recovery period
          is five years.
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
          <li>Caste certificate</li>
          <li>Proof of income .</li>
          <li>
            Resident Proof (Ration Card, Voter ID Card, Aadhaar Card, PAN Card,
            Electric Bill etc.)
          </li>
          <li>
            Documents related to the business like, price list of goods, proof
            of place of business if required, clerk license, other documents as
            per business like license for vehicle, clerk license, permit, batch
            number etc.
          </li>
          <li>Project report as required (above Rs. 2.00 lakh)</li>
        </ol>
        <h3>
          B) After fulfilling the required documents, the following action is
          taken by the concerned district office.
        </h3>
        <ol>
          <li>
            Applicant's residence as well as place of business are verified.
          </li>
          <li>
            After that, the loan cases received are scrutinized and approved
            through the District Beneficiary Selection Committee established
            under the chairmanship of Hon'ble District Magistrate.
          </li>
          <li>
            The loan cases approved in the District Beneficiary Selection
            Committee are recommended to the Nationalized Bank for approval
            through the concerned District Office.
          </li>
          <li>
            After approval of such cases from the nationalized banks, necessary
            documents from the applicant in accordance with the disbursement of
            seed capital loan of the corporation (such as medical certificate,
            guarantor, guarantor's salary deduction guarantee-salary
            certificate, asset record document if the property holder is a
            guarantor, guarantor verification report, election card of the
            guarantor, etc.) Issued identity card as well as the applicant's
            reply dated check etc.) along with loan recovery.
          </li>
          <li>
            In such sanctioned loan case after completion of all necessary
            documents/guarantors etc. before disbursement of loan, the loan
            proposal is submitted to the Regional Manager for approval of
            disbursement through the concerned District Office.
          </li>
          <li>
            After receiving the approval for disbursement of loan from the
            Regional Manager, two separate checks for seed capital (loan) and
            subsidy are drawn and sent to the bank in accordance with the
            disbursement of the loan through the respective district office.
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
              window.location.replace("/state-mm");
            }
          }}
        >
          Apply
        </Button>
      </Container>
    );
  }
};
export default MoneyMargin;
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
