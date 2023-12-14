import React, { useState } from "react";
import { Button, message, Form, Row, Col, Card } from "antd";
import { DataTable } from "../style";
import axios from "axios";
import moment from "moment";
import { REACT_APP_BASE_URL } from "../../../utils/urls";
import { BeneficiaryId, Token } from "../../../utils/sessionStorage";

const Summary = ({ data, FamilyData, DocData, onSuccess, onBack, form }) => {
  const [btnsubmited, setBtnsubmited] = useState(false);
  const [resp, setResp] = useState("");
  const [respList, setRespList] = useState([]);
  const [AckApproval, setAckApproval] = useState(DocData.AckApproval || false);
  const [Photopath, setPhotopath] = useState(DocData.Photopath || "");
  const [Signaturepath, setSignaturepath] = useState(
    DocData.Signaturepath || ""
  );
  const [Uaadharpath, setUaadharpath] = useState(DocData.Uaadharpath || "");
  const [AddressProofpath, setAddressProofpath] = useState(
    DocData.AddressProofpath || ""
  );
  const [AadharFrontpath, setAadharFrontpath] = useState(
    DocData.AadharFrontpath || ""
  );
  const [AadharBackpath, setAadharBackpath] = useState(
    DocData.AadharBackpath || ""
  );
  const [SKDpath, setSKDpath] = useState(DocData.SKDpath || "");
  const [Pancardpath, setPancardpath] = useState(DocData.Pancardpath || "");
  const [CasteCertificatepath, setCasteCertificatepath] = useState(
    DocData.CasteCertificatepath || ""
  );
  const [IncomeCertificatepath, setIncomeCertificatepath] = useState(
    DocData.IncomeCertificatepath || ""
  );
  const [ProjectReportpath, setProjectReportpath] = useState(
    DocData.ProjectReportpath || ""
  );
  const [EducationCertificatepath, setEducationCertificatepath] = useState(
    DocData.EducationCertificatepath || ""
  );

  const [Rationcardpath, setRationcardpath] = useState(
    DocData.Rationcardpath || ""
  );
  const [Voterspath, setVoterspath] = useState(DocData.Voterspath || "");
  const [Passportpath, setPassportpath] = useState(DocData.Passportpath || "");
  const [Visapath, setVisapath] = useState(DocData.Visapath || "");
  const [Passbookcqpath, setPassbookcqpath] = useState(
    DocData.Passbookcqpath || ""
  );
  const [Eduexpnpath, setEduexpnpath] = useState(DocData.Eduexpnpath || "");
  const [Admissionpath, setAdmissionpath] = useState(
    DocData.Admissionpath || ""
  );
  const [Guarantorpath, setGuarantorpath] = useState(
    DocData.Guarantorpath || ""
  );
  const [Recoverycompetentpath, setRecoverycompetentpath] = useState(
    DocData.Recoverycompetentpath || ""
  );

  const [SubSchemeName, setSubSchemeName] = useState(
    data.LoanSchemeCode == "central-nsfdc-el-b" ||
      data.LoanSchemeCode == "central-nskfdc-el-b"
      ? "International"
      : "Domestic"
  );

  const columns = [
    {
      title: "Person Name",
      dataIndex: "FamilyPersonName",
      width: "25%",
    },
    {
      title: "Age",
      dataIndex: "FamilyAge",
    },
    {
      title: "Relations",
      dataIndex: "FamilyRelations",
    },
    {
      title: "Occupation",
      dataIndex: "FamilyOccupation",
    },
  ];
  const style = { border: "2px solid #eceff1", padding: "8px 0 0 8px" };
  const upload_loan_docpath = `${REACT_APP_BASE_URL}/media/upload_loan_doc/`;

  // const Photopathname = URL.createObjectURL(data.Photopath.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (qualificationLevel == "") {
    //   message.warning("Qualification Level is empty");
    // } else
    if (data.FirstName == "") {
      message.warning("FirstName is Empty");
    } else if (data.MiddleName == "") {
      message.warning("Select MiddleName");
    } else if (data.LastName == "") {
      message.warning("LastName");
      // } else if (data.Birthdate == "") {
      //   message.warning("Birthdate is empty");
      // } else if (data.Age == "") {
      //   message.warning("Please Enter Age");
    } else if (data.Gender == "") {
      message.warning("Please Gender");
    } else if (data.FatherName == "") {
      message.warning("please FatherName");
    } else if (data.MotherName == "") {
      message.warning("Please MotherName");
    } else if (data.HusbandFullName == "") {
      message.warning("Please HusbandFullName");
    } else if (data.Education == "") {
      message.warning("Please Education");
    } else if (data.RationCardType == "") {
      message.warning("Please RationCardType");
    } else if (data.ProposedBusinessName == "") {
      message.warning("Please ProposedBusinessName");
    } else if (data.UrbanRural == "") {
      message.warning("Please UrbanRural");
    } else if (data.District == "") {
      message.warning("Please select the district");
    } else if (data.Taluka == "") {
      message.warning("Please select the taluka");
    } else if (data.LoanAmount == "") {
      message.warning("Please enter Loan amount");
    } else {
      setBtnsubmited(true);

      const loanformdata = new FormData();
      loanformdata.append("LoanSchemeCode", data.LoanSchemeCode);
      loanformdata.append("LoanScheme", data.LoanScheme);

      loanformdata.append("SubSchemeName", SubSchemeName);

      loanformdata.append("FirstName", data.FirstName);
      loanformdata.append("MiddleName", data.MiddleName);
      loanformdata.append("LastName", data.LastName);
      loanformdata.append(
        "Birthdate",
        moment(data.Birthdate).format("YYYY-MM-DD")
      );
      loanformdata.append("Age", data.Age);
      loanformdata.append("gender", data.Gender);
      loanformdata.append("Caste", data.Caste);
      loanformdata.append("SubCaste", data.SubCaste);
      loanformdata.append("FatherName", data.FatherName);
      loanformdata.append("MotherName", data.MotherName);
      loanformdata.append("HusbandFullName", data.HusbandFullName);
      loanformdata.append("Education", data.Education);
      loanformdata.append("RationCardType", data.RationCardType);
      loanformdata.append("RationCardNumber", data.RationCardNumber);
      loanformdata.append("ProposedBusinessName", data.ProposedBusinessName);
      loanformdata.append("UrbanRural", data.UrbanRural);
      loanformdata.append("Division", data.Division);
      loanformdata.append("District", data.District);
      loanformdata.append("Taluka", data.Taluka);
      loanformdata.append("PresentAddline1", data.PresentAddline1);
      loanformdata.append("PresentAddline2", data.PresentAddline2);
      loanformdata.append("PresentAddline3", data.PresentAddline3);
      loanformdata.append("PresentPincode", data.PresentPincode);
      loanformdata.append("UrbanRuralB", data.UrbanRuralB);
      loanformdata.append("DivisionB", data.DivisionB);
      loanformdata.append("DistrictB", data.DistrictB);
      loanformdata.append("TalukaB", data.TalukaB);
      loanformdata.append("PermanentAddline1", data.PermanentAddline1);
      loanformdata.append("PermanentAddline2", data.PermanentAddline2);
      loanformdata.append("PermanentAddline3", data.PermanentAddline3);
      loanformdata.append("PermanentPincode", data.PermanentPincode);
      loanformdata.append("FamilyDetails", JSON.stringify(FamilyData));
      loanformdata.append("BusinessName", data.BusinessName);
      loanformdata.append("Investment", data.Investment || 0);
      loanformdata.append("LoanAmount", data.LoanAmount || 0);
      loanformdata.append("BusinessInfo", data.BusinessInfo);
      // loanformdata.append("FamilyIncomeBelowThreeL", data.FamilyIncomeBelowThreeL);
      loanformdata.append("BusinessAdd", data.BusinessAdd);
      loanformdata.append("OwnRented", data.OwnRented);

      if (typeof Photopath == "object") {
        loanformdata.append("Photopath", Photopath);
      }
      if (typeof Signaturepath == "object") {
        loanformdata.append("Signaturepath", Signaturepath);
      }
      if (typeof Uaadharpath == "object") {
        loanformdata.append("Uaadharpath", Uaadharpath);
      }
      if (typeof AddressProofpath == "object") {
        loanformdata.append("AddressProofpath", AddressProofpath);
      }
      if (typeof AadharFrontpath == "object") {
        loanformdata.append("AadharFrontpath", AadharFrontpath);
      }
      if (typeof AadharBackpath == "object") {
        loanformdata.append("AadharBackpath", AadharBackpath);
      }
      loanformdata.append("SKDpath", SKDpath);
      if (typeof Pancardpath == "object") {
        loanformdata.append("Pancardpath", Pancardpath);
      }
      if (typeof CasteCertificatepath == "object") {
        loanformdata.append("CasteCertificatepath", CasteCertificatepath);
      }
      if (typeof IncomeCertificatepath == "object") {
        loanformdata.append("IncomeCertificatepath", IncomeCertificatepath);
      }
      if (typeof ProjectReportpath == "object") {
        loanformdata.append("ProjectReportpath", ProjectReportpath);
      }
      if (typeof EducationCertificatepath == "object") {
        loanformdata.append(
          "EducationCertificatepath",
          EducationCertificatepath
        );
      } // loanformdata.append("NoDueCertificatepath", data.NoDueCertificatepath);

      loanformdata.append("AckApproval", AckApproval);
      loanformdata.append("isActive", "True");
      loanformdata.append("isDeleted", "False");
      loanformdata.append("LastStatus", "SC");
      loanformdata.append("UserName", sessionStorage.getItem("name") || "");
      loanformdata.append("Applicationid", data.Applicationid);
      loanformdata.append("BeneficiaryId", BeneficiaryId);

      loanformdata.append("AnnualFamilyIncome", data.AnnualFamilyIncome || 0);
      loanformdata.append("PassportNo", data.PassportNo);
      loanformdata.append(
        "PassportExpDate",
        moment(data.PassportExpDate).format("YYYY-MM-DD") || "1900-01-01"
      );
      loanformdata.append("VisaPermitNo", data.VisaPermitNo);
      loanformdata.append(
        "VisaExpDate",
        moment(data.VisaExpDate).format("YYYY-MM-DD") || "1900-01-01"
      );
      loanformdata.append("ContactNo", data.ContactNo);
      loanformdata.append("SSLCInstitution", data.SSLCInstitution);
      loanformdata.append("SSLCYearofpassing", data.SSLCYearofpassing);
      loanformdata.append("SSLCPercentageofmarks", data.SSLCPercentageofmarks);
      loanformdata.append("HSCInstitution", data.HSCInstitution);
      loanformdata.append("HSCYearofpassing", data.HSCYearofpassing);
      loanformdata.append("HSCPercentageofmarks", data.HSCPercentageofmarks);
      loanformdata.append("GraduationInstitution", data.GraduationInstitution);
      loanformdata.append(
        "GraduationYearofpassing",
        data.GraduationYearofpassing
      );
      loanformdata.append(
        "GraduationPercentageofmarks",
        data.GraduationPercentageofmarks
      );
      loanformdata.append("PGInstitution", data.PGInstitution);
      loanformdata.append("PGYearofpassing", data.PGYearofpassing);
      loanformdata.append("PGPercentageofmarks", data.PGPercentageofmarks);
      loanformdata.append("OtherInstitution", data.OtherInstitution);
      loanformdata.append("OtherYearofpassing", data.OtherYearofpassing);
      loanformdata.append(
        "OtherPercentageofmarks",
        data.OtherPercentageofmarks
      );
      loanformdata.append("ParentsFullName", data.ParentsFullName);
      loanformdata.append(
        "ParentsResidenceAddress",
        data.ParentsResidenceAddress
      );
      loanformdata.append(
        "ParentsPlaceofworkAddress",
        data.ParentsPlaceofworkAddress
      );
      loanformdata.append("ParentsResidencePhone", data.ParentsResidencePhone);
      loanformdata.append(
        "ParentsPlaceofworkPhone",
        data.ParentsPlaceofworkPhone
      );
      loanformdata.append("ParentsAge", data.ParentsAge);
      loanformdata.append("CourseName", data.CourseName);
      loanformdata.append("CourseDuration", data.CourseDuration);
      loanformdata.append("CourseCollegeName", data.CourseCollegeName);
      loanformdata.append("CourseCountry", data.CourseCountry);
      loanformdata.append("EntranceExam", data.EntranceExam);
      loanformdata.append("DetailsOfPlacement", data.DetailsOfPlacement);
      loanformdata.append(
        "ExpnAmtAdmissionFeesA",
        data.ExpnAmtAdmissionFeesA || 0
      );
      loanformdata.append("ExpnAmtinstrumentsA", data.ExpnAmtinstrumentsA || 0);
      loanformdata.append(
        "ExpnAmtExaminationFeeA",
        data.ExpnAmtExaminationFeeA || 0
      );
      loanformdata.append("ExpnAmtBoardingA", data.ExpnAmtBoardingA || 0);
      loanformdata.append(
        "ExpnAmtInsurancepremiumA",
        data.ExpnAmtInsurancepremiumA || 0
      );
      loanformdata.append(
        "ExpnAmtTravelExpensesA",
        data.ExpnAmtTravelExpensesA || 0
      );
      loanformdata.append(
        "ExpnAmtCautionMoneyA",
        data.ExpnAmtCautionMoneyA || 0
      );
      loanformdata.append(
        "ExpnAmtAdmissionFeesB",
        data.ExpnAmtAdmissionFeesB || 0
      );
      loanformdata.append("ExpnAmtinstrumentsB", data.ExpnAmtinstrumentsB || 0);
      loanformdata.append(
        "ExpnAmtExaminationFeeB",
        data.ExpnAmtExaminationFeeB || 0
      );
      loanformdata.append("ExpnAmtBoardingB", data.ExpnAmtBoardingB || 0);
      loanformdata.append(
        "ExpnAmtInsurancepremiumB",
        data.ExpnAmtInsurancepremiumB || 0
      );
      loanformdata.append(
        "ExpnAmtTravelExpensesB",
        data.ExpnAmtTravelExpensesB || 0
      );
      loanformdata.append(
        "ExpnAmtCautionMoneyB",
        data.ExpnAmtCautionMoneyB || 0
      );
      loanformdata.append(
        "ExpnAmtAdmissionFeesC",
        data.ExpnAmtAdmissionFeesC || 0
      );
      loanformdata.append("ExpnAmtinstrumentsC", data.ExpnAmtinstrumentsC || 0);
      loanformdata.append(
        "ExpnAmtExaminationFeeC",
        data.ExpnAmtExaminationFeeC || 0
      );
      loanformdata.append("ExpnAmtBoardingC", data.ExpnAmtBoardingC || 0);
      loanformdata.append(
        "ExpnAmtInsurancepremiumC",
        data.ExpnAmtInsurancepremiumC || 0
      );
      loanformdata.append(
        "ExpnAmtTravelExpensesC",
        data.ExpnAmtTravelExpensesC || 0
      );
      loanformdata.append(
        "ExpnAmtCautionMoneyC",
        data.ExpnAmtCautionMoneyC || 0
      );
      loanformdata.append(
        "ExpnAmtAdmissionFeesD",
        data.ExpnAmtAdmissionFeesD || 0
      );
      loanformdata.append("ExpnAmtinstrumentsD", data.ExpnAmtinstrumentsD || 0);
      loanformdata.append(
        "ExpnAmtExaminationFeeD",
        data.ExpnAmtExaminationFeeD || 0
      );
      loanformdata.append("ExpnAmtBoardingD", data.ExpnAmtBoardingD || 0);
      loanformdata.append(
        "ExpnAmtInsurancepremiumD",
        data.ExpnAmtInsurancepremiumD || 0
      );
      loanformdata.append(
        "ExpnAmtTravelExpensesD",
        data.ExpnAmtTravelExpensesD || 0
      );
      loanformdata.append(
        "ExpnAmtCautionMoneyD",
        data.ExpnAmtCautionMoneyD || 0
      );

      loanformdata.append(
        "ExpnAmtAdmissionFeesE",
        data.ExpnAmtAdmissionFeesE || 0
      );
      loanformdata.append("ExpnAmtinstrumentsE", data.ExpnAmtinstrumentsE || 0);
      loanformdata.append(
        "ExpnAmtExaminationFeeE",
        data.ExpnAmtExaminationFeeE || 0
      );
      loanformdata.append("ExpnAmtBoardingE", data.ExpnAmtBoardingE || 0);
      loanformdata.append(
        "ExpnAmtInsurancepremiumE",
        data.ExpnAmtInsurancepremiumE || 0
      );
      loanformdata.append(
        "ExpnAmtTravelExpensesE",
        data.ExpnAmtTravelExpensesE || 0
      );
      loanformdata.append(
        "ExpnAmtCautionMoneyE",
        data.ExpnAmtCautionMoneyE || 0
      );

      loanformdata.append(
        "ExpnAmtAdmissionFeesF",
        data.ExpnAmtAdmissionFeesF || 0
      );
      loanformdata.append("ExpnAmtinstrumentsF", data.ExpnAmtinstrumentsF || 0);
      loanformdata.append(
        "ExpnAmtExaminationFeeF",
        data.ExpnAmtExaminationFeeF || 0
      );
      loanformdata.append("ExpnAmtBoardingF", data.ExpnAmtBoardingF || 0);
      loanformdata.append(
        "ExpnAmtInsurancepremiumF",
        data.ExpnAmtInsurancepremiumF || 0
      );
      loanformdata.append(
        "ExpnAmtTravelExpensesF",
        data.ExpnAmtTravelExpensesF || 0
      );
      loanformdata.append(
        "ExpnAmtCautionMoneyF",
        data.ExpnAmtCautionMoneyF || 0
      );

      loanformdata.append("AmtPromoters", data.AmtPromoters || 0);
      loanformdata.append("AmtLoanNSFDC", data.AmtLoanNSFDC || 0);
      loanformdata.append("AmtLoanStateAgency", data.AmtLoanStateAgency || 0);
      loanformdata.append("AmtSubsidy", data.AmtSubsidy || 0);
      loanformdata.append("AmtOthers", data.AmtOthers || 0);
      loanformdata.append("PerPromoters", data.PerPromoters || 0);
      loanformdata.append("PerLoanNSFDC", data.PerLoanNSFDC || 0);
      loanformdata.append("PerLoanStateAgency", data.PerLoanStateAgency || 0);
      loanformdata.append("PerSubsidy", data.PerSubsidy || 0);
      loanformdata.append("PerOthers", data.PerOthers || 0);
      loanformdata.append("OtherDetails", data.OtherDetails || 0);
      loanformdata.append("Expectedincomepm", data.Expectedincomepm || 0);
      loanformdata.append(
        "Anticipatedmonthlyexpn",
        data.Anticipatedmonthlyexpn || 0
      );
      loanformdata.append(
        "Amtavailableforrepayment",
        data.Amtavailableforrepayment || 0
      );

      if (typeof Rationcardpath == "object") {
        loanformdata.append("Rationcardpath", Rationcardpath);
      }
      if (typeof Voterspath == "object") {
        loanformdata.append("Voterspath", Voterspath);
      }
      if (typeof Passportpath == "object") {
        loanformdata.append("Passportpath", Passportpath);
      }
      if (typeof Visapath == "object") {
        loanformdata.append("Visapath", Visapath);
      }
      if (typeof Passbookcqpath == "object") {
        loanformdata.append("Passbookcqpath", Passbookcqpath);
      }
      if (typeof Eduexpnpath == "object") {
        loanformdata.append("Eduexpnpath", Eduexpnpath);
      }
      if (typeof Admissionpath == "object") {
        loanformdata.append("Admissionpath", Admissionpath);
      }
      if (typeof Guarantorpath == "object") {
        loanformdata.append("Guarantorpath", Guarantorpath);
      }
      if (typeof Recoverycompetentpath == "object") {
        loanformdata.append("Recoverycompetentpath", Recoverycompetentpath);
      }
      if (data.id) {
        axios
          .patch(
            `${REACT_APP_BASE_URL}/loan/LoanFormUpdateDetailsAPI/${data.id}`,
            loanformdata,
            {
              headers: {
                //"Content-Type": "application/json",
                "Content-Type": "multipart/form-data",
                // "Access-Control-Allow-Headers": "*",
                Authorization: `token ${Token}`,
              },
            }
          )
          .then((response) => {
            //setInfoLoading(true);
            // setTimeout(() => {
            //   //setInfoLoading(false);
            //   message.success("Data Updated");
            // }, 1000);
            setTimeout(() => {
              //window.location.replace("/");
              //console.log(response.data);
              if (response.data.status == "success") {
                message.success("Data Inserted");
                window.location.replace("/loanbeneficiarypage");
              } else {
                // setResp(JSON.stringify(response.data));
                let userObj = JSON.parse(
                  JSON.stringify(response.data),
                  (key, value) => {
                    if (typeof value === "string") {
                      return value.toUpperCase();
                    }
                    return value;
                  }
                );

                const respListA = ["Error List"];
                Object.keys(response.data.message).map((key, i) => (
                  <p key={i}>
                    {/* {console.log("<li>" + key.replace("path", "") + ": " + response.data.message[key] + "</li>")} */}
                    {respListA.push(
                      key.replace("path", "") +
                        ": " +
                        response.data.message[key]
                    )}
                  </p>
                ));
                // console.log(respList);
                // console.log(userObj.message);
                setRespList(respListA);
                setResp(JSON.stringify(response.data));
              }
            }, 5000);
          })
          .catch((error) => {
            message.error(error.message);
          });
      } else {
        axios
          .post(`${REACT_APP_BASE_URL}/loan/InsertLoanFormAPI`, loanformdata, {
            headers: {
              //"Content-Type": "application/json",
              "Content-Type": "multipart/form-data",
              // "Access-Control-Allow-Headers": "*",
              Authorization: `token ${Token}`,
            },
          })
          .then((response) => {
            //setInfoLoading(true);
            // setTimeout(() => {
            //   //setInfoLoading(false);
            //   message.success("Data Updated");
            // }, 1000);
            setTimeout(() => {
              //window.location.replace("/");
              //console.log(response.data);
              if (response.data.status == "success") {
                message.success("Data Inserted");
                window.location.replace("/loanbeneficiarypage");
              } else {
                // setResp(JSON.stringify(response.data));
                let userObj = JSON.parse(
                  JSON.stringify(response.data),
                  (key, value) => {
                    if (typeof value === "string") {
                      return value.toUpperCase();
                    }
                    return value;
                  }
                );

                const respListA = ["Error List"];
                Object.keys(response.data.message).map((key, i) => (
                  <p key={i}>
                    {/* {console.log("<li>" + key.replace("path", "") + ": " + response.data.message[key] + "</li>")} */}
                    {respListA.push(
                      key.replace("path", "") +
                        ": " +
                        response.data.message[key]
                    )}
                  </p>
                ));
                // console.log(respList);
                // console.log(userObj.message);
                setRespList(respListA);
                setResp(JSON.stringify(response.data));
              }
            }, 3000);
          })
          .catch((error) => {
            message.error(error.message);
          });
      }
    }
  };

  return (
    <div>
      {/* {console.log(data)} */}
      <Form
        layout="vertical"
        //onFinish={() => onSuccess(data)}
        data={data}
        autoComplete="off"
        form={form}
      >
        <h3>Loan Management System</h3>
        <Row>
          <Col style={style} span={6}>
            <h4>Scheme Name:</h4>
          </Col>
          <Col span={6} style={style}>
            {data.LoanScheme}
          </Col>
          <Col style={style} span={6}>
            <h4>Sub Scheme Name:</h4>
          </Col>
          <Col span={6} style={style}>
            {SubSchemeName}
          </Col>
        </Row>
        <Row>
          <Col style={style} span={6}>
            <h4>FirstName:</h4>
          </Col>
          <Col span={6} style={style}>
            {data.FirstName}
          </Col>
          <Col style={style} span={6}>
            <h4>MiddleName:</h4>
          </Col>
          <Col span={6} style={style}>
            {data.MiddleName}
          </Col>
        </Row>
        <Row>
          <Col style={style} span={6}>
            <h4>LastName:</h4>
          </Col>
          <Col span={6} style={style}>
            {data.LastName}
          </Col>
          <Col style={style} span={6}>
            <h4>Birth Date:</h4>
          </Col>
          <Col span={6} style={style}>
            {moment(data.Birthdate).format("YYYY-MM-DD")}
          </Col>
        </Row>
        <Row>
          <Col style={style} span={6}>
            <h4>Age:</h4>
          </Col>
          <Col span={6} style={style}>
            {data.Age}
          </Col>
          <Col style={style} span={6}>
            <h4>Father's Full Name:</h4>
          </Col>
          <Col span={6} style={style}>
            {data.FatherName}
          </Col>
        </Row>
        <Row>
          <Col style={style} span={6}>
            <h4>Husband Full Name(FemaleApplicant):</h4>
          </Col>
          <Col span={6} style={style}>
            {data.HusbandFullName}
          </Col>
        </Row>
        <Row>
          <Col style={style} span={6}>
            <h4>Basic Education:</h4>
          </Col>
          <Col span={6} style={style}>
            {data.Education}
          </Col>
        </Row>

        <Row>
          <Col style={style} span={6}>
            <h4>City/Rural:</h4>
          </Col>
          <Col span={6} style={style}>
            {data.UrbanRural}
          </Col>
          <Col style={style} span={6}>
            <h4>District:</h4>
          </Col>
          <Col span={6} style={style}>
            {data.District}
          </Col>
        </Row>
        <Row>
          <Col style={style} span={6}>
            <h4>Taluka:</h4>
          </Col>
          <Col span={6} style={style}>
            {data.Taluka}
          </Col>
          <Col style={style} span={6}>
            <h4>Present Address:</h4>
          </Col>
          <Col span={6} style={style}>
            {data.PresentAddline1} , {data.PresentAddline2} ,{" "}
            {data.PresentAddline3} , {data.PresentPincode}
          </Col>
        </Row>
        <Row>
          <Col style={style} span={6}>
            <h4>Permanent Address:</h4>
          </Col>
          <Col span={6} style={style}>
            {data.PermanentAddline1} , {data.PermanentAddline2} ,{" "}
            {data.PermanentAddline3} , {data.PermanentPincode}
          </Col>
          <Col style={style} span={6}>
            <h4>Proposed Business Name:</h4>
          </Col>
          <Col span={6} style={style}>
            {data.ProposedBusinessName}
          </Col>
        </Row>

        <Row>
          <Col style={style} span={6}>
            <h4>Ration Card Type:</h4>
          </Col>
          <Col span={6} style={style}>
            {data.RationCardType}
          </Col>
        </Row>

        <Row>
          <Col style={style} span={6}>
            <h4>Ration Card Number:</h4>
          </Col>
          <Col span={6} style={style}>
            {data.RationCardNumber}
          </Col>
        </Row>

        <Row>
          <Col style={style} span={6}>
            <h4>Business Name:</h4>
          </Col>
          <Col span={6} style={style}>
            {data.BusinessName}
          </Col>
          <Col style={style} span={6}>
            <h4>The Address of the place ofBusiness:</h4>
          </Col>
          <Col span={6} style={style}>
            {data.BusinessAdd}
          </Col>
        </Row>
        <Row>
          <Col style={style} span={6}>
            <h4>
              Beneficiary Investment Component (Minimum10% of the project cost):
            </h4>
          </Col>
          <Col span={6} style={style}>
            {data.Investment}
          </Col>
          <Col style={style} span={6}>
            <h4>Brief Information of Business:</h4>
          </Col>
          <Col span={6} style={style}>
            {data.BusinessInfo}
          </Col>
        </Row>

        <Row>
          <Col style={style} span={6}>
            <h4>Land Owned or Rented?:</h4>
          </Col>
          <Col span={6} style={style}>
            {data.OwnRented}
          </Col>
        </Row>

        <Col span={24} style={style}>
          <h3>Family Details:</h3>
          <DataTable columns={columns} dataSource={FamilyData} />
        </Col>

        {data.LoanSchemeCode == "central-nsfdc-el-a" ||
        data.LoanSchemeCode == "central-nsfdc-el-b" ||
        data.LoanSchemeCode == "central-nskfdc-el-a" ||
        data.LoanSchemeCode == "central-nskfdc-el-b" ? (
          <>
            <h3>PERSONAL DATA:</h3>
            <Row>
              <Col style={style} span={6}>
                <h4>Caste:</h4>
              </Col>
              <Col span={6} style={style}>
                {data.Caste}
              </Col>
              <Col style={style} span={6}>
                <h4>SubCaste:</h4>
              </Col>
              <Col span={6} style={style}>
                {data.SubCaste}
              </Col>
            </Row>

            <Row>
              <Col style={style} span={6}>
                <h4>Annual Family Income:</h4>
              </Col>
              <Col span={6} style={style}>
                {data.AnnualFamilyIncome}
              </Col>
              <Col style={style} span={6}>
                <h4>Contact No:</h4>
              </Col>
              <Col span={6} style={style}>
                {data.ContactNo}
              </Col>
            </Row>
            <Row>
              <Col style={style} span={6}>
                <h4>Valid Passport No:</h4>
              </Col>
              <Col span={6} style={style}>
                {data.PassportNo}
              </Col>
              <Col style={style} span={6}>
                <h4>Valid Passport Expiry Date:</h4>
              </Col>
              <Col span={6} style={style}>
                {data.PassportExpDate == undefined ? (
                  <></>
                ) : (
                  data.PassportExpDate.format("DD-MM-YYYY")
                )}
              </Col>
            </Row>

            <Row>
              <Col style={style} span={6}>
                <h4>Valid Visa/Permit No:</h4>
              </Col>
              <Col span={6} style={style}>
                {data.VisaPermitNo}
              </Col>
              <Col style={style} span={6}>
                <h4>Valid Visa/Permit Expiry Date:</h4>
              </Col>
              <Col span={6} style={style}>
                {data.VisaExpDate == undefined ? (
                  <></>
                ) : (
                  data.VisaExpDate.format("DD-MM-YYYY")
                )}
              </Col>
            </Row>
            <hr />

            <Row>
              <Col span={3} style={style}>
                <h3>Examination</h3>
              </Col>
              <Col span={7} style={style}>
                <h3>Institution/University from which passed</h3>
              </Col>
              <Col span={7} style={style}>
                <h3>Year of passing</h3>
              </Col>
              <Col span={7} style={style}>
                <h3>Percentage of marks/grade</h3>
              </Col>
            </Row>

            <Row>
              <Col style={style} span={3}>
                * SSC
              </Col>
              <Col style={style} span={7}>
                {data.SSLCInstitution}
              </Col>
              <Col style={style} span={7}>
                {data.SSLCYearofpassing}
              </Col>
              <Col style={style} span={7}>
                {data.SSLCPercentageofmarks}
              </Col>

              <Col style={style} span={3}>
                10 + 2
              </Col>
              <Col style={style} span={7}>
                {data.HSCInstitution}
              </Col>
              <Col style={style} span={7}>
                {data.HSCYearofpassing}
              </Col>
              <Col style={style} span={7}>
                {data.HSCPercentageofmarks}
              </Col>

              <Col style={style} span={3}>
                Graduation
              </Col>
              <Col style={style} span={7}>
                {data.GraduationInstitution}
              </Col>
              <Col style={style} span={7}>
                {data.GraduationYearofpassing}
              </Col>
              <Col style={style} span={7}>
                {data.GraduationPercentageofmarks}
              </Col>

              <Col style={style} span={3}>
                P.G.
              </Col>
              <Col style={style} span={7}>
                {data.PGInstitution}
              </Col>
              <Col style={style} span={7}>
                {data.PGYearofpassing}
              </Col>
              <Col style={style} span={7}>
                {data.PGPercentageofmarks}
              </Col>

              <Col style={style} span={3}>
                Any Other (please specify)
              </Col>
              <Col style={style} span={7}>
                {data.OtherInstitution}
              </Col>
              <Col style={style} span={7}>
                {data.OtherYearofpassing}
              </Col>
              <Col style={style} span={7}>
                {data.OtherPercentageofmarks}
              </Col>
            </Row>

            <hr />
            <h3>PARTICULARS OF PARENTS/GUARDIAN:</h3>
            <Row>
              <Col style={style} span={6}>
                <h4>Full Name:</h4>
              </Col>
              <Col span={6} style={style}>
                {data.ParentsFullName}
              </Col>
              <Col style={style} span={6}>
                <h4>Age:</h4>
              </Col>
              <Col span={6} style={style}>
                {data.ParentsAge}
              </Col>
            </Row>
            <Row>
              <Col style={style} span={6}>
                <h4>Phone Number Res:</h4>
              </Col>
              <Col span={6} style={style}>
                {data.ParentsResidencePhone}
              </Col>
              <Col style={style} span={6}>
                <h4>Phone Number Office:</h4>
              </Col>
              <Col span={6} style={style}>
                {data.ParentsPlaceofworkPhone}
              </Col>
            </Row>
            <Row>
              <Col style={style} span={6}>
                <h4>Permanent Address: Residence</h4>
              </Col>
              <Col span={6} style={style}>
                {data.ParentsResidenceAddress}
              </Col>
              <Col style={style} span={6}>
                <h4>Address: Place of work</h4>
              </Col>
              <Col span={6} style={style}>
                {data.ParentsPlaceofworkAddress}
              </Col>
            </Row>

            <hr />
            <h3>COURSE DETAILS: (For which Educational Loan sought)</h3>

            <Row>
              <Col style={style} span={6}>
                <h4>Fulltime Professional/Technical Course</h4>
              </Col>
              <Col span={6} style={style}>
                {data.CourseName}
              </Col>
              <Col style={style} span={6}>
                <h4>
                  Details of placement to be provided by the Educational
                  Institute, if any
                </h4>
              </Col>
              <Col span={6} style={style}>
                {data.DetailsOfPlacement}
              </Col>
            </Row>
            <Row>
              <Col style={style} span={6}>
                <h4>College/Institute/University</h4>
              </Col>
              <Col span={6} style={style}>
                {data.CourseCollegeName}
              </Col>
              <Col style={style} span={6}>
                <h4>Duration of the Course</h4>
              </Col>
              <Col span={6} style={style}>
                {data.CourseDuration}
              </Col>
            </Row>
            <Row>
              <Col style={style} span={6}>
                <h4>Entrance exam, if any, qualified</h4>
              </Col>
              <Col span={6} style={style}>
                {data.EntranceExam}
              </Col>
              <Col style={style} span={6}>
                <h4>Country</h4>
              </Col>
              <Col span={6} style={style}>
                {data.CourseCountry}
              </Col>
            </Row>

            <hr />
            <h3>TOTAL STUDY EXPENSES*:</h3>
            <Row>
              <Col style={style} span={3}>
                <h3>YEAR-WISE OR SEMESTER-WISE</h3>
              </Col>
              <Col style={style} span={3}>
                <h3>1</h3>
              </Col>
              <Col style={style} span={3}>
                <h3>2</h3>
              </Col>
              <Col style={style} span={3}>
                <h3>3</h3>
              </Col>
              <Col style={style} span={3}>
                <h3>4</h3>
              </Col>
              <Col style={style} span={3}>
                <h3>5</h3>
              </Col>
              <Col style={style} span={3}>
                <h3>6</h3>
              </Col>
              <Col style={style} span={3}>
                <h3>TOTAL</h3>
              </Col>
            </Row>

            <Row>
              <Col style={style} span={3}>
                * Admission Fees & Tuition Fee
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtAdmissionFeesA}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtAdmissionFeesB}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtAdmissionFeesC}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtAdmissionFeesD}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtAdmissionFeesE}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtAdmissionFeesF}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtAdmissionFeesT}
              </Col>
            </Row>

            <Row>
              <Col style={style} span={3}>
                * Books, Stationery and other instruments required for the
                course
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtinstrumentsA}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtinstrumentsB}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtinstrumentsC}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtinstrumentsD}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtinstrumentsE}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtinstrumentsF}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtinstrumentsT}
              </Col>
            </Row>

            <Row>
              <Col style={style} span={3}>
                * Examination Fee
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtExaminationFeeA}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtExaminationFeeB}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtExaminationFeeC}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtExaminationFeeD}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtExaminationFeeE}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtExaminationFeeF}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtExaminationFeeT}
              </Col>
            </Row>

            <Row>
              <Col style={style} span={3}>
                * Boarding and Lodging Expenses
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtBoardingA}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtBoardingB}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtBoardingC}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtBoardingD}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtBoardingE}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtBoardingF}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtBoardingT}
              </Col>
            </Row>

            <Row>
              <Col style={style} span={3}>
                * Insurance premium for policy for insuring loanees against loan
                in case of death or permanent disability
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtInsurancepremiumA}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtInsurancepremiumB}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtInsurancepremiumC}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtInsurancepremiumD}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtInsurancepremiumE}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtInsurancepremiumF}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtInsurancepremiumT}
              </Col>
            </Row>

            <Row>
              <Col style={style} span={3}>
                * Travel Expenses/Passage Money for studying abroad.
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtTravelExpensesA}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtTravelExpensesB}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtTravelExpensesC}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtTravelExpensesD}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtTravelExpensesE}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtTravelExpensesF}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtTravelExpensesT}
              </Col>
            </Row>

            <Row>
              <Col style={style} span={3}>
                * Caution Money, Development Fund etc.
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtCautionMoneyA}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtCautionMoneyB}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtCautionMoneyC}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtCautionMoneyD}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtCautionMoneyE}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtCautionMoneyF}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtCautionMoneyT}
              </Col>
            </Row>

            <Row>
              <Col style={style} span={3}>
                <h3>Total</h3>
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtAdmissionFeesA +
                  data.ExpnAmtinstrumentsA +
                  data.ExpnAmtExaminationFeeA +
                  data.ExpnAmtBoardingA +
                  data.ExpnAmtInsurancepremiumA +
                  data.ExpnAmtTravelExpensesA +
                  data.ExpnAmtCautionMoneyA}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtAdmissionFeesB +
                  data.ExpnAmtinstrumentsB +
                  data.ExpnAmtExaminationFeeB +
                  data.ExpnAmtBoardingB +
                  data.ExpnAmtInsurancepremiumB +
                  data.ExpnAmtTravelExpensesB +
                  data.ExpnAmtCautionMoneyB}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtAdmissionFeesC +
                  data.ExpnAmtinstrumentsC +
                  data.ExpnAmtExaminationFeeC +
                  data.ExpnAmtBoardingC +
                  data.ExpnAmtInsurancepremiumC +
                  data.ExpnAmtTravelExpensesC +
                  data.ExpnAmtCautionMoneyC}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtAdmissionFeesD +
                  data.ExpnAmtinstrumentsD +
                  data.ExpnAmtExaminationFeeD +
                  data.ExpnAmtBoardingD +
                  data.ExpnAmtInsurancepremiumD +
                  data.ExpnAmtTravelExpensesD +
                  data.ExpnAmtCautionMoneyD}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtAdmissionFeesE +
                  data.ExpnAmtinstrumentsE +
                  data.ExpnAmtExaminationFeeE +
                  data.ExpnAmtBoardingE +
                  data.ExpnAmtInsurancepremiumE +
                  data.ExpnAmtTravelExpensesE +
                  data.ExpnAmtCautionMoneyE}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtAdmissionFeesF +
                  data.ExpnAmtinstrumentsF +
                  data.ExpnAmtExaminationFeeF +
                  data.ExpnAmtBoardingF +
                  data.ExpnAmtInsurancepremiumF +
                  data.ExpnAmtTravelExpensesF +
                  data.ExpnAmtCautionMoneyF}
              </Col>
              <Col style={style} span={3}>
                {data.ExpnAmtAdmissionFeesA +
                  data.ExpnAmtinstrumentsA +
                  data.ExpnAmtExaminationFeeA +
                  data.ExpnAmtBoardingA +
                  data.ExpnAmtInsurancepremiumA +
                  data.ExpnAmtTravelExpensesA +
                  data.ExpnAmtCautionMoneyA +
                  data.ExpnAmtAdmissionFeesB +
                  data.ExpnAmtinstrumentsB +
                  data.ExpnAmtExaminationFeeB +
                  data.ExpnAmtBoardingB +
                  data.ExpnAmtInsurancepremiumB +
                  data.ExpnAmtTravelExpensesB +
                  data.ExpnAmtCautionMoneyB +
                  data.ExpnAmtAdmissionFeesC +
                  data.ExpnAmtinstrumentsC +
                  data.ExpnAmtExaminationFeeC +
                  data.ExpnAmtBoardingC +
                  data.ExpnAmtInsurancepremiumC +
                  data.ExpnAmtTravelExpensesC +
                  data.ExpnAmtCautionMoneyC +
                  data.ExpnAmtAdmissionFeesD +
                  data.ExpnAmtinstrumentsD +
                  data.ExpnAmtExaminationFeeD +
                  data.ExpnAmtBoardingD +
                  data.ExpnAmtInsurancepremiumD +
                  data.ExpnAmtTravelExpensesD +
                  data.ExpnAmtCautionMoneyD +
                  data.ExpnAmtAdmissionFeesE +
                  data.ExpnAmtinstrumentsE +
                  data.ExpnAmtExaminationFeeE +
                  data.ExpnAmtBoardingE +
                  data.ExpnAmtInsurancepremiumE +
                  data.ExpnAmtTravelExpensesE +
                  data.ExpnAmtCautionMoneyE +
                  data.ExpnAmtAdmissionFeesF +
                  data.ExpnAmtinstrumentsF +
                  data.ExpnAmtExaminationFeeF +
                  data.ExpnAmtBoardingF +
                  data.ExpnAmtInsurancepremiumF +
                  data.ExpnAmtTravelExpensesF +
                  data.ExpnAmtCautionMoneyF}
              </Col>
            </Row>
            <hr />
            <h3>MEANS OF FINANCE:</h3>

            <Row>
              <Col style={style} span={8}>
                <h3></h3>
              </Col>
              <Col style={style} span={8}>
                <h3>Amount</h3>
              </Col>
              <Col style={style} span={8}>
                <h3>Percentage %</h3>
              </Col>
            </Row>

            <Row>
              <Col style={style} span={8}>
                * Promoters Contribution
              </Col>
              <Col style={style} span={8}>
                {data.AmtPromoters}
              </Col>
              <Col style={style} span={8}>
                {data.PerPromoters}
              </Col>
            </Row>

            <Row>
              <Col style={style} span={8}>
                * Loan from{" "}
                {data.LoanSchemeCode == "central-nsfdc-el-a" ||
                data.LoanSchemeCode == "central-nsfdc-el-b"
                  ? "NSFDC"
                  : "NSKFDC"}
              </Col>
              <Col style={style} span={8}>
                {data.LoanAmount}
              </Col>
              <Col style={style} span={8}>
                {data.PerLoanNSFDC}
              </Col>
            </Row>

            <Row>
              <Col style={style} span={8}>
                * Loan from State Channelising Agency
              </Col>
              <Col style={style} span={8}>
                {data.AmtLoanStateAgency}
              </Col>
              <Col style={style} span={8}>
                {data.PerLoanStateAgency}
              </Col>
            </Row>

            <Row>
              <Col style={style} span={8}>
                * Subsidy
              </Col>
              <Col style={style} span={8}>
                {data.AmtSubsidy}
              </Col>
              <Col style={style} span={8}>
                {data.PerSubsidy}
              </Col>
            </Row>

            <Row>
              <Col style={style} span={8}>
                * Total
              </Col>
              <Col style={style} span={8}>
                {data.AmtTotal}
              </Col>
              <Col style={style} span={8}></Col>
            </Row>

            <hr />
            <h3>OTHER DETAILS:</h3>
            <Row>
              <Col style={style} span={6}>
                State in brief how the completion of the course is going to help
                for improving your prospects of earning your livelihood.
              </Col>
              <Col style={style} span={6}>
                {data.OtherDetails}
              </Col>
            </Row>
            <Row>
              <Col style={style} span={6}>
                * Expected income per month :
              </Col>
              <Col style={style} span={6}>
                {data.Expectedincomepm}
              </Col>
            </Row>
            <Row>
              <Col style={style} span={6}>
                * Anticipated monthly expenses :
              </Col>
              <Col style={style} span={6}>
                {data.Anticipatedmonthlyexpn}
              </Col>
            </Row>
            <Row>
              <Col style={style} span={6}>
                * Amount available for Repayment of Loan
              </Col>
              <Col style={style} span={6}>
                {data.Amtavailableforrepayment}
              </Col>
            </Row>
          </>
        ) : (
          ""
        )}

        <Row>
          <Col span={12} style={style}>
            <h3>Photograph:</h3>
            {/* <img src={upload_loan_docpath + data.Photopath.name} /> */}
            <img
              src={
                typeof data.Photopath !== "object"
                  ? `${REACT_APP_BASE_URL}${data.Photopath}`
                  : URL.createObjectURL(data.Photopath)
              }
              style={{ width: "160px", height: "187px" }}
            />
          </Col>

          <Col span={12} style={style}>
            <h3>Signature:</h3>
            {/* <img src={upload_loan_docpath + data.Signaturepath.name} /> */}
            <img
              src={
                typeof data.Signaturepath !== "object"
                  ? `${REACT_APP_BASE_URL}${data.Signaturepath}`
                  : URL.createObjectURL(data.Signaturepath)
              }
              style={{ width: "256px", height: "64px" }}
            />
          </Col>
        </Row>

        <div className="steps-action">
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={() => onBack(data)}
          >
            Previous
          </Button>

          <Button
            type="primary"
            htmlType="submit"
            onClick={handleSubmit}
            disabled={btnsubmited}
          >
            Save and Proceed
          </Button>
          {/* <Card title="">{resp}</Card> */}
          <Card title="">
            {
              <ul>
                {respList.map((person) => (
                  <li>{person}</li>
                ))}
              </ul>
            }
          </Card>
          {/* {console.log(respList)} */}
        </div>

        {/* <Button onClick={() => { onBack(data) }}>Back</Button>
                &nbsp;
                <Button type="primary" htmlType="submit">
                    Submit
                </Button> */}
        {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                </Form.Item> */}
      </Form>
    </div>
  );
};

export default Summary;
