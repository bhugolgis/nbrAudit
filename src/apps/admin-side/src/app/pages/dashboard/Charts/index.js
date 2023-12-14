import React from "react";
import { LoadContainer, Cards } from "./style";
import { Column } from "@ant-design/plots";
import { Spin } from "antd";
import useDashboardData from "../container";

// Districtwise graph display for admin dashboard.

const DistrictBarChart = (props) => {
  const { districtBenCount, loading } = useDashboardData();
  const data = districtBenCount;
  const config = {
    data,
    xField: "district",
    yField: "count",
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "count",
      },
      sales: {
        alias: "district",
      },
    },
  };

  if (loading == true) {
    return (
      <LoadContainer>
        <Spin tip="Loading data" />
      </LoadContainer>
    );
  } else {
    return (
      <Cards>
        <h3>Districtwise Count</h3>
        <Column {...config} />
      </Cards>
    );
  }
};
export default DistrictBarChart;
