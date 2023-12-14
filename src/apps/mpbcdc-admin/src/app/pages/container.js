import { useEffect, useState } from "react";
import {
  fetchDashboardData,
  fetchLoanApplicationSchemesWise,
  fetchTrainingApplicationList,
} from "../api/commonapi";

const useMpbcdc = () => {
  const [trainingApplicationList, setTrainingApplicationList] = useState();
  const [loanApplicationList, setLoanApplicationList] = useState();

  const [dashboard, setDashboard] = useState();
  const [dashboardLoading, setDashboardLoading] = useState(true);

  const getTrainingApplicationList = async () => {
    const response = await fetchTrainingApplicationList();
    setTrainingApplicationList(response);
  };
  const getLoanApplicationList = async () => {
    const response = await fetchLoanApplicationSchemesWise();
    setLoanApplicationList(response);
  };

  const getDashboardData = async () => {
    const response = await fetchDashboardData();
    setDashboard(response);
    setDashboardLoading(false);
  };

  useEffect(() => {
    getTrainingApplicationList();
    getLoanApplicationList();
    getDashboardData();
  }, []);
  return {
    trainingApplicationList,
    loanApplicationList,
    dashboard,
    dashboardLoading,
  };
};
export default useMpbcdc;
