import React from "react";
import { DataTable } from "../../../../style";
import { trainingColumns } from "../../constants/columns";
import useTraining from "../container";

export default function PastTraining() {
  const { pastTrainingList } = useTraining();
  return (
    <div>
      <h3>Past Training</h3>
      <DataTable
        columns={trainingColumns}
        dataSource={pastTrainingList}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}
