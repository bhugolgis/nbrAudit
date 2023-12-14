import React, { useState, useRef } from "react";
import { useEffect } from "react";
import {
  Steps,
  Button,
  message,
  Progress,
  Form,
  Input,
  InputNumber,
  Select,
  Row,
  Col,
  Radio,
  Checkbox,
  Upload,
  Card,
  Spin,
  DatePicker,
} from "antd";
import moment from "moment";
import axios from "axios";
import { REACT_APP_BASE_URL } from "../../../../libs/utils/urls";
import { Token } from "../../../../libs/utils/sessionStorage";

const BasicDetails = ({ data, onSuccess, form }) => {
  const { Option } = Select;
  const disabledDate = (current) => {
    return current && current > moment().endOf("day");
  };

  const [personalInfo, setPersonalInfo] = useState();
  useEffect(() => {
    const userResponseFunc = async () => {
      // var bytes = CryptoJS.AES.decrypt(
      //   sessionStorage.getItem("token"),
      //   "y9L@91nYW%BRfc1g"
      // );
      // var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      if (data.id) {
        // console.log(data.id);
        // form.setFieldsValue({ FirstName: data.FirstName });

        form.setFieldsValue({ LoanSchemeCode: data.LoanSchemeCode });
        form.setFieldsValue({ LoanScheme: data.LoanScheme });

        form.setFieldsValue({ SubSchemeName: data.SubSchemeName });

        form.setFieldsValue({ FirstName: data.FirstName });
        form.setFieldsValue({ MiddleName: data.MiddleName });
        form.setFieldsValue({ LastName: data.LastName });
        form.setFieldsValue({ Birthdate: moment(data.Birthdate) });
        form.setFieldsValue({ Age: data.Age });
        form.setFieldsValue({ Gender: data.gender });
        form.setFieldsValue({ Caste: data.Caste });
        form.setFieldsValue({ SubCaste: data.SubCaste });

        form.setFieldsValue({ FatherName: data.FatherName });
        form.setFieldsValue({ MotherName: data.MotherName });
        form.setFieldsValue({ HusbandFullName: data.HusbandFullName });
        form.setFieldsValue({ Education: data.Education });
        form.setFieldsValue({ RationCardType: data.RationCardType });
        form.setFieldsValue({ RationCardNumber: data.RationCardNumber });
        form.setFieldsValue({
          ProposedBusinessName: data.ProposedBusinessName,
        });
        form.setFieldsValue({ UrbanRural: data.UrbanRural });
        form.setFieldsValue({ Division: data.Division });
        form.setFieldsValue({ District: data.District });
        form.setFieldsValue({ Taluka: data.Taluka });
        form.setFieldsValue({ PresentAddline1: data.PresentAddline1 });
        form.setFieldsValue({ PresentAddline2: data.PresentAddline2 });
        form.setFieldsValue({ PresentAddline3: data.PresentAddline3 });
        form.setFieldsValue({ PresentPincode: data.PresentPincode });
        form.setFieldsValue({ UrbanRuralB: data.UrbanRuralB });
        form.setFieldsValue({ DivisionB: data.DivisionB });
        form.setFieldsValue({ DistrictB: data.DistrictB });
        form.setFieldsValue({ TalukaB: data.TalukaB });
        form.setFieldsValue({ PermanentAddline1: data.PermanentAddline1 });
        form.setFieldsValue({ PermanentAddline2: data.PermanentAddline2 });
        form.setFieldsValue({ PermanentAddline3: data.PermanentAddline3 });
        form.setFieldsValue({ PermanentPincode: data.PermanentPincode });
        // form.setFieldsValue({ FamilyDetails: JSON.stringify(data.FamilyDetails)});
        form.setFieldsValue({ BusinessName: data.BusinessName });
        form.setFieldsValue({ Investment: data.Investment || 0 });
        form.setFieldsValue({ LoanAmount: data.LoanAmount || 0 });
        form.setFieldsValue({ BusinessInfo: data.BusinessInfo });
        form.setFieldsValue({
          FamilyIncomeBelowThreeL: data.FamilyIncomeBelowThreeL || "No",
        });
        form.setFieldsValue({ BusinessAdd: data.BusinessAdd });
        form.setFieldsValue({ OwnRented: data.OwnRented });

        form.setFieldsValue({ Photopath: data.Photopath });
        form.setFieldsValue({ Signaturepath: data.Signaturepath });
        form.setFieldsValue({ Uaadharpath: data.Uaadharpath });
        form.setFieldsValue({ AddressProofpath: data.AddressProofpath });
        form.setFieldsValue({ AadharFrontpath: data.AadharFrontpath });
        form.setFieldsValue({ AadharBackpath: data.AadharBackpath });
        form.setFieldsValue({ SKDpath: data.SKDpath });
        form.setFieldsValue({ Pancardpath: data.Pancardpath });

        form.setFieldsValue({
          CasteCertificatepath: data.CasteCertificatepath,
        });
        form.setFieldsValue({
          IncomeCertificatepath: data.IncomeCertificatepath,
        });
        form.setFieldsValue({ ProjectReportpath: data.ProjectReportpath });
        form.setFieldsValue({
          EducationCertificatepath: data.EducationCertificatepath,
        });
        // form.setFieldsValue({ NoDueCertificatepath: data.NoDueCertificatepath});

        form.setFieldsValue({ AckApproval: data.AckApproval });
        form.setFieldsValue({ isActive: data.isActive });
        form.setFieldsValue({ isDeleted: data.isDeleted });
        form.setFieldsValue({ LastStatus: data.LastStatus });
        form.setFieldsValue({ UserName: data.UserName });
        form.setFieldsValue({ Applicationid: data.Applicationid });
        form.setFieldsValue({ BeneficiaryId: data.BeneficiaryId });

        form.setFieldsValue({ AnnualFamilyIncome: data.AnnualFamilyIncome });
        form.setFieldsValue({ PassportNo: data.PassportNo });
        form.setFieldsValue({ PassportExpDate: moment(data.PassportExpDate) });
        form.setFieldsValue({ VisaPermitNo: data.VisaPermitNo });
        form.setFieldsValue({ VisaExpDate: moment(data.VisaExpDate) });
        form.setFieldsValue({ ContactNo: data.ContactNo });
        form.setFieldsValue({ SSLCInstitution: data.SSLCInstitution });
        form.setFieldsValue({ SSLCYearofpassing: data.SSLCYearofpassing });
        form.setFieldsValue({
          SSLCPercentageofmarks: data.SSLCPercentageofmarks,
        });
        form.setFieldsValue({ HSCInstitution: data.HSCInstitution });
        form.setFieldsValue({ HSCYearofpassing: data.HSCYearofpassing });
        form.setFieldsValue({
          HSCPercentageofmarks: data.HSCPercentageofmarks,
        });
        form.setFieldsValue({
          GraduationInstitution: data.GraduationInstitution,
        });
        form.setFieldsValue({
          GraduationYearofpassing: data.GraduationYearofpassing,
        });
        form.setFieldsValue({
          GraduationPercentageofmarks: data.GraduationPercentageofmarks,
        });
        form.setFieldsValue({ PGInstitution: data.PGInstitution });
        form.setFieldsValue({ PGYearofpassing: data.PGYearofpassing });
        form.setFieldsValue({ PGPercentageofmarks: data.PGPercentageofmarks });
        form.setFieldsValue({ OtherInstitution: data.OtherInstitution });
        form.setFieldsValue({ OtherYearofpassing: data.OtherYearofpassing });
        form.setFieldsValue({
          OtherPercentageofmarks: data.OtherPercentageofmarks,
        });
        form.setFieldsValue({ ParentsFullName: data.ParentsFullName });
        form.setFieldsValue({
          ParentsResidenceAddress: data.ParentsResidenceAddress,
        });
        form.setFieldsValue({
          ParentsPlaceofworkAddress: data.ParentsPlaceofworkAddress,
        });
        form.setFieldsValue({
          ParentsResidencePhone: data.ParentsResidencePhone,
        });
        form.setFieldsValue({
          ParentsPlaceofworkPhone: data.ParentsPlaceofworkPhone,
        });
        form.setFieldsValue({ ParentsAge: data.ParentsAge });
        form.setFieldsValue({ CourseName: data.CourseName });
        form.setFieldsValue({ CourseDuration: data.CourseDuration });
        form.setFieldsValue({ CourseCollegeName: data.CourseCollegeName });
        form.setFieldsValue({ CourseCountry: data.CourseCountry });
        form.setFieldsValue({ EntranceExam: data.EntranceExam });
        form.setFieldsValue({ DetailsOfPlacement: data.DetailsOfPlacement });
        form.setFieldsValue({
          ExpnAmtAdmissionFeesA: data.ExpnAmtAdmissionFeesA,
        });
        form.setFieldsValue({ ExpnAmtinstrumentsA: data.ExpnAmtinstrumentsA });
        form.setFieldsValue({
          ExpnAmtExaminationFeeA: data.ExpnAmtExaminationFeeA,
        });
        form.setFieldsValue({ ExpnAmtBoardingA: data.ExpnAmtBoardingA });
        form.setFieldsValue({
          ExpnAmtInsurancepremiumA: data.ExpnAmtInsurancepremiumA,
        });
        form.setFieldsValue({
          ExpnAmtTravelExpensesA: data.ExpnAmtTravelExpensesA,
        });
        form.setFieldsValue({
          ExpnAmtCautionMoneyA: data.ExpnAmtCautionMoneyA,
        });
        form.setFieldsValue({
          ExpnAmtAdmissionFeesB: data.ExpnAmtAdmissionFeesB,
        });
        form.setFieldsValue({ ExpnAmtinstrumentsB: data.ExpnAmtinstrumentsB });
        form.setFieldsValue({
          ExpnAmtExaminationFeeB: data.ExpnAmtExaminationFeeB,
        });
        form.setFieldsValue({ ExpnAmtBoardingB: data.ExpnAmtBoardingB });
        form.setFieldsValue({
          ExpnAmtInsurancepremiumB: data.ExpnAmtInsurancepremiumB,
        });
        form.setFieldsValue({
          ExpnAmtTravelExpensesB: data.ExpnAmtTravelExpensesB,
        });
        form.setFieldsValue({
          ExpnAmtCautionMoneyB: data.ExpnAmtCautionMoneyB,
        });
        form.setFieldsValue({
          ExpnAmtAdmissionFeesC: data.ExpnAmtAdmissionFeesC,
        });
        form.setFieldsValue({ ExpnAmtinstrumentsC: data.ExpnAmtinstrumentsC });
        form.setFieldsValue({
          ExpnAmtExaminationFeeC: data.ExpnAmtExaminationFeeC,
        });
        form.setFieldsValue({ ExpnAmtBoardingC: data.ExpnAmtBoardingC });
        form.setFieldsValue({
          ExpnAmtInsurancepremiumC: data.ExpnAmtInsurancepremiumC,
        });
        form.setFieldsValue({
          ExpnAmtTravelExpensesC: data.ExpnAmtTravelExpensesC,
        });
        form.setFieldsValue({
          ExpnAmtCautionMoneyC: data.ExpnAmtCautionMoneyC,
        });
        form.setFieldsValue({
          ExpnAmtAdmissionFeesD: data.ExpnAmtAdmissionFeesD,
        });
        form.setFieldsValue({ ExpnAmtinstrumentsD: data.ExpnAmtinstrumentsD });
        form.setFieldsValue({
          ExpnAmtExaminationFeeD: data.ExpnAmtExaminationFeeD,
        });
        form.setFieldsValue({ ExpnAmtBoardingD: data.ExpnAmtBoardingD });
        form.setFieldsValue({
          ExpnAmtInsurancepremiumD: data.ExpnAmtInsurancepremiumD,
        });
        form.setFieldsValue({
          ExpnAmtTravelExpensesD: data.ExpnAmtTravelExpensesD,
        });
        form.setFieldsValue({
          ExpnAmtCautionMoneyD: data.ExpnAmtCautionMoneyD,
        });

        form.setFieldsValue({
          ExpnAmtAdmissionFeesE: data.ExpnAmtAdmissionFeesE,
        });
        form.setFieldsValue({ ExpnAmtinstrumentsE: data.ExpnAmtinstrumentsE });
        form.setFieldsValue({
          ExpnAmtExaminationFeeE: data.ExpnAmtExaminationFeeE,
        });
        form.setFieldsValue({ ExpnAmtBoardingE: data.ExpnAmtBoardingE });
        form.setFieldsValue({
          ExpnAmtInsurancepremiumE: data.ExpnAmtInsurancepremiumE,
        });
        form.setFieldsValue({
          ExpnAmtTravelExpensesE: data.ExpnAmtTravelExpensesE,
        });
        form.setFieldsValue({
          ExpnAmtCautionMoneyE: data.ExpnAmtCautionMoneyE,
        });

        form.setFieldsValue({
          ExpnAmtAdmissionFeesF: data.ExpnAmtAdmissionFeesF,
        });
        form.setFieldsValue({ ExpnAmtinstrumentsF: data.ExpnAmtinstrumentsF });
        form.setFieldsValue({
          ExpnAmtExaminationFeeF: data.ExpnAmtExaminationFeeF,
        });
        form.setFieldsValue({ ExpnAmtBoardingF: data.ExpnAmtBoardingF });
        form.setFieldsValue({
          ExpnAmtInsurancepremiumF: data.ExpnAmtInsurancepremiumF,
        });
        form.setFieldsValue({
          ExpnAmtTravelExpensesF: data.ExpnAmtTravelExpensesF,
        });
        form.setFieldsValue({
          ExpnAmtCautionMoneyF: data.ExpnAmtCautionMoneyF,
        });

        form.setFieldsValue({ AmtPromoters: data.AmtPromoters || 0 });
        form.setFieldsValue({ AmtLoanNSFDC: data.AmtLoanNSFDC || 0 });
        form.setFieldsValue({ AmtLoanStateAgency: data.AmtLoanStateAgency });
        form.setFieldsValue({ AmtSubsidy: data.AmtSubsidy || 0 });
        form.setFieldsValue({ AmtOthers: data.AmtOthers || 0 });
        form.setFieldsValue({ PerPromoters: data.PerPromoters || 0 });
        form.setFieldsValue({ PerLoanNSFDC: data.PerLoanNSFDC || 0 });
        form.setFieldsValue({
          PerLoanStateAgency: data.PerLoanStateAgency || 0,
        });
        form.setFieldsValue({ PerSubsidy: data.PerSubsidy || 0 });
        form.setFieldsValue({ PerOthers: data.PerOthers || 0 });
        form.setFieldsValue({ OtherDetails: data.OtherDetails || 0 });
        form.setFieldsValue({ Expectedincomepm: data.Expectedincomepm || 0 });
        form.setFieldsValue({
          Anticipatedmonthlyexpn: data.Anticipatedmonthlyexpn || 0,
        });
        form.setFieldsValue({
          Amtavailableforrepayment: data.Amtavailableforrepayment || 0,
        });

        form.setFieldsValue({ Rationcardpath: data.Rationcardpath });
        form.setFieldsValue({ Voterspath: data.Voterspath });
        form.setFieldsValue({ Passportpath: data.Passportpath });
        form.setFieldsValue({ Visapath: data.Visapath });
        form.setFieldsValue({ Passbookcqpath: data.Passbookcqpath });
        form.setFieldsValue({ Eduexpnpath: data.Eduexpnpath });
        form.setFieldsValue({ Admissionpath: data.Admissionpath });
        form.setFieldsValue({ Guarantorpath: data.Guarantorpath });
        form.setFieldsValue({
          Recoverycompetentpath: data.Recoverycompetentpath,
        });
      } else {
        const response = await axios({
          method: "get",
          url: `${REACT_APP_BASE_URL}/applicant/ApplicantDetailView`,
          headers: { Authorization: `token ${Token}` },
        });
        setPersonalInfo(response.data.UserPersonalInfo[0]);

        form.setFieldsValue({ FirstName: response.data.name });
        form.setFieldsValue({ Birthdate: moment(response.data.dob) });
        form.setFieldsValue({ Age: handleBeneficiaryAge(response.data.dob) });

        form.setFieldsValue({
          Gender: response.data.UserPersonalInfo[0].gender,
        });

        // form.setFieldsValue({ Division: "Maharashtra" });
        // form.setFieldsValue({ District: response.data.district });
        // form.setFieldsValue({ DistrictB: response.data.district });
        // form.setFieldsValue({ Taluka: response.data.taluka });

        form.setFieldsValue({ PresentAddline1: response.data.address });
        form.setFieldsValue({ ContactNo: response.data.phoneNumber });

        form.setFieldsValue({
          FatherName: response.data.CustomUserOtherInfo[0].fatherName,
        });
        form.setFieldsValue({
          MotherName: response.data.CustomUserOtherInfo[0].motherName,
        });

        form.setFieldsValue({ Caste: response.data.UserPersonalInfo[0].caste });
        form.setFieldsValue({
          SubCaste: response.data.UserPersonalInfo[0].subCaste,
        });

        form.setFieldsValue({
          AnnualFamilyIncome:
            response.data.CustomUserIncomeAndDomicileInfo[0].familyIncome,
        });

        form.setFieldsValue({ Investment: 0 });
        form.setFieldsValue({ AmtPromoters: 0 });
        form.setFieldsValue({ LoanAmount: 0 });
        form.setFieldsValue({ AmtLoanNSFDC: 0 });
        form.setFieldsValue({ AmtSubsidy: 0 });
        form.setFieldsValue({ AmtOthers: 0 });
        form.setFieldsValue({ PerSubsidy: 0 });
        form.setFieldsValue({ PerOthers: 0 });
      }

      // phoneNumber
      // CasteName
      // SubCasteName
    };
    userResponseFunc();
  }, []);

  const handleBeneficiaryAge = (dateofbirth) => {
    var today = new Date();
    var birthDate = new Date(dateofbirth);
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    return age_now;
  };

  const handleBirthdate = (date, dateString) => {
    // const yearNow = new Date().getFullYear();
    // const dob = new Date(dateString);
    // const yearDob = dob.getFullYear();
    // const getage = yearNow - yearDob;

    // form.setFieldsValue({ Age: getage });

    var today = new Date();
    var birthDate = new Date(dateString);
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    // console.log(age_now);

    form.setFieldsValue({ Age: age_now });
  };

  return (
    <>
      <h3>Basic Details</h3>
      <Form
        name="basic"
        layout="vertical"
        // labelCol={{ span: 12 }}
        // wrapperCol={{ span: 12 }}
        initialValues={{ remember: true }}
        onFinish={onSuccess}
        //onSuccess={onSuccess}
        data={data}
        //onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <Row>
          <Col span={7}>
            <Form.Item
              label="First Name:"
              name="FirstName"
              rules={[
                { required: true, message: "Please input your FirstName!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={1}></Col>
          <Col span={7}>
            <Form.Item
              label="Middle Name:"
              name="MiddleName"
              rules={[
                { required: true, message: "Please input your Middle Name!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={1}></Col>
          <Col span={7}>
            <Form.Item
              label="Last Name:"
              name="LastName"
              rules={[
                { required: true, message: "Please input your Last Name!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={7}>
            <Form.Item
              label="Date of Birth"
              name="Birthdate"
              rules={[
                { required: true, message: "Please input your DOB!" },
                () => ({
                  validator(_, value) {
                    if (form.getFieldsValue().Age < 18) {
                      return Promise.reject("Age must be above 18 year's");
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <DatePicker
                disabledDate={disabledDate}
                onChange={handleBirthdate}
              />
            </Form.Item>
          </Col>

          <Col span={1}></Col>
          <Col span={7}>
            <Form.Item
              label="Age"
              name="Age"
              rules={[{ required: true, message: "Please input your Age!" }]}
            >
              <InputNumber disabled />
            </Form.Item>
          </Col>

          <Col span={1}></Col>
          <Col span={7}>
            <Form.Item
              label="Gender:"
              name="Gender"
              rules={[
                { required: true, message: "Please input your Last Name!" },
              ]}
            >
              <Radio.Group>
                <Radio value="M">Male</Radio>
                <Radio value="F">Female</Radio>
                <Radio value="T">Transgender</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={7}>
            <Form.Item
              label="Father's Full Name:"
              name="FatherName"
              rules={[
                { required: true, message: "Please input your Father Name!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={1}></Col>
          <Col span={7}>
            <Form.Item
              label="Mother's Name:"
              name="MotherName"
              rules={[
                { required: true, message: "Please input your Mother Name!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={1}></Col>
          <Col span={7}>
            <Form.Item
              label="Husband Full Name (Female Applicant):"
              name="HusbandFullName"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={7}>
            <Form.Item
              label="Basic Education:"
              name="Education"
              rules={[
                {
                  required: true,
                  message: "Please input your Basic Education!",
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Select Basic Education"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
                required
              >
                {data.LoanSchemeCode == "central-nsfdc-el-a" ||
                data.LoanSchemeCode == "central-nsfdc-el-b" ||
                data.LoanSchemeCode == "central-nskfdc-el-a" ||
                data.LoanSchemeCode == "central-nskfdc-el-b" ? (
                  <></>
                ) : (
                  <Option value="BelowSSC">Below SSC</Option>
                )}

                <Option value="SSC">SSC</Option>
                <Option value="HSC">HSC</Option>
                <Option value="Graduation">Graduation</Option>
                <Option value="PostGraduation">Post Graduation</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={1}></Col>
          <Col span={7}>
            <Form.Item
              label="Ration Card Type:"
              name="RationCardType"
              rules={[
                {
                  required: true,
                  message: "Please select your Ration Card Type!",
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Select Ration Card Type"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
                required
              >
                <Option value="AAY">Antyodaya Anna Yojana (AAY)</Option>
                <Option value="PHH">Priority Household (PHH)</Option>
                <Option value="BPL">Below Poverty Line (BPL)</Option>
                <Option value="APL">Above Poverty Line (APL)</Option>
                <Option value="AY">Annapoorna Yojana (AY)</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={1}></Col>
          <Col span={7}>
            <Form.Item
              label="Ration Card Number:"
              name="RationCardNumber"
              rules={[
                { required: true, message: "Please input ration card number!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={1}></Col>
          <Col span={7}>
            {data.LoanSchemeCode == "central-nsfdc-el-a" ||
            data.LoanSchemeCode == "central-nsfdc-el-b" ||
            data.LoanSchemeCode == "central-nskfdc-el-a" ||
            data.LoanSchemeCode == "central-nskfdc-el-b" ? (
              ""
            ) : (
              <Form.Item
                label="Proposed Business Name:"
                name="ProposedBusinessName"
                rules={[
                  {
                    required: true,
                    message: "Please insert your Proposed Business Name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            )}
          </Col>
        </Row>

        <Button type="primary" htmlType="submit">
          Next
        </Button>
        {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        </Form.Item> */}
      </Form>
    </>
  );
};

export default BasicDetails;
