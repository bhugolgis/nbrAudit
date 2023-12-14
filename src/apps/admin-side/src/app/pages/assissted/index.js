import React, { useState } from "react";
import { ClearButton, DataTable, SearchInput } from "../../../../style";
import { FaUserCircle } from "react-icons/fa";
import useAssisted from "./container";
import { Button, Select } from "antd";
import data from "../../../../../../data/dtdata.json";
import { DmDistrict } from "../../../../../../libs/utils/sessionStorage";

// Assissted Benenficiary List common Component for All the users whereever applicable.

const { Option } = Select;
const AssistedBeneficiary = () => {
  const {
    assistedList,
    getNextPageData,
    getPrevPageData,
    disFilter,
    search,
    setSearch,
    setDisFilter,
    getFilterList,
  } = useAssisted();

  const columns = [
    {
      title: "#",
      dataIndex: "#",
      render: (text) => {
        return (
          <>
            <FaUserCircle />
          </>
        );
      },
    },
    {
      title: "Beneficiary Name",
      dataIndex: "NameOfBeneficiary",
      key: "name",
      // ...getColumnSearchProps("name"),
      width: "25%",
    },
    {
      title: "Phone Number",
      dataIndex: "ContactNo",
      key: "ContactNo",
      width: "15%",
    },
    {
      title: "Date Of Application",
      dataIndex: "DateOfApplication",
      key: "emailId",
      width: "15%",
      render: (text) => {
        return <>{text == null ? <>NA</> : <>{text}</>}</>;
      },
    },
    {
      title: "Name of Scheme",
      dataIndex: "NameOfSchemeApplied",
    },
    {
      title: "District",
      dataIndex: "District",
      key: "District",
      //   filters: disData,
      //   onFilter: (value, record) => record.district.indexOf(value) === 0,
    },
    {
      title: "Purpose",
      dataIndex: "Purpose",
    },
  ];
  return (
    <div>
      <span style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Assisted Beneficiary</h3>
        <span>
          {DmDistrict == "districtManager" ? (
            <></>
          ) : (
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
                  <Option value={dis.district_name} name="district">
                    {dis.district_name}
                  </Option>
                );
              })}
            </Select>
          )}
          <SearchInput
            placeholder="Name"
            name="name"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <Button type="primary" onClick={getFilterList}>
            Search
          </Button>
          <ClearButton
            type="primary"
            onClick={() => {
              setSearch(null);
              setDisFilter(null);
            }}
          >
            Clear filters
          </ClearButton>
        </span>
      </span>
      <DataTable columns={columns} dataSource={assistedList} />
      <span style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          type="primary"
          style={{ marginRight: "15px" }}
          onClick={getPrevPageData}
        >
          Prev
        </Button>
        <Button type="primary" onClick={getNextPageData}>
          Next
        </Button>
      </span>
    </div>
  );
};
export default AssistedBeneficiary;
