import React from "react";
import { DataTable } from "../../../../style";
import { trainingColumns } from "../../constants/columns";
import useTraining from "../container";

const CurrentTraining = () => {
  const { trainingList, currentTrainingList } = useTraining();
  return (
    <div>
      <h3>Current Training</h3>
      <DataTable
        columns={trainingColumns}
        dataSource={currentTrainingList}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};
export default CurrentTraining;
