import React from "react";
import useTraining from "./container";
import { LoadContainer, MainContainer } from "./style";
import { Spin } from "antd";
import AllTraining from "../carousels/allTraining";
const Training = () => {
  const { loading } = useTraining();

  if (loading === true) {
    return (
      <LoadContainer>
        <Spin tip="Loading data..." />
      </LoadContainer>
    );
  } else {
    return (
      <MainContainer>
        <span>
          <h2>Latest Training to Apply</h2>
        </span>
        <AllTraining />
      </MainContainer>
    );
  }
};
export default Training;
