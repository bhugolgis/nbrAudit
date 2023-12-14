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
import React, { useEffect, useState, useCallback } from "react";
import moment from "moment";
import axios from "axios";

import LFBasicDetails from "./components/BasicDetails";
import LFAddressDetails from "./components/AddressDetails";
import LFFamilyDetails from "./components/FamilyDetails";
import LFBusinessDetails from "./components/BusinessDetails";
import LFEducationLoanDetails from "./components/EducationLoanDetails";
import LFDocuments from "./components/Documents";
import LFSummary from "./components/Summary";
import { REACT_APP_BASE_URL } from "../../utils/urls";
import { BeneficiaryId, Token } from "../../utils/sessionStorage";

const LoanForm = (props) => {
  const { Step } = Steps;
  const [currentstep, setcurrentStep] = useState(0);
  const [progressValue, setProgressValue] = useState(10);
  const [pageLoading, setPageLoading] = useState(false);

  const [form] = Form.useForm();

  const [FamilyData, setFamilyData] = useState(
    props.data ? props.data.FamilyDetails : []
  );
  const [DocData, setDocData] = useState();
  const [LoanCount, setLoanCount] = useState(0);

  useEffect(() => {
    const userResponseFunc = async () => {
      const response = await axios({
        method: "get",
        url: `${REACT_APP_BASE_URL}/loan/LoanCountBeneficiary/${BeneficiaryId}`,
        headers: { Authorization: `token ${Token}` },
      });
      setLoanCount(response.data[0].TotalLoanCount);
    };
    userResponseFunc();
  }, []);

  const LoanSchemeName = (address) => {
    switch (address) {
      case "state-subsidy":
        return "Scheme: Subsidy Scheme";
      case "state-mm":
        return "Scheme: Money Margin Scheme";
      case "state-df":
        return "Scheme: Direct Finance Scheme";

      case "central-nsfdc-tl-a":
        return "Scheme: NSFDC-Term Loan-a";
      case "central-nsfdc-tl-b":
        return "Scheme: NSFDC-Term Loan-b";
      case "central-nsfdc-tl-c":
        return "Scheme: NSFDC-Term Loan-c";
      case "central-nsfdc-tl-d":
        return "Scheme: NSFDC-Term Loan-d";
      case "central-nsfdc-mcf":
        return "Scheme: NSFDC-Micro Credit Finance";
      case "central-nsfdc-msy":
        return "Scheme: NSFDC-Mahila Samriddhi Yojana";
      case "central-nsfdc-mky":
        return "Scheme: NSFDC-Mahila Kisan Yojana";
      case "central-nsfdc-may":
        return "Scheme: NSFDC-Mahila Aadhikarita Yojana";
      case "central-nsfdc-el-a":
        return "Scheme: NSFDC-Education loan scheme-domestic";
      case "central-nsfdc-el-b":
        return "Scheme: NSFDC-Education loan scheme-international";
      case "central-nsfdc-gbsa":
        return "Scheme: NSFDC-Green business scheme-a";
      case "central-nsfdc-gbsb":
        return "Scheme: NSFDC-Green business scheme-b";
      case "central-nsfdc-gbsc":
        return "Scheme: NSFDC-Green business scheme-c";
      case "central-nsfdc-lvy":
        return "Scheme: NSFDC-Laghu Vyavasay Yojana";

      case "central-nskfdc-msy":
        return "Scheme: NSKFDC-Mahila Samriddhi Yojana";
      case "central-nskfdc-may":
        return "Scheme: NSKFDC-Mahila Aadhikarita Yojana";
      case "central-nskfdc-mcf":
        return "Scheme: NSKFDC-Micro Credit Finance";
      case "central-nskfdc-gtl":
        return "Scheme: NSKFDC-General Term Loan";
      case "central-nskfdc-el-a":
        return "Scheme: NSKFDC-Education loan scheme-domestic";
      case "central-nskfdc-el-b":
        return "Scheme: NSKFDC-Education loan scheme-international";
      case "central-nskfdc-suy-a":
        return "Scheme: NSKFDC-Swachhta Udyami Yojana-a";
      case "central-nskfdc-suy-b":
        return "Scheme: NSKFDC-Swachhta Udyami Yojana-b";
      case "central-nskfdc-sms":
        return "Scheme: NSKFDC-Sanitary marts scheme";
      case "central-nskfdc-gbs":
        return "Scheme: NSKFDC-Green business scheme";
      case "central-nskfdc-vetls":
        return "Scheme: NSKFDC-vocational education and training loan";
      default:
        return "Scheme: NSKFDC Term Loan";
    }
  };

  const LoanApplicationid = (address) => {
    switch (address) {
      case "state-subsidy":
        return "SSA-" + moment().format("YYMMDDHHMM") + "-" + BeneficiaryId;
      case "state-mm":
        return "MMS-" + moment().format("YYMMDDHHMM") + "-" + BeneficiaryId;
      case "state-df":
        return "DFS-" + moment().format("YYMMDDHHMM") + "-" + BeneficiaryId;

      case "central-nsfdc-tl-a":
        return (
          "NSFDC-TL-A-" + moment().format("YYMMDDHHMM") + "-" + BeneficiaryId
        );
      case "central-nsfdc-tl-b":
        return (
          "NSFDC-TL-B-" + moment().format("YYMMDDHHMM") + "-" + BeneficiaryId
        );
      case "central-nsfdc-tl-c":
        return (
          "NSFDC-TL-C-" + moment().format("YYMMDDHHMM") + "-" + BeneficiaryId
        );
      case "central-nsfdc-tl-d":
        return (
          "NSFDC-TL-D-" + moment().format("YYMMDDHHMM") + "-" + BeneficiaryId
        );
      case "central-nsfdc-mcf":
        return (
          "NSFDC-MCF-" + moment().format("YYMMDDHHMM") + "-" + BeneficiaryId
        );
      case "central-nsfdc-msy":
        return (
          "NSFDC-MSY-" + moment().format("YYMMDDHHMM") + "-" + BeneficiaryId
        );
      case "central-nsfdc-mky":
        return (
          "NSFDC-MKY-" + moment().format("YYMMDDHHMM") + "-" + BeneficiaryId
        );
      case "central-nsfdc-may":
        return (
          "NSFDC-MAY-" + moment().format("YYMMDDHHMM") + "-" + BeneficiaryId
        );
      case "central-nsfdc-el-a":
        return (
          "NSFDC-EL-A-" + moment().format("YYMMDDHHMM") + "-" + BeneficiaryId
        );
      case "central-nsfdc-el-b":
        return (
          "NSFDC-EL-B-" + moment().format("YYMMDDHHMM") + "-" + BeneficiaryId
        );
      case "central-nsfdc-gbsa":
        return (
          "NSFDC-GBS-A-" + moment().format("YYMMDDHHMM") + "-" + BeneficiaryId
        );
      case "central-nsfdc-gbsb":
        return (
          "NSFDC-GBS-B-" + moment().format("YYMMDDHHMM") + "-" + BeneficiaryId
        );
      case "central-nsfdc-gbsc":
        return (
          "NSFDC-GBS-C-" + moment().format("YYMMDDHHMM") + "-" + BeneficiaryId
        );
      case "central-nsfdc-lvy":
        return (
          "NSFDC-LVY-" + moment().format("YYMMDDHHMM") + "-" + BeneficiaryId
        );

      case "central-nskfdc-msy":
        return (
          "NSKFDC-MSY-" + moment().format("YYMMDDHHMM") + "-" + BeneficiaryId
        );
      case "central-nskfdc-may":
        return (
          "NSKFDC-MAY-" + moment().format("YYMMDDHHMM") + "-" + BeneficiaryId
        );
      case "central-nskfdc-mcf":
        return (
          "NSKFDC-MCF-" + moment().format("YYMMDDHHMM") + "-" + BeneficiaryId
        );
      case "central-nskfdc-gtl":
        return (
          "NSKFDC-GTL-" + moment().format("YYMMDDHHMM") + "-" + BeneficiaryId
        );
      case "central-nskfdc-el-a":
        return (
          "NSKFDC-El-A-" + moment().format("YYMMDDHHMM") + "-" + BeneficiaryId
        );
      case "central-nskfdc-el-b":
        return (
          "NSKFDC-El-B-" + moment().format("YYMMDDHHMM") + "-" + BeneficiaryId
        );
      case "central-nskfdc-suy-a":
        return (
          "NSKFDC-SUY-A-" + moment().format("YYMMDDHHMM") + "-" + BeneficiaryId
        );
      case "central-nskfdc-suy-b":
        return (
          "NSKFDC-SUY-B-" + moment().format("YYMMDDHHMM") + "-" + BeneficiaryId
        );
      case "central-nskfdc-sms":
        return (
          "NSKFDC-SMS-" + moment().format("YYMMDDHHMM") + "-" + BeneficiaryId
        );
      case "central-nskfdc-gbs":
        return (
          "NSKFDC-GbS-" + moment().format("YYMMDDHHMM") + "-" + BeneficiaryId
        );
      case "central-nskfdc-vetls":
        return (
          "NSKFDC-CETLS-" + moment().format("YYMMDDHHMM") + "-" + BeneficiaryId
        );
      default:
        return "APP-";
    }
  };
  const [data, setData] = useState({
    LoanSchemeCode: props.data ? props.data.LoanSchemeCode : props.address,
    LoanScheme: props.data
      ? props.data.LoanScheme
      : LoanSchemeName(props.address),
    Applicationid: props.data
      ? props.data.Applicationid
      : LoanApplicationid(props.address),

    ...props.data,
  });

  const onFinish = (values) => {};

  const onFinishFailed = (errorInfo) => {};

  const handleNextAStep = useCallback(
    (data) => {
      setcurrentStep(currentstep + 1);
      setProgressValue(progressValue + 15);
    },
    [currentstep]
  );

  const handleNextStepFD = (e) => {
    setFamilyData(e);
    handleNextStep(e);
  };

  const handleNextStepDoc = (e) => {
    setDocData(e);
    handleNextStep(e);
  };

  const handleNextStep = useCallback(
    (newdata) => {
      var output = Object.assign(data, newdata);
      setData(output);
      setcurrentStep(currentstep + 1);
      setProgressValue(progressValue + 15);
    },
    [currentstep]
  );

  const handlePrevStep = useCallback(
    (data) => {
      //setData(data);
      setcurrentStep(currentstep - 1);
      setProgressValue(progressValue - 15);
    },
    [currentstep]
  );

  const handleSubmit = useCallback((data) => {
    setData(data);
    setProgressValue(progressValue + 15);
    message.success("Processing complete!");
  }, []);

  return (
    <MainContainer>
      {LoanCount !== 0 ? (
        <h3>Already your loan is running.</h3>
      ) : (
        <>
          <Progress percent={progressValue} />
          <Steps current={currentstep}>
            <Step key={"Basic Details"} title={"Basic Details"} />
            <Step key={"Address Details"} title={"Address Details"} />
            <Step key={"Family Details"} title={"Family Details"} />
            <Step
              key={"Business Details"}
              title={
                props.address == "central-nsfdc-el-a" ||
                props.address == "central-nsfdc-el-b" ||
                props.address == "central-nskfdc-el-a" ||
                props.address == "central-nskfdc-el-b"
                  ? "Education Details"
                  : "Business Details"
              }
            />
            <Step key={"Documents"} title={"Documents"} />
            <Step key={"Summary"} title={"Summary"} />
          </Steps>
          <br />
          <h2>{LoanSchemeName(props.address)}</h2>

          {currentstep === 0 && (
            <LFBasicDetails
              data={data}
              form={form}
              onSuccess={handleNextStep}
            />
          )}

          {currentstep === 1 && (
            <LFAddressDetails
              data={data}
              form={form}
              onSuccess={handleNextStep}
              onBack={handlePrevStep}
            />
          )}
          {currentstep === 2 && (
            <LFFamilyDetails
              data={data}
              FamilyDataa={FamilyData}
              form={form}
              onSuccess={(e) => handleNextStepFD(e)}
              //onSuccess={handleNextStep}
              onBack={handlePrevStep}
            />
          )}
          {currentstep === 3 &&
            (props.address == "central-nsfdc-el-a" ||
            props.address == "central-nsfdc-el-b" ||
            props.address == "central-nskfdc-el-a" ||
            props.address == "central-nskfdc-el-b" ? (
              <LFEducationLoanDetails
                data={data}
                form={form}
                onSuccess={handleNextStep}
                onBack={handlePrevStep}
              />
            ) : (
              <LFBusinessDetails
                data={data}
                form={form}
                onSuccess={handleNextStep}
                onBack={handlePrevStep}
              />
            ))}
          {currentstep === 4 && (
            <LFDocuments
              data={data}
              form={form}
              //onSuccess={handleNextStep}
              onSuccess={(e) => handleNextStepDoc(e)}
              onBack={handlePrevStep}
            />
          )}
          {currentstep === 5 && (
            <LFSummary
              data={data}
              FamilyData={FamilyData}
              DocData={DocData}
              form={form}
              onSuccess={handleSubmit}
              onBack={handlePrevStep}
            />
          )}
        </>
      )}
    </MainContainer>
  );
};

export default LoanForm;
export const MainContainer = styled.div`
  margin: 20px;
`;
