import React, { useState } from "react";
import { DataTable } from "../../../../../dm-side/style";
import useMahapreitDashboard from "../container";
import { FileTextOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { REACT_APP_BASE_URL } from "../../../../../../libs/utils/urls";
import { Col, Row } from "antd";

export default function SpecialSchemes() {
  const { schemesData } = useMahapreitDashboard();

  const [formData, setFormData] = useState();
  const [formVisible, setFormVisible] = useState(false);
  const columns = [
    { title: "Name of Beneficiary", dataIndex: "NameOfBeneficiary" },
    {
      title: "Beneficary Id",
      dataIndex: "schemeBeneficary__uniqueId",
    },
    { title: "DOB", dataIndex: "dob" },
    { title: "District", dataIndex: "District" },
    { title: "Caste Name", dataIndex: "casteName" },
    { title: "Phone Number", dataIndex: "phoneNumber" },
    { title: "EmailId", dataIndex: "emailId" },
    { title: "Aadhar Number", dataIndex: "aadharNumber" },
    { title: "Address", dataIndex: "Address" },
    {
      title: "Applied Date",
      dataIndex: "createdDate",
      render: (text) => {
        return <>{text.slice(0, 10)}</>;
      },
    },
    { title: "ApplicationStatus", dataIndex: "SchemeApplicationStatus" },
    { title: "Annual Family Income", dataIndex: "Annual_Family_Income" },
    {
      title: "View Form",
      dataIndex: ["id", "data"],
      render: (id, data) => {
        return (
          <>
            <FileTextOutlined
              style={{ cursor: "pointer" }}
              onClick={() => {
                setFormData(data);
                setFormVisible(true);
              }}
            />
          </>
        );
      },
    },
  ];

  if (formVisible === true) {
    return (
      <>
        <ArrowLeftOutlined
          style={{ fontSize: "20px", cursor: "pointer" }}
          onClick={() => setFormVisible(false)}
        />
        <div style={{ marginTop: "20px" }}>
          <b> {formData.NameOfBeneficiary}</b>
          <br />
          <br />
          {formData.specialScheme_id == 1 ? (
            <div>
              <Row>
                <Col span={5}>
                  <b>Do you belong to SC ?</b>
                  <p>
                    {formData.IsBeneficiariesbelongstoScheduledCastecommunities ==
                    true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
                <Col span={5}>
                  <b>Region</b>
                  <p>{formData.Region}</p>
                </Col>
                <Col span={9}>
                  <b>Do you possess or hold minimum one Acer land ?</b>
                  <p>
                    {formData.Is_Beneficiaries_shall_possess_hold_minimum_one_Acer_land ==
                    true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
                <Col span={5}>
                  <b>Availability of water sources</b>
                  <p>
                    {formData.Availability_of_water_sources == true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={5}>
                  <b>Document_7_12</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.Document_7_12}
                    target="_blank"
                  >
                    Document_7_12
                  </a>
                </Col>
                <Col span={5}>
                  <b>PanCard</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.panCard}
                    target="_blank"
                  >
                    PanCard
                  </a>
                </Col>
                <Col span={9}>
                  <b>AadharCard</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.aadharCard}
                    target="_blank"
                  >
                    AadharCard
                  </a>
                </Col>
                <Col span={5}>
                  <b>OtherDocument</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.OtherDocument}
                    target="_blank"
                  >
                    OtherDocument
                  </a>
                </Col>
              </Row>
            </div>
          ) : (
            <></>
          )}
          {formData.specialScheme_id == 2 ? (
            <div>
              <Row>
                <Col span={5}>
                  <b>Do you belong to SC ?</b>
                  <p>
                    {formData.IsBeneficiariesbelongstoScheduledCastecommunities ==
                    true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
                <Col span={4}>
                  <b>Region</b>
                  <p>{formData.Region}</p>
                </Col>
                <Col span={8}>
                  <b>Have your own house under PMAY or EWC ?</b>
                  <p>{formData.haveyourownhouseunderPMAYorEWC}</p>
                </Col>
                <Col span={7}>
                  <b>Under which scheme you need home ?</b>
                  <p>{formData.Under_which_scheme_you_need_home}</p>
                </Col>
              </Row>
              <Row>
                <Col span={5}>
                  <b>Annual Family Income</b>
                  <p>{formData.Annual_Family_Income}</p>
                </Col>
                <Col span={4}>
                  <b>PanCard</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.panCard}
                    target="_blank"
                  >
                    PanCard
                  </a>
                </Col>
                <Col span={8}>
                  <b>AadharCard</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.aadharCard}
                    target="_blank"
                  >
                    AadharCard
                  </a>
                </Col>
                <Col span={6}>
                  <b>IncomeCertificate</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.IncomeCertificate}
                    target="_blank"
                  >
                    IncomeCertificate
                  </a>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <b>OtherDocument</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.OtherDocument}
                    target="_blank"
                  >
                    OtherDocument
                  </a>
                </Col>
                <Col span={6}></Col>
                <Col span={6}></Col>
                <Col span={6}></Col>
              </Row>
            </div>
          ) : (
            <></>
          )}
          {formData.specialScheme_id == 3 ? (
            <div>
              <Row>
                <Col span={5}>
                  {" "}
                  <b>Do you belong to SC ?</b>
                  <p>
                    {formData.IsBeneficiariesbelongstoScheduledCastecommunities ==
                    true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
                <Col span={5}>
                  <b>Region</b>
                  <p>{formData.Region}</p>
                </Col>
                <Col span={6}>
                  <b>Name of Company</b>
                  <p>{formData.nameOfCompany}</p>
                </Col>
                <Col span={8}>
                  <b>Owner of Company</b>
                  <p>{formData.OwnerOfCompany}</p>
                </Col>
              </Row>
              <Row>
                <Col span={5}>
                  <b>Excavation</b>
                  <p>{formData.Excavation == true ? "Yes" : "No"}</p>
                </Col>
                <Col span={5}>
                  <b>Levelling</b>
                  <p>{formData.Levelling == true ? "Yes" : "No"}</p>
                </Col>
                <Col span={5}>
                  <b>RCC_PCC_work</b>
                  <p>{formData.RCC_PCC_work == true ? "Yes" : "No"}</p>
                </Col>
                <Col span={9}>
                  <b>
                    Demarcation of plot boundaries Construction of compound wall
                  </b>
                  <p>
                    {formData.Demarcation_of_plot_boundaries_Construction_of_compound_wall ==
                    true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={5}>
                  <b>Brickwork and Plastering</b>
                  <p>
                    {formData.Brickwork_and_Plastering == true ? "Yes" : "No"}
                  </p>
                </Col>
                <Col span={5}>
                  <b>Doorsandwindowsfitting</b>
                  <p>
                    {formData.Doorsandwindowsfitting == true ? "Yes" : "No"}
                  </p>
                </Col>
                <Col span={5}>
                  <b>Solarpanelfitting</b>
                  <p>{formData.Solarpanelfitting == true ? "Yes" : "No"}</p>
                </Col>
                <Col span={9}>
                  <b>
                    work Reinforcement Cutting Bending of steel and fabrication
                  </b>
                  <p>
                    {formData.work_Reinforcement_Cutting_Bending_of_steel_and_fabrication ==
                    true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={5}>
                  <b>Tree plantation Landscaping</b>
                  <p>
                    {formData.Tree_plantation_Landscaping == true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
                <Col span={5}>
                  <b>Drainage Line and Services Laying</b>
                  <p>
                    {formData.Drainage_Line_and_Services_Laying == true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
                <Col span={5}>
                  <b>PQC</b>
                  <p>{formData.PQC == true ? "Yes" : "No"}</p>
                </Col>
                <Col span={9}>
                  <b>
                    Finishing Electrical work Plumbing work Tiling work Painting
                  </b>
                  <p>
                    {formData.Finishing_Electrical_work_Plumbing_work_Tiling_work_Painting ==
                    true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={5}>
                  <b>Storm water works</b>
                  <p>{formData.Storm_water_works == true ? "Yes" : "No"}</p>
                </Col>
                <Col span={5}>
                  <b>Waterproofing work</b>
                  <p>{formData.Waterproofing_work == true ? "Yes" : "No"}</p>
                </Col>
                <Col span={5}>
                  <b>Transit Mixer Driver and Helper</b>
                  <p>
                    {formData.Transit_Mixer_Driver_and_Helper == true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
                <Col span={9}>
                  <b>Labour work for ancillary activities</b>
                  <p>
                    {formData.Labour_work_for_ancillary_activities == true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={5}>
                  <b>PanCard</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.panCard}
                    target="_blank"
                  >
                    PanCard
                  </a>
                </Col>
                <Col span={5}>
                  <b>AadharCard</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.aadharCard}
                    target="_blank"
                  >
                    AadharCard
                  </a>
                </Col>
                <Col span={5}>
                  <b>IncomeCertificate</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.IncomeCertificate}
                    target="_blank"
                  >
                    IncomeCertificate
                  </a>
                </Col>
                <Col span={8}>
                  <b>Company Incorporation Certificate</b>
                  <br />
                  <a
                    href={
                      REACT_APP_BASE_URL +
                      formData.CompanyIncorporationCertificate
                    }
                  >
                    CompanyIncorporationCertificate
                  </a>
                </Col>
              </Row>
              <br />
              <Row>
                <Col span={5}>
                  <b>OtherDocument</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.OtherDocument}
                    target="_blank"
                  >
                    OtherDocument
                  </a>
                </Col>
              </Row>
            </div>
          ) : (
            <></>
          )}
          {formData.specialScheme_id == 4 ? (
            <div>
              <Row>
                <Col span={5}>
                  <b>Excavation</b>
                  <p>{formData.Excavation == true ? "Yes" : "No"}</p>
                </Col>
                <Col span={5}>
                  <b>Levelling</b>
                  <p>{formData.Levelling == true ? "Yes" : "No"}</p>
                </Col>
                <Col span={5}>
                  <b>RCC_PCC_work</b>
                  <p>{formData.RCC_PCC_work == true ? "Yes" : "No"}</p>
                </Col>
                <Col span={8}>
                  <b>Brickwork and Plastering</b>
                  <p>
                    {formData.Brickwork_and_Plastering == true ? "Yes" : "No"}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={5}>
                  <b>Solarpanelfitting</b>
                  <p>{formData.Solarpanelfitting == true ? "Yes" : "No"}</p>
                </Col>
                <Col span={5}>
                  {" "}
                  <b>Tree plantation Landscaping</b>
                  <p>
                    {formData.Tree_plantation_Landscaping == true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
                <Col span={5}>
                  {" "}
                  <b>Labour work for ancillary activities</b>
                  <p>
                    {formData.Labour_work_for_ancillary_activities == true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
                <Col span={8}>
                  {" "}
                  <b>
                    Finishing Electrical work Plumbing work Tiling work Painting
                  </b>
                  <p>
                    {formData.Finishing_Electrical_work_Plumbing_work_Tiling_work_Painting ==
                    true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={5}>
                  <b>AadharCard</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.aadharCard}
                    target="_blank"
                  >
                    AadharCard
                  </a>
                </Col>
                <Col span={5}>
                  <b>Education Certificate</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.EducationCertificate}
                    target="_blank"
                  >
                    AadharCard
                  </a>
                </Col>
                <Col span={5}>
                  <b>PanCard</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.panCard}
                    target="_blank"
                  >
                    PanCard
                  </a>
                </Col>
                <Col span={8}>
                  <b>Experience Certificate</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.ExpCertificate}
                    target="_blank"
                  >
                    Experience Certificate
                  </a>
                </Col>
              </Row>
            </div>
          ) : (
            <></>
          )}
          {formData.specialScheme_id == 5 ? (
            <div>
              <Row>
                <Col span={6}>
                  <b>Pan Card Number</b>
                  <p>{formData.panNumber}</p>
                </Col>
                <Col span={6}>
                  <b>Area of Operation District</b>
                  <p>{formData.areaOfOperationDistrict}</p>
                </Col>
                <Col span={6}>
                  <b>Area of Operation Taluka</b>
                  <p>{formData.areaOfOperationTaluka}</p>
                </Col>
                <Col span={6}>
                  <b>Availed MPBCDC Loan Before ?</b>
                  <p>
                    {formData.DoyouavailMPBCDCLoanBefore == true ? "Yes" : "No"}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <b>Loan Account number</b>
                  <p>
                    {formData.LoanAccountnumber == null
                      ? "NA"
                      : formData.LoanAccountnumber}
                  </p>
                </Col>
                <Col span={6}>
                  <b>Loan Scheme Name</b>
                  <p>{formData.loanSchemeName}</p>
                </Col>
                <Col span={6}>
                  <b>Loan Present Status</b>
                  <p>{formData.loanPresentStatus}</p>
                </Col>
                <Col span={6}>
                  <b>Want Loan other than MPBCDC ?</b>
                  <p>
                    {formData.willingToHaveLoanOtherThanMpbdc == true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <b>Have Driving License</b>
                  <p>{formData.haveDrivingLicense == true ? "Yes" : "No"}</p>
                </Col>
                <Col span={6}>
                  <b>Driving License Number</b>
                  <p>{formData.drivingLicenseNumber}</p>
                </Col>
                <Col span={6}>
                  <b>Photo</b>
                  <br />
                  <a href={REACT_APP_BASE_URL + formData.photo} target="_blank">
                    Photo
                  </a>
                </Col>
                <Col span={6}>
                  <b>Signature</b>
                  <br />
                  <a href={REACT_APP_BASE_URL + formData.sign} target="_blank">
                    Signature
                  </a>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <b>AadharCard</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.aadharCard}
                    target="_blank"
                  >
                    AadharCard
                  </a>
                </Col>
                <Col span={6}>
                  <b>PanCard</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.panCard}
                    target="_blank"
                  >
                    PanCard
                  </a>
                </Col>
                <Col span={6}>
                  <b>Driving License</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.drivingLicense}
                    target="_blank"
                  >
                    Driving License
                  </a>
                </Col>
                <Col span={6}>
                  <b>IncomeCertificate</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.IncomeCertificate}
                    target="_blank"
                  >
                    IncomeCertificate
                  </a>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <b>MpbdcLoanDoc</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.mpbdcLoanDoc}
                    target="_blank"
                  >
                    MpbdcLoanDoc
                  </a>
                </Col>
                <Col span={6}>
                  <b>RationCard</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.rationCard}
                    target="_blank"
                  >
                    RationCard
                  </a>
                </Col>
              </Row>
            </div>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  } else {
    return (
      <>
        <h3>Special Schemes Application</h3>
        <DataTable columns={columns} dataSource={schemesData} />
      </>
    );
  }
}
