import { Row, Col, Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { MainContainer } from "./style";
import { AppstoreOutlined } from "@ant-design/icons";
import LoanMPBCDCMDpage from "../../libs/common-ui/LoanManagement/LoanMPBCDCMDpage";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem(
    <Link to="/loanmpbcdcmdpage">Loan Applications</Link>,
    "loanmpbcdcmdpage",
    <AppstoreOutlined />
  ),
];
const MPBCDCMDDashboard = () => {
  const mainUrl = window.location.pathname;
  const relUrl = mainUrl.slice(1);

  return (
    <Row>
      <Col span={4}>
        <Menu defaultSelectedKeys={`${relUrl}`} mode="inline" items={items} />
      </Col>
      <Col span={20}>
          {relUrl == "loanmpbcdcmdpage" ? <LoanMPBCDCMDpage /> : ""}
      </Col>
    </Row>
  );
};
export default MPBCDCMDDashboard;
