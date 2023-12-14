import React, { useEffect, useState } from "react";
import { fetchClerkDashboard } from "../api/commonapi";

const useClerk = () => {
  const [clerkDashboard, setClerkDashboard] = useState();
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const getClerkDashboard = async () => {
    const response = await fetchClerkDashboard();
    setClerkDashboard(response);
    setDashboardLoading(false);
  };

  useEffect(() => {
    getClerkDashboard();
  }, []);
  return {
    clerkDashboard,
    dashboardLoading,
  };
};
export default useClerk;
