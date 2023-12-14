import React, { useState, useRef } from "react";
import { DataTable } from "../../../../../style";
import useJobData from "../../../../../../admin-side/src/app/pages/jobs/container";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { Space, Button, Input } from "antd";
const CurrentJobs = () => {
  const { currentJobList } = useJobData();

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
  const currentJobsColumn = [
    {
      title: "Job Name",
      dataIndex: "JobName",
      ...getColumnSearchProps("JobName"),
    },
    {
      title: "App Start Date",
      dataIndex: "ApplicationStartDate",
      render: (text) => {
        return text.slice(0, 10);
      },
    },
    {
      title: "App End Date",
      dataIndex: "ApplicationEndDate",
      render: (text) => {
        return text.slice(0, 10);
      },
    },
    {
      title: "Job Start Date",
      dataIndex: "JobStartDate",
      render: (text) => {
        return <>{text.slice(0, 10)}</>;
      },
    },
    {
      title: "Job End Date",
      dataIndex: "JobEndDate",
      render: (text) => {
        return <>{text.slice(0, 10)}</>;
      },
    },
    {
      title: "District",
      dataIndex: "district",
      ...getColumnSearchProps("JobName"),
    },
    {
      title: "Vacancy",
      dataIndex: "TotalVacancy",
    },
    {
      title: "Duration",
      dataIndex: "Duration",
    },
    {
      title: "Status",
      dataIndex: "JobStatus",
      ...getColumnSearchProps("JobStatus"),
    },
  ];
  return (
    <div>
      <h3>Current Jobs</h3>
      <DataTable columns={currentJobsColumn} dataSource={currentJobList} />
    </div>
  );
};
export default CurrentJobs;
