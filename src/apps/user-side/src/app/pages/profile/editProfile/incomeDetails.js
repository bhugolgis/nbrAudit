import React, { useEffect, useState, useRef, useCallback } from "react";
import { Button, Radio, Row, Col, message, Spin } from "antd";
import moment from "moment";
import axios from "axios";
import styled from "styled-components";
import { InputFields } from "./personalinfo";
import { Completed, DatePick, Incomplete, LoadContainer } from "./style";
import { Token } from "../../../../../../../libs/utils/sessionStorage";
import { REACT_APP_BASE_URL } from "../../../../../../../libs/utils/urls";
import { FormItem } from "./style";
import { saveAs } from "file-saver";
import ImageViewer from "react-simple-image-viewer";

const IncomeDetails = (props) => {
  const disabledDate = (current) => {
    return current && current > moment().endOf("day");
  };
  const formData = useRef();
  const [isCertificateChanged, setIsCertificateChanged] = useState(false);
  const [incomePageLoading, setIncomePageLoading] = useState(true);
  const [infoLoading, setInfoLoading] = useState(false);
  const [incomeCertificateImage, setIncomeCertificateImage] = useState(null);
  const [radioIncomeCertificate, setRadioIncomeCertificate] = useState();
  const [incomeDetails, setIncomeDetails] = useState();
  const [famIncome, setFamIncome] = useState();
  const handleIncomeCertificateValue = (e) => {
    setRadioIncomeCertificate(e.target.value);
  };
  const handleIncomeCertificate = (e) => {
    setIncomeCertificateImage(e.target.files[0]);

    setIsCertificateChanged(true);
  };
  useEffect(() => {
    const userResponseFunc = async () => {
      const response = await axios({
        method: "get",
        url: `${REACT_APP_BASE_URL}/applicant/ApplicantDetailView`,
        headers: { Authorization: `token ${Token}` },
      });
      setIncomeDetails(response.data.CustomUserIncomeAndDomicileInfo[0]);
      setIncomeCertificateImage(
        response.data.CustomUserIncomeAndDomicileInfo[0].incomeCertificate
      );
      setIncomePageLoading(false);
    };
    userResponseFunc();
  }, []);

  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const openImageViewer = useCallback(() => {
    setIsViewerOpen(true);
  }, []);
  const closeImageViewer = () => {
    setIsViewerOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      familyIncome,
      haveIncomeCertificate,
      isIncomeCertificateFromAaple,
      incomeCertificateNumber,
      issueAuthority,
      issueDate,
      issueDateOfDomicile,
    } = formData.current;

    const incomeData = new FormData();

    if (familyIncome.value == "") {
      message.warning("Family Income is empty");
    } else if (radioIncomeCertificate == null) {
      message.warning("Please select whether you have income certificate ");
    } else if (familyIncome.value >= 300001) {
      message.warning("Income should be less than or equal to 3,00,000");
    } else if (
      radioIncomeCertificate == false &&
      familyIncome.value != "" &&
      familyIncome.value <= 300000
    ) {
      incomeData.append("familyIncome", familyIncome.value);
      incomeData.append("haveIncomeCertificate", radioIncomeCertificate);
      incomeData.append("isCompleted", true);
      axios({
        method: "patch",
        url: `${REACT_APP_BASE_URL}/applicant/UpdateIncomeAndDomicileInfo`,
        data: incomeData,
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
              window.location.replace("/eligibility-information");
            }, 1500);
          } else if (response.data.status == "error") {
            message.error(response.data.message);
          }
        })
        .catch((error) => {
          message.warning(error.message);
        });
    }

    if (radioIncomeCertificate == true && familyIncome.value != "") {
      if (isIncomeCertificateFromAaple.value == "") {
        message.warning(
          "Please select if you have income certificate from Aaple sarkar"
        );
      } else if (incomeCertificateNumber.value == "") {
        message.warning("Income Certificate Number is Empty");
      } else if (issueAuthority.value == "") {
        message.warning("Issue Authority is empty");
      } else if (issueDate.value == "") {
        message.warning("Date of issue is empty");
        // } else if (issueDateOfDomicile.value == "") {
        //   message.warning("Date issue Of Domicile is empty");
      } else if (incomeCertificateImage == null) {
        message.warning("Please upload Income Certificate");
      } else {
        incomeData.append("familyIncome", familyIncome.value);
        incomeData.append("haveIncomeCertificate", radioIncomeCertificate);
        incomeData.append(
          "isIncomeCertificateFromAaple",
          isIncomeCertificateFromAaple.value
        );
        incomeData.append(
          "incomeCertificateNumber",
          incomeCertificateNumber.value
        );
        incomeData.append("issueAuthority", issueAuthority.value);
        incomeData.append("issueDate", issueDate.value);
        // incomeData.append("issueDateOfDomicile", issueDateOfDomicile.value);
        if (
          incomeCertificateImage == null ||
          typeof incomeCertificateImage == "object"
        ) {
          incomeData.append("incomeCertificate", incomeCertificateImage);
        }
        incomeData.append("isCompleted", true);
        axios({
          method: "patch",
          url: `${REACT_APP_BASE_URL}/applicant/UpdateIncomeAndDomicileInfo`,
          data: incomeData,
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
                window.location.replace("/eligibility-information");
              }, 1500);
            } else if (response.data.status == "error") {
              message.error(response.data.message);
            }
          })
          .catch((error) => {
            message.warning(error.message);
          });
      }
    }
  };
  if (incomePageLoading == true) {
    return (
      <LoadContainer>
        <Spin tip="Loading data" />
      </LoadContainer>
    );
  } else {
    return (
      <Spin spinning={infoLoading} tip="Saving Data">
        <MainContainer>
          {isViewerOpen && (
            <ImageViewer
              src={[REACT_APP_BASE_URL + incomeCertificateImage]}
              onClose={closeImageViewer}
              backgroundStyle={{
                backgroundColor: "rgba(0,0,0,0.9)",
              }}
            />
          )}
          <form ref={formData}>
            <Row>
              <Col span={8}>
                <FormItem
                  label="Family Income"
                  name="familyIncome"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Family Income!",
                    },
                  ]}
                >
                  <InputFields
                    placeholder="Please input your Family Income"
                    name="familyIncome"
                    type="tel"
                    defaultValue={incomeDetails.familyIncome}
                    maxLength={6}
                    onChange={(e) => {
                      setFamIncome(e.target.value);
                    }}
                  />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="Do you have Income certificate ?" required>
                  <Radio.Group
                    name="haveIncomeCertificate"
                    // defaultValue={incomeDetails.haveIncomeCertificate}
                    value={radioIncomeCertificate}
                    onChange={handleIncomeCertificateValue}
                  >
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>
                </FormItem>
              </Col>
              {radioIncomeCertificate == true ? (
                <Col span={8}>
                  <FormItem
                    label="Is Income certificate generated from Aaple sarkar portal ?"
                    required
                  >
                    <Radio.Group
                      name="isIncomeCertificateFromAaple"
                      defaultValue={incomeDetails.isIncomeCertificateFromAaple}
                    >
                      <Radio value={true}>Yes</Radio>
                      <Radio value={false}>No</Radio>
                    </Radio.Group>
                  </FormItem>
                </Col>
              ) : (
                <></>
              )}
            </Row>
            {radioIncomeCertificate === true ? (
              <Row>
                <Col span={8}>
                  <FormItem
                    label="Income Certificate Number"
                    name="incomeCertificateNumber"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Family Income!",
                      },
                    ]}
                  >
                    <InputFields
                      placeholder="Please enter you income certificate number"
                      name="incomeCertificateNumber"
                      defaultValue={incomeDetails.incomeCertificateNumber}
                    />
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem
                    label="Issue Authority"
                    name="issueAuthority"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Family Income!",
                      },
                    ]}
                  >
                    <InputFields
                      placeholder="Please enter Issue Authority"
                      name="issueAuthority"
                      defaultValue={incomeDetails.issueAuthority}
                    />
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem label="Date of Issue" required>
                    <DatePick
                      name="issueDate"
                      disabledDate={disabledDate}
                      defaultValue={
                        incomeDetails.issueDate == null
                          ? ""
                          : moment(incomeDetails.issueDate)
                      }
                    />
                  </FormItem>
                </Col>
              </Row>
            ) : (
              <></>
            )}

            {radioIncomeCertificate == true ? (
              <Row>
                <Col span={8}>
                  {/* <FormItem label="Issue Date of Domicile">
                    <DatePick
                      name="issueDateOfDomicile"
                      type="date"
                      disabledDate={disabledDate}
                      defaultValue={
                        incomeDetails.issueDateOfDomicile == null
                          ? ""
                          : moment(incomeDetails.issueDateOfDomicile)
                      }
                    />
                  </FormItem> */}
                  <FormItem label="Income Certificate" required>
                    <input
                      type="file"
                      name="incomeCertificate"
                      onChange={handleIncomeCertificate}
                    />
                  </FormItem>
                  {incomeDetails.incomeCertificate == null ? (
                    <></>
                  ) : (
                    <span
                      style={{
                        display: "flex",
                        cursor: "pointer",
                        marginBottom: "20px",
                      }}
                      onClick={() => {
                        if (
                          incomeDetails.incomeCertificate.slice(
                            incomeDetails.incomeCertificate.lastIndexOf(".") + 1
                          ) == "pdf"
                        ) {
                          openImageViewer();
                        } else {
                          openImageViewer();
                        }
                      }}
                    >
                      {/* <img
                        src={
                          REACT_APP_BASE_URL + incomeDetails.incomeCertificate
                        }
                        width="40px"
                        style={{ marginRight: "10px" }}
                      /> */}
                      {incomeDetails.incomeCertificate.slice(
                        incomeDetails.incomeCertificate.lastIndexOf(".") + 1
                      )}
                      {incomeDetails.incomeCertificate.slice(
                        incomeDetails.incomeCertificate.lastIndexOf("/") + 1
                      )}
                    </span>
                  )}
                </Col>
              </Row>
            ) : (
              <></>
            )}

            <Button htmlType="submit" type="primary" onClick={handleSubmit}>
              Save and Proceed
            </Button>
          </form>
        </MainContainer>
      </Spin>
    );
  }
};
export default IncomeDetails;
export const MainContainer = styled.div`
  margin: 25px 30px;
`;
