import React, { useState, useEffect } from "react";
import {
  fetchbeneficiaryCount,
  fetchDashboardCounts,
  fetchDistrictwiseAllCount,
  fetchDistrictWiseCount,
  fetchVerticalWiseJobCount,
} from "../../api/commonApi";

const useDashboardData = () => {
  const [districtCount, setDistrictCount] = useState();
  const [beneficaryCount, setBeneficiaryCount] = useState();
  const [districtBenCount, setDistrictBenCount] = useState();
  const [verticalJobCount, setVerticalJobCount] = useState();
  const [dashboardCounts, setDashboardCounts] = useState();
  const [dashboardLoading, setDashboardLoading] = useState(true);

  const [loading, setLoading] = useState(true);
  const getDistrictwiseCount = async () => {
    const response = await fetchDistrictwiseAllCount();
    setDistrictCount(response);
  };

  const getBenficiaryCount = async () => {
    const response = await fetchbeneficiaryCount();
    setBeneficiaryCount(response);
  };

  const getDistrictBenCount = async () => {
    const response = await fetchDistrictWiseCount();
    setDistrictBenCount(response);
    setLoading(false);
  };

  const getVerticalWiseJobCount = async () => {
    const response = await fetchVerticalWiseJobCount();
    setVerticalJobCount(response);
  };

  const getDashboardCounts = async () => {
    const response = await fetchDashboardCounts();
    setDashboardCounts(response);
    setDashboardLoading(false);
  };

  useEffect(() => {
    getDistrictwiseCount();
    getBenficiaryCount();
    getDistrictBenCount();
    getVerticalWiseJobCount();
    getDashboardCounts();
  }, []);

  return {
    districtCount,
    beneficaryCount,
    districtBenCount,
    loading,
    verticalJobCount,
    dashboardCounts,
    dashboardLoading,
    setDistrictCount,
    getDistrictwiseCount,
  };
};
export default useDashboardData;
