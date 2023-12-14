import React from "react";
import { DataTable } from "../../../style";
import useMpbcdc from "./container";

const MpbcdcLoanApplication = () => {
  const Datacolumns = [
    {
      title: "Name of Scheme",
      dataIndex: "LoanScheme",
    },
    {
      title: "Count of Applications",
      dataIndex: "TotalLoanCount",
    },
  ];

  const { loanApplicationList } = useMpbcdc();
  return (
    <div>
      <h3>Schemewise Loan Applications </h3>
      <DataTable columns={Datacolumns} dataSource={loanApplicationList} />
    </div>
  );
};
export default MpbcdcLoanApplication;
