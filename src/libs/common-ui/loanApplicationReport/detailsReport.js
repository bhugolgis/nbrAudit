import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { DatePick } from "../forgot-password/style";
import { Cards } from "./style";
import data from "../../../data/dtdata.json";
import { DataTable } from "../Tables/style";
import axios from "axios";
import { useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import disData from "../../../data/disFilter.json";
import moment from "moment";
import { CSVLink } from "react-csv";
import { useReactToPrint } from "react-to-print";
import { REACT_APP_BASE_URL } from "../../utils/urls";

const LoanAppDetailReport = () => {
  const [talukaKey, setTalukaKey] = useState(0);
  const [taluka, setTaluka] = useState(null);
  const [district, setDistrict] = useState(null);
  const [selectVisible, setSelectVisible] = useState(true);
  const [detailData, setDetailData] = useState([]);
  const [excelUrl, setExcelUrl] = useState(null);
  const { Option } = Select;

  const handleDistrict = (e) => {
    setDistrict(e.target.value);
  };

  const handleExcelUrl = () => {
    if (fromDate !== null && toDate === null) {
      message.warning("Please select End date");
    } else if (fromDate === null && toDate !== null) {
      message.warning("Please select Start Date");
    } else {
      let url = `${REACT_APP_BASE_URL}/loan/XlsxLoanReportDetailList/?SubSchemeName=${subSchemeName}&District=${district}&Taluka=${taluka}&LoanSchemeCode=${schemeName}`;

      if (fromDate !== null && toDate !== null) {
        url += `&start_date=${moment(fromDate).format(
          "YYYY-MM-DD"
        )}&end_date=${moment(toDate).format("YYYY-MM-DD")}`;
      }

      setExcelUrl(url);
    }
  };

  useEffect(() => {
    axios
      .get(`${REACT_APP_BASE_URL}/loan/LoanReportDetailList/`)
      .then((response) => {
        setDetailData(response.data.results);
      });
  }, []);

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
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
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
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
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

  const detailReport = [
    {
      title: "Application ID",
      dataIndex: "Applicationid",
      ...getColumnSearchProps("Applicationid"),
    },
    {
      title: "Scheme",
      dataIndex: "LoanScheme",
    },
    {
      title: "Sub Scheme",
      dataIndex: "SubSchemeName",
      // filters: [
      //   {
      //     text: "Domestic",
      //     value: "Domestic",
      //   },
      //   {
      //     text: "International",
      //     value: "International",
      //   },
      // ],
      // onFilter: (value, record) => record.SubSchemeName.indexOf(value) === 0,
    },
    {
      title: "Applicant Name",
      dataIndex: ["id", "loanData"],
      render: (id, data) => {
        return (
          <>
            {data.FirstName} {data.LastName}
          </>
        );
      },
    },
    {
      title: "Contact",
      dataIndex: "ContactNo",
    },
    {
      title: "Application Date",
      dataIndex: "createdDate",
      render: (text) => {
        return <>{text.slice(0, 10)}</>;
      },
    },
    { title: "Status", dataIndex: "LastStatus" },
    // { title: "Division", dataIndex: "Division" },
    {
      title: "District",
      dataIndex: "District",
      // filters: disData,
      // filterSearch: true,
      // onFilter: (value, record) => record.District.indexOf(value) === 0,
    },
    { title: "Taluka", dataIndex: "Taluka" },
    {
      title: "Business Name",
      dataIndex: "ProposedBusinessName",
      render: (text) => {
        if (text == "undefined") {
          return <>NA</>;
        } else {
          return <>{text}</>;
        }
      },
    },
    { title: "Family Income", dataIndex: "AnnualFamilyIncome" },
    // {
    //   title: "View Profile",
    //   dataIndex: ["id", "loanData"],
    //   render: (id, data) => {
    //     return <></>;
    //   },
    // },
  ];

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [schemeName, setSchemeName] = useState(null);
  const [subSchemeName, setSubSchemeName] = useState(null);
  const [applicantName, setApplicantName] = useState("");
  const [applicantId, setApplicantId] = useState("");

  const handleApiSearch = () => {
    console.log(fromDate, toDate);
    const formattedFromDate = fromDate.format("YYYY-MM-DD");
    console.log(formattedFromDate);
    const formattedToDate = toDate.format("YYYY-MM-DD");
    console.log(formattedToDate);
    if (fromDate !== null && toDate == null) {
      message.warning("Please select End Date");
    } else if (toDate !== null && fromDate === null) {
      message.warning("Please select Start Date");
    } else {
      if (fromDate !== null && toDate !== null) {
        axios
          .get(
            `${REACT_APP_BASE_URL}/loan/LoanReportDetailList/?District=${district}&Taluka=${taluka}&LoanSchemeCode=${schemeName}&SubSchemeName=${subSchemeName}&start_date=${moment(
              fromDate
            ).format("YYYY-MM-DD")}&end_date=${moment(toDate).format(
              "YYYY-MM-DD"
            )}`
          )
          .then((response) => {
            console.log(response.data.results);
            setDetailData(response.data.results);
          })
          .catch((error) => {
            Modal.error({ title: error.data.message });
          });
      } else if (fromDate == null && toDate == null) {
        axios
          .get(
            `${REACT_APP_BASE_URL}/loan/LoanReportDetailList/?District=${district}&Taluka=${taluka}&LoanSchemeCode=${schemeName}&SubSchemeName=${subSchemeName}`
          )
          .then((response) => {
            setDetailData(response.data.results);
          })
          .catch((error) => {
            Modal.error({ title: error.data.message });
          });
      }
    }
  };
  const handleClear = () => {
    setDistrict(null);
    setTaluka(null);
    setFromDate(null);
    setToDate(null);
    setSchemeName(null);
    setSubSchemeName(null);
    setSelectVisible(true);
    axios
      .get(`${REACT_APP_BASE_URL}/loan/LoanReportDetailList/`)
      .then((response) => {
        setDetailData(response.data.results);
      });
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <h3>Loan Application Detail Report</h3>
      <Cards>
        <Form layout="vertical">
          <Row>
            <Col span={8}>
              <Form.Item label="Start Date">
                <DatePick
                  value={fromDate}
                  onChange={(date, dateString) => {
                    setFromDate(date);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="End Date">
                <DatePick
                  value={toDate}
                  onChange={(date, dateString) => {
                    setToDate(date);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Scheme">
                <Select
                  style={{ width: "250px" }}
                  placeholder="Select Scheme"
                  value={schemeName}
                  onChange={(v) => {
                    setSchemeName(v);
                  }}
                >
                  <Option value="central-nsfdc-el-a	">
                    NSFDC Education - Domestic
                  </Option>
                  <Option value="central-nsfdc-el-b">
                    NSFDC Education - International
                  </Option>
                  <Option value="central-nskfdc-el-a">
                    NSKFDC Education - Domestic
                  </Option>
                  <Option value="central-nskfdc-el-b">
                    NSKFDC Education - International
                  </Option>
                  <Option value="central-nsfdc-mky">
                    NSFDC Mahila Kisan Yojana
                  </Option>
                  <Option value="central-nsfdc-msy">
                    NSFDC Mahila Samrudhi
                  </Option>
                  <Option value="central-nsfdc-mcf">
                    NSFDC Micro Credit Finance
                  </Option>
                  <Option value="central-nsfdc-tl-a">NSFDC-Term Loan</Option>
                  <Option value="state-df">Direct Finance Scheme</Option>
                  <Option value="state-mm">Money Margin Scheme</Option>
                  <Option value="state-subsidy">Subsidy Scheme</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item label="Sub Scheme">
                <Select
                  style={{ width: "250px" }}
                  placeholder="Select Sub Scheme"
                  value={subSchemeName}
                  onChange={(v) => {
                    setSubSchemeName(v);
                  }}
                >
                  <Option value="Domestic">Domestic</Option>
                  <Option value="International">International</Option>
                </Select>
              </Form.Item>
            </Col>
            {/* <Col span={8}>
              <Form.Item label="Division">
                <Select
                  style={{ width: "250px" }}
                  placeholder="Select Division"
                ></Select>
              </Form.Item>
            </Col> */}
            <Col span={8}>
              <Form.Item label="District" name="district">
                <Select
                  showSearch
                  style={{ width: "250px" }}
                  value={district}
                  placeholder="Select district"
                  optionFilterProp="children"
                  onChange={(v, k) => {
                    setDistrict(v);
                    setTalukaKey(k.key);
                    setSelectVisible(false);
                  }}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
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
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Taluka" name="taluka">
                <Select
                  showSearch
                  style={{ width: "250px" }}
                  placeholder="Select taluka"
                  optionFilterProp="children"
                  onChange={(v) => {
                    setTaluka(v);
                  }}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                  disabled={selectVisible}
                >
                  {data[talukaKey].talukas.map((tal) => {
                    return (
                      <Option value={tal.taluka_name}>{tal.taluka_name}</Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          {/* <Row>
            <Col span={8}>
              <Form.Item label="Mobile Number">
                <Input
                  style={{ width: "250px" }}
                  placeholder="Enter Mobile Number"
                  type="number"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Applicant ID">
                <Input
                  style={{ width: "250px" }}
                  placeholder="Enter Applicant Id"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Applicant Name">
                <Input
                  style={{ width: "250px" }}
                  placeholder="Enter Applicant Name"
                />
              </Form.Item>
            </Col>
          </Row> */}
          <Button type="primary" onClick={handleApiSearch}>
            Search
          </Button>
          <Button
            type="danger"
            style={{ marginLeft: "20px" }}
            onClick={handleClear}
          >
            Clear Search
          </Button>
        </Form>
      </Cards>
      <Cards>
        <span
          style={{ display: "flex", justifyContent: "flex-end" }}
          onClick={handleExcelUrl}
        >
          <Button style={{ backgroundColor: "#009933", color: "White" }}>
            <a href={excelUrl}>Export as Excel</a>
          </Button>
          {/* <CSVLink
            data={detailData}
            onClick={() => {
            }}
            style={{
              backgroundColor: "#009933",
              padding: "8px 20px",
              borderRadius: "10px",
              color: "white",
            }}
          >
            Export as Excel
          </CSVLink>
          <Button type="danger" onClick={handlePrint}>
            Export as PDF
          </Button> */}
        </span>
        <DataTable
          ref={componentRef}
          columns={detailReport}
          dataSource={detailData}
          style={{ width: "100%", overflowX: "scroll" }}
        />
      </Cards>
    </div>
  );
};
export default LoanAppDetailReport;
