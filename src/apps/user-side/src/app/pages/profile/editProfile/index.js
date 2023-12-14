import React, { useState } from "react";
import { Tabs, Row, Col, Steps, Spin } from "antd";
import styled from "styled-components";
import PersonalInfo from "./personalinfo";
import IncomeDetails from "./incomeDetails";
import EligibilityDetails from "./EligibilityDetails";
import { Link } from "react-router-dom";
import { AppstoreOutlined } from "@ant-design/icons";
import ResidentialInfo from "./residential";
import BankDetails from "./bankAccount";
import OtherDetails from "./otherDetails";
import QualificationDetails from "./qualificationDetails";
import { LoadContainer, ProfileMenu, StatusSteps } from "./style";
import useBeneficiaryData from "../../container";
import { TiTick } from "react-icons/ti";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const ProfileForm = (props) => {
  const { singleUser, statusLoading, isPersonal } = useBeneficiaryData();

  const [menuCurrent, setMenuCurrent] = useState(`${props.relUrl}`);
  const onClick = (e) => {
    setMenuCurrent(e.key);
  };
  const [current, setCurrent] = useState(0);
  const onChange = (value) => {
    setCurrent(value);
  };

  const items = [
    getItem(
      <Link to="/personal-information">Personal</Link>,
      "personal-information",
      <AppstoreOutlined />
    ),
    getItem(
      <Link to="/income-and-domicile-information">Income and Domicile</Link>,
      "income-and-domicile-information",
      <AppstoreOutlined />
    ),
    getItem(
      <Link to="/eligibility-information">Eligibility </Link>,
      "eligibility-information",
      <AppstoreOutlined />
    ),
    getItem(
      <Link to="/qualification-information">Qualification </Link>,
      "qualification-information",
      <AppstoreOutlined />
    ),
    getItem(
      <Link to="/residential-information">Residential </Link>,
      "residential-information",
      <AppstoreOutlined />
    ),
    getItem(
      <Link to="/bank-information">Bank </Link>,
      "bank-information",
      <AppstoreOutlined />
    ),
    getItem(
      <Link to="/other-information">Other </Link>,
      "other-information",
      <AppstoreOutlined />
    ),
  ];
  if (statusLoading == true) {
    return (
      <LoadContainer>
        <Spin tip="Loading data..." />
      </LoadContainer>
    );
  } else {
    return (
      <MainContainer>
        <Row>
          <Col span={4}>
            <ProfileMenu
              onClick={onClick}
              selectedKeys={[menuCurrent]}
              mode="vertical"
              items={items}
            />
          </Col>
          <Col span={20} style={{ background: "#eaeef3", width: "100%" }}>
            <StatusSteps
              current={current}
              onChange={onChange}
              items={[
                {
                  status:
                    singleUser.data.UserPersonalInfo[0].isCompleted == true
                      ? "finish"
                      : "process",
                  title: <Link to="/personal-information">Personal</Link>,
                },
                {
                  status:
                    singleUser.data.CustomUserIncomeAndDomicileInfo[0]
                      .isCompleted == true
                      ? "finish"
                      : "process",
                  title: (
                    <Link to="/income-and-domicile-information">
                      Income/Domicile
                    </Link>
                  ),
                },
                {
                  status:
                    singleUser.data.CustomUsereligibilityInfo[0].isCompleted ==
                    true
                      ? "finish"
                      : "process",
                  title: (
                    <Link to="/eligibility-information">Eligibility </Link>
                  ),
                },
                {
                  status:
                    singleUser.data.CustomUserQualificationInfo[0]
                      .isCompleted == true
                      ? "finish"
                      : "process",
                  title: (
                    <Link to="/qualification-information">Qualification </Link>
                  ),
                },
                {
                  status:
                    singleUser.data.CustomUserResidentialInfo[0].isCompleted ==
                    true
                      ? "finish"
                      : "process",
                  title: (
                    <Link to="/residential-information">Residential </Link>
                  ),
                },
                {
                  status:
                    singleUser.data.CustomUserBankInfo[0].isCompleted == true
                      ? "finish"
                      : "process",
                  title: <Link to="/bank-information">Bank </Link>,
                },
                {
                  status:
                    singleUser.data.CustomUserOtherInfo[0].isCompleted == true
                      ? "finish"
                      : "process",
                  title: <Link to="/other-information">Other </Link>,
                },
              ]}
            />
            {props.relUrl == "personal-information" ? <PersonalInfo /> : ""}
            {props.relUrl == "income-and-domicile-information" ? (
              <IncomeDetails />
            ) : (
              ""
            )}
            {props.relUrl == "eligibility-information" ? (
              <EligibilityDetails />
            ) : (
              ""
            )}
            {props.relUrl == "qualification-information" ? (
              <QualificationDetails />
            ) : (
              ""
            )}
            {props.relUrl == "residential-information" ? (
              <ResidentialInfo />
            ) : (
              ""
            )}
            {props.relUrl == "bank-information" ? <BankDetails /> : ""}
            {props.relUrl == "other-information" ? <OtherDetails /> : ""}
          </Col>
        </Row>
      </MainContainer>
    );
  }
};
export default ProfileForm;
export const MainContainer = styled.div`
  margin: 0px;
`;
export const Tab = styled(Tabs)`
  .ant-tabs-tab {
    padding: 15px !important;
  }
`;
