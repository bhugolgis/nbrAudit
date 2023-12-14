import React, { useState } from "react";
import {
  Form,
  Input,
  Radio,
  Select,
  Row,
  Col,
  Spin,
  Modal,
  message,
  Steps,
  Tooltip,
  Button,
} from "antd";
import {
  MainContainer,
  FormItem,
  SignInButton,
  InputFields,
  DatePick,
  MessageModal,
  RegisterForm,
  Fieldflex,
  FieldEven,
} from "./style";
import casteData from "../../../../../../data/casteData.json";
import data from "../../../../../../data/dtdata.json";
import { RegisterBackground, RegisterPage } from "../../../../../../media";
import TextArea from "antd/lib/input/TextArea";
import stateData from "../../../../../../data/states.json";
import axios from "axios";
import { REACT_APP_BASE_URL } from "../../../../../../libs/utils/urls";
import Translater from "../../../../../../libs/common-ui/Translation";
import { Field } from "rc-field-form";
import moment from "moment";
const Register = () => {
  const dateFormat = "YYYY-MM-DD";
  const customFormat = (value) => `${value.format(dateFormat)}`;
  const disabledDate = (current) => {
    return current && current.valueOf() > moment();
  };
  const [state, setState] = useState("Maharashtra");

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [emailId, setEmailId] = useState("");
  const [dob, setDob] = useState();
  const [aadharNumber, setAadharNumber] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [taluka, setTaluka] = useState("");
  const [casteValue, setCasteValue] = useState("sc");
  const [subCaste, setSubCaste] = useState("");
  const [casteCertificateImage, setCasteCertificateImage] = useState("");
  const [safaiValue, setSafaiValue] = useState("no");
  const [safaiImage, setSafaiImage] = useState("");
  const [talukaKey, setTalukaKey] = useState(0);

  const [selectVisible, setSelectVisible] = useState(true);
  const { Option } = Select;

  const checkDate = (date) => {
    const birthDate = new Date(date);
    const today = new Date();
    const ageInMilliseconds = today - birthDate;
    const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365);
    if (Math.floor(ageInYears) < 18) {
      message.warning("Age should be 18 Years or more");
    } else {
      setDob(date);
    }
  };

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleMobile = (e) => {
    setMobile(e.target.value);
  };
  const handleEmail = (e) => {
    setEmailId(e.target.value);
  };
  const handleDob = (e, date, dateString) => {
    checkDate(date);
  };
  const handleAadharNumber = (e) => {
    setAadharNumber(e.target.value);
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
  };
  const handleDistrict = (e) => {
    setDistrict(e.target.value);
  };
  const handleTaluka = (e) => {
    setTaluka(e.target.value);
  };
  const handleCasteValue = (e) => {
    setCasteValue(e.target.value);
  };
  const handleSubCaste = (e) => {
    setSubCaste(e.target.value);
  };

  const handleSafaiValue = (e) => {
    setSafaiValue(e.target.value);
  };
  const handleSafaiImage = (e) => {
    setSafaiImage(e.target.files[0]);
  };
  const handleCasteImageChange = (e) => {
    setCasteCertificateImage(e.target.files[0]);
  };
  const [village, setVillage] = useState("");
  const handleVillage = (e) => {
    setVillage(e.target.value);
  };
  const [safaikarmchariId, setSafaikarmchariId] = useState("");
  const handleSafaiId = (e) => {
    setSafaikarmchariId(e.target.value);
  };
  const [spinLoading, setSpinLoading] = useState(false);

  const [requirement, setRequirement] = useState("");
  const handleRequirement = (e) => {
    setRequirement(e.target.value);
  };
  const [typeOfBusiness, setTypeOfBusiness] = useState("");
  const handleTypeOfBusiness = (value) => {
    setTypeOfBusiness(value);
  };

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const success = () => {
    Modal.success({
      content:
        "You have successfully registered. Redirecting you to login page...",
    });
  };

  const validUsername = new RegExp("^[A-Za-z0-9]+");

  const [usernameMessage, setUsernameMessage] = useState("");
  const handleRegisterSubmit = () => {
    if (name == "") {
      message.warning("Name is empty");
    } else if (username == "") {
      message.warning("Username is empty");
    } else if (mobile == "") {
      message.warning("Mobile Number is empty ");
    } else if (mobile.length != 10) {
      message.warning("Mobile Number is Greater than 10 digits");
    } else if (emailId == "") {
      message.warning("Email Id is empty");
    } else if (dob == null || dob == "") {
      message.warning("Date of Birth is empty");
    } else if (aadharNumber == "") {
      message.warning("Aadhar Number is empty");
    } else if (aadharNumber.length != 12) {
      message.warning("Aadhar Number should be 12 digits only");
    } else if (address == "") {
      message.warning("Address is empty");
    } else if (district == "") {
      message.warning("District is empty");
    } else if (taluka == "") {
      message.warning("Taluka is empty");
    } else if (casteValue == "sc" && safaiValue == "no") {
      if (subCaste == "") {
        message.warning("SubCaste is empty");
        // } else if (casteCertificateImage == "") {
        //   message.warning("Please upload caste certificate");
      } else if (requirement == "") {
        message.warning("Primary Requirement is empty");
      } else if (password == "") {
        message.warning("Password is empty");
      } else if (confirmPassword == "") {
        message.warning("Confirm password is empty");
      } else if (password != confirmPassword) {
        message.warning("Passwords do not match");
      } else {
        setSpinLoading(true);
        const registerData = new FormData();
        registerData.append("name", name);
        registerData.append("username", username);
        registerData.append("password", password);
        registerData.append("phoneNumber", mobile);
        registerData.append("emailId", emailId);
        registerData.append("address", address);
        registerData.append("dob", dob);
        registerData.append("aadharNumber", aadharNumber);
        registerData.append("CasteName", casteValue);
        registerData.append("SubCasteName", subCaste);
        // registerData.append("casteCertificateimage", casteCertificateImage);
        // registerData.append("safaiKarmchariCertificateimage", safaiImage);
        registerData.append("havesafaiKarmchariId", safaiValue);
        registerData.append("safaiKarmchariId", safaikarmchariId);
        registerData.append("state", "Maharashtra");
        registerData.append("district", district);
        registerData.append("taluka", taluka);
        registerData.append("village", village);
        registerData.append("primaryRequirement", requirement);
        registerData.append("typeOfBusiness", typeOfBusiness);
        axios({
          method: "post",
          url: `${REACT_APP_BASE_URL}/applicant/useregister`,
          data: registerData,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then((response) => {
            const userRegister = response.data;
            if (userRegister.status == "success") {
              setSpinLoading(false);
              success();
              setTimeout(() => {
                window.location.replace("/login");
              }, 2000);
            } else if (userRegister.status == "error") {
              setSpinLoading(false);
              message.warning(userRegister.message);
            }
          })
          .catch((error) => {
            message.error(error.response);
          });
      }
    } else if (casteValue == "sc" && safaiValue == "yes") {
      if (subCaste == "") {
        message.warning("SubCaste is empty");
        // } else if (casteCertificateImage == "") {
        //   message.warning("Please upload caste certificate");
      } else if (safaikarmchariId == "") {
        message.warning("Safai KarmChari ID is empty");
        // } else if (safaiImage == "") {
        //   message.warning("Please upload Safai Karmchari ID");
      } else if (requirement == "") {
        message.warning("Primary Requirement is empty");
      } else if (password == "") {
        message.warning("Password is empty");
      } else if (confirmPassword == "") {
        message.warning("Confirm password is empty");
      } else if (password != confirmPassword) {
        message.warning("Passwords do not match");
      } else {
        setSpinLoading(true);
        const registerData = new FormData();
        registerData.append("name", name);
        registerData.append("username", username);
        registerData.append("password", password);
        registerData.append("phoneNumber", mobile);
        registerData.append("emailId", emailId);
        registerData.append("address", address);
        registerData.append("dob", dob);
        registerData.append("aadharNumber", aadharNumber);
        registerData.append("CasteName", casteValue);
        registerData.append("SubCasteName", subCaste);
        // registerData.append("casteCertificateimage", casteCertificateImage);
        // registerData.append("safaiKarmchariCertificateimage", safaiImage);
        registerData.append("havesafaiKarmchariId", safaiValue);
        registerData.append("safaiKarmchariId", safaikarmchariId);
        registerData.append("state", "Maharashtra");
        registerData.append("district", district);
        registerData.append("taluka", taluka);
        registerData.append("village", village);
        registerData.append("primaryRequirement", requirement);
        registerData.append("typeOfBusiness", typeOfBusiness);
        axios({
          method: "post",
          url: `${REACT_APP_BASE_URL}/applicant/useregister`,
          data: registerData,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then((response) => {
            const userRegister = response.data;
            if (userRegister.status == "success") {
              setSpinLoading(false);
              success();
              setTimeout(() => {
                window.location.replace("/login");
              }, 2000);
            } else if (userRegister.status == "error") {
              setSpinLoading(false);
              message.warning(userRegister.message);
            }
          })
          .catch((error) => {
            message.error(error.response);
          });
      }
    } else if (casteValue == "manual_Scavengers") {
      if (safaikarmchariId == "") {
        message.warning("Safai Karmchari Id is empty");
        // } else if (safaiImage == "") {
        //   message.warning("Please upload Safai Karmchari Image");
      } else if (requirement == "") {
        message.warning("Primary Requirement is empty");
      } else if (password == "") {
        message.warning("Password is empty");
      } else if (confirmPassword == "") {
        message.warning("Confirm password is empty");
      } else if (password != confirmPassword) {
        message.warning("Passwords do not match");
      } else {
        setSpinLoading(true);
        const registerData = new FormData();
        registerData.append("name", name);
        registerData.append("username", username);
        registerData.append("password", password);
        registerData.append("phoneNumber", mobile);
        registerData.append("emailId", emailId);
        registerData.append("address", address);
        registerData.append("dob", dob);
        registerData.append("aadharNumber", aadharNumber);
        registerData.append("CasteName", casteValue);
        registerData.append("SubCasteName", subCaste);
        // registerData.append("casteCertificateimage", casteCertificateImage);
        // registerData.append("safaiKarmchariCertificateimage", safaiImage);
        registerData.append("havesafaiKarmchariId", safaiValue);
        registerData.append("safaiKarmchariId", safaikarmchariId);
        registerData.append("state", "Maharashtra");
        registerData.append("district", district);
        registerData.append("taluka", taluka);
        registerData.append("village", village);
        registerData.append("primaryRequirement", requirement);
        registerData.append("typeOfBusiness", typeOfBusiness);
        axios({
          method: "post",
          url: `${REACT_APP_BASE_URL}/applicant/useregister`,
          data: registerData,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then((response) => {
            const userRegister = response.data;
            if (userRegister.status == "success") {
              setSpinLoading(false);
              success();
              setTimeout(() => {
                window.location.replace("/login");
              }, 2000);
            } else if (userRegister.status == "error") {
              setSpinLoading(false);
              message.warning(userRegister.message);
            }
          })
          .catch((error) => {
            message.error(error.response);
          });
      }
    } else if (casteValue == "safai_Karmchari") {
      if (requirement == "") {
        message.warning("Primary Requirement is empty");
      } else if (password == "") {
        message.warning("Password is empty");
      } else if (confirmPassword == "") {
        message.warning("Confirm password is empty");
      } else if (password != confirmPassword) {
        message.warning("Passwords do not match");
      } else {
        setSpinLoading(true);
        const registerData = new FormData();
        registerData.append("name", name);
        registerData.append("username", username);
        registerData.append("password", password);
        registerData.append("phoneNumber", mobile);
        registerData.append("emailId", emailId);
        registerData.append("address", address);
        registerData.append("dob", dob);
        registerData.append("aadharNumber", aadharNumber);
        registerData.append("CasteName", casteValue);
        registerData.append("SubCasteName", subCaste);
        // registerData.append("casteCertificateimage", casteCertificateImage);
        // registerData.append("safaiKarmchariCertificateimage", safaiImage);
        // registerData.append("havesafaiKarmchariId", safaiValue);
        // registerData.append("safaiKarmchariId", safaikarmchariId);
        registerData.append("state", "Maharashtra");
        registerData.append("district", district);
        registerData.append("taluka", taluka);
        registerData.append("village", village);
        registerData.append("primaryRequirement", requirement);
        registerData.append("typeOfBusiness", typeOfBusiness);
        axios({
          method: "post",
          url: `${REACT_APP_BASE_URL}/applicant/useregister`,
          data: registerData,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then((response) => {
            const userRegister = response.data;
            if (userRegister.status == "success") {
              setSpinLoading(false);
              success();
              setTimeout(() => {
                window.location.replace("/login");
              }, 2000);
            } else if (userRegister.status == "error") {
              setSpinLoading(false);
              message.warning(userRegister.message);
            }
          })
          .catch((error) => {
            message.error(error.response);
          });
      }
    }
  };

  return (
    <Spin spinning={spinLoading} tip="Registering..." size="small">
      <MainContainer
        style={{
          background: "#cce5ff",
          height: "100vh",
        }}
      >
        <div
          style={{
            margin: "30px",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            background: "#14659e",
            width: "100%",
            display: "flex",
            height: "90%",
          }}
        >
          <span
            style={{
              width: "40%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <img src={RegisterPage} width="60%" height="60%" />
            <h1
              style={{
                color: "white",
                border: "2px solid white",
                padding: "10px 50px",
                marginTop: "20px",
              }}
            >
              Registration
            </h1>
          </span>

          <RegisterForm
            layout="vertical"
            style={{
              background: "white",
              padding: "30px",
              width: "60%",
              height: "100%",
              overflowY: "scroll",
            }}
          >
            <Row style={{ display: "flex", justifyContent: "flex-end" }}>
              <Translater />
            </Row>
            <Row style={{ display: "flex" }}>
              <Col span={12}>
                <FormItem label="Name as per Aadhar" name="name" required>
                  <InputFields
                    placeholder="Enter your Name"
                    value={name}
                    onChange={handleName}
                  />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label="Username"
                  name="username"
                  required
                  rules={[
                    {
                      message: "Please use letters and numbers only",
                    },
                  ]}
                >
                  <InputFields
                    placeholder="Enter your Username"
                    value={username}
                    onChange={handleUsername}
                    pattern="[a-zA-Z0-9]+"
                    title="Username must contain only letters and numbers."
                  />
                </FormItem>
              </Col>
            </Row>
            <Row style={{ display: "flex" }}>
              <Col span={12}>
                <FormItem
                  label="Mobile no. as per Aadhar"
                  name="mobile"
                  required
                >
                  <InputFields
                    placeholder="Enter your Mobile No"
                    type="tel"
                    value={mobile}
                    onChange={handleMobile}
                    maxLength={10}
                  />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="Email Id" name="emailId" required>
                  <InputFields
                    placeholder="Enter your emailId"
                    value={emailId}
                    onChange={handleEmail}
                  />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem label="Date of Birth" name="dateofbirth" required>
                  <DatePick
                    format={customFormat}
                    value={dob}
                    onChange={handleDob}
                    disabledDate={disabledDate}
                  />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="Aadhar Number" name="aadhar" required>
                  <InputFields
                    placeholder="Enter your Aadhar number"
                    type="tel"
                    maxLength={12}
                    value={aadharNumber}
                    onChange={handleAadharNumber}
                  />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem label="Address" name="address" required>
                  <TextArea
                    style={{ width: "280px" }}
                    placeholder="Enter your address as per aadhar"
                    value={address}
                    onChange={handleAddress}
                  />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="District" name="district" required>
                  <Select
                    showSearch
                    style={{ width: "280px" }}
                    placeholder="Select district"
                    optionFilterProp="children"
                    onChange={(v, k) => {
                      setDistrict(v);
                      setTalukaKey(k.key);
                      setSelectVisible(false);
                    }}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    value={district}
                  >
                    {data.map((dis, index) => {
                      return (
                        <Option
                          key={index}
                          value={dis.district_name}
                          onChange={handleDistrict}
                        >
                          {dis.district_name}
                        </Option>
                      );
                    })}
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem label="Taluka" name="taluka" required>
                  <Select
                    showSearch
                    style={{ width: "280px" }}
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
                    disabled={selectVisible}
                  >
                    {data[talukaKey].talukas.map((tal) => {
                      return (
                        <Option value={tal.taluka_name}>
                          {tal.taluka_name}
                        </Option>
                      );
                    })}
                  </Select>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="State" name="State" required>
                  <Select
                    showSearch
                    placeholder="Select state"
                    optionFilterProp="children"
                    onChange={(v, k) => {
                      setState(v);
                    }}
                    value={state}
                    style={{ width: "280px" }}
                    name="state"
                    defaultValue="Maharashtra"
                    disabled
                  >
                    {stateData.map((state, index) => {
                      return (
                        <Option key={index} value={state.name}>
                          {state.name}
                        </Option>
                      );
                    })}
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem label="Village" name="village">
                  <InputFields
                    value={village}
                    onChange={handleVillage}
                    placeholder="Please input your Village"
                    name="village"
                  />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="Select your caste" required>
                  <Radio.Group onChange={handleCasteValue} value={casteValue}>
                    <Radio value="sc">SC</Radio>
                    <Radio value="manual_Scavengers">Manual Scavengers</Radio>
                    <Radio value="safai_Karmchari">Safai Karmachari</Radio>
                  </Radio.Group>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                {casteValue == "sc" ? (
                  <FormItem label={`Sub Caste `} name="subCaste" required>
                    <Select
                      showSearch
                      style={{
                        width: 280,
                      }}
                      placeholder="Select sub-caste"
                      optionFilterProp="children"
                      onChange={(v) => {
                        setSubCaste(v);
                      }}
                      filterOption={(input, option) =>
                        option.children.includes(input)
                      }
                      filterSort={(optionA, optionB) =>
                        optionA.children
                          .toLowerCase()
                          .localeCompare(optionB.children.toLowerCase())
                      }
                      value={subCaste}
                    >
                      {casteData.map((sub) => {
                        return (
                          <Option
                            value={sub.sub_caste}
                            onChange={handleSubCaste}
                          >
                            {sub.sub_caste}
                          </Option>
                        );
                      })}
                    </Select>
                    <Tooltip title="If Subcaste is not available in the below menu you are not eligible for MPBCDC Services, Kindly avail the services from Sahityaratna Lokshahir Anna Bhau Sathe Development Corporation or Sant Rohidas Leather Industries and Charmakar Development Corporation">
                      <Button
                        style={{
                          marginLeft: "10px",
                          borderRadius: "50px",
                          background: "adadad",
                          padding: "5px 10px",
                        }}
                      >
                        <b>i</b>
                      </Button>
                    </Tooltip>
                  </FormItem>
                ) : (
                  " "
                )}
                {safaiValue == "yes" || casteValue == "manual_Scavengers" ? (
                  <FormItem label="Safai Karmachari Id" required>
                    <InputFields
                      value={safaikarmchariId}
                      onChange={handleSafaiId}
                      placeholder="Enter SafaiKarmchari Id"
                      name="safaiKarmchariId"
                    />
                  </FormItem>
                ) : (
                  ""
                )}
              </Col>
              {/* <Col span={12}>
                {casteValue == "sc" ? (
                  <Form.Item label="Caste Certificate" required>
                    <input
                      name="casteCertificate"
                      type="file"
                      onChange={handleCasteImageChange}
                    />
                  </Form.Item>
                ) : (
                  ""
                )}
                {safaiValue == "yes" || casteValue == "others" ? (
                  <Form.Item label="Safai Karmachari Id" required>
                    <input type="file" onChange={handleSafaiImage} />
                  </Form.Item>
                ) : (
                  ""
                )}
              </Col> */}
            </Row>
            <Row>
              <Col span={12}>
                <FormItem label="Primary Requirement" required>
                  <Radio.Group value={requirement} onChange={handleRequirement}>
                    <Radio value="job">Job</Radio>
                    <Radio value="  ">Business</Radio>
                    <Radio value="training">Training</Radio>
                    <Radio value="loan">Loan</Radio>
                  </Radio.Group>
                </FormItem>
              </Col>
              <Col span={12}>
                {casteValue == "sc" ? (
                  <FormItem label="Are you a Safai Karmachari ?" required>
                    <Radio.Group onChange={handleSafaiValue} value={safaiValue}>
                      <Radio value="yes">Yes</Radio>
                      <Radio value="no">no</Radio>
                    </Radio.Group>
                  </FormItem>
                ) : (
                  ""
                )}
              </Col>
            </Row>
            <Row>
              <Col span={12}></Col>
              <Col span={12}></Col>
            </Row>
            <Row>
              <Col span={12}>
                {requirement == "business" ? (
                  <FormItem
                    label="Type of business"
                    name="typeOfBusiness"
                    required
                  >
                    <Select
                      showSearch
                      style={{
                        width: 250,
                      }}
                      name="typeOfBusiness"
                      value={typeOfBusiness}
                      onChange={handleTypeOfBusiness}
                    >
                      <Option value="native district">Native District</Option>
                      <Option value="whole of maharashtra">
                        whole of Maharashtra
                      </Option>
                      <Option value="outside maharashtra">
                        Outside Maharashtra
                      </Option>
                    </Select>
                  </FormItem>
                ) : (
                  ""
                )}
              </Col>
              <Col span={12}></Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem label="Create Password" name="password" required>
                  <InputFields.Password
                    style={{ width: "280px" }}
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePassword}
                  />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label="Confirm Password"
                  name="confirmpassword"
                  required
                >
                  <Input.Password
                    style={{ width: "280px" }}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={handleConfirmPassword}
                  />
                </FormItem>
              </Col>
            </Row>
            <FormItem>
              <SignInButton
                type="primary"
                htmlType="submit"
                onClick={handleRegisterSubmit}
              >
                Register
              </SignInButton>
            </FormItem>
          </RegisterForm>
        </div>
      </MainContainer>
      <MessageModal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </MessageModal>
    </Spin>
  );
};

export default Register;
