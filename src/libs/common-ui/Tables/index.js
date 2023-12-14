import React from "react";
import { DistrictwiseLoanApplication } from "./constants";
import useTables from "./container";
import { DataTable } from "./style";

const DistrictLoanApplicationTable = (props) => {
  const { districtwiseApp } = useTables();
  return (
    <DataTable
      columns={DistrictwiseLoanApplication}
      dataSource={props.DistrictWiseSpecialScheme}
      pagination={{ pageSize: 4 }}
    />
  );
};

export default DistrictLoanApplicationTable;
