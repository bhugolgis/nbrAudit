import React, { useEffect } from "react";
import {
  SubHeading,
  Content,
  Title,
  LoadContainer,
  MainContainer,
} from "../applications/style";
import { Button, Spin, Collapse, Row, Col } from "antd";
import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import axios from "axios";
import { Link } from "react-router-dom";
const { Panel } = Collapse;

const ViewProfile = (props) => {
  const [userDetails, setUserDetails] = useState();
  const [loading, setLoading] = useState(true);

  if (loading == true) {
    return (
      <LoadContainer>
        <Spin tip="Loading data..." />
      </LoadContainer>
    );
  } else {
    return (
      <MainContainer>
        <Link to="/beneficiary-applications">
          <BiArrowBack />
        </Link>
        <Collapse defaultActiveKey={["1"]} ghost>
          <Panel header="Personal Information" key="1">
            <Content>
              <Row>
                <Col span={6}>
                  <SubHeading>
                    <Title>Name</Title> :<br />
                    {userDetails.UserPersonalInfo[0].name}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Gender</Title> :
                    {userDetails.UserPersonalInfo[0].gender == "M" ? (
                      <SubHeading>Male</SubHeading>
                    ) : (
                      <SubHeading>Female</SubHeading>
                    )}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>DOB</Title> : <br />
                    {userDetails.UserPersonalInfo[0].dob}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Email</Title> : <br />{" "}
                    {userDetails.UserPersonalInfo[0].emailId}
                  </SubHeading>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <SubHeading>
                    <Title>Marital Status</Title> :
                    {userDetails.UserPersonalInfo[0].maritalStatus == false ? (
                      <SubHeading>Unmarried</SubHeading>
                    ) : (
                      <SubHeading>Married</SubHeading>
                    )}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Languages</Title> :<br />
                    {userDetails.UserPersonalInfo[0].languages}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Age</Title> : <br />
                    {userDetails.UserPersonalInfo[0].age}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Phone Number</Title> :<br />
                    {userDetails.UserPersonalInfo[0].phoneNumber}
                  </SubHeading>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <SubHeading>
                    <Title>Caste</Title> : <br />
                    {userDetails.UserPersonalInfo[0].caste}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Sub Caste</Title> :<br />
                    {userDetails.UserPersonalInfo[0].subCaste}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Have Caste Certificate ?</Title> :
                    {userDetails.UserPersonalInfo[0].haveCasteCertificate ==
                    false ? (
                      <SubHeading>No</SubHeading>
                    ) : (
                      <SubHeading>Yes</SubHeading>
                    )}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Caste Certificate From Aaple Sarkar</Title> :
                    {userDetails.UserPersonalInfo[0]
                      .isCasteCertificateFromAaple == false ? (
                      <SubHeading>No</SubHeading>
                    ) : (
                      <SubHeading>Yes</SubHeading>
                    )}
                  </SubHeading>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <SubHeading>
                    <Title>Caste Certificate Number</Title> : <br />
                    {userDetails.UserPersonalInfo[0].casteCertificateNumber}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Issue Authority</Title> : <br />
                    {userDetails.UserPersonalInfo[0].issueAuthority}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Issue Date</Title> : <br />
                    {userDetails.UserPersonalInfo[0].issueDate}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Parent Mobile</Title> : <br />
                    {userDetails.UserPersonalInfo[0].parentMobile}
                  </SubHeading>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <SubHeading>
                    <Title>Name as SSC</Title> : <br />
                    {userDetails.UserPersonalInfo[0].nameAsSsc}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>District</Title> : <br />
                    {userDetails.UserPersonalInfo[0].district}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Taluka</Title> : <br />
                    {userDetails.taluka}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>State</Title> : <br />
                    {userDetails.state}
                  </SubHeading>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <SubHeading>
                    <Title>Village</Title> : <br />
                    {userDetails.village}
                  </SubHeading>
                </Col>
                <Col span={6}></Col>
                <Col span={6}></Col>
                <Col span={6}></Col>
              </Row>
            </Content>
          </Panel>
          <Panel header="Income and Domicile Information" key="2">
            <Content>
              <Row>
                <Col span={6}>
                  <SubHeading>
                    <Title>Family Income</Title> : <br />
                    {
                      userDetails.CustomUserIncomeAndDomicileInfo[0]
                        .familyIncome
                    }
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Do you have Income Certificate</Title> : <br />
                    {userDetails.CustomUserIncomeAndDomicileInfo[0]
                      .haveIncomeCertificate == true ? (
                      <SubHeading>Yes</SubHeading>
                    ) : (
                      <SubHeading>No</SubHeading>
                    )}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Income Certificate Number</Title> : <br />
                    {
                      userDetails.CustomUserIncomeAndDomicileInfo[0]
                        .incomeCertificateNumber
                    }
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Is Income Certificate From Aaple</Title> : <br />
                    {userDetails.CustomUserIncomeAndDomicileInfo[0]
                      .isIncomeCertificateFromAaple == true ? (
                      <SubHeading>Yes</SubHeading>
                    ) : (
                      <SubHeading>No</SubHeading>
                    )}
                  </SubHeading>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <SubHeading>
                    <Title>Issue Authority</Title> : <br />
                    {
                      userDetails.CustomUserIncomeAndDomicileInfo[0]
                        .issueAuthority
                    }
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Issue Date</Title> : <br />
                    {userDetails.CustomUserIncomeAndDomicileInfo[0].issueDate}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Issue Date Of Domicile</Title> : <br />
                    {
                      userDetails.CustomUserIncomeAndDomicileInfo[0]
                        .issueDateOfDomicile
                    }
                  </SubHeading>
                </Col>
                <Col span={6}></Col>
              </Row>
            </Content>
          </Panel>
          <Panel header="Eligibility Information" key="3">
            <Content>
              <Row>
                <Col span={6}>
                  <SubHeading>
                    <Title>Are you Salaried</Title> : <br />
                    {userDetails.CustomUsereligibilityInfo[0].isSalaried ==
                    true ? (
                      <SubHeading>Yes</SubHeading>
                    ) : (
                      <SubHeading>No</SubHeading>
                    )}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Job Type</Title> : <br />
                    {userDetails.CustomUsereligibilityInfo[0].jobType}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Are you Disabled</Title> : <br />
                    {userDetails.CustomUsereligibilityInfo[0].isDisability ==
                    true ? (
                      <SubHeading>Yes</SubHeading>
                    ) : (
                      <SubHeading>No</SubHeading>
                    )}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Disability</Title> : <br />
                    {userDetails.CustomUsereligibilityInfo[0].disability}
                  </SubHeading>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <SubHeading>
                    <Title>Have Disability Certificate ?</Title> : <br />
                    {userDetails.CustomUsereligibilityInfo[0]
                      .haveDisabilityCertificate == true ? (
                      <SubHeading>Yes</SubHeading>
                    ) : (
                      <SubHeading>No</SubHeading>
                    )}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Have Pid Number ?</Title> : <br />
                    {userDetails.CustomUsereligibilityInfo[0].havePidNo ==
                    true ? (
                      <SubHeading>Yes</SubHeading>
                    ) : (
                      <SubHeading>No</SubHeading>
                    )}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Disability Certificate Number</Title> : <br />
                    {
                      userDetails.CustomUsereligibilityInfo[0]
                        .disabilityCertificateNumber
                    }
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Issue Authority</Title> : <br />
                    {userDetails.CustomUsereligibilityInfo[0].issueAuthority}
                  </SubHeading>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <SubHeading>
                    <Title>Date of Issue</Title> : <br />
                    {userDetails.CustomUsereligibilityInfo[0].issueDate}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Aadhar Linked With Bank/Yuva/ Jandhan</Title> :
                    <br />
                    {userDetails.CustomUsereligibilityInfo[0]
                      .isAadharLinkedWithBankOrYuvaOrJandhan == true ? (
                      <SubHeading>Yes</SubHeading>
                    ) : (
                      <SubHeading>No</SubHeading>
                    )}
                  </SubHeading>
                </Col>
                <Col span={6}>
                  <SubHeading>
                    <Title>Account Have Limit Of Withdrawal Or Deposit</Title> :
                    <br />
                    {userDetails.CustomUsereligibilityInfo[0]
                      .doesAccountHaveLimitOfWithOrDepo == true ? (
                      <SubHeading>Yes</SubHeading>
                    ) : (
                      <SubHeading>No</SubHeading>
                    )}
                  </SubHeading>
                </Col>
                <Col span={6}></Col>
              </Row>
            </Content>
          </Panel>
          <Panel header="Qualification Information" key="4">
            <Row>
              <Col span={6}>
                <SubHeading>
                  <Title>Qualification Level</Title> : <br />
                  {
                    userDetails.CustomUserQualificationInfo[0]
                      .qualificationLevel
                  }
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Stream</Title> : <br />
                  {userDetails.CustomUserQualificationInfo[0].stream}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Is Qualification Completed ?</Title> :
                  <br />
                  {userDetails.CustomUserQualificationInfo[0].completed ==
                  true ? (
                    <SubHeading>Yes</SubHeading>
                  ) : (
                    <SubHeading>No</SubHeading>
                  )}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>College School Name</Title> : <br />
                  {userDetails.CustomUserQualificationInfo[0].collegeSchoolName}
                </SubHeading>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <SubHeading>
                  <Title>Course</Title> : <br />
                  {userDetails.CustomUserQualificationInfo[0].course}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Board University</Title> : <br />
                  {userDetails.CustomUserQualificationInfo[0].boardUniversity}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Mode of Exam</Title> :
                  <br />
                  {userDetails.CustomUserQualificationInfo[0].mode}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Admission Year</Title> :
                  <br />
                  {userDetails.CustomUserQualificationInfo[0].admissionYear}
                </SubHeading>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <SubHeading>
                  <Title>Passing Year</Title> :
                  <br />
                  {userDetails.CustomUserQualificationInfo[0].passingYear}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Result</Title> :
                  <br />
                  {userDetails.CustomUserQualificationInfo[0].result}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Percentage</Title> :
                  <br />
                  {userDetails.CustomUserQualificationInfo[0].percentage}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Attempts</Title> :
                  <br />
                  {userDetails.CustomUserQualificationInfo[0].attempts}
                </SubHeading>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <SubHeading>
                  <Title>Any Gap ?</Title> :
                  <br />
                  {userDetails.CustomUserQualificationInfo[0].wasAnyGap ==
                  true ? (
                    <SubHeading>Yes</SubHeading>
                  ) : (
                    <SubHeading>No</SubHeading>
                  )}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Institute District</Title> :
                  <br />
                  {userDetails.CustomUserQualificationInfo[0].instituteDistrict}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Institute State</Title> :
                  <br />
                  {userDetails.CustomUserQualificationInfo[0].instituteState}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Institute Taluka</Title> :
                  <br />
                  {userDetails.CustomUserQualificationInfo[0].instituteTaluka}
                </SubHeading>
              </Col>
            </Row>
          </Panel>
          <Panel header="Residential Information" key="5">
            <Row>
              <Col span={6}>
                <SubHeading>
                  <Title>Address</Title> :
                  <br />
                  {userDetails.CustomUserResidentialInfo[0].address}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>State</Title> :
                  <br />
                  {userDetails.CustomUserResidentialInfo[0].state}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>District</Title> :
                  <br />
                  {userDetails.CustomUserResidentialInfo[0].district}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Taluka</Title> :
                  <br />
                  {userDetails.CustomUserResidentialInfo[0].taluka}
                </SubHeading>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <SubHeading>
                  <Title>Address Same as Permanent ?</Title> :
                  <br />
                  {userDetails.CustomUserResidentialInfo[0]
                    .isAddressSameAsPermanent == true ? (
                    <SubHeading>Yes</SubHeading>
                  ) : (
                    <SubHeading>No</SubHeading>
                  )}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Correspondence Address</Title> :
                  <br />
                  {
                    userDetails.CustomUserResidentialInfo[0]
                      .correspondenceAddress
                  }
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Correspondence State</Title> :
                  <br />
                  {userDetails.CustomUserResidentialInfo[0].correspondenceState}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Correspondence District</Title> :
                  <br />
                  {
                    userDetails.CustomUserResidentialInfo[0]
                      .correspondenceDistrict
                  }
                </SubHeading>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <SubHeading>
                  <Title>Correspondence District</Title> :
                  <br />
                  {
                    userDetails.CustomUserResidentialInfo[0]
                      .correspondenceDistrict
                  }
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Correspondence Taluka</Title> :
                  <br />
                  {
                    userDetails.CustomUserResidentialInfo[0]
                      .correspondenceTaluka
                  }
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Correspondence Village</Title> :
                  <br />
                  {
                    userDetails.CustomUserResidentialInfo[0]
                      .correspondenceVillage
                  }
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Correspondence PinCode</Title> :
                  <br />
                  {
                    userDetails.CustomUserResidentialInfo[0]
                      .correspondencePinCode
                  }
                </SubHeading>
              </Col>
            </Row>
          </Panel>
          <Panel header="Bank Information" key="6">
            <Row>
              <Col span={6}>
                <SubHeading>
                  <Title>Bank Name</Title> :
                  <br />
                  {userDetails.CustomUserBankInfo[0].bankName}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Bank Account Number</Title> :
                  <br />
                  {userDetails.CustomUserBankInfo[0].bankAccountNo}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Branch Name</Title> :
                  <br />
                  {userDetails.CustomUserBankInfo[0].branchName}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>IFSC Code</Title> :
                  <br />
                  {userDetails.CustomUserBankInfo[0].ifscCode}
                </SubHeading>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <SubHeading>
                  <Title>Is Aadhar linked with Bank / Yuva / Jandhan ?</Title>
                  :
                  <br />
                  {userDetails.CustomUserBankInfo[0].ifscCode}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>
                    Does Account have Limit of withdrawal or Deposit ?
                  </Title>
                  :
                  <br />
                  {userDetails.CustomUserQualificationInfo[0]
                    .doesAccountHaveLimitOfWithOrDepo == true ? (
                    <SubHeading>Yes</SubHeading>
                  ) : (
                    <SubHeading>No</SubHeading>
                  )}
                </SubHeading>
              </Col>
            </Row>
          </Panel>
          <Panel header="Other Information" key="7">
            <Row>
              <Col span={6}>
                <SubHeading>
                  <Title>Is Father Alive ?</Title>
                  :
                  <br />
                  {userDetails.CustomUserOtherInfo[0].isFatherAlive == true ? (
                    <SubHeading>Yes</SubHeading>
                  ) : (
                    <SubHeading>No</SubHeading>
                  )}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Father Name</Title>
                  :
                  <br />
                  {userDetails.CustomUserOtherInfo[0].fatherName}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Is Father Salaried ? </Title>
                  :
                  <br />
                  {userDetails.CustomUserOtherInfo[0].isFatherSalaried ==
                  true ? (
                    <SubHeading>Yes</SubHeading>
                  ) : (
                    <SubHeading>No</SubHeading>
                  )}{" "}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Occupation of Father</Title>
                  :
                  <br />
                  {userDetails.CustomUserOtherInfo[0].fatherOccupation}
                </SubHeading>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <SubHeading>
                  <Title>Is Father Salaried ? </Title>
                  :
                  <br />
                  {userDetails.CustomUserOtherInfo[0].isFatherSalaried ==
                  true ? (
                    <SubHeading>Yes</SubHeading>
                  ) : (
                    <SubHeading>No</SubHeading>
                  )}
                </SubHeading>
              </Col>
              <Col span={6}>
                {" "}
                <SubHeading>
                  <Title>Occupation of Father</Title>
                  :
                  <br />
                  {userDetails.CustomUserOtherInfo[0].fatherOccupation}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Is Mother Alive ? </Title>
                  :
                  <br />
                  {userDetails.CustomUserOtherInfo[0].isMotherAlive == true ? (
                    <SubHeading>Yes</SubHeading>
                  ) : (
                    <SubHeading>No</SubHeading>
                  )}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Name of Mother</Title>
                  :
                  <br />
                  {userDetails.CustomUserOtherInfo[0].motherName}
                </SubHeading>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <SubHeading>
                  <Title>Is Mother Salaried ? </Title>
                  :
                  <br />
                  {userDetails.CustomUserOtherInfo[0].isMotherSalaried ==
                  true ? (
                    <SubHeading>Yes</SubHeading>
                  ) : (
                    <SubHeading>No</SubHeading>
                  )}
                </SubHeading>
              </Col>
              <Col span={6}>
                {" "}
                <SubHeading>
                  <Title>Occupation of Mother</Title>
                  :
                  <br />
                  {userDetails.CustomUserOtherInfo[0].motherOccupation}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>Ready to Relocate in Maharashtra ?</Title>
                  :
                  <br />
                  {userDetails.CustomUserOtherInfo[0]
                    .readyToRelocateInMaharashtra == true ? (
                    <SubHeading>Yes</SubHeading>
                  ) : (
                    <SubHeading>No</SubHeading>
                  )}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>District 1</Title>
                  :
                  <br />
                  {userDetails.CustomUserOtherInfo[0].district1}
                </SubHeading>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <SubHeading>
                  <Title>District 2</Title>
                  :
                  <br />
                  {userDetails.CustomUserOtherInfo[0].district2}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>District 3</Title>
                  :
                  <br />
                  {userDetails.CustomUserOtherInfo[0].district3}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>wheather stay in City ? </Title>
                  :
                  <br />
                  {userDetails.CustomUserOtherInfo[0].isMotherSalaried ==
                  true ? (
                    <SubHeading>Yes</SubHeading>
                  ) : (
                    <SubHeading>No</SubHeading>
                  )}
                </SubHeading>
              </Col>
              <Col span={6}>
                <SubHeading>
                  <Title>wheather stay in Rural ? </Title>
                  :
                  <br />
                  {userDetails.CustomUserOtherInfo[0].wheatherStayInRural ==
                  true ? (
                    <SubHeading>Yes</SubHeading>
                  ) : (
                    <SubHeading>No</SubHeading>
                  )}
                </SubHeading>
              </Col>
            </Row>
          </Panel>
        </Collapse>
      </MainContainer>
    );
  }
};
export default ViewProfile;
