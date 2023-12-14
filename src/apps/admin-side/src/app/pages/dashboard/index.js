import React, { useState, useRef } from "react";
import { Row, Col, Table, Input, Space, Button, Spin } from "antd";
import DistrictBarChart from "./Charts";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import {
  MainContainer,
  CardContainer,
  Cards,
  UserIcon,
  JobIcon,
  TrainingIcon,
  VerticalIcon,
  Count,
  VerticalCard,
  CountContainer,
  DataTable,
  CardTable,
  LoadContainer,
  SecondaryCards,
} from "./style";
import useDashboardData from "./container";
import { districtColumns } from "../../constants/columns";

// Admin Dashboard Component for all the data display and statistics.

const AdminDashboard = (props) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const verticalWiseColumns = [
    {
      title: "Vertical Name",
      dataIndex: "vertical__VerticalName",
    },
    {
      title: "Job Count",
      dataIndex: "total",
    },
  ];

  const { districtCount, verticalJobCount, dashboardCounts, dashboardLoading } =
    useDashboardData();
  if (dashboardLoading == true) {
    return (
      <LoadContainer>
        <Spin tip="Loading data" />
      </LoadContainer>
    );
  } else {
    return (
      <div>
        <h3>Dashboard</h3>
        <CardContainer>
          <Row>
            <Col span={6}>
              <Cards>
                <Row>
                  <Col span={8}>
                    <UserIcon />
                  </Col>
                  <Col span={16}>
                    <h4>Total Beneficiary</h4>
                    <Count>{dashboardCounts.TotalBeneficaryCount}</Count>
                  </Col>
                </Row>
              </Cards>
            </Col>
            <Col span={6}>
              <Cards>
                <Row>
                  <Col span={8}>
                    <JobIcon />
                  </Col>
                  <Col span={16}>
                    <h4>Job Applications</h4>
                    <Count>{dashboardCounts.TotalJobApplicationsCount}</Count>
                  </Col>
                </Row>
              </Cards>
            </Col>
            <Col span={6}>
              <Cards>
                <Row>
                  <Col span={8}>
                    <TrainingIcon />
                  </Col>
                  <Col span={16}>
                    <h4>Training Applications</h4>
                    <Count>
                      {dashboardCounts.TotalTrainingApplicationsCount}
                    </Count>
                  </Col>
                </Row>
              </Cards>
            </Col>
            <Col span={6}>
              <Cards>
                <Row>
                  <Col span={8}>
                    <VerticalIcon />
                  </Col>
                  <Col span={16}>
                    <h4>Verticals</h4>
                    <Count>{dashboardCounts.TotalVerticalsCount}</Count>
                  </Col>
                </Row>
              </Cards>
            </Col>
          </Row>
        </CardContainer>
        <CardContainer>
          <Row style={{ marginTop: "20px" }}>
            <Col span={6}>
              <SecondaryCards>
                <Row>
                  <Col span={8}>
                    <JobIcon />
                  </Col>
                  <Col span={16}>
                    <h4>Selected Job Applicants</h4>
                    <Count>{dashboardCounts.SelectedJobApplicants}</Count>
                  </Col>
                </Row>
              </SecondaryCards>
            </Col>
            <Col span={6}>
              <SecondaryCards>
                <Row>
                  <Col span={8}>
                    <JobIcon />
                  </Col>
                  <Col span={16}>
                    <h4>Selected Training Applications</h4>
                    <Count>{dashboardCounts.SelectedTrainingApplication}</Count>
                  </Col>
                </Row>
              </SecondaryCards>
            </Col>
            <Col span={6}>
              <SecondaryCards>
                <Row>
                  <Col span={8}>
                    <JobIcon />
                  </Col>
                  <Col span={16}>
                    <h4>Total Loan Disbursed </h4>
                    <Count>{dashboardCounts.TotalLoanDisbursed}</Count>
                  </Col>
                </Row>
              </SecondaryCards>
            </Col>
            <Col span={6}>
              <SecondaryCards>
                <Row>
                  <Col span={8}>
                    <JobIcon />
                  </Col>
                  <Col span={16}>
                    <h4>Loan Application Sanctioned</h4>
                    <Count>{dashboardCounts.ApplicationSactioned}</Count>
                  </Col>
                </Row>
              </SecondaryCards>
            </Col>
          </Row>
        </CardContainer>
        <CardContainer>
          <Row style={{ marginTop: "20px" }}>
            <Col span={6}>
              <SecondaryCards>
                <Row>
                  <Col span={8}>
                    <JobIcon />
                  </Col>
                  <Col span={16}>
                    <h4>Total Live Jobs</h4>
                    <Count>{dashboardCounts.TotalLiveJobs}</Count>
                  </Col>
                </Row>
              </SecondaryCards>
            </Col>
            <Col span={6}>
              <SecondaryCards>
                <Row>
                  <Col span={8}>
                    <JobIcon />
                  </Col>
                  <Col span={16}>
                    <h4>Total Live Training</h4>
                    <Count>{dashboardCounts.TotalLiveTraining}</Count>
                  </Col>
                </Row>
              </SecondaryCards>
            </Col>
            <Col span={6}>
              <SecondaryCards>
                <Row>
                  <Col span={8}>
                    <JobIcon />
                  </Col>
                  <Col span={16}>
                    <h4>Pending Job Applications</h4>
                    <Count>{dashboardCounts.PendingJobApplication}</Count>
                  </Col>
                </Row>
              </SecondaryCards>
            </Col>
            <Col span={6}>
              <SecondaryCards>
                <Row>
                  <Col span={8}>
                    <JobIcon />
                  </Col>
                  <Col span={16}>
                    <h4>Pending Training Applications</h4>
                    <Count>{dashboardCounts.PendingTrainingApplication}</Count>
                  </Col>
                </Row>
              </SecondaryCards>
            </Col>
          </Row>
        </CardContainer>
        <CardContainer>
          <Row style={{ marginTop: "20px" }}>
            <Col span={6}>
              <SecondaryCards>
                <Row>
                  <Col span={8}>
                    <JobIcon />
                  </Col>
                  <Col span={16}>
                    <h4>Pending Loan Application</h4>
                    <Count>{dashboardCounts.PendingLoanApplication}</Count>
                  </Col>
                </Row>
              </SecondaryCards>
            </Col>
            {/* <Col span={6}>
              <SecondaryCards>  
                <Row>
                  <Col span={8}>
                    <JobIcon />
                  </Col>
                  <Col span={16}>
                    <h4>Total Live Training</h4>
                    <Count>{dashboardCounts.TotalLiveTraining}</Count>
                  </Col>
                </Row>
              </SecondaryCards>
            </Col> */}
          </Row>
        </CardContainer>
        <Row
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Col span={14}>
            <CardTable>
              <h3>Districtwise Count</h3>
              <DataTable
                columns={districtColumns}
                dataSource={districtCount}
                pagination={{ pageSize: 4 }}
              />
            </CardTable>
          </Col>
          <Col span={10}>
            <CardTable>
              <h3>Verticalwise Job Offered</h3>
              <DataTable
                columns={verticalWiseColumns}
                dataSource={verticalJobCount}
                pagination={{ pageSize: 4 }}
              />
            </CardTable>
          </Col>
        </Row>
        <CountContainer>
          <Col span={24}>
            <DistrictBarChart />
          </Col>
        </CountContainer>
      </div>
    );
  }
};
export default AdminDashboard;
