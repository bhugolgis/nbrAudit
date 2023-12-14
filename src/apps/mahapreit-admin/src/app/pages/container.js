import React, { useEffect, useState } from "react";
import {
  fetchAllSchemesApplication,
  fetchJobApplicationList,
  fetchMahapreitDashboard,
} from "../api/commonapi";

const useMahapreitDashboard = () => {
  const [jobApplicationList, setJobApplicationList] = useState();
  const [dashboard, setDashboard] = useState();
  const [dashboardLoading, setDashboardLoading] = useState(true);

  const [schemesData, setSchemesData] = useState();
  const getJobApplicationList = async () => {
    const response = await fetchJobApplicationList();
    setJobApplicationList(response);
  };

  const getDashboardDetails = async () => {
    const response = await fetchMahapreitDashboard();
    setDashboard(response);
    setDashboardLoading(false);
  };

  const getAllSchemesApplication = async () => {
    const response = await fetchAllSchemesApplication();
    setSchemesData(response);
  };

  useEffect(() => {
    getJobApplicationList();
    getDashboardDetails();
    getAllSchemesApplication();
  }, []);
  return { jobApplicationList, dashboard, dashboardLoading, schemesData };
};
export default useMahapreitDashboard;
