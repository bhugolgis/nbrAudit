import React from "react";
import { Collapse, Button } from "antd";
import styled from "styled-components";
import { Head } from "./style";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";
const { Panel } = Collapse;

const MainUrl = window.location.pathname;
const res = MainUrl.slice(1);
const Training = (props) => {
  return (
    <Container>
      <ApplySpan>
        <Head>TRAINING SCHEME</Head>
        <Button type="primary">
          <Link to="/loan-form">Apply</Link>
        </Button>
      </ApplySpan>
      <div class="clearfix"></div>
      <h2>
        Procedures to be followed while implementing direct finance scheme
      </h2>
      <TiTick />
      Various schemes are implemented by Mahatma Phule Backward Classes
      Development Corporation. In this training scheme is being implemented
      under special component scheme in which various skill development training
      is given free of cost. During the training period, Rs. 1,000 per month.
      Also, a maximum of Rs. Up to 12,000 / - per student training fee is paid
      by the corporation. The duration of training is at least two to four
      months.
      <br />
      <br />
      <TiTick />
      The following documents are taken from the applicant while implementing
      the training scheme by the corporation and accordingly the suitable
      applicants are selected from the selection committee under the
      chairmanship of the regional manager.
      <br /> <br />
      <p>
        Under this scheme, training is given to the students for
        self-employment. Generally the training fee per candidate is decided
        according to the nature of the business. Training is provided mainly for
        the following occupations. eg. Training is provided for drivers, TV
        video, radio repair, tailoring, welding, fitter, computer, e-mail and
        various other occupations. Under the training scheme, trainees will be
        given Rs. 1,000 / - is paid as stipend. Also training fee is paid to the
        training institute by the corporation.
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
        <li>Caste Certificate</li>
        <li>Income Proof</li>
        <li>
          Resident proof (ration card, voter ID card, Aadhaar card, PAN card,
          electric bill etc.)
        </li>
      </ol>
      <h3>
        B) After fulfilling the required documents, the following action is
        taken by the concerned district office.
      </h3>
      <ol>
        <li>
          Applications are invited from the interested applicants through the
          district office.
        </li>
        <li>
          Eligible applicants are called for face to face interview through
          district office and after checking the original documents, the
          proposal is put before the selection committee. .
        </li>
        <li>
          Applicants selected from the selection committee chaired by the
          Regional Manager are sent for training through the District Office to
          the vocational training institutes.
        </li>
        <li>
          According to the monthly attendance sheets received from the training
          institutes, the training of the trainees and payment of fees to the
          training institutes is done by the district office
        </li>
      </ol>
    </Container>
  );
};
export default Training;
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
