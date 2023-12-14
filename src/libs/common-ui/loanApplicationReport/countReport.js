import {
  Button,
  Card,
  Col,
  Form,
  Modal,
  Row,
  Select,
  message,
  Input,
  Space,
} from "antd";
import React, { useEffect, useState, useRef } from "react";
import { DatePick } from "../forgot-password/style";
import { Cards } from "./style";
import data from "../../../data/dtdata.json";
import { DataTable } from "../Tables/style";
import axios from "axios";
import moment from "moment";
import { DmDistrict, UserGroup } from "../../utils/sessionStorage";
import { CSVLink } from "react-csv";
import { REACT_APP_BASE_URL } from "../../utils/urls";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const LoanAppCountReport = () => {
  const [talukaKey, setTalukaKey] = useState(0);
  const [taluka, setTaluka] = useState(null);
  const [district, setDistrict] = useState(null);
  const [selectVisible, setSelectVisible] = useState(true);
  const [countData, setCountData] = useState([]);

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [schemeName, setSchemeName] = useState(null);
  const [subSchemeName, setSubSchemeName] = useState(null);

  const [disDisabled, setDisDisabled] = useState(false);

  const { Option } = Select;

  const handleDistrict = (e) => {
    setDistrict(e.target.value);
  };

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

  const countReport = [
    {
      title: "Scheme",
      dataIndex: "LoanSchemeCode",
      ...getColumnSearchProps("LoanSchemeCode"),
      render: (schemeName) => {
        return <>{schemeName}</>;
      },

      // filters: [
      //   {
      //     text: "central-nsfdc-el-a",
      //     value: "central-nsfdc-el-a",
      //   },
      //   {
      //     text: "central-nsfdc-el-b",
      //     value: "central-nsfdc-el-b",
      //   },
      //   {
      //     text: "central-nskfdc-el-a",
      //     value: "central-nskfdc-el-a",
      //   },
      //   {
      //     text: "central-nskfdc-el-b",
      //     value: "central-nskfdc-el-b",
      //   },
      // ],
      // onFilter: (value, record) => record.LoanSchemeCode.indexOf(value) === 0,
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
    // { title: "Division", dataIndex: "Division" },
    {
      title: "District",
      dataIndex: "District",
      // filters: disData,
      // filterSearch: true,
      // onFilter: (value, record) => record.District.indexOf(value) === 0,
    },
    { title: "Taluka", dataIndex: "Taluka" },
    { title: "Received", dataIndex: "received_count" },
  ];
  const handleApiSearch = () => {
    if (fromDate != null && toDate != null) {
      axios
        .get(
          `${REACT_APP_BASE_URL}/loan/LoanReportCountList/?District=${district}&Taluka=${taluka}&LoanSchemeCode=${schemeName}&SubSchemeName=${subSchemeName}&from_date=${moment(
            fromDate
          ).format("YYYY-MM-DD")}&to_date=${moment(toDate).format(
            "YYYY-MM-DD"
          )}`
        )
        .then((response) => {
          setCountData(response.data.results);
        })
        .catch((error) => {
          Modal.error({ title: error.data.message });
        });
    } else if (fromDate == null && toDate == null) {
      axios
        .get(
          `${REACT_APP_BASE_URL}/loan/LoanReportCountList/?District=${district}&Taluka=${taluka}&LoanSchemeCode=${schemeName}&SubSchemeName=${subSchemeName}`
        )
        .then((response) => {
          setCountData(response.data.results);
        })
        .catch((error) => {
          Modal.error({ title: error.data.message });
        });
    }
  };

  const handleClear = () => {
    setFromDate(null);
    setToDate(null);
    setDistrict(null);
    setTaluka(null);
    setSchemeName(null);
    setSubSchemeName(null);
    axios
      .get(`${REACT_APP_BASE_URL}/loan/LoanReportCountList/`)
      .then((response) => {
        setCountData(response.data.results);
      });
  };

  useEffect(() => {
    if (UserGroup == "districtManager") {
      axios
        .get(
          `${REACT_APP_BASE_URL}/loan/LoanReportCountList?District=Thane&Taluka=null&LoanSchemeCode=null&SubSchemeName=null`
        )
        .then((response) => {
          setCountData(response.data.results);
        });
    } else {
      axios
        .get(`${REACT_APP_BASE_URL}/loan/LoanReportCountList/`)
        .then((response) => {
          setCountData(response.data.results);
        });
    }
  }, []);
  return (
    <div>
      <h3>Loan Application Count Report</h3>
      <Cards>
        <Form layout="vertical">
          <Row>
            <Col span={8}>
              <Form.Item label="From Date">
                <DatePick
                  value={fromDate}
                  onChange={(date, dateString) => {
                    setFromDate(date);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="To Date">
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
            <Col span={8}>
              <Form.Item
                label="District"
                rules={[
                  {
                    required: true,
                    message: "Please input your District!",
                  },
                ]}
              >
                <Select
                  showSearch
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
                  value={district}
                  style={{ width: "250px" }}
                  name="district"
                  disabled={disDisabled}
                >
                  <>
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
                  </>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Taluka"
                name="taluka"
                rules={[
                  {
                    required: true,
                    message: "Please input your Taluka!",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select taluka"
                  optionFilterProp="children"
                  value={taluka}
                  onChange={(v) => {
                    setTaluka(v);
                  }}
                  disabled={selectVisible}
                  name="taluka"
                  style={{ width: "250px" }}
                >
                  {data[talukaKey].talukas.map((tal) => {
                    return (
                      <Option value={tal.taluka_name}>{tal.taluka_name}</Option>
                    );
                  })}
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
            {/* <Col span={8}>
              <Form.Item label="District" name="district">
                <Select
                  showSearch
                  style={{ width: "250px" }}
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
              </Form.Item>
            </Col> */}
          </Row>
          <Row></Row>
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
        <span style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button style={{ backgroundColor: "#009933", color: "White" }}>
            <a
              href={`${REACT_APP_BASE_URL}/loan/XlsxLoanReportCountList/?from_date=${moment(
                fromDate
              ).format("YYYY-MM-DD")}&to_date=${moment(toDate).format(
                "YYYY-MM-DD"
              )}&LoanSchemeCode=${schemeName}&SubSchemeName=${subSchemeName}&District=${district}&Taluka=${taluka}`}
            >
              Export as Excel
            </a>
          </Button>
          {/* <CSVLink
            data={countData}
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
          </CSVLink> */}
        </span>
        <DataTable columns={countReport} dataSource={countData} />
      </Cards>
    </div>
  );
};
export default LoanAppCountReport;
