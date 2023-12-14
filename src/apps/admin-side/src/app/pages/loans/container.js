import { useState } from "react";
import { fetchDashboardData } from "../../../../../mpbcdc-admin/src/app/api/commonapi";
import { useEffect } from "react";

const useAdminLoan = () => {
  const [loanDashboard, setLoanDashboard] = useState();
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const getLoanDashboardData = async () => {
    const response = await fetchDashboardData();
    setLoanDashboard(response);
    setDashboardLoading(false);
  };

  useEffect(() => {
    getLoanDashboardData();
  }, []);

  return { loanDashboard, dashboardLoading };
};
export default useAdminLoan;
