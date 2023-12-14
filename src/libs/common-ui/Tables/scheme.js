import React from "react";
import { SchemewiseLoanApplication } from "./constants";
import useTables from "./container";
import { DataTable } from "./style";

const SchemewiseLoanApplicationTable = (props) => {
  const { schemewiseApp } = useTables();
  return (
    <DataTable
      columns={SchemewiseLoanApplication}
      dataSource={props.SchemewiseloanApplications}
      pagination={{ pageSize: 4 }}
    />
  );
};
export default SchemewiseLoanApplicationTable;
