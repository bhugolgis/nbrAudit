import React, { useState, useEffect } from "react";
import { Button, Menu, Row, Col, Tabs, Select } from "antd";
import { Link } from "react-router-dom";
import disData from "../../../data/disFilter.json";
import axios from "axios";
import useBeneficiaryList from "./container";
import LoanFormAllData from "./LoanFormAllData";
import {
  NavBeneficiary,
  NavDashboard,
  NavJob,
  NavLoan,
  NavTraining,
  NavUser,
  ClearButton,
  SearchInput,
} from "../../../apps/admin-side/style";
import data from "../../../data/dtdata.json";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const { TabPane } = Tabs;

const items = [
  getItem(
    <Link to="/admin-dashboard">Dashboard</Link>,
    "admin-dashboard",
    <NavDashboard />
  ),
  getItem(
    <Link to="/admin-beneficiaries-list">Beneficiaries</Link>,
    "admin-beneficiaries-list",
    <NavBeneficiary />
  ),
  getItem("Users", "users", <NavUser />, [
    getItem(<Link to="/admin-cgm">CGM</Link>, "admin-cgm"),
    getItem(<Link to="/admin-dm">District Manager</Link>, "admin-dm"),
    getItem(<Link to="/admin-rm">Regional Manager</Link>, "admin-rm"),
  ]),
  getItem("Jobs", "admin-jobs", <NavJob />, [
    getItem(
      <Link to="/admin-job-dashboard">Jobs Dashboard</Link>,
      "admin-job-dashboard"
    ),
    getItem(
      <Link to="/admin-current-jobs">Current Jobs</Link>,
      "admin-current-jobs"
    ),

    getItem(<Link to="/admin-past-jobs">Past Jobs</Link>, "admin-past-jobs"),
  ]),
  getItem("Loan Schemes", "admin-loan-schemes", <NavLoan />),
  getItem("Training", "admin-training", <NavTraining />),
];

const { Option } = Select;

const LoanBankpage = () => {
  const mainUrl = window.location.pathname;
  const relUrl = mainUrl.slice(1);
  const [userData, setUserData] = useState();
  const {
    userList,
    pageLoading,
    isModalOpen,
    modalLoading,
    disFilter,
    nameFilter,
    setDisFilter,
    handleDistrict,
    handleName,
    handleSearch,
    handleClear,
    setModalLoading,
    handleOk,
    handleNext,
    handlePrev,
    handleCancel,
    showModal,
  } = useBeneficiaryList();

  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     //url: `${REACT_APP_BASE_URL}/loanmanagement/StatuswiseTotalListAPI`,
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //       Authorization: `token ${sessionStorage.getItem("token")}`,
  //     },
  //   }).then((response) => {
  //     setUserData(response.data.count);
  //   });
  // });

  return (
    <div>
      <Row>
        <Col span={4}>
          <Menu defaultSelectedKeys={`${relUrl}`} mode="inline" items={items} />
        </Col>
        <Col
          span={20}
          style={{ backgroundColor: "#eaeef3", padding: "15px 30px 30px 30px" }}
        >
          <Tabs>
            <TabPane tab="RM-Approved" key="tab-a">
              <LoanFormAllData statusname="BO" heading="BO-Pending" />
            </TabPane>
            <TabPane tab="Bank-Approved" key="tab-b">
              <LoanFormAllData statusname="MPBCDC-MD" heading="Bank-Approved" />
            </TabPane>
            <TabPane tab="MPBCDC-MD Approved" key="tab-c">
              <LoanFormAllData
                statusname="BANK-RELEASE"
                heading="MPBCDC-MD Approved"
              />
            </TabPane>
            <TabPane tab="Bank Loan Released" key="tab-d">
              {/* <span>
            <Select
              showSearch
              placeholder="Select a district"
              onChange={(v, k) => {
                setDisFilter(v);
              }}
              style={{ width: "200px" }}
              name="district"
              value={disFilter}
            >
              {data.map((dis) => {
                return (
                  <Option
                    value={dis.district_name}
                    name="district"
                    onChange={handleDistrict}
                  >
                    {dis.district_name}
                  </Option>
                );
              })}
            </Select>
            <SearchInput
              placeholder="Name"
              value={nameFilter}
              onChange={handleName}
              name="name"
            />
            <Button type="primary" onClick={handleSearch}>
              Search
            </Button>
            <ClearButton type="primary" onClick={handleClear}>
              Clear filters
            </ClearButton>
          </span> */}

              <LoanFormAllData
                statusname="LOAN-ACTIVE"
                heading="Bank Loan Released"
              />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
};

export default LoanBankpage;
