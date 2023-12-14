import React, { useEffect } from "react";
import { fetchRmDashboard } from "../api";
import { useState } from "react";

const useRMData = () => {
  const [dashboard, setDashboard] = useState();
  const [loading, setLoading] = useState(true);

  const getDashboardData = async () => {
    const response = await fetchRmDashboard();
    setDashboard(response);
    setLoading(false);
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return { dashboard, loading };
};
export default useRMData;
