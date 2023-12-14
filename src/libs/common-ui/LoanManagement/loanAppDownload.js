import { Button, Form, Row } from "antd";
import React from "react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { DataContainer, FormHeading, HtmlTable, Title } from "./style";
import moment from "moment";

const DownloadLoanApp = (props) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div>
      <Form
        layout="vertical"
        style={{
          border: "2px solid grey",
          padding: "20px",
          margin: "10px 0px",
        }}
      >
        <h2>{props.userData.name}</h2>
        <h3>{props.userData.LoanScheme}</h3>
        <FormHeading>Basic Details :</FormHeading>
        <div>
          <Row>
            <DataContainer span={8}>
              <Title>FirstName: </Title>
              {props.userData.FirstName}
            </DataContainer>
            <DataContainer span={8}>
              <Title>MiddleName:</Title>
              {props.userData.MiddleName}
            </DataContainer>
            <DataContainer span={8}>
              <Title>LastName:</Title>
              {props.userData.LastName}
            </DataContainer>
          </Row>
          <Row style={{ margin: "10px 0px" }}>
            <DataContainer span={8}>
              <Title>Birth Date:</Title>
              {moment(props.userData.Birthdate).format("DD-MMM-YYYY")}
            </DataContainer>
            <DataContainer span={8}>
              <Title>Age:</Title>
              {props.userData.Age}
            </DataContainer>
            <DataContainer span={8}>
              <Title>Father's Full Name:</Title>
              {props.userData.FatherName}
            </DataContainer>
          </Row>
          <Row>
            <DataContainer span={8}>
              <Title>Husband Full Name:</Title>
              {props.userData.HusbandFullName}
            </DataContainer>
            <DataContainer span={8}>
              <Title>Basic Education:</Title>
              {props.userData.Education}
            </DataContainer>
            <DataContainer span={8}></DataContainer>
          </Row>
          <FormHeading>Address Details: </FormHeading>
          <Row style={{ margin: "10px 0px" }}>
            <DataContainer span={8}>
              <Title>City/Rural:</Title>
              {props.userData.UrbanRural}
            </DataContainer>
            <DataContainer span={8}>
              <Title>District:</Title>
              {props.userData.District}
            </DataContainer>
            <DataContainer span={8}>
              <Title>Taluka:</Title>
              {props.userData.Taluka}
            </DataContainer>
          </Row>
          <Row>
            <DataContainer span={8}>
              <Title>Present Address:</Title>
              {props.userData.PresentAddline1} ,{" "}
              {props.userData.PresentAddline2} ,{" "}
              {props.userData.PresentAddline3} , {props.userData.PresentPincode}
            </DataContainer>
            <DataContainer span={8}>
              <Title>Permanent Address:</Title>
              {props.userData.PermanentAddline1} ,{" "}
              {props.userData.PermanentAddline2} ,{" "}
              {props.userData.PermanentAddline3} ,{" "}
              {props.userData.PermanentPincode}
            </DataContainer>
            <DataContainer span={8}>
              <Title>Proposed Business Name:</Title>
              {props.userData.ProposedBusinessName}
            </DataContainer>
          </Row>
          <Row style={{ margin: "10px 0px" }}>
            <DataContainer span={8}>
              <Title>Ration Card Type:</Title>
              {props.userData.RationCardType}
            </DataContainer>
            <DataContainer span={8}>
              <Title>Business Name:</Title>
              {props.userData.BusinessName}
            </DataContainer>
            <DataContainer span={8}>
              <Title>Address of Business Place:</Title>
              {props.userData.BusinessAdd}
            </DataContainer>
          </Row>
          <Row>
            <DataContainer span={8}>
              <Title>Beneficiary Investment Component:</Title>
              {props.userData.Investment}
            </DataContainer>
            <DataContainer span={8}>
              <Title>Brief Information of Business:</Title>
              {props.userData.BusinessInfo}
            </DataContainer>
            <DataContainer span={8}>
              <Title>Land Owned or Rented?:</Title>
              {props.userData.OwnRented}
            </DataContainer>
          </Row>
        </div>
        <FormHeading>Education Details : </FormHeading>
        <h3>PERSONAL DATA - </h3>
        {props.userData.LoanSchemeCode == "central-nsfdc-el-a" ||
        props.userData.LoanSchemeCode == "central-nsfdc-el-b" ||
        props.userData.LoanSchemeCode == "central-nskfdc-el-a" ||
        props.userData.LoanSchemeCode == "central-nskfdc-el-b" ? (
          <>
            <Row>
              <DataContainer span={8}>
                <Title>Caste:</Title>
                {props.userData.Caste}
              </DataContainer>
              <DataContainer span={8}>
                <Title>SubCaste:</Title>
                {props.userData.SubCaste}
              </DataContainer>
              <DataContainer span={8}>
                <Title>Annual Family Income:</Title>
                {props.userData.AnnualFamilyIncome}
              </DataContainer>
            </Row>
            <Row style={{ margin: "10px 0px" }}>
              <DataContainer span={8}>
                <Title>Contact No:</Title>
                {props.userData.ContactNo}
              </DataContainer>
              <DataContainer span={8}>
                <Title>Valid Passport No:</Title>
                {props.userData.PassportNo}
              </DataContainer>
              <DataContainer span={8}>
                <Title>Valid Passport Expiry Date:</Title>
                {props.userData.PassportExpDate}
              </DataContainer>
            </Row>
            <Row>
              <DataContainer span={8}>
                <Title>Valid Visa/Permit No:</Title>
                {props.userData.VisaPermitNo}
              </DataContainer>
              <DataContainer span={8}>
                <Title>Valid Visa/Permit Expiry Date:</Title>
                {props.userData.VisaExpDate}
              </DataContainer>
              <DataContainer span={8}></DataContainer>
            </Row>

            <Row>
              <DataContainer span={8}></DataContainer>
              <DataContainer span={8}></DataContainer>
              <DataContainer span={8}></DataContainer>
            </Row>
            <Row style={{ margin: "10px 0px" }}>
              <HtmlTable>
                <tr>
                  <th>
                    <h3>Examination</h3>
                  </th>
                  <th>
                    <h3>Institution/University</h3>
                  </th>
                  <th>
                    <h3>Year of passing</h3>
                  </th>
                  <th>
                    <h3>Percentage of marks/grade</h3>
                  </th>
                </tr>
                <tr>
                  <td>SSC</td>
                  <td>{props.userData.SSLCInstitution}</td>
                  <td>{props.userData.SSLCYearofpassing}</td>
                  <td>{props.userData.SSLCPercentageofmarks}</td>
                </tr>
                <tr>
                  <td> 10 + 2</td>
                  <td>{props.userData.HSCInstitution}</td>
                  <td>{props.userData.HSCYearofpassing}</td>
                  <td>{props.userData.HSCPercentageofmarks}</td>
                </tr>
                <tr>
                  <td>Graduation</td>
                  <td> {props.userData.GraduationInstitution}</td>
                  <td> {props.userData.GraduationYearofpassing}</td>
                  <td> {props.userData.GraduationPercentageofmarks}</td>
                </tr>
                <tr>
                  <td> P.G.</td>
                  <td> {props.userData.PGInstitution}</td>
                  <td> {props.userData.PGYearofpassing}</td>
                  <td> {props.userData.PGPercentageofmarks}</td>
                </tr>
                <tr>
                  <td> Any Other (please specify)</td>
                  <td> {props.userData.OtherInstitution}</td>
                  <td> {props.userData.OtherYearofpassing}</td>
                  <td> {props.userData.OtherPercentageofmarks}</td>
                </tr>
              </HtmlTable>
            </Row>
            <hr style={{ margin: "10px 0px" }} />
            <h3>PARTICULARS OF PARENTS/GUARDIAN :</h3>
            <Row>
              <DataContainer span={6}>
                <Title>Full Name:</Title>
              </DataContainer>
              <DataContainer span={6}>
                {props.userData.ParentsFullName}
              </DataContainer>
              <DataContainer span={6}>
                <Title>Age:</Title>
              </DataContainer>
              <DataContainer span={6}>
                {props.userData.ParentsAge}
              </DataContainer>
            </Row>
            <Row>
              <DataContainer span={6}>
                <Title>Phone Number Res:</Title>
              </DataContainer>
              <DataContainer span={6}>
                {props.userData.ParentsResidencePhone}
              </DataContainer>
              <DataContainer span={6}>
                <Title>Phone Number Office:</Title>
              </DataContainer>
              <DataContainer span={6}>
                {props.userData.ParentsPlaceofworkPhone}
              </DataContainer>
            </Row>
            <Row>
              <DataContainer span={6}>
                <Title>Permanent Address: Residence</Title>
              </DataContainer>
              <DataContainer span={6}>
                {props.userData.ParentsResidenceAddress}
              </DataContainer>
              <DataContainer span={6}>
                <Title>Address: Place of work</Title>
              </DataContainer>
              <DataContainer span={6}>
                {props.userData.ParentsPlaceofworkAddress}
              </DataContainer>
            </Row>
            <hr />
            <h3>COURSE DETAILS :</h3>
            <Row>
              <DataContainer span={6}>
                <Title>Fulltime Professional/Technical Course</Title>
              </DataContainer>
              <DataContainer span={6}>
                {props.userData.CourseName}
              </DataContainer>
              <DataContainer span={6}>
                <Title>
                  Details of placement to be provided by the Educational
                  Institute, if any
                </Title>
              </DataContainer>
              <DataContainer span={6}>
                {props.userData.DetailsOfPlacement}
              </DataContainer>
            </Row>
            <Row>
              <DataContainer span={6}>
                <Title>DataContainerlege/Institute/University</Title>
              </DataContainer>
              <DataContainer span={6}>
                {props.userData.CourseDataContainerlegeName}
              </DataContainer>
              <DataContainer span={6}>
                <Title>Duration of the Course</Title>
              </DataContainer>
              <DataContainer span={6}>
                {props.userData.CourseDuration}
              </DataContainer>
            </Row>
            <Row>
              <DataContainer span={6}>
                <Title>Entrance exam, if any, qualified</Title>
              </DataContainer>
              <DataContainer span={6}>
                {props.userData.EntranceExam}
              </DataContainer>
              <DataContainer span={6}>
                <Title>Country</Title>
              </DataContainer>
              <DataContainer span={6}>
                {props.userData.CourseCountry}
              </DataContainer>
            </Row>
            <hr style={{ margin: "10px 0px" }} />
            <h3>TOTAL STUDY EXPENSES:</h3>
            <HtmlTable>
              <tr>
                <th>
                  <h3>Year wise / Semester wise</h3>
                </th>
                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th>4</th>
                <th>5</th>
                <th>6</th>
                <th>Total</th>
              </tr>
              <tr>
                <td> Admission Fees & Tuition Fee</td>
                <td> {props.userData.ExpnAmtAdmissionFeesA}</td>
                <td> {props.userData.ExpnAmtAdmissionFeesB}</td>
                <td> {props.userData.ExpnAmtAdmissionFeesC}</td>
                <td> {props.userData.ExpnAmtAdmissionFeesD}</td>
                <td> {props.userData.ExpnAmtAdmissionFeesE}</td>
                <td> {props.userData.ExpnAmtAdmissionFeesF}</td>
                <td> {props.userData.ExpnAmtAdmissionFeesT}</td>
              </tr>
              <tr>
                <td>
                  Books, Stationery and other instruments required for the
                  course
                </td>
                <td> {props.userData.ExpnAmtinstrumentsA}</td>
                <td> {props.userData.ExpnAmtinstrumentsB}</td>
                <td> {props.userData.ExpnAmtinstrumentsC}</td>
                <td> {props.userData.ExpnAmtinstrumentsD}</td>
                <td> {props.userData.ExpnAmtinstrumentsE}</td>
                <td> {props.userData.ExpnAmtinstrumentsF}</td>
                <td> {props.userData.ExpnAmtinstrumentsT}</td>
              </tr>
              <tr>
                <td> Examination Fee</td>
                <td> {props.userData.ExpnAmtExaminationFeeA}</td>
                <td> {props.userData.ExpnAmtExaminationFeeB}</td>
                <td> {props.userData.ExpnAmtExaminationFeeC}</td>
                <td> {props.userData.ExpnAmtExaminationFeeD}</td>
                <td> {props.userData.ExpnAmtExaminationFeeE}</td>
                <td> {props.userData.ExpnAmtExaminationFeeF}</td>
                <td> {props.userData.ExpnAmtExaminationFeeT}</td>
              </tr>
              <tr>
                <td> Boarding and Lodging Expenses</td>
                <td> {props.userData.ExpnAmtBoardingA}</td>
                <td> {props.userData.ExpnAmtBoardingB}</td>
                <td> {props.userData.ExpnAmtBoardingC}</td>
                <td> {props.userData.ExpnAmtBoardingD}</td>
                <td> {props.userData.ExpnAmtBoardingE}</td>
                <td> {props.userData.ExpnAmtBoardingF}</td>
                <td> {props.userData.ExpnAmtBoardingT}</td>
              </tr>
              <tr>
                <td>
                  Insurance premium for policy for insuring loanees against loan
                  in case of death or permanent disability
                </td>
                <td> {props.userData.ExpnAmtInsurancepremiumA}</td>
                <td> {props.userData.ExpnAmtInsurancepremiumB}</td>
                <td> {props.userData.ExpnAmtInsurancepremiumC}</td>
                <td> {props.userData.ExpnAmtInsurancepremiumD}</td>
                <td> {props.userData.ExpnAmtInsurancepremiumE}</td>
                <td> {props.userData.ExpnAmtInsurancepremiumF}</td>
                <td> {props.userData.ExpnAmtInsurancepremiumT}</td>
              </tr>
              <tr>
                <td>Travel Expenses/Passage Money for studying abroad.</td>
                <td> {props.userData.ExpnAmtTravelExpensesA}</td>
                <td> {props.userData.ExpnAmtTravelExpensesB}</td>
                <td> {props.userData.ExpnAmtTravelExpensesC}</td>
                <td> {props.userData.ExpnAmtTravelExpensesD}</td>
                <td> {props.userData.ExpnAmtTravelExpensesE}</td>
                <td> {props.userData.ExpnAmtTravelExpensesF}</td>
                <td> {props.userData.ExpnAmtTravelExpensesT}</td>
              </tr>
              <tr>
                <td>Caution Money, Development Fund etc.</td>
                <td> {props.userData.ExpnAmtCautionMoneyA}</td>
                <td> {props.userData.ExpnAmtCautionMoneyB}</td>
                <td> {props.userData.ExpnAmtCautionMoneyC}</td>
                <td> {props.userData.ExpnAmtCautionMoneyD}</td>
                <td> {props.userData.ExpnAmtCautionMoneyE}</td>
                <td> {props.userData.ExpnAmtCautionMoneyF}</td>
                <td> {props.userData.ExpnAmtCautionMoneyT}</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>
                  {props.userData.ExpnAmtAdmissionFeesA +
                    props.userData.ExpnAmtinstrumentsA +
                    props.userData.ExpnAmtExaminationFeeA +
                    props.userData.ExpnAmtBoardingA +
                    props.userData.ExpnAmtInsurancepremiumA +
                    props.userData.ExpnAmtTravelExpensesA +
                    props.userData.ExpnAmtCautionMoneyA}
                </td>
                <td>
                  {" "}
                  {props.userData.ExpnAmtAdmissionFeesB +
                    props.userData.ExpnAmtinstrumentsB +
                    props.userData.ExpnAmtExaminationFeeB +
                    props.userData.ExpnAmtBoardingB +
                    props.userData.ExpnAmtInsurancepremiumB +
                    props.userData.ExpnAmtTravelExpensesB +
                    props.userData.ExpnAmtCautionMoneyB}
                </td>
                <td>
                  {" "}
                  {props.userData.ExpnAmtAdmissionFeesC +
                    props.userData.ExpnAmtinstrumentsC +
                    props.userData.ExpnAmtExaminationFeeC +
                    props.userData.ExpnAmtBoardingC +
                    props.userData.ExpnAmtInsurancepremiumC +
                    props.userData.ExpnAmtTravelExpensesC +
                    props.userData.ExpnAmtCautionMoneyC}
                </td>
                <td>
                  {props.userData.ExpnAmtAdmissionFeesD +
                    props.userData.ExpnAmtinstrumentsD +
                    props.userData.ExpnAmtExaminationFeeD +
                    props.userData.ExpnAmtBoardingD +
                    props.userData.ExpnAmtInsurancepremiumD +
                    props.userData.ExpnAmtTravelExpensesD +
                    props.userData.ExpnAmtCautionMoneyD}
                </td>
                <td>
                  {props.userData.ExpnAmtAdmissionFeesE +
                    props.userData.ExpnAmtinstrumentsE +
                    props.userData.ExpnAmtExaminationFeeE +
                    props.userData.ExpnAmtBoardingE +
                    props.userData.ExpnAmtInsurancepremiumE +
                    props.userData.ExpnAmtTravelExpensesE +
                    props.userData.ExpnAmtCautionMoneyE}
                </td>
                <td>
                  {props.userData.ExpnAmtAdmissionFeesF +
                    props.userData.ExpnAmtinstrumentsF +
                    props.userData.ExpnAmtExaminationFeeF +
                    props.userData.ExpnAmtBoardingF +
                    props.userData.ExpnAmtInsurancepremiumF +
                    props.userData.ExpnAmtTravelExpensesF +
                    props.userData.ExpnAmtCautionMoneyF}
                </td>
                <td>
                  {props.userData.ExpnAmtAdmissionFeesA +
                    props.userData.ExpnAmtinstrumentsA +
                    props.userData.ExpnAmtExaminationFeeA +
                    props.userData.ExpnAmtBoardingA +
                    props.userData.ExpnAmtInsurancepremiumA +
                    props.userData.ExpnAmtTravelExpensesA +
                    props.userData.ExpnAmtCautionMoneyA +
                    props.userData.ExpnAmtAdmissionFeesB +
                    props.userData.ExpnAmtinstrumentsB +
                    props.userData.ExpnAmtExaminationFeeB +
                    props.userData.ExpnAmtBoardingB +
                    props.userData.ExpnAmtInsurancepremiumB +
                    props.userData.ExpnAmtTravelExpensesB +
                    props.userData.ExpnAmtCautionMoneyB +
                    props.userData.ExpnAmtAdmissionFeesC +
                    props.userData.ExpnAmtinstrumentsC +
                    props.userData.ExpnAmtExaminationFeeC +
                    props.userData.ExpnAmtBoardingC +
                    props.userData.ExpnAmtInsurancepremiumC +
                    props.userData.ExpnAmtTravelExpensesC +
                    props.userData.ExpnAmtCautionMoneyC +
                    props.userData.ExpnAmtAdmissionFeesD +
                    props.userData.ExpnAmtinstrumentsD +
                    props.userData.ExpnAmtExaminationFeeD +
                    props.userData.ExpnAmtBoardingD +
                    props.userData.ExpnAmtInsurancepremiumD +
                    props.userData.ExpnAmtTravelExpensesD +
                    props.userData.ExpnAmtCautionMoneyD +
                    props.userData.ExpnAmtAdmissionFeesE +
                    props.userData.ExpnAmtinstrumentsE +
                    props.userData.ExpnAmtExaminationFeeE +
                    props.userData.ExpnAmtBoardingE +
                    props.userData.ExpnAmtInsurancepremiumE +
                    props.userData.ExpnAmtTravelExpensesE +
                    props.userData.ExpnAmtCautionMoneyE +
                    props.userData.ExpnAmtAdmissionFeesF +
                    props.userData.ExpnAmtinstrumentsF +
                    props.userData.ExpnAmtExaminationFeeF +
                    props.userData.ExpnAmtBoardingF +
                    props.userData.ExpnAmtInsurancepremiumF +
                    props.userData.ExpnAmtTravelExpensesF +
                    props.userData.ExpnAmtCautionMoneyF}
                </td>
              </tr>
            </HtmlTable>
            <hr style={{ margin: "10px 0px" }} />
            <h3>MEANS OF FINANCE:</h3>
            <HtmlTable>
              <tr>
                <th></th>
                <th>
                  <h3>Amount</h3>
                </th>
                <th>
                  <h3>Percentage %</h3>
                </th>
              </tr>
              <tr>
                <td>Promoters Contribution</td>
                <td> {props.userData.AmtPromoters}</td>
                <td> {props.userData.PerPromoters}</td>
              </tr>
              <tr>
                <td>
                  Loan from{" "}
                  {props.userData.LoanSchemeCode == "central-nsfdc-el-a" ||
                  props.userData.LoanSchemeCode == "central-nsfdc-el-b"
                    ? "NSFDC"
                    : "NSKFDC"}
                </td>
                <td>{props.userData.LoanAmount}</td>
                <td> {props.userData.PerLoanNSFDC}</td>
              </tr>
              <tr>
                <td>Loan from State Channelising Agency</td>
                <td>{props.userData.AmtLoanStateAgency}</td>
                <td>{props.userData.PerLoanStateAgency}</td>
              </tr>
              <tr>
                <td> Subsidy</td>
                <td>{props.userData.AmtSubsidy}</td>
                <td> {props.userData.PerSubsidy}</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>{props.userData.AmtTotal}</td>
                <td></td>
              </tr>
            </HtmlTable>
            <hr style={{ margin: "10px 0px" }} />
            <h3>OTHER DETAILS:</h3>
            <HtmlTable>
              <tr>
                <td>
                  State in brief how the completion of the course is going to
                  help for improving your prospects of earning your livelihood.
                </td>
                <td> {props.userData.OtherDetails}</td>
              </tr>
              <tr>
                <td>Expected income per month</td>
                <td> {props.userData.Expectedincomepm}</td>
              </tr>
              <tr>
                <td>Anticipated monthly expenses</td>
                <td> {props.userData.Anticipatedmonthlyexpn}</td>
              </tr>
              <tr>
                <td>Amount available for Repayment of Loan</td>
                <td> {props.userData.Amtavailableforrepayment}</td>
              </tr>
            </HtmlTable>
          </>
        ) : (
          ""
        )}
      </Form>
    </div>
  );
};
export default DownloadLoanApp;
