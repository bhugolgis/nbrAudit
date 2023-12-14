import React, { useState, useCallback, useRef } from "react";
import {
  Steps,
  Button,
  message,
  Progress,
  Form,
  Input,
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
import styled from "styled-components";
import { DataTable, LoadContainer } from "./style";
import { PlusOutlined } from "@ant-design/icons";
import {
  RequiredDocIMGA,
  RequiredDocIMGB,
  RequiredDocIMGC,
  RequiredDocIMGD,
  RequiredDocIMGE,
  PhotographIMG,
  SignatureIMG,
} from "../../../media";
import { useEffect } from "react";
import axios from "axios";
import Imagecrop from "./imagecrop";
import stateData from "../../../data/states.json";
import dtdata from "../../../data/dtdata.json";
import moment from "moment";
import { Token } from "../../utils/sessionStorage";

const NsfkdcForm = () => {
  const { Step } = Steps;
  const { Option } = Select;
  const [form] = Form.useForm();
  const disabledDate = (current) => {
    return current && current > moment().endOf("day");
  };

  const [current, setCurrent] = useState(0);
  const [progressValue, setProgressValue] = useState(10);
  const [pageLoading, setPageLoading] = useState(false);

  const formData = useRef();

  // const [FirstName, setFirstName] = useState("");
  const [FirstName, setFirstName] = useState("");
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const [MiddleName, setMiddleName] = useState("");
  const handleMiddleName = (e) => {
    setMiddleName(e.target.value);
  };

  const [LastName, setLastName] = useState("");
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const [Age, setAge] = useState();
  const handleAge = (e) => {
    setAge(e.target.value);
  };

  const [Birthdate, setBirthdate] = useState("");
  const handleBirthdate = (date, dateString) => {
    const yearNow = new Date().getFullYear();
    const dob = new Date(dateString);
    const yearDob = dob.getFullYear();
    const getage = yearNow - yearDob;
    setBirthdate(date);
    setAge(getage);
  };
  const [Gender, setGender] = useState("");
  const handleGender = (e) => {
    setGender(e.target.value);
  };

  const [FatherName, setFatherName] = useState("");
  const handleFatherName = (e) => {
    setFatherName(e.target.value);
  };
  const [MotherName, setMotherName] = useState("");
  const handleMotherName = (e) => {
    setMotherName(e.target.value);
  };
  const [HusbandFullName, setHusbandFullName] = useState("");
  const handleHusbandFullName = (e) => {
    setHusbandFullName(e.target.value);
  };

  const [Education, setEducation] = useState("");
  const handleEducation = (e) => {
    setEducation(e.target.value);
  };

  const [RationCardType, setRationCardType] = useState("");
  const handleRationCardType = (e) => {
    setRationCardType(e.target.value);
  };
  const [ProposedBusinessName, setProposedBusinessName] = useState("");
  const handleProposedBusinessName = (e) => {
    setProposedBusinessName(e.target.value);
  };

  const [UrbanRural, setUrbanRural] = useState("Urban");
  const handleUrbanRural = (e) => {
    setUrbanRural(e.target.value);
  };
  const [Division, setDivision] = useState("");
  const handleDivision = (e) => {
    setDivision(e.target.value);
  };
  const [District, setDistrict] = useState("");
  const handleDistrict = (e) => {
    setDistrict(e.target.value);
  };
  const [Taluka, setTaluka] = useState("");
  const handleTaluka = (e) => {
    setTaluka(e.target.value);
  };

  const [PresentAddline1, setPresentAddline1] = useState("");
  const handlePresentAddline1 = (e) => {
    setPresentAddline1(e.target.value);
  };
  const [PresentAddline2, setPresentAddline2] = useState("");
  const handlePresentAddline2 = (e) => {
    setPresentAddline2(e.target.value);
  };
  const [PresentAddline3, setPresentAddline3] = useState("");
  const handlePresentAddline3 = (e) => {
    setPresentAddline3(e.target.value);
  };
  const [PresentPincode, setPresentPincode] = useState("");
  const handlePresentPincode = (e) => {
    setPresentPincode(e.target.value);
  };

  const [PermanentAddline1, setPermanentAddline1] = useState("");
  const handlePermanentAddline1 = (e) => {
    setPermanentAddline1(e.target.value);
  };
  const [PermanentAddline2, setPermanentAddline2] = useState("");
  const handlePermanentAddline2 = (e) => {
    setPermanentAddline2(e.target.value);
  };
  const [PermanentAddline3, setPermanentAddline3] = useState("");
  const handlePermanentAddline3 = (e) => {
    setPermanentAddline3(e.target.value);
  };
  const [PermanentPincode, setPermanentPincode] = useState("");
  const handlePermanentPincode = (e) => {
    setPermanentPincode(e.target.value);
  };

  const [isAddressSameAsPermanent, setisAddressSameAsPermanent] =
    useState(false);
  const handleisAddressSameAsPermanent = (e) => {
    setisAddressSameAsPermanent(e.target.checked);
    if (isAddressSameAsPermanent == true) {
      setPermanentAddline1(PresentAddline1);
      setPermanentAddline2(PresentAddline2);
      setPermanentAddline3(PresentAddline3);
      setPermanentPincode(PresentPincode);
    }
  };

  const [FamilyPersonName, setFamilyPersonName] = useState("");
  const handleFamilyPersonName = (e) => {
    setFamilyPersonName(e.target.value);
  };
  const [FamilyAge, setFamilyAge] = useState("");
  const handleFamilyAge = (e) => {
    setFamilyAge(e.target.value);
  };
  const [FamilyRelations, setFamilyRelations] = useState("");
  const handleFamilyRelations = (e) => {
    setFamilyRelations(e.target.value);
  };
  const [FamilyOccupation, setFamilyOccupation] = useState("Business");
  const handleFamilyOccupation = (e) => {
    setFamilyOccupation(e.target.value);
  };

  const [BusinessName, setBusinessName] = useState("");
  const handleBusinessName = (e) => {
    setBusinessName(e.target.value);
  };
  const [Investment, setInvestment] = useState("");
  const handleInvestment = (e) => {
    setInvestment(e.target.value);
  };
  const [BusinessInfo, setBusinessInfo] = useState("");
  const handleBusinessInfo = (e) => {
    setBusinessInfo(e.target.value);
  };
  const [BusinessAdd, setBusinessAdd] = useState("");
  const handleBusinessAdd = (e) => {
    setBusinessAdd(e.target.value);
  };
  const [OwnRented, setOwnRented] = useState("Owned");
  const handleOwnRented = (e) => {
    setOwnRented(e.target.value);
  };

  const [Photopath, setPhotopath] = useState("");
  const handlePhotopath = (e) => {
    setPhotopath(e.target.value);
  };
  const [Signaturepath, setSignaturepath] = useState("");
  const handleSignaturepath = (e) => {
    setSignaturepath(e.target.value);
  };
  const [Uaadharpath, setUaadharpath] = useState("");
  const handleUaadharpath = (e) => {
    setUaadharpath(e.target.value);
  };
  const [AddressProofpath, setAddressProofpath] = useState("");
  const handleAddressProofpath = (e) => {
    setAddressProofpath(e.target.value);
  };
  const [AadharFrontpath, setAadharFrontpath] = useState("");
  const handleAadharFrontpath = (e) => {
    setAadharFrontpath(e.target.value);
  };
  const [AadharBackpath, setAadharBackpath] = useState("");
  const handleAadharBackpath = (e) => {
    setAadharBackpath(e.target.value);
  };
  const [SKDpath, setSKDpath] = useState("");
  const handleSKDpath = (e) => {
    setSKDpath(e.target.value);
  };
  const [Pancardpath, setPancardpath] = useState("");
  const handlePancardpath = (e) => {
    setPancardpath(e.target.value);
  };

  const [AckApproval, setAckApproval] = useState(false);
  const handleAckApproval = (e) => {
    setAckApproval(e.target.checked);
  };

  const [CasteCertificatepath, setCasteCertificatepath] = useState("");
  const [IncomeCertificatepath, setIncomeCertificatepath] = useState("");
  const [ProjectReportpath, setProjectReportpath] = useState("");
  const [Applicationid, setApplicationid] = useState("");
  const [RationCardNumber, setRationCardNumber] = useState("");
  const [Incomeupto, setIncomeupto] = useState("");
  const [Caste, setCaste] = useState("");
  const [SubCaste, setSubCaste] = useState("");
  const [AnotherLoan, setAnotherLoan] = useState("");
  const [NoDueCertificate, setNoDueCertificate] = useState("");
  const [UIDno, setUIDno] = useState("");
  const [Emailid, setEmailid] = useState("");
  const [Phone, setPhone] = useState("");
  const [TrainedNSKFDC, setTrainedNSKFDC] = useState("");
  const [BeneficiaryCategory, setBeneficiaryCategory] = useState("");
  const [RelationSafaiKaramchari, setRelationSafaiKaramchari] = useState("");
  const [PreviousLoan, setPreviousLoan] = useState("");
  const [PriorExperience, setPriorExperience] = useState("");
  const [DrivingLicense, setDrivingLicense] = useState("");
  const [LoanRequiredFor, setLoanRequiredFor] = useState("");
  const [LowIncome, setLowIncome] = useState("");

  const [LoanType, setLoanType] = useState("");
  const [LoanScheme, setLoanScheme] = useState("");
  const [SubSchemeName, setSubSchemeName] = useState("");
  const [LoanAmount, setLoanAmount] = useState("");
  const [RepaymentPeriod, setRepaymentPeriod] = useState("");
  const [MoratoriumPeriod, setMoratoriumPeriod] = useState("");

  const [talukaKey, setTalukaKey] = useState(0);
  const [selecttalukaVisible, setselecttalukaVisible] = useState(true);
  const [userDetails, setUserDetails] = useState();
  useEffect(() => {
    const userResponseFunc = async () => {
      const response = await axios({
        method: "get",
        url: "${REACT_APP_BASE_URL}/applicant/ApplicantDetailView",
        headers: { Authorization: `token ${Token}` },
      });
      // setPersonalInfo(response.data.UserPersonalInfo[0]);
      // setResidentialDetails(response.data.CustomUserResidentialInfo[0]);
      setUserDetails(response.data);
      setBirthdate(moment(response.data.UserPersonalInfo[0].dob));
      setDistrict(response.data.UserPersonalInfo[0].district);
      setSubCaste(response.data.UserPersonalInfo[0].subCaste);

      setFirstName(response.data.UserPersonalInfo[0].username);
      setEmailid(response.data.UserPersonalInfo[0].emailId);
      setPhone(response.data.UserPersonalInfo[0].phoneNumber);
      setAge(response.data.UserPersonalInfo[0].age);
      setGender(response.data.UserPersonalInfo[0].gender);
      setCaste(response.data.UserPersonalInfo[0].caste);

      setPageLoading(false);
    };
    userResponseFunc();
  }, []);

  const style = { border: "2px solid #eceff1", padding: "8px 0 0 8px" };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (qualificationLevel == "") {
    //   message.warning("Qualification Level is empty");
    // } else
    if (FirstName == "") {
      message.warning("FirstName is Empty");
    } else if (MiddleName == "") {
      message.warning("Select MiddleName");
    } else if (LastName == "") {
      message.warning("LastName");
    } else if (Birthdate == "") {
      message.warning("Birthdate is empty");
    } else if (Age == "") {
      message.warning("Please Enter Age");
    } else if (Gender == "") {
      message.warning("Please Gender");
    } else if (FatherName == "") {
      message.warning("please FatherName");
    } else if (MotherName == "") {
      message.warning("Please MotherName");
    } else if (HusbandFullName == "") {
      message.warning("Please HusbandFullName");
    } else if (Education == "") {
      message.warning("Please Education");
    } else if (RationCardType == "") {
      message.warning("Please RationCardType");
    } else if (ProposedBusinessName == "") {
      message.warning("Please ProposedBusinessName");
    } else if (UrbanRural == "") {
      message.warning("Please UrbanRural");
    } else if (District == "") {
      message.warning("Please select the district");
    } else if (Taluka == "") {
      message.waring("Please select the taluka");
    } else {
      axios
        .post(
          "http://127.0.0.1:8000/loan/InsertLoanFormAPI",
          {
            FirstName: FirstName,
            MiddleName: MiddleName,
            LastName: LastName,
            Birthdate: Birthdate,
            Age: Age,
            FatherName: FatherName,
            MotherName: MotherName,
            HusbandFullName: HusbandFullName,
            Education: Education,
            RationCardType: RationCardType,
            ProposedBusinessName: ProposedBusinessName,
            UrbanRural: UrbanRural,
            Division: Division,
            District: District,
            Taluka: Taluka,
            PresentAddline1: PresentAddline1,
            PresentAddline2: PresentAddline2,
            PresentAddline3: PresentAddline3,
            PresentPincode: PresentPincode,
            PermanentAddline1: PermanentAddline1,
            PermanentAddline2: PermanentAddline2,
            PermanentAddline3: PermanentAddline3,
            PermanentPincode: PermanentPincode,
            BusinessName: BusinessName,
            Investment: Investment,
            BusinessInfo: BusinessInfo,
            BusinessAdd: BusinessAdd,
            OwnRented: OwnRented,
            Photopath: Photopath,
            Signaturepath: Signaturepath,
            Uaadharpath: Uaadharpath,
            AddressProofpath: AddressProofpath,
            AadharFrontpath: AadharFrontpath,
            AadharBackpath: AadharBackpath,
            SKDpath: SKDpath,
            Pancardpath: Pancardpath,
            AckApproval: AckApproval,
            isActive: "True",
            isDeleted: "False",
            LastStatus: "SC",
          },
          {
            headers: {
              "Content-Type": "application/json",
              //Authorization: `token ${sessionStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          //setInfoLoading(true);
          setTimeout(() => {
            //setInfoLoading(false);
            message.success("Data Updated");
          }, 1000);
          setTimeout(() => {
            //window.location.replace("/");
            message.success("Data Inserted");
          }, 1500);
        })
        .catch((error) => {
          message.error(error.message);
        });
    }
  };

  const columns = [
    {
      title: "Person Name",
      dataIndex: "PersonName",
      width: "25%",
    },
    {
      title: "Age",
      dataIndex: "Age",
    },
    {
      title: "Relations",
      dataIndex: "Relations",
    },
    {
      title: "Occupation",
      dataIndex: "Occupation",
    },
  ];

  const data = [
    {
      PersonName: "Pratik Patel",
      Age: "34",
      Relations: "Self",
      Occupation: "Business",
    },
  ];

  const steps = [
    {
      title: "Basic Details",
      content: (
        <>
          <h2>Scheme: NSKFDC Term Loan</h2>
          <Form layout="vertical" onFinish={() => next()} form={form}>
            <Row>
              <Col span={7}>
                <Form.Item
                  label="First Name:"
                  name="FirstName"
                  rules={[
                    { required: true, message: "Please input your FirstName!" },
                  ]}
                >
                  <Input
                    placeholder="Enter First Name"
                    // name="FirstName"
                    // value={FirstName}
                    onChange={handleFirstName}
                    required
                    //value={userDetails.UserPersonalInfo[0].name}
                  />
                </Form.Item>
              </Col>

              <Col span={1}></Col>
              <Col span={7}>
                <Form.Item
                  label="Middle Name:"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Middle Name!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter Middle Name"
                    name="MiddleName"
                    value={MiddleName}
                    onChange={handleMiddleName}
                    required
                  />
                </Form.Item>
              </Col>

              <Col span={1}></Col>
              <Col span={7}>
                <Form.Item
                  label="Last Name:"
                  rules={[
                    { required: true, message: "Please input your Last Name!" },
                  ]}
                >
                  <Input
                    placeholder="Enter Last Name"
                    name="LastName"
                    value={LastName}
                    required
                    onChange={handleLastName}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={7}>
                <Form.Item
                  label="Date of Birth"
                  rules={[
                    { required: true, message: "Please input your DOB!" },
                  ]}
                >
                  <DatePicker
                    name="Birthdate"
                    type="date"
                    disabledDate={disabledDate}
                    value={Birthdate}
                    onChange={handleBirthdate}
                    required
                  />
                </Form.Item>
              </Col>

              <Col span={1}></Col>
              <Col span={7}>
                <Form.Item
                  label="Age"
                  rules={[
                    { required: true, message: "Please input your Age!" },
                  ]}
                >
                  <Input
                    placeholder="Enter Age"
                    name="Age"
                    value={Age}
                    onChange={handleAge}
                    required
                    disabled
                  />
                </Form.Item>
              </Col>

              <Col span={1}></Col>
              <Col span={7}>
                <Form.Item
                  label="Gender:"
                  rules={[
                    { required: true, message: "Please input your Last Name!" },
                  ]}
                >
                  <Radio.Group
                    name="Gender"
                    required
                    value={Gender}
                    onChange={handleGender}
                  >
                    <Radio value="M">Male</Radio>
                    <Radio value="F">Female</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={7}>
                <Form.Item
                  label="Father's Full Name:"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Father Name!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter Father's Full Name"
                    required
                    name="FatherName"
                    value={FatherName}
                    onChange={handleFatherName}
                  />
                </Form.Item>
              </Col>

              <Col span={1}></Col>
              <Col span={7}>
                <Form.Item
                  label="Mother's Name:"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Mother Name!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter Mother's Name"
                    required
                    name="MotherName"
                    value={MotherName}
                    onChange={handleMotherName}
                  />
                </Form.Item>
              </Col>

              <Col span={1}></Col>
              <Col span={7}>
                <Form.Item label="Husband Full Name (Female Applicant):">
                  <Input
                    placeholder="Enter Husband Full Name"
                    name="HusbandFullName"
                    value={HusbandFullName}
                    onChange={handleHusbandFullName}
                  />
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
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    //name="Education"
                    //value={Education}
                    //onChange={handleEducation}
                    //required
                  >
                    <Option value="SSC">SSC</Option>
                    <Option value="HSC">HSC</Option>
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
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    //name="RationCardType"
                    value={RationCardType}
                    required
                  >
                    <Option value="AAY" onChange={handleRationCardType}>
                      Antyodaya Anna Yojana (AAY)
                    </Option>
                    <Option value="PHH" onChange={handleRationCardType}>
                      Priority Household (PHH)
                    </Option>
                    <Option value="BPL" onChange={handleRationCardType}>
                      Below Poverty Line (BPL)
                    </Option>
                    <Option value="APL" onChange={handleRationCardType}>
                      Above Poverty Line (APL)
                    </Option>
                    <Option value="AY" onChange={handleRationCardType}>
                      Annapoorna Yojana (AY)
                    </Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={1}></Col>
              <Col span={7}>
                <Form.Item
                  label="Proposed Business Name:"
                  rules={[
                    {
                      required: true,
                      message: "Please insert your Proposed Business Name!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter Proposed Business Name"
                    required
                    name="ProposedBusinessName"
                    value={ProposedBusinessName}
                    onChange={handleProposedBusinessName}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Button type="primary" htmlType="submit">
              Next
            </Button>
          </Form>
        </>
      ),
    },
    {
      title: "Address Details",
      content: (
        <>
          <Form layout="vertical" onFinish={() => next()} form={form}>
            <Row>
              <Col span={6}>
                <Form.Item
                  label="Urban/Rural:"
                  rules={[{ required: true, message: "Please select" }]}
                >
                  <Radio.Group
                    onChange={handleUrbanRural}
                    value={UrbanRural}
                    name="UrbanRural"
                    required
                  >
                    <Radio value={"Urban"}>Urban</Radio>
                    <Radio value={"Rural"}>Rural</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>

              <Col span={5}>
                <Form.Item
                  label="Division:"
                  name="Division"
                  rules={[
                    { required: true, message: "Please select Division" },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Select Division"
                    onChange={(v, k) => {
                      setDivision(v);
                    }}
                    // value={Division}
                    style={{ width: "250px" }}
                    // name="Division"
                    // required
                    defaultValue={Division}
                  >
                    {stateData.map((Division, index) => {
                      return (
                        <Option
                          key={index}
                          value={Division.name}
                          onChange={handleDivision}
                        >
                          {Division.name}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={1}></Col>
              <Col span={5}>
                <Form.Item
                  label="District"
                  rules={[
                    {
                      required: true,
                      message: "Please select your District!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    style={{
                      width: 250,
                    }}
                    placeholder="Select district"
                    optionFilterProp="children"
                    onChange={(v, k) => {
                      setDistrict(v);
                      setTalukaKey(k.key);
                      setselecttalukaVisible(false);
                    }}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    value={District}
                    name="District"
                    required
                    defaultValue={District}
                  >
                    {dtdata.map((dis, index) => {
                      return (
                        <Option
                          key={index}
                          value={dis.district_name}
                          name="District"
                          onChange={handleDistrict}
                        >
                          {dis.district_name}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={1}></Col>
              <Col span={5}>
                <Form.Item
                  label="Taluka"
                  rules={[
                    {
                      required: true,
                      message: "Please select your Taluka!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    style={{
                      width: 250,
                    }}
                    placeholder="Select taluka"
                    optionFilterProp="children"
                    onChange={(v) => {
                      setTaluka(v);
                    }}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    disabled={selecttalukaVisible}
                    name="Taluka"
                    required
                    defaultValue={Taluka}
                  >
                    {dtdata[talukaKey].talukas.map((tal) => {
                      return (
                        <Option value={tal.taluka_name}>
                          {tal.taluka_name}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <h3>Present Address:</h3>
              </Col>
            </Row>

            <Row>
              <Col span={5}>
                <Form.Item
                  label="HouseNo/FlatNo:"
                  rules={[
                    {
                      required: true,
                      message: "Please insert your HouseNo/FlatNo",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter HouseNo/FlatNo"
                    required
                    name="PresentAddline1"
                    value={PresentAddline1}
                    onChange={handlePresentAddline1}
                  />
                </Form.Item>
              </Col>

              <Col span={1}></Col>
              <Col span={5}>
                <Form.Item
                  label="Building Name:"
                  rules={[
                    {
                      required: true,
                      message: "Please insert your Building Name",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter Building Name"
                    required
                    name="PresentAddline2"
                    value={PresentAddline2}
                    onChange={handlePresentAddline2}
                  />
                </Form.Item>
              </Col>

              <Col span={1}></Col>
              <Col span={5}>
                <Form.Item
                  label="Area/Landmark:"
                  rules={[
                    { required: true, message: "Please insert your area Name" },
                  ]}
                >
                  <Input
                    placeholder="Enter Area/Landmark"
                    required
                    name="PresentAddline3"
                    value={PresentAddline3}
                    onChange={handlePresentAddline3}
                  />
                </Form.Item>
              </Col>

              <Col span={1}></Col>
              <Col span={5}>
                <Form.Item
                  label="PinCode:"
                  rules={[
                    { required: true, message: "Please insert your Pincode" },
                  ]}
                >
                  <Input
                    placeholder="Enter PinCode"
                    type="Number"
                    required
                    name="PresentPincode"
                    value={PresentPincode}
                    onChange={handlePresentPincode}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <h3>Permanent Address:</h3>
              </Col>
              <Checkbox
                checked={isAddressSameAsPermanent}
                onChange={handleisAddressSameAsPermanent}
                name="isAddressSameAsPermanent"
              >
                Same as Present Address:
              </Checkbox>
            </Row>
            <Row>
              <Col span={5}>
                <Form.Item
                  label="HouseNo/FlatNo:"
                  rules={[
                    {
                      required: true,
                      message: "Please insert your HouseNo/FlatNo",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter HouseNo/FlatNo"
                    required
                    name="PermanentAddline1"
                    value={PermanentAddline1}
                    onChange={handlePermanentAddline1}
                  />
                </Form.Item>
              </Col>

              <Col span={1}></Col>
              <Col span={5}>
                <Form.Item
                  label="Building Name:"
                  rules={[
                    {
                      required: true,
                      message: "Please insert your Building Name",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter Building Name"
                    required
                    name="PermanentAddline2"
                    value={PermanentAddline2}
                    onChange={handlePermanentAddline2}
                  />
                </Form.Item>
              </Col>

              <Col span={1}></Col>
              <Col span={5}>
                <Form.Item
                  label="Area/Landmark:"
                  rules={[
                    { required: true, message: "Please insert your area Name" },
                  ]}
                >
                  <Input
                    placeholder="Enter Area/Landmark"
                    required
                    name="PermanentAddline3"
                    value={PermanentAddline3}
                    onChange={handlePermanentAddline3}
                  />
                </Form.Item>
              </Col>

              <Col span={1}></Col>
              <Col span={5}>
                <Form.Item
                  label="PinCode:"
                  rules={[
                    { required: true, message: "Please insert your Pincode" },
                  ]}
                >
                  <Input
                    placeholder="Enter PinCode"
                    type="Number"
                    required
                    name="PermanentPincode"
                    value={PermanentPincode}
                    onChange={handlePermanentPincode}
                  />
                </Form.Item>
              </Col>
            </Row>

            <div className="steps-action">
              <Button
                style={{
                  margin: "0 8px",
                }}
                onClick={() => prev()}
              >
                Previous
              </Button>

              <Button type="primary" htmlType="submit">
                Next
              </Button>
            </div>
          </Form>
        </>
      ),
    },
    {
      title: "Family Details",
      content: (
        <Form layout="vertical" onFinish={() => next()}>
          <Row>
            <Col span={5}>
              <Form.Item
                label="Person Name:"
                rules={[
                  { required: true, message: "Please insert Person Name" },
                ]}
              >
                <Input
                  placeholder="Enter Person Name"
                  required
                  name="FamilyPersonName"
                  value={FamilyPersonName}
                  onChange={handleFamilyPersonName}
                />
              </Form.Item>
            </Col>

            <Col span={1}></Col>
            <Col span={5}>
              <Form.Item
                label="Age:"
                rules={[{ required: true, message: "Please insert Age" }]}
              >
                <Input
                  placeholder="Enter Age"
                  type={"Number"}
                  required
                  name="FamilyAge"
                  value={FamilyAge}
                  onChange={handleFamilyAge}
                />
              </Form.Item>
            </Col>

            <Col span={1}></Col>
            <Col span={5}>
              <Form.Item
                label="Relations:"
                rules={[{ required: true, message: "Please insert Relations" }]}
              >
                <Select
                  showSearch
                  required
                  placeholder="Select Relations"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                  name="FamilyRelations"
                  value={FamilyRelations}
                  onChange={handleFamilyRelations}
                >
                  <Option value="Self">Self</Option>
                  <Option value="Father">Father</Option>
                  <Option value="Mother">Mother</Option>
                  <Option value="Son">Son</Option>
                  <Option value="Daughter">Daughter</Option>
                  <Option value="Wife">Wife</Option>
                  <Option value="Husband">Husband</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={1}></Col>
            <Col span={5}>
              <Form.Item
                label="Occupation:"
                rules={[
                  { required: true, message: "Please insert Occupation" },
                ]}
              >
                <Radio.Group
                  onChange={handleFamilyOccupation}
                  value={FamilyOccupation}
                  required
                  name="FamilyOccupation"
                >
                  <Radio value={"Business"}>Business</Radio>
                  <Radio value={"Job"}>Job</Radio>
                  <Radio value={"Unemployed"}>Unemployed</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={7}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Add
                </Button>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <h3>
              Note - 'Please click on 'Add' button post filling above details to
              add family member'
            </h3>
          </Row>
          <Row>
            <Col span={24}>
              <DataTable columns={columns} dataSource={data} />
            </Col>
          </Row>

          <div className="steps-action">
            <Button
              style={{
                margin: "0 8px",
              }}
              onClick={() => prev()}
            >
              Previous
            </Button>

            <Button type="primary" htmlType="submit">
              Next
            </Button>
          </div>
        </Form>
      ),
    },
    {
      title: "Business Details",
      content: (
        <Form layout="vertical" onFinish={() => next()}>
          <Row>
            <Col span={7}>
              <Form.Item
                label="Business Name:"
                rules={[
                  { required: true, message: "Please insert Business Name" },
                ]}
              >
                <Input
                  placeholder="Enter Business Name"
                  required
                  name="BusinessName"
                  value={BusinessName}
                  onChange={handleBusinessName}
                />
              </Form.Item>
            </Col>

            <Col span={1}></Col>
            <Col span={7}>
              <Form.Item label="Beneficiary Investment Component (Minimum 10% of the project cost):">
                <Input
                  placeholder="Enter Beneficiary Investment"
                  type="Number"
                  name="Investment"
                  value={Investment}
                  onChange={handleInvestment}
                />
              </Form.Item>
            </Col>

            <Col span={1}></Col>
            <Col span={7}>
              <Form.Item
                label="Brief Information of Business:"
                rules={[
                  {
                    required: true,
                    message: "Please insert Brief Information of Business",
                  },
                ]}
              >
                <Input
                  placeholder="Enter Brief Information of Business"
                  type="multiline"
                  required
                  name="BusinessInfo"
                  value={BusinessInfo}
                  onChange={handleBusinessInfo}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={7}>
              <Form.Item
                label="The Address of the place of Business"
                rules={[
                  {
                    required: true,
                    message:
                      "Please insert The Address of the place of Business",
                  },
                ]}
              >
                <Input
                  placeholder="Enter Business Address"
                  type="multiline"
                  required
                  name="BusinessAdd"
                  value={BusinessAdd}
                  onChange={handleBusinessAdd}
                />
              </Form.Item>
            </Col>

            <Col span={1}></Col>
            <Col span={7}>
              <Form.Item
                label="Land Owned or Rented?:"
                rules={[
                  {
                    required: true,
                    message: "Please select Land Owned or Rented?",
                  },
                ]}
              >
                <Radio.Group
                  onChange={handleOwnRented}
                  value={OwnRented}
                  name="OwnRented"
                  required
                >
                  <Radio value={"Owned"}>Owned</Radio>
                  <Radio value={"Rented"}>Rented</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          <div className="steps-action">
            <Button
              style={{
                margin: "0 8px",
              }}
              onClick={() => prev()}
            >
              Previous
            </Button>

            <Button type="primary" htmlType="submit">
              Next
            </Button>
          </div>
        </Form>
      ),
    },
    {
      title: "Documents",
      content: (
        <>
          <h3>Required Documents</h3>

          <Row>
            <Col span={12}>
              <Row>
                <Col style={style} span={20}>
                  <h4>Document Format should be JPEG/ PDF.</h4>
                </Col>
              </Row>
              <Row>
                <Col style={style} span={20}>
                  <h4>The size of the documents between 75 KB to 2 MB.</h4>
                </Col>
              </Row>
              <Row>
                <Col style={style} span={20}>
                  <h4>
                    <img src={RequiredDocIMGA} /> The size of the photograph
                    should fall between 5KB to 20KB
                  </h4>
                </Col>
              </Row>
              <Row>
                <Col style={style} span={20}>
                  <h4>
                    <img src={RequiredDocIMGB} /> Photograph and Signature
                    Format should be JPG or JPEG.
                  </h4>
                </Col>
              </Row>
              <Row>
                <Col style={style} span={20}>
                  <h4>
                    <img src={RequiredDocIMGC} /> The width of the photograph
                    should be 160 pixels.
                  </h4>
                </Col>
              </Row>
              <Row>
                <Col style={style} span={20}>
                  <h4>
                    <img src={RequiredDocIMGD} /> The height of the photograph
                    should fall between 200 to 212 pixels.
                  </h4>
                </Col>
              </Row>
              <Row>
                <Col style={style} span={20}>
                  <h4>
                    <img src={RequiredDocIMGE} /> The height of the Signature
                    should fall between 50 to 55 pixels.
                  </h4>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Form layout="vertical">
                <Row>
                  <Form.Item
                    label="Photograph:"
                    name="Photopath"
                    rules={[
                      { required: false, message: "Please select Photograph" },
                    ]}
                  >
                    <img src={PhotographIMG} />
                    <Input
                      placeholder="Photograph"
                      type="file"
                      name="Photopath"
                      required
                      value={Photopath}
                      onChange={handlePhotopath}
                    />
                  </Form.Item>
                </Row>

                <Row>
                  <Form.Item
                    label="Signature:"
                    name="Signaturepath"
                    rules={[
                      { required: false, message: "Please select Signature" },
                    ]}
                  >
                    <img src={SignatureIMG} />
                    <Input
                      placeholder="Signature"
                      type="file"
                      name="Signaturepath"
                      required
                      value={Signaturepath}
                      onChange={handleSignaturepath}
                    />
                  </Form.Item>
                </Row>
              </Form>
            </Col>
          </Row>

          <Row>
            <Imagecrop />
          </Row>

          <br />
          <Form layout="vertical">
            <Row>
              <Col span={4}>
                <Form.Item
                  label="Udyam Aadhar Copy:"
                  valuePropName="fileList"
                  name="Uaadharpath"
                  rules={[
                    {
                      required: false,
                      message: "Please select Udyam Aadhar Copy",
                    },
                  ]}
                >
                  <Upload
                    action="/upload.do"
                    listType="picture-card"
                    name="Uaadharpath"
                    required
                    value={Uaadharpath}
                    onChange={handleUaadharpath}
                  >
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Udyam Aadhar Copy:*</div>
                    </div>
                  </Upload>
                </Form.Item>
              </Col>

              <Col span={4}>
                <Form.Item
                  label="Copy of Address Proof:"
                  valuePropName="fileList"
                  name="AddressProofpath"
                  rules={[
                    { required: false, message: "Please select Address Proof" },
                  ]}
                >
                  <Upload
                    action="/upload.do"
                    listType="picture-card"
                    name="AddressProofpath"
                    required
                    value={AddressProofpath}
                    onChange={handleAddressProofpath}
                  >
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>
                        Copy of Address Proof:*
                      </div>
                    </div>
                  </Upload>
                </Form.Item>
              </Col>

              <Col span={4}>
                <Form.Item
                  label="Copy of Aadhar Card (Front Side):"
                  valuePropName="fileList"
                  name="AadharFrontpath"
                  rules={[
                    {
                      required: false,
                      message: "Please select Aadhar Card (Front Side)",
                    },
                  ]}
                >
                  <Upload
                    action="/upload.do"
                    listType="picture-card"
                    name="AadharFrontpath"
                    value={AadharFrontpath}
                    onChange={handleAadharFrontpath}
                  >
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>
                        Copy of Aadhar Card (Front Side):*
                      </div>
                    </div>
                  </Upload>
                </Form.Item>
              </Col>

              <Col span={4}>
                <Form.Item
                  label="Copy of Aadhar Card (back side):"
                  valuePropName="fileList"
                  name="AadharBackpath"
                  rules={[
                    {
                      required: false,
                      message: "Please select Aadhar Card (back side)",
                    },
                  ]}
                >
                  <Upload
                    action="/upload.do"
                    listType="picture-card"
                    name="AadharBackpath"
                    value={AadharBackpath}
                    onChange={handleAadharBackpath}
                  >
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>
                        Copy of Aadhar Card (back side):*
                      </div>
                    </div>
                  </Upload>
                </Form.Item>
              </Col>

              <Col span={4}>
                <Form.Item
                  label="Safai Karmachari Dhakla(Attested Nagar Sevak):"
                  valuePropName="fileList"
                  name="SKDpath"
                  rules={[
                    {
                      required: false,
                      message: "Please select Safai Karmachari Dhakla",
                    },
                  ]}
                >
                  <Upload
                    action="/upload.do"
                    listType="picture-card"
                    name="SKDpath"
                    value={SKDpath}
                    onChange={handleSKDpath}
                  >
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>
                        Safai Karmachari Dhakla(Attested Nagar Sevak):*
                      </div>
                    </div>
                  </Upload>
                </Form.Item>
              </Col>

              <Col span={4}>
                <Form.Item
                  label="Copy of Pan Card:"
                  valuePropName="fileList"
                  name="Pancardpath"
                  rules={[
                    { required: false, message: "Please select Pan Card" },
                  ]}
                >
                  <Upload
                    action="/upload.do"
                    listType="picture-card"
                    name="Pancardpath"
                    value={Pancardpath}
                    onChange={handlePancardpath}
                  >
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Copy of Pan Card:*</div>
                    </div>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>

            <Card
              title={
                <Checkbox
                  checked={AckApproval}
                  name="AckApproval"
                  onChange={handleAckApproval}
                  required
                  rules={[
                    {
                      required: true,
                      message: "Please select Acknowledgement",
                    },
                  ]}
                >
                  Acknowledgement:
                </Checkbox>
              }
            >
              <p>
                I write on the true pledge that all the above information is
                true. Also, as per the companion's business report, I will use
                the requested grant/application only for directed business and
                if I misuse it, I will be liable for legal action. The loan
                amount should be recovered from me with interest. Also, as per
                IPC 142, I have given all the information to the government
                officials and I will be eligible for further action. No one in
                my family has a job. I will regularize the bank loan Fed. The
                information I have given is true. As a matter of fact
              </p>
              <p>
                मी सत्य प्रति ज्ञवर लि हून देतो की , वरी ल संपूर्ण मा हि ती सत्य
                आहे. तसेच मी सो बती च्या व्यवसा या च्या अहवा ला नुसा र मा गि
                तलेले अनुदा न/अर्ज फक्त नि र्देशि त धंदा करण्या चं वा परी न व
                हेयचा गैरवा पर केल्या स मी का यदेशी र का र्यवा ही पा त्र रा ही
                न. कर्ज रक्कम व्या जा सह मा झ्या कडून वसूल करण्या त या वी . तसेच
                IPC १४२ प्रमा णे सर्व्या मा हि ती सरका री अधि का री यां ना दि ला
                या पुढी ल का रवा ईस मी पा त्र रा ही न. मा झ्या कुटुंबा ती ल को
                णी ही व्यक्ती नो करी स ना ही . मी बँकेच्या कर्जा ची फेड नि यमि त
                करी न. मी दि लेली मा हि ती सत्य आहे. प्रति ज्ञवरी ल सत्यतेकरि ता
                सा क्षी दा र म्हणून दो न व्यक्तीं चे ना व सा क्षी दा र म्हणून
                देत आहे
              </p>
            </Card>

            <div className="steps-action">
              <Button
                style={{
                  margin: "0 8px",
                }}
                onClick={() => prev()}
              >
                Previous
              </Button>

              <Button type="primary" htmlType="submit">
                Next
              </Button>
            </div>
          </Form>

          <Row></Row>
        </>
      ),
    },
    {
      title: "Summary",
      content: (
        <>
          <h3>Loan Management System</h3>
          <Row>
            <Col style={style} span={6}>
              <h4>Scheme Name:</h4>
            </Col>
            <Col span={6} style={style}>
              {LoanScheme}
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
              {FirstName}
            </Col>
            <Col style={style} span={6}>
              <h4>MiddleName:</h4>
            </Col>
            <Col span={6} style={style}>
              {MiddleName}
            </Col>
          </Row>
          <Row>
            <Col style={style} span={6}>
              <h4>LastName:</h4>
            </Col>
            <Col span={6} style={style}>
              {LastName}
            </Col>
            <Col style={style} span={6}>
              <h4>Birth Date:</h4>
            </Col>
            <Col span={6} style={style}>
              {Birthdate}
            </Col>
          </Row>
          <Row>
            <Col style={style} span={6}>
              <h4>Age:</h4>
            </Col>
            <Col span={6} style={style}>
              {Age}
            </Col>
            <Col style={style} span={6}>
              <h4>Father's Full Name:</h4>
            </Col>
            <Col span={6} style={style}>
              {FatherName}
            </Col>
          </Row>
          <Row>
            <Col style={style} span={6}>
              <h4>Husband Full Name(FemaleApplicant):</h4>
            </Col>
            <Col span={6} style={style}>
              {HusbandFullName}
            </Col>
          </Row>
          <Row>
            <Col style={style} span={6}>
              <h4>Basic Education:</h4>
            </Col>
            <Col span={6} style={style}>
              {Education}
            </Col>
          </Row>

          <Row>
            <Col style={style} span={6}>
              <h4>City/Rural:</h4>
            </Col>
            <Col span={6} style={style}></Col>
            <Col style={style} span={6}>
              <h4>District:</h4>
            </Col>
            <Col span={6} style={style}>
              {District}
            </Col>
          </Row>
          <Row>
            <Col style={style} span={6}>
              <h4>Taluka:</h4>
            </Col>
            <Col span={6} style={style}>
              {Taluka}
            </Col>
            <Col style={style} span={6}>
              <h4>Present Address:</h4>
            </Col>
            <Col span={6} style={style}>
              {PresentAddline1} , {PresentAddline2} , {PresentAddline3} ,{" "}
              {PresentPincode}
            </Col>
          </Row>
          <Row>
            <Col style={style} span={6}>
              <h4>Permanent Address:</h4>
            </Col>
            <Col span={6} style={style}>
              {PermanentAddline1} , {PermanentAddline2} , {PermanentAddline3} ,{" "}
              {PermanentPincode}
            </Col>
            <Col style={style} span={6}>
              <h4>Proposed Business Name:</h4>
            </Col>
            <Col span={6} style={style}>
              {ProposedBusinessName}
            </Col>
          </Row>

          <Row>
            <Col style={style} span={6}>
              <h4>Ration Card Type:</h4>
            </Col>
            <Col span={6} style={style}>
              {RationCardType}
            </Col>
          </Row>

          <Row>
            <Col style={style} span={6}>
              <h4>Business Name:</h4>
            </Col>
            <Col span={6} style={style}>
              {BusinessName}
            </Col>
            <Col style={style} span={6}>
              <h4>The Address of the place ofBusiness:</h4>
            </Col>
            <Col span={6} style={style}>
              {BusinessAdd}
            </Col>
          </Row>
          <Row>
            <Col style={style} span={6}>
              <h4>
                Beneficiary Investment Component (Minimum10% of the project
                cost):
              </h4>
            </Col>
            <Col span={6} style={style}></Col>
            <Col style={style} span={6}>
              <h4>Brief Information of Business:</h4>
            </Col>
            <Col span={6} style={style}></Col>
          </Row>

          <Row>
            <Col style={style} span={6}>
              <h4>Land Owned or Rented?:</h4>
            </Col>
            <Col span={6} style={style}>
              {OwnRented}
            </Col>
          </Row>

          <Col span={24} style={style}>
            <h3>Family Details:</h3>
            <DataTable columns={columns} dataSource={data} />
          </Col>

          <div className="steps-action">
            <Button
              style={{
                margin: "0 8px",
              }}
              onClick={() => prev()}
            >
              Previous
            </Button>

            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              Save and Proceed
            </Button>
          </div>
        </>
      ),
    },
  ];

  const next = () => {
    setCurrent(current + 1);
    setProgressValue(progressValue + 15);
  };

  const prev = () => {
    setCurrent(current - 1);
    setProgressValue(progressValue - 15);
  };

  const done = () => {
    message.success("Processing complete!");
    setProgressValue(progressValue + 15);
  };

  if (pageLoading == true) {
    return (
      <LoadContainer>
        <Spin tip="Loading data" />
      </LoadContainer>
    );
  } else {
    return (
      <MainContainer>
        <Progress percent={progressValue} />

        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {/* {current > 0 && (
            <Button
              style={{
                margin: "0 8px",
              }}
              onClick={() => prev()}
            >
              Previous
            </Button>
          )} */}
          {/* {current === steps.length - 1 && (
            // <Button type="primary" onClick={() => done()}>
            //   Done
            // </Button>
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              Save and Proceed
            </Button>
          )} */}
          {/* {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )} */}
        </div>
      </MainContainer>
    );
  }
};
export default NsfkdcForm;

export const MainContainer = styled.div`
  margin: 50px;
`;
