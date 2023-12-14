import React from "react";
import { CaretRightOutlined, LoadingOutlined } from "@ant-design/icons";
import { Collapse, Table, Space, Tag, Button, Modal, Spin } from "antd";
import styled from "styled-components";
import { Head } from "./style";
import { DataTable } from "./style";
import { Link } from "react-router-dom";
import useSchemes from "./container";
import { Token, UserGroup } from "../../utils/sessionStorage";
import { LoadContainer } from "../LoanManagement/style";
import { NSKFDCLogo } from "../../../media";
const { Panel } = Collapse;
const { Column, ColumnGroup } = Table;

const MainUrl = window.location.pathname;
const res = MainUrl.slice(1);
const NsfkdcSchemes = (props) => {
  const { userList, loanList, loading } = useSchemes("nskfdc");

  const NskfdcData = [
    { title: "Name of Scheme", dataIndex: "SchemeName" },
    { title: "Loan Limit(INR)", dataIndex: "LoanLimit" },
    {
      title: "Contribution",
      children: [
        { title: "MPBCDC", dataIndex: "ContributionMPBCDC" },
        { title: "NSKFDC", dataIndex: "ContributionNSKFDC" },
        { title: "Applicant", dataIndex: "ContributionApplicant" },
      ],
    },
    { title: "Rate of Interest", dataIndex: "RateOfInterest" },
    {
      title: "Apply",
      dataIndex: ["id", "loanList"],
      render: (id, data) => {
        return (
          <Button
            type="primary"
            disabled={!data.isActive}
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
                Modal.info({
                  title:
                    "Applicants are advised to note that simply submitting the loan application, shall not make the applicant entitled to receive the Loan and or this does not create any privilege or right or claim on MPBCDC, and the application shall be processed on a merit basis, subject to terms and conditions/ guidelines as issued by Government of India/ Government of Maharashtra.",
                  onOk() {
                    window.location.replace(`/${data.LoanSchemeName}`);
                  },
                });
              }
            }}
          >
            Apply
          </Button>
        );
      },
    },
  ];
  if (loading == true) {
    <LoadContainer>
      <Spin tip="Loading data..." spinning={loading} />;
    </LoadContainer>;
  } else {
    return (
      <Container>
        <ApplySpan>
          <span style={{ display: "flex", alignItems: "Center" }}>
            <img src={NSKFDCLogo} width="20%" />
            <Head>NSKFDC Scheme</Head>
          </span>
          {/* <Button type="primary">
          <Link to="/loan-form">Apply</Link>
        </Button> */}
        </ApplySpan>
        <div class="clearfix"></div>
        <h2>Procedures to be followed while implementing NSKFDC scheme</h2>
        <p>
          Various schemes are implemented under Mahatma Phule Backward Classes
          Development Corporation under NSKFDC, New Delhi. The details are as
          follows.
        </p>
        <b>
          Education Loan Details -
          <a href="/LoanDetails.pdf">Click here for details</a>
        </b>
        <DataTable dataSource={loanList.results} columns={NskfdcData} />

        <h3>A) Documents required for loan approval.</h3>
        <ol>
          <li>Safai Kamgar Certificate / Dakhala</li>
          <li>
            Resident proof (ration card, voter ID card, Aadhaar card, PAN card,
            electric bill etc.)
          </li>
          <li>
            Documents related to the business such as price list of goods, proof
            of place of business if required, clerk's license, other business
            related documents such as vehicle license, clerk's license, permit,
            batch number etc.
          </li>
          <li>Project report as required (above Rs. 2.00 lakhs)</li>
          <li>
            Bonafide Certificates and Educational Documents (for Higher
            Educational Loans)
          </li>
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
            Collector.
          </li>
          <li>
            Loan cases approved in the District Beneficiary Selection Committee
            are recommended for approval to the Regional Office of the
            Corporation through the concerned District Office.
          </li>
          <li>
            Except for micro-supply and Mahila Samrudhi schemes, loan proposals
            for other schemes are sent to the head office for approval.
          </li>
          <li>
            The LOI application is made to NSKFDC, New Delhi as per the loan
            proposal received from the Regional Office.
          </li>
          <li>
            Upon receipt of LOI from NSKFDC, New Delhi, the loan proposal is
            approved accordingly.
          </li>
          <li>
            After approval, through the concerned district office, the applicant
            has to submit the required documents related to the distribution of
            seed capital and NSFDC loan from the applicant (e.g., medical
            documents, guarantor, guarantor's salary deduction guarantee-pay
            certificate, property holder if the property holder is the
            guarantor, property report, guarantor, The election card of the
            guarantor, the identity card issued by the department as well as the
            check dated answer of the applicant in connection with the recovery
            of the loan, affidavit of loan disbursement etc.) are fulfilled.
          </li>
          <li>
            Funding proposals are then submitted to the Regional Office by the
            concerned office and funds are requested to the Headquarters through
            the Regional Office.
          </li>
          <li>
            NSKFDC New Delhi seeks funding after receiving a funding proposal
            from the Regional Office.
          </li>
          <li>
            Following the receipt of funds from NSKFDC, New Delhi, the
            disbursement of funds is done through the Head Office as per the
            demand letter received from the Regional Office.
          </li>
        </ol>
      </Container>
    );
  }
};
export default NsfkdcSchemes;
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
