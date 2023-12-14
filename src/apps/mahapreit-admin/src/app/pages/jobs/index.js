import React from "react";
import { DataTable } from "../../../../style";
import { JobApplicationList } from "../../constants/columns";
import useMahapreitDashboard from "../container";

const MahapreitJobs = () => {
  const { jobApplicationList } = useMahapreitDashboard();
  return (
    <div>
      <h3>Job Applications</h3>
      <DataTable
        columns={JobApplicationList}
        dataSource={jobApplicationList}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};
export default MahapreitJobs;
