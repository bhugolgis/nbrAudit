import React from "react";
import { DataTable } from "../../../../../../dm-side/style";
import useUserData from "../container";

// Scrutiny Clerk List data common component.

export default function ClerkList() {
  const { clerkList } = useUserData();

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "District", dataIndex: "SclerkDistrict" },
    { title: "Username", dataIndex: "username" },
    { title: "Department Name", dataIndex: "departmenName" },
    { title: "Designation", dataIndex: "designation" },
    { title: "Start of Tenure", dataIndex: "start_of_Tenure" },
    { title: "End of Tenure", dataIndex: "end_of_Tenure" },
  ];
  return (
    <div>
      <h3>Scrutiny Clerk List</h3>
      <DataTable columns={columns} dataSource={clerkList} />
    </div>
  );
}
