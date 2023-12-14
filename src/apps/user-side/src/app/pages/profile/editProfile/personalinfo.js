import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Button,
  Form,
  Radio,
  Spin,
  Row,
  Col,
  Select,
  Input,
  message,
} from "antd";
import styled from "styled-components";
import axios from "axios";
import data from "../../../../../../../data/dtdata.json";
import casteData from "../../../../../../../data/casteData.json";
import {
  Container,
  FormItem,
  DatePick,
  LoadContainer,
  Completed,
  Incomplete,
} from "./style";
import moment from "moment";
import { REACT_APP_BASE_URL } from "../../../../../../../libs/utils/urls";
import { Token } from "../../../../../../../libs/utils/sessionStorage";
import useBeneficiaryData from "../../container";
import { saveAs } from "file-saver";
import ImageViewer from "react-simple-image-viewer";

const { Option } = Select;
const disabledDate = (current) => {
  return current && current > moment().endOf("day");
};

const PersonalInfo = () => {
  const [personalInfo, setPersonalInfo] = useState();
  const [pageLoading, setPageLoading] = useState(true);
  const [userDetails, setUserDetails] = useState();
  const [district, setDistrict] = useState("");
  const [subCaste, setSubCaste] = useState("");
  const [photo, setPhoto] = useState(null);
  const [casteCertificate, setCasteCertificate] = useState(null);
  const [isPhotoChanged, setIsPhotoChanged] = useState(false);
  const [isCasteCertificateFromAaple, setisCasteCertificateFromAaple] =
    useState(false);
  const [casteCertificateNumber, setcasteCertificateNumber] = useState("");
  const [isCertificateChanged, setIsCertificateChanged] = useState(false);
  const [casteValue, setCasteValue] = useState();

  const [disableCheck, setDisableCheck] = useState();

  const [beneficiaryAge, setBeneficiaryAge] = useState();

  const handleBeneficiaryAgeChange = (changeDob) => {
    const birthDate = new Date(changeDob);
    const today = new Date();
    const ageInMilliseconds = today - birthDate;
    const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365);
    if (Math.floor(ageInYears) < 18) {
      message.warning("Age should be 18 Years or more");
    } else {
      return Math.floor(ageInYears);
    }
  };
  const handleDob = (e, date, dateString) => {
    handleBeneficiaryAgeChange(date);
  };

  useEffect(() => {
    const userResponseFunc = async () => {
      // var bytes = CryptoJS.AES.decrypt(
      //   sessionStorage.getItem("token"),
      //   "y9L@91nYW%BRfc1g"
      // );
      // var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      const response = await axios({
        method: "get",
        url: `${REACT_APP_BASE_URL}/applicant/ApplicantDetailView`,
        headers: { Authorization: `token ${Token}` },
      });
      setUserDetails(response.data);
      setPersonalInfo(response.data.UserPersonalInfo[0]);
      setDistrict(response.data.UserPersonalInfo[0].district);
      setSubCaste(response.data.UserPersonalInfo[0].subCaste);
      setPhoto(response.data.UserPersonalInfo[0].photo);
      setCasteCertificate(response.data.UserPersonalInfo[0].casteCertificate);
      setCasteValue(response.data.UserPersonalInfo[0].caste);
      setDisableCheck(response.data.UserPersonalInfo[0].haveCasteCertificate);
      setBeneficiaryAge(
        handleBeneficiaryAgeChange(response.data.UserPersonalInfo[0].dob)
      );
      setPageLoading(false);
    };
    userResponseFunc();
  }, []);

  const handleSubCaste = (e) => {
    setSubCaste(e.target.value);
  };

  const handleDistrict = (e) => {
    setDistrict(e.target.files[0]);
  };

  const handlePhoto = (e) => {
    setPhoto(e.target.files[0]);
    setIsPhotoChanged(true);
  };

  const handleCasteCertificate = (event) => {
    setCasteCertificate(event.target.files[0]);
    setIsCertificateChanged(true);
  };

  const formData = useRef();
  const [infoLoading, setInfoLoading] = useState(false);

  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const openImageViewer = useCallback(() => {
    setIsViewerOpen(true);
  }, []);

  const openImageCasteViewer = useCallback(() => {
    setIsCertificateOpen(true);
  }, []);

  const closeImageViewer = () => {
    setIsViewerOpen(false);
  };

  const closeImageCaste = useCallback(() => {
    setIsCertificateOpen(false);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      fullname,
      dob,
      emailId,
      phoneNumber,
      age,
      nameAsSsc,
      parentMobile,
      maritalStatus,
      gender,
      languages,
      haveCasteCertificate,
      // isCasteCertificateFromAaple,
      // casteCertificateNumber,
      issueAuthority,
      issueDate,
      caste,
    } = formData.current;

    if (fullname.value == "") {
      message.warning("Fullname is empty");
    } else if (dob.value == "") {
      message.warning("Date of Birth is empty");
    } else if (emailId.value == "") {
      message.warning("Email Id is empty");
    } else if (phoneNumber.value == "") {
      message.warning("Phone Number should not be empty  ");
    } else if (phoneNumber.value.length != 10) {
      message.warning("Phone number should be only 10 digits");
    } else if (beneficiaryAge == "" && beneficiaryAge <= 18) {
      message.warning("Age is empty or is less than 18 years");
    } else if (gender.value == "") {
      message.warning("Select your Gender");
    } else if (nameAsSsc.value == "") {
      message.warning("Name as SSC is empty");
    } else if (maritalStatus.value == "") {
      message.warning("Select your marital status");
    } else if (languages.value == "") {
      message.warning("Languages known is empty");
    } else if (casteValue == "" || casteValue == null) {
      message.warning("Select your caste");
    } else if (casteValue == "sc") {
      if (subCaste == "") {
        message.warning("Sub Caste is empty");
      } else if (haveCasteCertificate.value == "") {
        message.warning(
          "Please select whether you have caste certificate or not"
        );
      } else if (
        haveCasteCertificate.value == true &&
        isCasteCertificateFromAaple == ""
      ) {
        message.warning("Do you have caste certificate from Aaple Sarkar");
      } else if (
        haveCasteCertificate.value == true &&
        casteCertificateNumber == ""
      ) {
        message.warning("Caste Certificate Number is empty");
      } else if (issueAuthority.value == "") {
        message.warning("Issue Authority is empty");
      } else if (district == "") {
        message.warning("District is empty");
      } else if (issueDate.value == "") {
        message.warning("Date of Issue is empty");
      } else if (photo == null) {
        message.warning("Please upload your photo");
      } else if (casteCertificate == null) {
        message.warning("Please upload your caste Certificate");
      } else {
        const personalData = new FormData();
        personalData.append("name", fullname.value);
        personalData.append("dob", dob.value);
        personalData.append("emailId", emailId.value);
        personalData.append("phoneNumber", phoneNumber.value);
        personalData.append("age", beneficiaryAge);
        personalData.append("gender", gender.value);
        personalData.append("nameAsSsc", nameAsSsc.value);
        if (parentMobile.value != "") {
          personalData.append("parentMobile", parentMobile.value);
        }
        personalData.append("maritalStatus", maritalStatus.value);
        personalData.append("languages", languages.value);
        personalData.append("caste", casteValue);
        personalData.append("subCaste", subCaste);
        personalData.append("haveCasteCertificate", haveCasteCertificate.value);
        personalData.append(
          "isCasteCertificateFromAaple",
          isCasteCertificateFromAaple
        );
        personalData.append("casteCertificateNumber", casteCertificateNumber);
        personalData.append("issueAuthority", issueAuthority.value);
        personalData.append("district", district);
        personalData.append("issueDate", issueDate.value);
        if (photo == null || typeof photo == "object") {
          personalData.append("photo", photo);
        }
        if (casteCertificate == null || typeof casteCertificate == "object") {
          personalData.append("casteCertificate", casteCertificate);
        }
        personalData.append("isCompleted", true);
        axios({
          method: "patch",
          url: `${REACT_APP_BASE_URL}/applicant/UpdatePersonalInformation`,
          data: personalData,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `token ${Token}`,
          },
        })
          .then((response) => {
            if (response.data.status == "success") {
              setInfoLoading(true);
              setTimeout(() => {
                setInfoLoading(false);
                message.success(response.data.message);
              }, 1000);
              setTimeout(() => {
                window.location.replace("/income-and-domicile-information");
              }, 1500);
            } else if (response.data.status == "error") {
              message.warning(response.data.message);
            }
          })
          .catch((error) => {
            message.error(error.message);
          });
      }
    } else if (casteValue == "others") {
      if (haveCasteCertificate.value == "") {
        message.warning(
          "Please select whether you have caste certificate or not"
        );
      } else if (
        haveCasteCertificate.value == true &&
        isCasteCertificateFromAaple == ""
      ) {
        message.warning("Do you have castecertificate from Aaple Sarkar");
      } else if (
        haveCasteCertificate.value == true &&
        casteCertificateNumber == ""
      ) {
        message.warning("Caste Certificate Number is empty");
      } else if (issueAuthority.value == "") {
        message.warning("Issue Authority is empty");
      } else if (district == "") {
        message.warning("District is empty");
      } else if (issueDate.value == "") {
        message.warning("Date of Issue is empty");
      } else if (photo == null) {
        message.warning("Please upload your photo");
      } else if (casteCertificate == null) {
        message.warning("Please upload your caste Certificate");
      } else {
        const personalData = new FormData();
        personalData.append("name", fullname.value);
        personalData.append("dob", dob.value);
        personalData.append("emailId", emailId.value);
        personalData.append("phoneNumber", phoneNumber.value);
        personalData.append("gender", gender.value);
        personalData.append("age", beneficiaryAge);
        personalData.append("nameAsSsc", nameAsSsc.value);
        if (parentMobile.value != "") {
          personalData.append("parentMobile", parentMobile.value);
        }
        personalData.append("maritalStatus", maritalStatus.value);
        personalData.append("languages", languages.value);
        personalData.append("caste", casteValue);
        personalData.append("subCaste", "");
        personalData.append("haveCasteCertificate", haveCasteCertificate.value);
        personalData.append(
          "isCasteCertificateFromAaple",
          isCasteCertificateFromAaple
        );
        personalData.append("casteCertificateNumber", casteCertificateNumber);
        personalData.append("issueAuthority", issueAuthority.value);
        personalData.append("district", district);
        personalData.append("issueDate", issueDate.value);
        if (photo == null || typeof photo == "object") {
          personalData.append("photo", photo);
        }
        if (casteCertificate == null || typeof casteCertificate == "object") {
          personalData.append("casteCertificate", casteCertificate);
        }
        personalData.append("isCompleted", true);
        axios({
          method: "patch",
          url: `${REACT_APP_BASE_URL}/applicant/UpdatePersonalInformation`,
          data: personalData,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `token ${Token}`,
          },
        })
          .then((response) => {
            if (response.data.status == "success") {
              setInfoLoading(true);
              setTimeout(() => {
                setInfoLoading(false);
                message.success(response.data.message);
              }, 1000);
              setTimeout(() => {
                window.location.replace("/income-and-domicile-information");
              }, 1500);
            } else if (response.data.status == "error") {
              message.warning(response.data.message);
            }
          })
          .catch((error) => {
            message.error(error.message);
          });
      }
    }
  };

  if (pageLoading == true) {
    return (
      <LoadContainer>
        <Spin tip="Loading data..." />
      </LoadContainer>
    );
  } else {
    return (
      <Spin spinning={infoLoading} size="large" tip="Saving Data">
        <Container>
          {isViewerOpen && (
            <ImageViewer
              src={[REACT_APP_BASE_URL + photo]}
              onClose={closeImageViewer}
              backgroundStyle={{
                backgroundColor: "rgba(0,0,0,0.9)",
              }}
            />
          )}
          {isCertificateOpen && (
            <ImageViewer
              src={[REACT_APP_BASE_URL + casteCertificate]}
              onClose={closeImageCaste}
              backgroundStyle={{
                backgroundColor: "rgba(0,0,0,0.9)",
              }}
            />
          )}
          {/* {userDetails.UserPersonalInfo[0].isCompleted == true ? (
            <Completed>Completed</Completed>
          ) : (
            <Incomplete>Incomplete</Incomplete>
          )} */}
          <form ref={formData}>
            <Row>
              <Col span={8}>
                <FormItem
                  label="Fullname"
                  name="fullname"
                  rules={[
                    { required: true, message: "Please input your fullname!" },
                  ]}
                >
                  <InputFields
                    placeholder="Please enter your fullname"
                    name="fullname"
                    defaultValue={personalInfo.name}
                  />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  label="Date of Birth"
                  name="dob"
                  rules={[
                    { required: true, message: "Please input your DOB!" },
                  ]}
                >
                  <DatePick
                    name="dob"
                    disabledDate={disabledDate}
                    defaultValue={moment(personalInfo.dob)}
                    onChange={handleDob}
                  />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  label="Email"
                  name="emailId"
                  rules={[
                    { required: true, message: "Please input your Email!" },
                  ]}
                >
                  <InputFields
                    type="email"
                    placeholder="Please input your email"
                    name="emailId"
                    defaultValue={personalInfo.emailId}
                  />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <FormItem
                  label="Phone Number"
                  name="phoneNumber"
                  rules={[{ required: true }]}
                >
                  <InputFields
                    placeholder="Please input your phone number"
                    name="phoneNumber"
                    type="tel"
                    defaultValue={personalInfo.phoneNumber}
                    maxLength={10}
                  />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="Age" name="age" rules={[{ required: true }]}>
                  <InputFields
                    name="age"
                    disabled
                    value={beneficiaryAge}
                    defaultValue={beneficiaryAge}
                  />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="Gender" required>
                  <Radio.Group
                    name="gender"
                    defaultValue={userDetails.UserPersonalInfo[0].gender}
                  >
                    <Radio value="M">Male</Radio>
                    <Radio value="F">Female</Radio>
                    <Radio value="T">Transgender</Radio>
                  </Radio.Group>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <FormItem
                  label="Name in School Leaving / SSC Certificate"
                  name="nameAsSsc"
                  rules={[{ required: true }]}
                >
                  <InputFields
                    placeholder="Please input your Name as in SSC"
                    name="nameAsSsc"
                    defaultValue={personalInfo.nameAsSsc}
                  />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="Parent's Mobile" name="parentMobile">
                  <InputFields
                    placeholder="Please input your Parent Mobile"
                    name="parentMobile"
                    type="tel"
                    defaultValue={personalInfo.parentMobile}
                    maxLength={10}
                  />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="Marital Status" required>
                  <Radio.Group
                    name="maritalStatus"
                    defaultValue={personalInfo.maritalStatus}
                  >
                    <Radio value={true}>Married</Radio>
                    <Radio value={false}>Unmarried</Radio>
                  </Radio.Group>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <FormItem
                  label="Languages"
                  name="languages"
                  rules={[{ required: true }]}
                >
                  <InputFields
                    placeholder="Please enter languages known"
                    name="languages"
                    defaultValue={personalInfo.languages}
                  />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="Caste" required>
                  <Radio.Group
                    name="caste"
                    defaultValue={personalInfo.caste}
                    onChange={(e) => {
                      setCasteValue(e.target.value);
                    }}
                  >
                    <Radio value="sc">SC</Radio>
                    <Radio value="others">Other</Radio>
                  </Radio.Group>
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  label="Sub Caste"
                  name="sub-caste"
                  rules={[
                    { required: true, message: "Please input your Sub Caste!" },
                  ]}
                >
                  <Select
                    showSearch
                    style={{
                      width: 250,
                    }}
                    placeholder="Select sub-caste"
                    onChange={(v) => {
                      setSubCaste(v);
                    }}
                    defaultValue={personalInfo.subCaste}
                    disabled={casteValue == "others" ? true : false}
                  >
                    {casteData.map((sub) => {
                      return (
                        <Option value={sub.sub_caste} onChange={handleSubCaste}>
                          {sub.sub_caste}
                        </Option>
                      );
                    })}
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <FormItem label="Do you have caste certificate ?" required>
                  <Radio.Group
                    name="haveCasteCertificate"
                    defaultValue={personalInfo.haveCasteCertificate}
                    onChange={(e) => {
                      setDisableCheck(e.target.value);
                    }}
                  >
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>
                </FormItem>
              </Col>
              {disableCheck ? (
                <>
                  <Col span={8}>
                    <FormItem
                      label="Is caste certificate generated from Aaple sarkar portal ?"
                      required
                    >
                      <Radio.Group
                        name="isCasteCertificateFromAaple"
                        defaultValue={personalInfo.isCasteCertificateFromAaple}
                        value={isCasteCertificateFromAaple}
                        onChange={(e) => {
                          setisCasteCertificateFromAaple(e.target.value);
                        }}
                      >
                        <Radio value={true}>Yes</Radio>
                        <Radio value={false}>No</Radio>
                      </Radio.Group>
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem
                      label="Caste Certificate Number"
                      name="casteCertificateNumber"
                      rules={[{ required: true }]}
                    >
                      <InputFields
                        placeholder="Please input your Caste Certificate Number"
                        name="casteCertificateNumber"
                        defaultValue={personalInfo.casteCertificateNumber}
                        value={casteCertificateNumber}
                        onChange={(e) => {
                          setcasteCertificateNumber(e.target.value);
                        }}
                      />
                    </FormItem>
                  </Col>
                </>
              ) : (
                <></>
              )}
            </Row>
            <Row>
              <Col span={8}>
                <FormItem
                  label="Issuing Authority"
                  name="issueAuthority"
                  rules={[{ required: true }]}
                >
                  <InputFields
                    placeholder="Please input your Issue Authority"
                    name="issueAuthority"
                    defaultValue={personalInfo.issueAuthority}
                  />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  label="District"
                  name="district"
                  rules={[
                    {
                      required: true,
                      message: "Please input your District!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Select a district"
                    onChange={(v, k) => {
                      setDistrict(v);
                    }}
                    style={{ width: "250px" }}
                    name="district"
                    defaultValue={personalInfo.district}
                  >
                    {data.map((dis, index) => {
                      return (
                        <Option
                          value={dis.district_name}
                          onChange={handleDistrict}
                          name="district"
                        >
                          {dis.district_name}
                        </Option>
                      );
                    })}
                  </Select>
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  label="Date of Issue"
                  name="issueDate"
                  rules={[{ required: true }]}
                >
                  <DatePick
                    name="issueDate"
                    disabledDate={disabledDate}
                    defaultValue={
                      personalInfo.issueDate == null
                        ? ""
                        : moment(personalInfo.issueDate)
                    }
                  />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <FormItem
                  label="Profile Photo (.jpeg Format & size should be 2MB or less)"
                  name="photo"
                  rules={[{ required: true }]}
                  accept=".png, .jpg, .jpeg"
                >
                  <input type="file" onChange={handlePhoto} />
                </FormItem>
                {userDetails.UserPersonalInfo[0].photo == null ? (
                  <></>
                ) : (
                  <span
                    style={{ display: "flex", cursor: "pointer" }}
                    onClick={
                      () => openImageViewer()
                      // saveAs(
                      //   REACT_APP_BASE_URL +
                      //     userDetails.UserPersonalInfo[0].photo,
                      //   "profile_photo.png"
                      // );
                    }
                  >
                    <img
                      src={
                        REACT_APP_BASE_URL +
                        userDetails.UserPersonalInfo[0].photo
                      }
                      width="40px"
                      style={{ marginRight: "10px" }}
                    />
                    <p>
                      {userDetails.UserPersonalInfo[0].photo.slice(
                        userDetails.UserPersonalInfo[0].photo.lastIndexOf("/") +
                          1
                      )}
                    </p>
                  </span>
                )}
              </Col>
              <Col span={8}>
                <FormItem
                  label="Caste Certificate (.jpeg, .pdf Format & size should be 2MB or less)"
                  name="casteCertificate"
                  rules={[{ required: true }]}
                >
                  <input
                    type="file"
                    onChange={handleCasteCertificate}
                    accept="image/jpeg, .pdf"
                  />
                </FormItem>
                {userDetails.UserPersonalInfo[0].casteCertificate == null ? (
                  <></>
                ) : (
                  <span
                    style={{ display: "flex", cursor: "pointer" }}
                    // onClick={() => {
                    //   openImageCasteViewer();
                    // }}
                  >
                    <a
                      href={
                        REACT_APP_BASE_URL +
                        userDetails.UserPersonalInfo[0].casteCertificate
                      }
                      target="_blank"
                    >
                      {"Caste Certificate View"}
                    </a>
                    {/* <img
                      src={
                        REACT_APP_BASE_URL +
                        userDetails.UserPersonalInfo[0].casteCertificate
                      }
                      width="40px"
                      style={{ marginRight: "10px" }}
                    /> */}
                    {/* {userDetails.UserPersonalInfo[0].casteCertificate.slice(
                      userDetails.UserPersonalInfo[0].casteCertificate.lastIndexOf(
                        "/"
                      ) + 1
                    )} */}
                  </span>
                )}
              </Col>
            </Row>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                onClick={handleSubmit}
                style={{ marginTop: "20px" }}
              >
                Save and Proceed
              </Button>
            </Form.Item>
          </form>
        </Container>
      </Spin>
    );
  }
};
export default PersonalInfo;
export const InputFields = styled(Input)`
  width: 250px;
`;
export const FormLayout = styled(Form)`
  margin: 25px 30px;
`;
